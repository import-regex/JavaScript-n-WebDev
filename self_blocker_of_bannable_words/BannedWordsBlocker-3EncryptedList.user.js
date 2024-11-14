// ==UserScript==
// @name         Discord Enter Key Banned Words Blocker
// @namespace    http://tampermonkey.net/
// @version      3
// @description  Blocks sending messages containing banned words when Enter key is pressed on Discord web app, with an option to send anyway
// @match        https://discord.com/*
// @match        file:///D:/Training/self_blocker_of_bannable_words/textboxywebsite.html
// @grant        none
// ==/UserScript==

(function() {
 'use strict';

 console.log("Tampermonkey script loaded and running on this page. Use the test samples: \noft1 \noft2\nto safely verify the filter is up and working. Type and enter\nlistbannedwords\ninto the console to list out the currently active block list");
 const testwords=['oft1','oft2']
 const gamingwordsBtoA=['bmlnZz9bYWVyXXswLDN9', 'dHJhbm4/W2l5XXswLDJ9', 'dHJvb24=', 'Zmd0', 'ZmFnZz9bb3RdezAsMn0=']
 const discordwordsBtoA=['bmVncm8=', 'YmxhY2tpZQ==', 'ZGFya2k/ZT95Pw==', 'a2lrZQ==', 'Z3Jpbmdv', 'c3BpYw==', 'YmVhbmVy', 'Y2goPzppbmt8b2xvKQ==', 'cGEoPzpraXxqZWV0KQ==', 'cmV0YXJk', 'c3VpY2lkZQ==', 'cmFwZQ==']
 const workwordsBtoA=['YmFzdGFyZA==', 'YnVja3doZWF0', 'cG9ybg==', 'c2V4', 'ZnVjaw==', 'YXNz', 'c2hpdA==', 'Y290dG9uIHBpY2tlcg==', 'Z29vaw==', 'YXBl', 'cmFnaGVhZA==', 'ZHlrZQ==', 'a2lsbA==', 'c2hvb3Q=', 'Ym9tYg==', 'dHdhdA==', 'd2Fua2Vy', 'Y3IoPzpldGlufGFja2VyKQ==', 'Y29vKD86bmU/eT98bGllKQ==', 'aWRpb3QoPzpbeWldKT9jPw==', 'YltpeV0/dD9jaA==', 'aW1iZWNpbGU=', 'Y3VsY2hpZQ==', 'dGVycm9yW3lpXXMoPzpbbXRdKT8=']
 const bannedWordsR=testwords.concat(gamingwordsBtoA.map(w => atob(w)),discordwordsBtoA.map(w => atob(w))) //,workwordsBtoA.map(w => atob(w)))
 //                                                                                     Remove this brace^ ^^and those double slashes to enable exta sensitive filtering.
 //                                                                                     Beware it might cause major slowdown, especially for large messages
 window.listbannedwords = `Your banned words are: ${bannedWordsR} You can hardcode any custom array of strings to the bannedWordsR array as plain text`;
 const bannedWordsRegex = new RegExp(`\\b((${bannedWordsR.join('|')})[sed]{0,3}?){1,3}?\\b`, 'ig');
 let bypass=0
 const onEnterKey = (event, textbox) => {
  if (!bypass && event.key === 'Enter' && !event.shiftKey) {

   const parser = document.createElement('div');
   parser.innerHTML = textbox.innerHTML;

   const textContent = [...parser.childNodes]
    .map(node => node.nodeName === "DIV" || node.nodeName === "P" ? node.innerText.trim() :
     node.nodeName === "BR" ? "" :
     node.nodeType === Node.TEXT_NODE ? node.nodeValue.trim() : "")
    .filter(line => line)
    .join('\n');

   const match = textContent.match(bannedWordsRegex);

   if (match) {
    event.stopImmediatePropagation();
    event.preventDefault();
    bypass = !confirm(`Your message contains "${match}". OK/Esc=continue editing. Cancel=1 free pass!`)
    //       ^Inverse logic to move the change the default action to holding the messasge. Bypassing requires switching the focus, confirming the choice and manually doing the send action again.
   }
  }
 };

 const observer = new MutationObserver(() => {
  const textbox = document.querySelector('div[role="textbox"][contenteditable="true"]');
  if (textbox) {
   const handleKeydown = (event) => onEnterKey(event, textbox);
   textbox.removeEventListener('keydown', handleKeydown, true);
   textbox.addEventListener('keydown', handleKeydown, true);
   bypass=0
  }
 });

observer.observe(document.body, { childList: true, subtree: true });

})();
