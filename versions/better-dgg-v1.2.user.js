// ==UserScript==
// @name         Better D.GG
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Various quality of life improvements for new and old d.gg chatters
// @author       Levi_OP
// @match        https://www.destiny.gg/bigscreen*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Better D.GG v1.2 loaded")
    document.getElementById("chat-wrap").children[0].contentDocument.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.classList.contains("emote") && !target.parentElement.classList.contains("emote-item")) {
            var value = document.getElementById("chat-wrap").children[0].contentDocument.getElementById("chat-input-control").value
            if (value === "") {
                document.getElementById("chat-wrap").children[0].contentDocument.getElementById("chat-input-control").value = target.innerText + " "
            } else {
                document.getElementById("chat-wrap").children[0].contentDocument.getElementById("chat-input-control").value += value.endsWith(" ") ? "" + target.innerText + " " : " " + target.innerText + " "
            }
        }
    }, false);
})();
