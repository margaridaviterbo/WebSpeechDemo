
class SpeechToText extends HTMLElement {
    constructor() {
        super();
        var shadowRoot = this.attachShadow({mode: 'open'});
        const htmlTemplate = importDoc.querySelector('template');
        shadowRoot.innerHTML = htmlTemplate.innerHTML;
    }

}
customElements.define('speech-to-text-component', SpeechToText);


  