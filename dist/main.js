!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isAndroid=t.exitFullscreen=t.getFullscreenElement=t.isIPad=t.isWebKit606OrNewer=t.isChromium86OrNewer=t.isGecko=t.isDesktopSafari=t.isWebKit=t.isChromium=t.isEdgeHTML=t.isTrident=void 0;const r=n(1);function o(){const e=window,t=navigator;return(0,r.countTruthy)(["MSCSSMatrix"in e,"msSetImmediate"in e,"msIndexedDB"in e,"msMaxTouchPoints"in t,"msPointerEnabled"in t])>=4}function i(){const e=window,t=navigator;return(0,r.countTruthy)(["webkitPersistentStorage"in t,"webkitTemporaryStorage"in t,0===t.vendor.indexOf("Google"),"webkitResolveLocalFileSystemURL"in e,"BatteryManager"in e,"webkitMediaStream"in e,"webkitSpeechGrammar"in e])>=5}function u(){var e,t;const n=window;return(0,r.countTruthy)(["buildID"in navigator,"MozAppearance"in(null!==(t=null===(e=document.documentElement)||void 0===e?void 0:e.style)&&void 0!==t?t:{}),"onmozfullscreenchange"in n,"mozInnerScreenX"in n,"CSSMozDocumentRule"in n,"CanvasCaptureMediaStream"in n])>=4}t.isTrident=o,t.isEdgeHTML=function(){const e=window,t=navigator;return(0,r.countTruthy)(["msWriteProfilerMark"in e,"MSStream"in e,"msLaunchUri"in t,"msSaveBlob"in t])>=3&&!o()},t.isChromium=i,t.isWebKit=function(){const e=window,t=navigator;return(0,r.countTruthy)(["ApplePayError"in e,"CSSPrimitiveValue"in e,"Counter"in e,0===t.vendor.indexOf("Apple"),"getStorageUpdates"in t,"WebKitMediaKeys"in e])>=4},t.isDesktopSafari=function(){const e=window;return(0,r.countTruthy)(["safari"in e,!("DeviceMotionEvent"in e),!("ongestureend"in e),!("standalone"in navigator)])>=3},t.isGecko=u,t.isChromium86OrNewer=function(){const e=window;return(0,r.countTruthy)([!("MediaSettingsRange"in e),"RTCEncodedAudioFrame"in e,""+e.Intl=="[object Intl]",""+e.Reflect=="[object Reflect]"])>=3},t.isWebKit606OrNewer=function(){const e=window;return(0,r.countTruthy)(["DOMRectList"in e,"RTCPeerConnectionIceEvent"in e,"SVGGeometryElement"in e,"ontransitioncancel"in e])>=3},t.isIPad=function(){if("iPad"===navigator.platform)return!0;const e=screen,t=e.width/e.height;return(0,r.countTruthy)(["MediaSource"in window,!!Element.prototype.requestFullscreen,t>.65&&t<1.53])>=2},t.getFullscreenElement=function(){return document.fullscreenElement||null},t.exitFullscreen=function(){const e=document;return e.exitFullscreen.call(e)},t.isAndroid=function(){const e=i(),t=u();if(!e&&!t)return!1;const n=window;return(0,r.countTruthy)(["onorientationchange"in n,"orientation"in n,e&&!("SharedWorker"in n),t&&/android/i.test(navigator.appVersion)])>=2}},function(e,t,n){"use strict";function r(e,t){for(let n=0,r=e.length;n<r;++n)if(e[n]===t)return!0;return!1}Object.defineProperty(t,"__esModule",{value:!0}),t.maxInIterator=t.areSetsEqual=t.parseSimpleCssSelector=t.round=t.countTruthy=t.replaceNaN=t.toFloat=t.toInt=t.excludes=t.includes=void 0,t.includes=r,t.excludes=function(e,t){return!r(e,t)},t.toInt=function(e){return parseInt(e)},t.toFloat=function(e){return parseFloat(e)},t.replaceNaN=function(e,t){return"number"==typeof e&&isNaN(e)?t:e},t.countTruthy=function(e){return e.reduce((e,t)=>e+(t?1:0),0)},t.round=function(e,t=1){if(Math.abs(t)>=1)return Math.round(e/t)*t;{const n=1/t;return Math.round(e*n)/n}},t.parseSimpleCssSelector=function(e){var t,n;const r=`Unexpected syntax '${e}'`,o=/^\s*([a-z-]*)(.*)$/i.exec(e),i=o[1]||void 0,u={},a=/([.:#][\w-]+|\[.+?\])/gi,c=(e,t)=>{u[e]=u[e]||[],u[e].push(t)};for(;;){const e=a.exec(o[2]);if(!e)break;const i=e[0];switch(i[0]){case".":c("class",i.slice(1));break;case"#":c("id",i.slice(1));break;case"[":{const e=/^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(i);if(!e)throw new Error(r);c(e[1],null!==(n=null!==(t=e[4])&&void 0!==t?t:e[5])&&void 0!==n?n:"");break}default:throw new Error(r)}}return[i,u]},t.areSetsEqual=function(e,t){if(e===t)return!0;if(e.size!==t.size)return!1;if(e.values){for(let n=e.values(),r=n.next();!r.done;r=n.next())if(!t.has(r.value))return!1;return!0}{let n=!0;return e.forEach(e=>{n&&!t.has(e)&&(n=!1)}),n}},t.maxInIterator=function(e,t){let n,r;for(let o=e.next();!o.done;o=e.next()){const e=o.value,i=t(e);(void 0===r||i>r)&&(n=e,r=i)}return n}},function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.sources=void 0;const o=r(n(3)),i=r(n(4)),u=n(5),a=r(n(7));t.sources={canvas:i.default,audio:o.default,platform:a.default},t.default=function(e){return(0,u.loadSources)(t.sources,e,[])}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);function o(e){const t=new Error(e);return t.name=e,t}t.default=function(){const e=window,t=e.OfflineAudioContext||e.AudioContext;if(!t)return-2;if((0,r.isWebKit)()&&!(0,r.isDesktopSafari)()&&!(0,r.isWebKit606OrNewer)())return-1;const n=new t(1,5e3,44100),i=n.createOscillator();i.type="triangle",i.frequency.value=1e4;const u=n.createDynamicsCompressor();u.threshold.value=-50,u.knee.value=40,u.ratio.value=12,u.attack.value=0,u.release.value=.25,i.connect(u),u.connect(n.destination),i.start(0);const[a,c]=function(e){let t=()=>{};return[new Promise((n,r)=>{let i=!1,u=0,a=0;e.oncomplete=e=>n(e.renderedBuffer);const c=()=>{setTimeout(()=>r(o("timeout")),Math.min(500,a+5e3-Date.now()))},s=()=>{try{switch(e.startRendering(),e.state){case"running":a=Date.now(),i&&c();break;case"suspended":document.hidden||u++,i&&u>=3?r(o("suspended")):setTimeout(s,500)}}catch(e){r(e)}};s(),t=()=>{i||(i=!0,a>0&&c())}}),t]}(n),s=a.then(e=>function(e){let t=0;for(let n=0;n<e.length;++n)t+=Math.abs(e[n]);return t}(e.getChannelData(0).subarray(4500)),e=>{if("timeout"===e.name||"suspended"===e.name)return-3;throw e});return s.catch(()=>{}),()=>(c(),s)}},function(e,t,n){"use strict";function r(e){return e.rect(0,0,10,10),e.rect(2,2,6,6),!e.isPointInPath(5,5,"evenodd")}function o(e,t){e.width=240,e.height=60,t.textBaseline="alphabetic",t.fillStyle="#f60",t.fillRect(100,1,62,20),t.fillStyle="#069",t.font='11pt "Times New Roman"';const n="Cwm fjordbank gly "+String.fromCharCode(55357,56835);return t.fillText(n,2,15),t.fillStyle="rgba(102, 204, 0, 0.2)",t.font="18pt Arial",t.fillText(n,4,45),u(e)}function i(e,t){e.width=122,e.height=110,t.globalCompositeOperation="multiply";for(const[e,n,r]of[["#f2f",40,40],["#2ff",80,40],["#ff2",60,80]])t.fillStyle=e,t.beginPath(),t.arc(n,r,40,0,2*Math.PI,!0),t.closePath(),t.fill();return t.fillStyle="#f9c",t.arc(60,60,60,0,2*Math.PI,!0),t.arc(60,60,20,0,2*Math.PI,!0),t.fill("evenodd"),u(e)}function u(e){return e.toDataURL()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){const[e,t]=function(){const e=document.createElement("canvas");return e.width=1,e.height=1,[e,e.getContext("2d")]}();return function(e,t){return!(!t||!e.toDataURL)}(e,t)?{winding:r(t),geometry:i(e,t),text:o(e,t)}:{winding:!1,geometry:"",text:""}}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,a)}c((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.loadSources=t.loadSource=void 0;const o=n(6),i=n(1);function u(e){return e&&"object"==typeof e&&"message"in e?e:{message:e}}function a(e,t){const n=new Promise(n=>{const r=Date.now();(0,o.awaitIfAsync)(e.bind(null,t),(...e)=>{const t=Date.now()-r;if(!e[0])return n(()=>({error:u(e[1]),duration:t}));const i=e[1];if((e=>"function"!=typeof e)(i))return n(()=>({value:i,duration:t}));n(()=>new Promise(e=>{const n=Date.now();(0,o.awaitIfAsync)(i,(...r)=>{const o=t+Date.now()-n;if(!r[0])return e({error:u(r[1]),duration:o});e({value:r[1],duration:o})})}))})});return function(){return n.then(e=>e())}}t.loadSource=a,t.loadSources=function(e,t,n){const u=Object.keys(e).filter(e=>(0,i.excludes)(n,e)),c=Array(u.length);return(0,o.forEachWithBreaks)(u,(n,r)=>{c[r]=a(e[n],t)}),function(){return r(this,void 0,void 0,(function*(){const e={};for(const t of u)e[t]=void 0;const t=Array(u.length);for(;;){let n=!0;if(yield(0,o.forEachWithBreaks)(u,(r,o)=>{t[o]||(c[o]?t[o]=c[o]().then(t=>e[r]=t):n=!1)}),n)break;yield(0,o.wait)(1)}return yield Promise.all(t),e}))}}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function u(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(u,a)}c((r=r.apply(e,t||[])).next())}))};function o(e,t){return new Promise(n=>setTimeout(n,e,t))}function i(e){return e&&"function"==typeof e.then}Object.defineProperty(t,"__esModule",{value:!0}),t.forEachWithBreaks=t.awaitIfAsync=t.isPromise=t.requestIdleCallbackIfAvailable=t.wait=void 0,t.wait=o,t.requestIdleCallbackIfAvailable=function(e,t=1/0){const{requestIdleCallback:n}=window;return n?new Promise(e=>n.call(window,()=>e(),{timeout:t})):o(Math.min(e,t))},t.isPromise=i,t.awaitIfAsync=function(e,t){try{const n=e();i(n)?n.then(e=>t(!0,e),e=>t(!1,e)):t(!0,n)}catch(e){t(!1,e)}},t.forEachWithBreaks=function(e,t,n=16){return r(this,void 0,void 0,(function*(){let r=Date.now();for(let i=0;i<e.length;++i){t(e[i],i);const u=Date.now();u>=r+n&&(r=u,yield o(0))}}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);t.default=function(){const{platform:e}=navigator;return"MacIntel"===e&&(0,r.isWebKit)()&&!(0,r.isDesktopSafari)()?(0,r.isIPad)()?"iPad":"iPhone":e}}]);