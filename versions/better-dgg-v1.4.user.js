// ==UserScript==
// @name         Better D.GG
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Various quality of life improvements for new and old d.gg chatters
// @author       Levi_OP
// @match        *://www.destiny.gg/embed/chat*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    console.log("Better D.GG v" + GM_info.script.version + " loaded")
    if (GM_getValue("config") === undefined) {
        var config = {
            "clickForEmote": true
        }
        GM_setValue("config", config)
    }
    var settings = document.getElementById("chat-settings-form")
    settings.innerHTML += '<h4>Better D.GG</h4><div class="form-group checkbox"><label title="Clicking on emotes to add them to your input"><input id="clickForEmote" class="bdggSCheck" type="checkbox">Click for emote</label></div>'
    document.getElementById("clickForEmote").checked = GM_getValue("config").clickForEmote
    document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (document.getElementById("clickForEmote").checked) {
            var input = document.getElementById("chat-input-control")
            if (target.classList.contains("emote") && !target.parentElement.classList.contains("emote-item")) {
                if (input.value === "") {
                    input.value = target.innerText + " "
                } else {
                    input.value += input.value.endsWith(" ") ? "" + target.innerText + " " : " " + target.innerText + " "
                }
            }
        }
        if (target.classList.contains("bdggSCheck")) {
            var checkBox = !!target.children[0] ? target.children[0] : target
            var config = GM_getValue("config")
            config[target.id] = target.checked
            GM_setValue("config", config)
        }
    }, false);
})();
