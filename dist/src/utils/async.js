"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachWithBreaks = exports.awaitIfAsync = exports.isPromise = exports.requestIdleCallbackIfAvailable = exports.wait = void 0;
function wait(durationMs, resolveWith) {
    return new Promise((resolve) => setTimeout(resolve, durationMs, resolveWith));
}
exports.wait = wait;
function requestIdleCallbackIfAvailable(fallbackTimeout, deadlineTimeout = Infinity) {
    const { requestIdleCallback } = window;
    if (requestIdleCallback) {
        // The function `requestIdleCallback` loses the binding to `window` here.
        // `globalThis` isn't always equal `window` (see https://github.com/fingerprintjs/fingerprintjs/issues/683).
        // Therefore, an error can occur. `call(window,` prevents the error.
        return new Promise((resolve) => requestIdleCallback.call(window, () => resolve(), { timeout: deadlineTimeout }));
    }
    else {
        return wait(Math.min(fallbackTimeout, deadlineTimeout));
    }
}
exports.requestIdleCallbackIfAvailable = requestIdleCallbackIfAvailable;
function isPromise(value) {
    return (value && typeof value.then === 'function');
}
exports.isPromise = isPromise;
/**
 * Calls a maybe asynchronous function without creating microtasks when the function is synchronous.
 * Catches errors in both cases.
 *
 * If just you run a code like this:
 * ```
 * console.time('Action duration')
 * await action()
 * console.timeEnd('Action duration')
 * ```
 * The synchronous function time can be measured incorrectly because another microtask may run before the `await`
 * returns the control back to the code.
 */
function awaitIfAsync(action, callback) {
    try {
        const returnedValue = action();
        if (isPromise(returnedValue)) {
            returnedValue.then((result) => callback(true, result), (error) => callback(false, error));
        }
        else {
            callback(true, returnedValue);
        }
    }
    catch (error) {
        callback(false, error);
    }
}
exports.awaitIfAsync = awaitIfAsync;
/**
 * If you run many synchronous tasks without using this function, the JS main loop will be busy and asynchronous tasks
 * (e.g. completing a network request, rendering the page) won't be able to happen.
 * This function allows running many synchronous tasks such way that asynchronous tasks can run too in background.
 */
function forEachWithBreaks(items, callback, loopReleaseInterval = 16) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastLoopReleaseTime = Date.now();
        for (let i = 0; i < items.length; ++i) {
            callback(items[i], i);
            const now = Date.now();
            if (now >= lastLoopReleaseTime + loopReleaseInterval) {
                lastLoopReleaseTime = now;
                // Allows asynchronous actions and microtasks to happen
                yield wait(0);
            }
        }
    });
}
exports.forEachWithBreaks = forEachWithBreaks;
