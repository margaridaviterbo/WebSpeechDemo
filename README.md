# Speech Recognition in the Browser Demo

This repo has two diferent demos (webpages) of how to implement speech recognition in the browser using [Web Speech API](http://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html).
This API uses the webkitspeech attribute of Chrome to handle the speech recognition and synthesis. Thus these demos only work on Chrome.


### Instalation

1. Download the source code (2 folders, one for each demo, containing 3 files - .html .css .js)
2. `cd` to the folder of the demo you want to run
3. Run `python -m SimpleHTTPServer <portnumber>`
4. Open Chrome and go to `localhost:<portnumber>`


## Speech To Text Demo

Webpage that allows the user to choose a language and regognizes what the user says, writing it in a text box. Also allows to search what was spoken in Google Search.







## Speech Color Changer Demo

Webpage that recognizes english speech, writing it on the page. It also recognizes colors, changing the background color to the one spoken.
