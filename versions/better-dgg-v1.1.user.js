// ==UserScript==
// @name         Better D.GG
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Various quality of life improvements for new and old d.gg chatters
// @author       Levi_OP
// @match        https://www.destiny.gg/bigscreen*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("chat-wrap").children[0].contentDocument.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.classList.contains("emote") && !target.parentElement.classList.contains("emote-item")) {
            document.getElementById("chat-wrap").children[0].contentDocument.getElementById("chat-input-control").value += target.innerText + " "
        }
    }, false);
})();
