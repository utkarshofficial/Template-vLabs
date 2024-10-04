import { Dom, Util, DB } from "./Libs.js";

const Src = {
  // pick imgs from the dom
  init() {
    this.ImageAndVideoGeneration.generateImagesVideosFromDB();
  },
  ImageAndVideoGeneration: {
    count: 0,
    allStepImagesDom: null,
    allStepVideosDom: null,
    allQsDom: Util.getAll(".qs"),

    getAllStepImgsDom() {
      return Util.getAll(".steps-images .main-window-imgs");
    },
    getAllStepVideosDom() {
      return Util.getAll(".step-videos .main-window-videos");
    },

    // * This will generate images from json in html and converts it html dom to Dom
    generateImagesVideosFromDB() {
      let stepImagesBox = Util.get(".step-images");
      let stepVideosBox = Util.get(".step-videos");

      // images
      this.addImagesAndVideosInHTML(DB.images, DB.imagesPath, stepImagesBox);
      // videos
      this.addImagesAndVideosInHTML(DB.videos, DB.videosPath, stepVideosBox);

      // those image HTMLElement
      this.allStepImagesDom = this.getAllStepImgsDom();
      this.allStepVideosDom = this.getAllStepVideosDom();

      // convert these images into key value pair for 'Src'
      this.allStepImagesDom.forEach((imgHTMLDom, idx) => {
        let imageName = DB.images[idx]
        let onlyName = imageName.slice(0, imageName.indexOf('.'))
        Src[onlyName] = new Dom(imgHTMLDom);
      });
    },

    addImagesAndVideosInHTML(mediasSrc, mediasPath, mediaBoxHTML) {
      let mediasHTML = mediasSrc
        .map((mediaSrc) => {
          let fullSrc = mediasPath + mediaSrc;
          console.log(fullSrc)
          if (mediaBoxHTML.classList.contains("step-videos")) {
            return `<video src="${fullSrc}" class="main-window-imgs" ></video>`;
          }
          return `<img src="${fullSrc}" class="main-window-imgs" />`;
        })
        // join is used for seperate all images element with space
        .join("");

      // update it on html
      mediaBoxHTML.innerHTML = mediasHTML;
    },
  },

  // Todo image is generated using above function now just update images using getallimgsDom() and now create generateImagesSrc
};
// setting Src


export default Src;
