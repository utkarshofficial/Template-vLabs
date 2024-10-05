import { Dom, Util, DB } from "./Libs.js";

let Src = {
  // pick imgs from the dom
  init() {
    this.ImageAndVideoGeneration.generateImagesVideosFromDB();
    let sizeOfSrc = this.Details.getSrcSize();
    if (sizeOfSrc != DB.images.length) {
      this.ImageAndVideoGeneration.convertImagesVideosToDomElementForSrc();
    }
  },
  Details: {
    SrcKeysSize: 3,
    getSrcSize() {
      let size = 0;
      for (let key in Src) {
        size++;
      }
      return size - this.SrcKeysSize;
    },
    getKeys(){
      let keys = []
      for(let key in Src){
        keys.push(key)
      }
      return keys
    },
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
    getImageName(path = "") {
      if (path.indexOf("/") != -1) {
        path = path.slice(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
        return path;
      }

      path = path.slice(0, path.lastIndexOf("."));
      return path;
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
      // this.allStepImagesDom.forEach((imgHTMLDom, idx) => {
      //   let imageName = DB.images[idx]
      //   let onlyName = imageName.slice(0, imageName.indexOf('.'))
      //   Src[onlyName] = new Dom(imgHTMLDom);
      // });
    },

    addImagesAndVideosInHTML(mediasSrc, mediasPath, mediaBoxHTML) {
      let mediasHTML = mediasSrc
        .map((mediaSrc) => {
          let fullSrc = mediasPath + mediaSrc;
          let imageName = this.getImageName(fullSrc);
          if (mediaBoxHTML.classList.contains("step-videos")) {
            return `<video id="${imageName}" src="${fullSrc}" class="main-window-imgs" ></video>`;
          }
          return `<img id="${imageName}" src="${fullSrc}" class="main-window-imgs" />`;
        })
        // join is used for seperate all images element with space
        .join("");

      // update it on html
      mediaBoxHTML.innerHTML = mediasHTML;
    },

    // generate images as attribute as key: value in using id
    // copy the output and add it to this Src
    convertImagesVideosToDomElementForSrc() {
      // output is list of key: value
      let output = "!!! ADD NEW MEDIA TO SRC !!!\n\n";
      let blankImageKeys = "\n\n"
      let imageNameWithDom = ""
      DB.images.forEach((imgSrc) => {
        let imageName = this.getImageName(imgSrc);

        // if not present then add
        if(Src[imageName] == undefined){
          imageNameWithDom += `\t${imageName}: new Dom('#${imageName}'),\n`;
          blankImageKeys += `\t${imageName} : "",\n`
        }
      });

      // output += blankImageKeys + "\n\n"
      output += imageNameWithDom

      output += `\n!!! END OF NEW MEDIA !!!\n\n`;
      console.log(output);
      return output;
    },
  },

  // ! Add src here

};

Src = {
  ...Src,
  formulas_ideal: new Dom('#formulas_ideal'),
}

export default Src;
