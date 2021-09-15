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

    //
    // Initialization and config setup
    //

    //Log loaded message
    console.log("D.GG++ v" + GM_info.script.version + " loaded")
    //Check if config has been saved in the past
    if (GM_getValue("config") === undefined) {
        //If not, define and save config
        var config = {
            "clickForEmote": true
        }
        GM_setValue("config", config)
    }
    //Get settings window element
    var settings = document.getElementById("chat-settings-form")
    //Add D.GG++ section to settings panel
    settings.innerHTML += '<h4>D.GG++</h4><div class="form-group checkbox"><label title="Clicking on emotes to add them to your input"><input id="clickForEmote" class="dggppSCheck" type="checkbox">Click for emote</label></div>'
    //Make settings align with the current config
    document.getElementById("clickForEmote").checked = GM_getValue("config").clickForEmote


    //
    // Click for emote
    //

    //Catch-all click listener
    document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        //Check if clickForEmote is enabled
        if (document.getElementById("clickForEmote").checked) {
            //Get chat input
            var input = document.getElementById("chat-input-control")
            //Make sure emote is in chat, not emote picker
            if (target.classList.contains("emote") && !target.parentElement.classList.contains("emote-item")) {
                //Check if there is currently any text in the chat box
                if (input.value === "") {
                    //If there isn't, just add the emote with a space afterward
                    input.value = target.innerText + " "
                } else {
                    //If there is, check if there if the last character is a space, so that we can choose to add our own space before and after the emote text
                    input.value += input.value.endsWith(" ") ? "" + target.innerText + " " : " " + target.innerText + " "
                }
            }
        }
        //Check if the element being clicked on is text next to a setting checkbox and update the textbox as well as the config
        if (target.classList.contains("dggppSCheck")) {
            //Get checkbox element by checking if the clicked on element is the text or the checkbox itself
            var checkBox = !!target.children[0] ? target.children[0] : target
            //Get the current config
            var config = GM_getValue("config")
            //Set config equal to upadated setting
            config[target.id] = target.checked
            //Save config
            GM_setValue("config", config)
        }
    }, false);


    //
    // Custom /command handling
    //

    //Define the current message in the input box
    var currentMessage = ""
    //Input listener in chat box
    document.querySelector("#chat-input-control").onkeydown = (e) => {
        //Add one milisecond delay to give time for command to input
        setTimeout(() => {
            //Check if command is being entered and handle it
            if (e.key === "Enter") {
                //
                // Automated nathanTiny2_OG placement
                //
                if (currentMessage.trim() === "/tiny") {
                    //Get chat window
                    let chat = document.querySelector(".chat-lines.nano-content")
                    //Get unknown command error message
                    let commandMessage = chat.lastElementChild
                    //Make sure the latest message was the error message
                    if (commandMessage.classList.value !== "msg-chat msg-error ") return console.log("DGGPP: Unknown command error message not found")
                    //Get target message
                    let targetMessage = Array.from(chat.children).at(-2)
                    //Make sure not to break combos
                    if (targetMessage.classList[1] === "msg-emote") return commandMessage.remove()
                    //Make sure that the message in quesiton is a message from a user
                    if (targetMessage.classList[1] !== "msg-user") return commandMessage.children[1].innerText = "Last message isn't from a user"
                    //Define a standard message text element
                    let textElement = targetMessage.children[1].classList[0] === "features" ? targetMessage.children[4] : targetMessage.children[3]
                    //Get first emote in message
                    let firstEmote = Array.from(textElement.children).filter(elm => {if (elm.classList[0] === "emote") return elm})[0]
                    //Update error message and don't continue if there is no emote in the message
                    if (!firstEmote) return commandMessage.children[1].innerText = "Last message has no emotes"
                    //Get pixel width of target message's username or/and flairs
                    let nameWidth = targetMessage.children[1].classList[0] === "features" ? targetMessage.children[1].offsetWidth + targetMessage.children[2].offsetWidth : targetMessage.children[1].offsetWidth
                    console.log(targetMessage.children[1].classList[0] === "features" ? `flair: ${targetMessage.children[1].offsetWidth} | name: ${targetMessage.children[2].offsetWidth}` : `name: ${targetMessage.children[1].offsetWidth}`)
                    console.log(targetMessage)
                    //console.log("_".repeat(Math.floor((nameWidth * 3 - calcCharWidth("Levi_OP")) / 20)))
                }
            }
            //Set currentMessage var to the current message
            currentMessage = document.querySelector("#chat-input-control").value
        }, 1)
    }
    var widths = {"a":24,"b":24.9,"c":23.2,"d":25,"e":23.5,"f":15.4,"g":24.9,"h":24.5,"i":10.7,"j":10.6,"k":22.5,"l":10.7,"m":38.9,"n":24.5,"o":25.3,"p":24.9,"q":25.2,"r":15,"s":22.8,"t":14.5,"u":24.4,"v":21.4,"w":33.3,"x":21.9,"y":21,"z":22,"A":28.9,"B":27.6,"C":28.9,"D":29,"E":25.2,"F":24.5,"G":30.2,"H":31.6,"I":12.1,"J":24.5,"K":27.8,"L":23.9,"M":38.7,"N":31.6,"O":30.4,"P":28,"Q":30.4,"R":27.3,"S":26.3,"T":26.8,"U":28.7,"V":28.2,"W":39.3,"X":27.7,"Y":27,"Z":26.5," ":11,"`":13.7,"~":30.1,"!":11.4,"@":39.9,"#":27.3,"%":32.5,"^":18.5,"&":27.5,"*":19.1,"(":15.1,")":15.4,"-":12.2,"_":20,"=":24.3,"+":25.1,"[":11.8,"]":11.8,"{":15,"}":15,"\\":18.2,"|":10.8,";":9.4,":":10.7,"'":5.4,"\"":11.8,",":8.7,".":11.6,"<":22.5,">":23.1,"/":13.4,"?":20.9}
    function calcCharWidth(str) {
        let length = 0
        str.split("").forEach(char => {
            if (widths[char]) return length += widths[char]
            length += 28
        })
        return length
    }
})();
