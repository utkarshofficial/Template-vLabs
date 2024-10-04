import { Dom, Util, Layout, Sliders, Src } from "./Libs.js";

const Scenes = {
  // ! To Plot graph
  plotGraph(
    ctx,
    graphIdx,
    startEmpty = false,
    xLabel = "",
    yLabel = "",
    data = [],
    dataLabel = "",
    beginAtZero = true
  ) {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel;
    Scenes.items.chart.label[graphIdx].x = xLabel;
    // for label
    Scenes.items.yLabel.set(443, 216, null, 283).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(700, 352).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
    });

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset
    let datasets = [
      {
        label: dataLabel,
        fill: false,
        borderColor: "red",
        backgroundColor: "red",
        data: data,
        display: false,
      },
    ];

    if (startEmpty) {
      datasets = [];
    }

    graphRef = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: yLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: false,
                labelString: xLabel,
                fontColor: "black",
                fontSize: 17,
              },
              ticks: {
                beginAtZero: beginAtZero,
                fontColor: "black",
                fontSize: 14,
              },
            },
          ],
        },
      },
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef;
  },
  plotGraphBar(ctx, graphIdx, startEmpty = false, xLabel = "", yLabel = "") {
    // save xy label in scence
    Scenes.items.chart.label[graphIdx].y = yLabel;
    Scenes.items.chart.label[graphIdx].x = xLabel;
    // for label
    Scenes.items.yLabel.set(289, 310, null, 283).setContent(yLabel).styles({
      backgroundColor: "transperant",
      textAlign: "center",
      color: "black",
      rotate: "-90deg",
      zIndex: 10,
    });
    Scenes.items.xLabel.set(663, 409).setContent(xLabel).styles({
      backgroundColor: "transperant",
      color: "black",
      width: "fit-content",
      zIndex: 10,
      fontSize: "18px",
    });

    // ! Destroy old graph
    let graphRef = Scenes.items.chart.graph[graphIdx];
    if (graphRef != null) {
      graphRef.destroy();
    }

    // temprory dataset
    let data = {
      labels: ["220", "470", "1000"],
      datasets: [
        {
          label: "1",
          backgroundColor: "rgba(0, 128, 0, 1)",
          borderColor: "rgba(0, 128, 0, 1)",
          borderWidth: 1,
          data: [],
        },
        {
          label: "10",
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 1,
          data: [],
        },
        {
          label: "40",
          backgroundColor: "rgba(0, 0, 255, 1)",
          borderColor: "rgba(0, 0, 255, 1)",
          borderWidth: 1,
          data: [],
        },
      ],
    };

    let options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            ticks: {
              display: true,
              fontSize: 17,
              fontWeight: "bold",
              fontColor: "black",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              display: true,
              beginAtZero: true,
              // fontSize: 17,
              // fontWeight: 'bold',
              // fontColor: 'black',
              // beginAtZero: true,
              // autoSkip: false,
              // position: "right",
              // maxRotation: 90, // Rotate labels to 90 degrees
              // minRotation: 90,
              // callback: function(value) {
              //   return value // You can add custom formatting here if needed
              // }
            },
          },
        ],
      },
    };
    if (startEmpty) {
      datasets = [];
    }

    graphRef = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    Scenes.items.chart.graph[graphIdx] = graphRef;
    return graphRef;
  },

  // for adding new datasets to graph
  graphFeatures: {
    addDataset(chart, label, bgColor, data) {
      chart.data.datasets.push({
        label: label,
        fill: false,
        borderColor: bgColor,
        backgroundColor: bgColor,
        data: data,
      });
      chart.update();
    },
    addData(chart, index, data) {
      console.log(data);
      if (data.length > 0) {
        chart.data.datasets[index].data = data;
      } else {
        chart.data.datasets[index].data.push(data);
      }
      chart.update();
    },
    getSizeOfDatasets(chart) {
      return chart.data.datasets.length;
    },
  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  // ! for handeling current load selection in EE16
  currentLoad: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },
  hideStepHeading() {
    document.querySelector(".step-heading").style.visibility = "hidden";
  },
  // for typing hello text
  student_name: "",
  optionsDone: [0, 0, 0, 0],
  // ! for handeling current load selection in EE16
  operationAndWaveformDone: 0,

  // Todo create type object of steps like
  /* 

  steps: {
    intro: ()=>{},
    step1: ()=>{},
    step2: ()=>{},
    step3: ()=>{},
  }

  * And convert it to array in next 
  stepsArray = []
  for(let key in steps){
    stepsArray.push(steps[key])
  }

  */
  steps: [
    // * Step1
    () => {
    },
  ],
  // ! Scenes Process
  StepProcess: {
    isRunning: false,
    setIsProcessRunning(value) {
      // calling toggle the next
      if (value != this.isRunning) {
        Util.toggleNextBtn();
      }

      this.isRunning = value;
      if (value) {
        Util.cancelSpeech();
        Dom.hideAll();
      }
    },

    start() {
      this.setIsProcessRunning(true);
    },

    done(message = "Click 'Next' to go to next step") {
      Util.setCC(message);
      Dom.setBlinkArrow(true, 790, 444).play();
      this.setIsProcessRunning(false);
    },
  },

  // ! For adding realcurrentstep in every step
  // ! For tracking the current step accuratly
  realCurrentStep: null,
  setRealCurrentStep() {
    let count = 0;
    this.steps.forEach((step, idx) => {
      const constCount = count;
      let newStep = () => {
        this.realCurrentStep = constCount;
        console.log(`RealCurrentStep: ${this.realCurrentStep}`);
        return step();
      };

      count++;
      this.steps[idx] = newStep;
    });
  },
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      this.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = () => {};
      this.currentStep -= 2;
      this.steps[this.currentStep]();
      this.currentStep++;
      Layout.Drawer.backDrawerItem();
      Layout.ProgressBar.backProgressBar();
    }
  },
  next() {
    if (!this.realCurrentStep) {
      Scenes.setRealCurrentStep();
    }
    //! animation isRunning
    if (this.isRunning) {
      return;
    } else if (this.currentStep < this.steps.length) {
      this.StepProcess.start()
      this.steps[this.currentStep]();
      Layout.Drawer.nextDrawerItem();
      Layout.ProgressBar.nextProgressBar();
      this.currentStep++;
    }
  },
};

// stepcalling
// Scenes.currentStep = 0;
// Scenes.next();

export default Scenes;
