"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = require("../utils/browser");
/**
 * A deep description: https://fingerprintjs.com/blog/audio-fingerprinting/
 * Inspired by and based on https://github.com/cozylife/audio-fingerprint
 */
function getAudioFingerprint() {
    const w = window;
    const AudioContext = w.OfflineAudioContext || w.AudioContext;
    if (!AudioContext) {
        return -2 /* NotSupported */;
    }
    // In some browsers, audio context always stays suspended unless the context is started in response to a user action
    // (e.g. a click or a tap). It prevents audio fingerprint from being taken at an arbitrary moment of time.
    // Such browsers are old and unpopular, so the audio fingerprinting is just skipped in them.
    // See a similar case explanation at https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
    if (doesCurrentBrowserSuspendAudioContext()) {
        return -1 /* KnownToSuspend */;
    }
    const hashFromIndex = 4500;
    const hashToIndex = 5000;
    const context = new AudioContext(1, hashToIndex, 44100);
    const oscillator = context.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.value = 10000;
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;
    oscillator.connect(compressor);
    compressor.connect(context.destination);
    oscillator.start(0);
    const [renderPromise, finishRendering] = startRenderingAudio(context);
    const fingerprintPromise = renderPromise.then((buffer) => getHash(buffer.getChannelData(0).subarray(hashFromIndex)), (error) => {
        if (error.name === "timeout" /* Timeout */ || error.name === "suspended" /* Suspended */) {
            return -3 /* Timeout */;
        }
        throw error;
    });
    // Suppresses the console error message in case when the fingerprint fails before requested
    fingerprintPromise.catch(() => undefined);
    return () => {
        finishRendering();
        return fingerprintPromise;
    };
}
exports.default = getAudioFingerprint;
/**
 * Checks if the current browser is known to always suspend audio context
 */
function doesCurrentBrowserSuspendAudioContext() {
    return (0, browser_1.isWebKit)() && !(0, browser_1.isDesktopSafari)() && !(0, browser_1.isWebKit606OrNewer)();
}
/**
 * Starts rendering the audio context.
 * When the returned function is called, the render process starts finishing.
 */
function startRenderingAudio(context) {
    const renderTryMaxCount = 3;
    const renderRetryDelay = 500;
    const runningMaxAwaitTime = 500;
    const runningSufficientTime = 5000;
    let finalize = () => undefined;
    const resultPromise = new Promise((resolve, reject) => {
        let isFinalized = false;
        let renderTryCount = 0;
        let startedRunningAt = 0;
        context.oncomplete = (event) => resolve(event.renderedBuffer);
        const startRunningTimeout = () => {
            setTimeout(() => reject(makeInnerError("timeout" /* Timeout */)), Math.min(runningMaxAwaitTime, startedRunningAt + runningSufficientTime - Date.now()));
        };
        const tryRender = () => {
            try {
                context.startRendering();
                switch (context.state) {
                    case 'running':
                        startedRunningAt = Date.now();
                        if (isFinalized) {
                            startRunningTimeout();
                        }
                        break;
                    // Sometimes the audio context doesn't start after calling `startRendering` (in addition to the cases where
                    // audio context doesn't start at all). A known case is starting an audio context when the browser tab is in
                    // background on iPhone. Retries usually help in this case.
                    case 'suspended':
                        // The audio context can reject starting until the tab is in foreground. Long fingerprint duration
                        // in background isn't a problem, therefore the retry attempts don't count in background. It can lead to
                        // a situation when a fingerprint takes very long time and finishes successfully. FYI, the audio context
                        // can be suspended when `document.hidden === false` and start running after a retry.
                        if (!document.hidden) {
                            renderTryCount++;
                        }
                        if (isFinalized && renderTryCount >= renderTryMaxCount) {
                            reject(makeInnerError("suspended" /* Suspended */));
                        }
                        else {
                            setTimeout(tryRender, renderRetryDelay);
                        }
                        break;
                }
            }
            catch (error) {
                reject(error);
            }
        };
        tryRender();
        finalize = () => {
            if (!isFinalized) {
                isFinalized = true;
                if (startedRunningAt > 0) {
                    startRunningTimeout();
                }
            }
        };
    });
    return [resultPromise, finalize];
}
function getHash(signal) {
    let hash = 0;
    for (let i = 0; i < signal.length; ++i) {
        hash += Math.abs(signal[i]);
    }
    return hash;
}
function makeInnerError(name) {
    const error = new Error(name);
    error.name = name;
    return error;
}
