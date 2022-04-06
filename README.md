# Browser-FP
Project Title: Increasing Confidence Score of Browser Fingerprinting

Project Description:
Over the past few years, the trend in web browsers has generally favored more privacy for users. Almost all mainstream browsers (Safari, Firefox, Brave, and Chrome) now block third-party cookies, which enable tracking across multiple sites, and Chrome uses encrypted traffic (via HTTPS) by default.
More privacy is generally a good thing for legitimate users. But, increased browser privacy also comes with a hidden cost. By preventing cookies and other tracking mechanisms, it's tough for web application developers to figure out whether a visitor is an actual user or a fraudulent bot. Another way to identify users without intrusive cookies is known as Browser Fingerprinting. Browser fingerprinting can be used to identify users uniquely and their associate sessions regardless of anonymizing tactics like incognito browsing, VPNs, and cookie blockers. Unlike third-party cookies, which can be cleared or blocked by the browser, your browser fingerprint cannot be altered. Also, it maintains a confidence score of a floating-point number between 0 and 1 that represents the probability of accurate identification. The closer this number is to 1, the more sure we are that the visitor is correct. The closer it is to 0, the more uncertainty we have about the identification results.
As depicted by our project title, our ultimate aim will be to increase the confidence score using Various techniques like :
1) By implementing more and more fingerprinting methods like Canvas fingerprinting, audio fingerprinting, WebGL fingerprinting, WebRTC fingerprinting, etc., in the browsers.
2) Deriving a solution to prevent browsers like safari, brave, etc., from preventing browser fingerprinting(decreasing confidence score, which results in failure of browser fingerprinting).
3) By implementing invisible trackers and tracking ads in browsers, which cannot be blocked partially by the extensions already blocking some of them, thus giving us the chances to increase confidence score.
4) Making an ML bot that detects which fingerprinting methods a particular browser is using and which all is missing. Then, notifying how to fix the missing one after implementing some more features to the fingerprinting process already implemented in that browser, thus increasing the confidence score.

Useful Blogs:
<ul>
<li>https://fingerprintjs.com/blog/what-is-browser-fingerprinting/ </li>
<li>https://fingerprintjs.com/blog/browser-fingerprinting-techniques/</li>
<li>https://fingerprintjs.com/blog/browser-fingerprinting-privacy/</li>
<li>https://digiday.com/media/googles-opaque-practices-to-restrict-fingerprinting-create-confusion-among-its-ad-tech-partners/</li>
</ul>



https://cdn.jsdelivr.net/gh/anm0l555/Browser-FP@0.0.1/dist/src/index.js