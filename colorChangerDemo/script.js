var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();  //create a speech recognition object
var speechRecognitionList = new SpeechGrammarList();  //create a grammar
speechRecognitionList.addFromString(grammar, 1); 
recognition.grammars = speechRecognitionList;  //add grammar to recognition object
recognition.continuous = true;  // property controling whether continuous results are returned for each recognition, or only a single result
recognition.lang = 'en-US'; //set language to be recognized
recognition.interimResults = true;  // property that controls whether interim(not final) results should be returned
recognition.maxAlternatives = 1;  // sets the maximum number of alternatives per recognition result

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');
var text = document.querySelector('.phrases');
var phrases = [];
var trigger = false;

var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Try '+ colorHTML + '.';

recognition.start();  // start listening
console.log('Ready to receive a color command.');

// event is fired when the speech recognition object finishes analyzing the voice input
recognition.onresult = function(event) {

  // printing all phrases listened in the web page
  var aux = '';
  for (var i = 0; i < phrases.length; ++i) {
    aux += phrases[i] + '. ';
  }
  text.innerHTML = aux;

  for (var i = event.resultIndex; i < event.results.length; ++i) {

    // add new phrase detected to the array containing all phrases listened to keep record updated
    if(event.results[i].isFinal){
      phrases.push(event.results[i][0].transcript);
    }

    // check if a color was listened
    if(colors.includes(event.results[i][0].transcript)) {
      var color = event.results[i][0].transcript;
    } else {
      var last = event.results.length - 1;
      var color = event.results[last][0].transcript;
    }

    // check if the "start" trigger word was listened
    if((event.results[i][0].transcript).includes('start')){
      trigger = true;
    // check if the "stop" trigger word was listened
    } else if((event.results[i][0].transcript).includes('stop')){
      trigger = false;
    }
  }

  diagnostic.textContent = 'Result received: ' + color + '.';

  // change backgroud color if trigger activated
  if(trigger){
    bg.style.backgroundColor = color;
  }
  console.log('Confidence: ' + event.results[0][0].confidence);
}

// event is fired when error happens
recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
