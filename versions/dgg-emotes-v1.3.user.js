// ==UserScript==
// @name         D.gg Emotes
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Various quality of life improvements for new and old d.gg chatters
// @author       Levi_OP
// @match        *://www.destiny.gg/bigscreen*
// @match        *://www.destiny.gg/embed/chat*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("D.gg Emotes v1.3 loaded")
    document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        var input = document.getElementById("chat-input-control")
        if (target.classList.contains("emote") && !target.parentElement.classList.contains("emote-item")) {
            if (input.value === "") {
                input.value = target.innerText + " "
            } else {
                input.value += input.value.endsWith(" ") ? "" + target.innerText + " " : " " + target.innerText + " "
            }
        }
    }, false);
})();
