The contents of the .js script must be copied over in the tampermonkey's script editor GUI.
You have to save it as a tampermonkey script within the tampermonkey environment before you can use it (save as... - file does not apply the script)
This script has been tested on discord's textbox, but you can add more social media websites to the list. Add a '// @match        https://anywebsite.com/*' line in the header for any other website.
To run the script on a local HTML file you have to enable local file reading both in the tampermonkey options and the chrome/brave extensions settings.
One such file is the provided "textboxywebsite.html". You can use it to do some dry runs testing out the blocker's capabilities.

The extensive use of character sets and alternation groups means that many miss-spelled words will be caught on time. This behavior ensures not only safety from banned words lists, but also manual moderation. The pattern is optimised to match standalone words or 1-3 special words concatenated. combinations between special words and normal ones will not match, as in most cases such words have completely different meaning. Note that variations and suffixes of special words are still considered part of the word, so you can trust the script to catch a surprisingly extensive list of typical variations of the same special word.

The script is currently set to filter out the highly obvious special words, but you can double the dictionary size by enabling the "workwords" array. Note that it might cause major performance issues, especially on long messages in the textbox.

Whenever a special word is detected the message send action is blocked and a confirmation dialog requires the user to click before the block is bypassed. You can press ESC to easily close the prompt and continue editing the message.

One of the technical challenges in this script was parsing the HTML of the textbox while also preserving the linebreak characters in the final string. For this reason the textbox element goes trough a node analyser and only user text nodes are further parsed and spliced into the final string with actual linefeed character separation.

You can add or change the wordsets by adding strings in the 'testwords.concat(<user strings her>)' list. The .map(atob(w)) convert the encoded strings to the original plain text, as bannedWordsR works with plain regex strings.

You can view the "dev environment" of the special word sets in the "bannedREGEX" file (archived - .rar). Usse the password 00 to view the file.