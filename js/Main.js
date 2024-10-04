import {Download, Scenes, Src} from './Libs.js';
Src.init();

// stepcalling
Scenes.currentStep = 0;
Scenes.next();
console.log(Scenes.realCurrentStep)


setTimeout(() => {
  // $(".main-container").hide();
}, 100);

$(document).ready(function () {
  // TODO uncomment
  Download.init();
  // Download.toggleSpinner()

  window.onbeforeprint = () => {
    Dom.setBlinkArrowRed(-1);
    Dom.setBlinkArrow(-1);
  };
});
