// ==UserScript==
// @name         D.GG++
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Various quality of life improvements for new and old d.gg chatters
// @author       Levi_OP
// @match        *://www.destiny.gg/embed/chat*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    console.log("D.GG++ v" + GM_info.script.version + " loaded")
    if (GM_getValue("config") === undefined) {
        var config = {
            "clickForEmote": true
        }
        GM_setValue("config", config)
    }
    var settings = document.getElementById("chat-settings-form")
    settings.innerHTML += '<h4>D.GG++</h4><div class="form-group checkbox"><label title="Clicking on emotes to add them to your input"><input id="clickForEmote" class="dggppSCheck" type="checkbox">Click for emote</label></div>'
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
        if (target.classList.contains("dggppSCheck")) {
            var checkBox = !!target.children[0] ? target.children[0] : target
            var config = GM_getValue("config")
            config[target.id] = target.checked
            GM_setValue("config", config)
        }
    }, false);
    var currentMessage = ""
    document.querySelector("#chat-input-control").onkeydown = (e) => {
        setTimeout(() => {
            if (e.key === "Enter") {
                if (currentMessage.trim() === "/tiny") {
                    var errMsg = Array.from(document.querySelector("#chat-output-frame").children).filter(win => {if(win.style.display!=="none")return(win)})[0].children[0].children[Array.from(document.querySelector("#chat-output-frame").children).filter(win => {if(win.style.display!=="none")return(win)})[0].children[0].children.length-1]
                    if (errMsg.classList[1] !== "msg-error") return
                    errMsg.remove()
                    var latestMessage = Array.from(document.querySelector("#chat-output-frame").children).filter(win => {if(win.style.display!=="none")return(win)})[0].children[0].children[Array.from(document.querySelector("#chat-output-frame").children).filter(win => {if(win.style.display!=="none")return(win)})[0].children[0].children.length-1]
                    if (latestMessage.children[1].classList[0] === "features") {
                        let flairs = latestMessage.children[1].children[0].title === "Subscriber" ? latestMessage.children[1].children.length - 1 : latestMessage.children[1].children.length
                        let msgNameLength = calcCharWidth(latestMessage.children[2].innerText)
                        let nameLength = calcCharWidth("Levi_OP")//document.querySelector("#chat-input-control").placeholder.slice(16, -4))
                        if (latestMessage.children[2].innerText === "Bot") return console.log("It was a bot!")
                        if (latestMessage.children[4].children[0]?.classList[0] === "greentext") {
                            console.log("greentext!")
                        } else {
                            if (Array.from(latestMessage.children[4].children).filter(elm=>{if(Array.from(elm.classList).includes("emote"))return(elm)}).length === 0) return console.log("no emotes!")
                            var firstEmote = Array.from(latestMessage.children[4].children).filter(elm=>{if(Array.from(elm.classList).includes("emote"))return(elm)})[0].classList[1]
                            let message = latestMessage.children[4].innerText.split(firstEmote)[0]
                            let messageLength = calcCharWidth(message)
                            let totalWidth = (flairs * 8) + msgNameLength - nameLength + messageLength
                            console.log(`flairs: ${flairs}\nmsgNameLength: ${msgNameLength}\nnameLength: ${nameLength}\nfirstEmote: ${firstEmote}\nmessage: ${message}\nmessageLength: ${messageLength}\ntotalWidth: ${totalWidth}\n${"_".repeat(Math.floor(totalWidth / 4))}`)
                        }
                    } else if (latestMessage.children[1].classList[0] === "user") {
                        console.log("it was a user.")
                    } else if (latestMessage.children[1].classList[0] === "user") {
                        console.log("it was a combo!")
                    }
                }
            }
            currentMessage = document.querySelector("#chat-input-control").value
        }, 1)
    }
    var widths = {"c":4.5,"f":2.35,"i":2,"j":2,"k":4.6,"l":2,"m":7.5,"r":3,"s":4.5,"t":2.5,"v":4.5,"w":6.6,"x":4.5,"y":4.5,"z":4.6,"C":6.5,"D":6.5,"F":5.5,"G":7,"H":6.5,"I":2.5,"J":4.5,"L":5,"M":7.5,"N":6.5,"O":7,"Q":7,"R":6.5,"T":5.5,"U":6.5,"W":8.5,"Z":5.5,"'":1.7,":":2.5,";":3.5,",":2.5," ":2.5,".":2.5,"_":5}
    function calcCharWidth(str) {
        let length = 0
        str.split("").forEach(char => {
            if (/[A-Z]/.test(char)) { length += widths[char] || 6 } else
            if (/[a-z]/.test(char)) { length += widths[char] || 5 } else
            if (/[0-9]/.test(char)) { length += 5 } else
            { length += 6 }
        })
        return length
    }
})();
