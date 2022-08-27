// ==UserScript==
// @name         trashed
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Cau kkte
// @author       Morvicek
// @match        *://*/*
// @downloadURL  https://raw.githubusercontent.com/Morvicek/Morvicek/master/Hehe/trashed.js
// @updateURL    https://raw.githubusercontent.com/Morvicek/Morvicek/master/Hehe/trashed.js
// @grant        none
// ==/UserScript==

(function() {
const DELAY_IN_MS = 3000;
const VIDEO_LENGTH_IN_MS = 20000;
const MAX_Z_INDEX = 2147483647;

const SHOULD_CENAFY = Math.floor(Math.random() * 100) === 69;
const style = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;'
console.log("%cAre you getting trashed today: "+SHOULD_CENAFY, style);
const list = ["https://cdn.discordapp.com/attachments/933118653447143434/1012708762693423124/RPReplay_Final1661450256.mov","https://cdn.discordapp.com/attachments/752818406247497808/1013155923608477737/finalne_novy_kajumi_song.mp4","https://cdn.discordapp.com/attachments/752818406247497808/1013170518746206229/trim.A8A2BFAA-BCF8-4BC3-92C3-39928737438E.mov","https://cdn.discordapp.com/attachments/530052203558207503/862684002611101740/abracadabra.mp4"]
const url = list[Math.floor((Math.random()*list.length))];

let hasLearnedWhoTheChampIs = true;
let timeoutId;



function cenafy() {
  if (hasLearnedWhoTheChampIs) {
 //   return;
  }

  // This acts as a basic debounce so that if the user is doing
  // something click intensive, we don't show them who the champ is
  // until they've taken a brief break
  if (timeoutId != null) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    // Don't show the video if the tab isn't active. We'll show
    // them who the champ is next time
    if (document.hidden) {
      return;
    }

    const body = document.body;
    const previousPointerEvents = body.style.pointerEvents;
    body.style.pointerEvents = "none";
    const previousBackgroundColor = body.style.backgroundColor;
    body.style.backgroundColor = "black";

    const video = document.createElement("video");
    video.src = url
    Object.assign(video.style, {
        position: "fixed",
        background: "black",
        zIndex: MAX_Z_INDEX,
        height: "100vh",
        width: "100vw",
        inset: 0,
    });
    body.appendChild(video);

    // Prevent future clicks from spawning additional videos while
    // this is playing. In theory, pointer-events: none should guard
    // against this but child nodes could have pointer-events set
    // explicitly
    window.removeEventListener("mouseup", cenafy);

    video.addEventListener("ended", () => {
      body.style.backgroundColor = previousBackgroundColor;
      body.style.pointerEvents = previousPointerEvents;
      body.removeChild(video);
      hasLearnedWhoTheChampIs = true;
    });

    video.play();
  }, DELAY_IN_MS);
}

if (SHOULD_CENAFY) {
  // Add this to mouse-up instead of on load so we can auto-play
  // the video with sound
  window.addEventListener("mouseup", cenafy);
}

})();

