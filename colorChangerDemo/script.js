var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

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

recognition.start();
console.log('Ready to receive a color command.');

recognition.onresult = function(event) {

  var aux = '';
  for (var i = 0; i < phrases.length; ++i) {
    aux += phrases[i] + '. ';
  }
  text.innerHTML = aux;

  for (var i = event.resultIndex; i < event.results.length; ++i) {

    if(event.results[i].isFinal){
      phrases.push(event.results[i][0].transcript);
    }

    if(colors.includes(event.results[i][0].transcript)) {
      var color = event.results[i][0].transcript;
    } else {
      var last = event.results.length - 1;
      var color = event.results[last][0].transcript;
    }

    if((event.results[i][0].transcript).includes('start')){
      trigger = true;
    } else if((event.results[i][0].transcript).includes('stop')){
      trigger = false;
    }
  }

  diagnostic.textContent = 'Result received: ' + color + '.';
  if(trigger){
    bg.style.backgroundColor = color;
  }
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  //recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
