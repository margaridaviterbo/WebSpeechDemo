(function () {
    const currentDocument = document.currentScript.ownerDocument;
  
    class SpeechToText extends HTMLElement {
      constructor() {
        // If you define a constructor, always call super() first as it is required by the CE spec.
        super();
      }

    }
    customElements.define('speech-to-text-component', SpeechToText);
})()