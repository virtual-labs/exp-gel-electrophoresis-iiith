"use strict";
let overallIteration = -4;
let divWidth;
let videoSpeed = 1;
let speedFactor = 1.0;

async function moveMold() {
  let image = document.getElementById("gel-mold");
  image.setAttribute("opacity", "1");
  let a1 = anime.timeline({
    targets: "#gel-mold",
    duration: 800,
    easing: "linear",
  });
  if (overallIteration === 4) {
    a1.add({
      duration: 1000,
      translateY: 260,
      translateX: 800,
      scale: 0.25,
    })
      .add({
        opacity: 0,
      })
      .add({
        translateY: 0,
        translateX: 0,
        scale: 1,
      });

    document.getElementById("instruction").innerHTML =
      "Click on Observe button to observe what is happening inside the Electrophoresis Chamber and choose video speed according to your own liking.";

    document.getElementById("observation").innerHTML =
      "Click on Observe button to observe what is happening inside the Electrophoresis Chamber and choose video speed according to your own liking.";
    overallIteration++;
  }
}

let GelColor = "#556c80";

let fillPipette = async (color) => {
  const line = document.getElementById("half-grad2");
  document.getElementById("line").style.stopColor = color;
  const yFinalPosition = 0;
  let yPos = 100;
  const interval = window.setInterval(() => {
    if (yPos < yFinalPosition) {
      line.setAttribute("y1", "0.1%");
      return window.clearInterval(interval);
    }
    yPos -= 0.6;
    line.setAttribute("y1", `${yPos}%`);
  }, 1);
};

let fillMold = async (id) => {
  let path = document.getElementById(id);
  let finalPosition = 1;
  let curPosition = 0;
  while (true) {
    if (curPosition > finalPosition) break;
    curPosition += 0.01;
    path.setAttribute("offset", curPosition);
    await new Promise((resolve) => setTimeout(resolve, 0.5));
  }
};

async function movePipette() {
  if (overallIteration === 1) {
    changeMessage();
    let image = document.getElementById("pipette");
    image.setAttribute("opacity", "1");
    image.style.pointerEvents = "none";
    let a1 = anime.timeline({
      targets: "#pipette",
      duration: 800,
      easing: "linear",
    });
    let startX = "-980%";
    let startY = "150%";

    screenWidth();
    console.log("divWudth is:", divWidth);

    if (divWidth > 1759) {
      startY = "-150%";
      startX = "450%";
    }

    if (divWidth < 769) {
      startY = "120%";
      startX = "-980%";
    }

    a1.add({
      duration: 0,
      translateY: startY,
      translateX: startX,
    });
    fillPipette(GelColor);
    await new Promise((r) => setTimeout(r, 1000));
    a1.add({
      duration: 500,
      translateX: "1300%",
    })
      .add({
        duration: 800,
        translateY: "-130%",
      })
      .add({
        update: function (anim) {
          fillMold("inside1");
          fillMold("inside2");
        },
        opacity: 0,
      });
    document.getElementById("gel-comb").setAttribute("onclick", "moveComb()");
    overallIteration++;
    document.getElementById("gel-beaker").style.cursor = "default";
    document.getElementById("gel-comb").style.cursor = "pointer";

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function moveDyePipette() {
  restartAnimation = false;
  if (overallIteration === 3) {
    let colors = ["purple", "blue", "yellow", "red", "green", "black"];
    let i;

    for (i = 0; i <= 5; i++) {
      changeMessage();
      let col = colors[i];
      let startXes = ["2600%", "2800%", "2900%", "3000%", "3100%", "3200%"];
      let startYes = ["-128%", "-128%", "-122%", "-132%", "-139%", "-145%"];

      screenWidth();

      let endX = "1300%";
      let endY = "-132%";

      let image = document.getElementById("pipette");
      image.setAttribute("opacity", "1");
      let a1 = anime.timeline({
        targets: "#pipette",
        duration: 800,
        easing: "linear",
      });

      a1.add({
        duration: 0,
        translateY: startYes[i],
        translateX: startXes[i],
      });
      fillPipette(col);
      await new Promise((r) => setTimeout(r, 1000));
      a1.add({
        duration: 1200,
        translateX: endX,
      }).add({
        duration: 1000,
        translateY: endY,
      });

      if (restartAnimation) {
        a1.add({
          opacity: 0,
        });
        break;
      }

      if (i === 5) {
        a1.add({
          opacity: 0,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    // if (divWidth > 1759) {
    //   startY = "-150%";
    //   startX = "450%";
    // }

    // if (divWidth < 769) {
    //   startY = "120%";
    //   startX = "-980%";
    // }
    changeMessage();
    document.getElementById("gel-mold").setAttribute("onclick", "moveMold()");
    overallIteration++;
    document.getElementById("dye-kit").style.cursor = "default";
    document.getElementById("gel-mold").style.cursor = "pointer";
    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function moveComb() {
  if (overallIteration === 2) {
    changeMessage();
    let image = document.getElementById("gel-comb");
    document.getElementById("comb-label").style.opacity = 0;
    let a1 = anime
      .timeline({
        targets: "#gel-comb",
        duration: 800,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: 0,
      })
      .add({
        rotateZ: 10,
      })
      .add({
        duration: 700,
        translateX: "67%",
        translateY: "-210%",
      })
      .add({
        rotate: [7, 0, -7, 0],
      })
      .add({
        opacity: 0,
      })
      .add({
        translateY: 0,
        translateX: 0,
        rotateZ: 0,
      });

    document
      .getElementById("dye-kit")
      .setAttribute("onclick", "moveDyePipette()");
    overallIteration++;
    document.getElementById("dye-kit").style.cursor = "pointer";
    document.getElementById("gel-comb").style.cursor = "default";

    if (restartAnimation) {
      a1.restart();
    }
  }
}

async function moveSyringe() {
  if (overallIteration === 4) {
    restartAnimation = false;
  }
}

let setupMessages = [
  "Click on the Gel Beaker option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Gel Mold option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Gel Comb option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Dye Kit option in the Apparatus Menu to introduce it into the workspace.",
  "Click on the Electrophoresis Chamber option in the Apparatus Menu to introduce it into the workspace.",
];

let setup = 0;

function setupMessage() {
  document.getElementById("instruction").innerHTML = setupMessages[setup];
  document.getElementById("observation").innerHTML = setupMessages[setup];
  setup++;
}

setupMessage();
async function visibility(x) {
  if (x === 1 && overallIteration === -4) {
    document.getElementById("gel-beaker").style.visibility = "visible";
    overallIteration++;
    setupMessage();
  } else if (x === 2 && overallIteration === -3) {
    document.getElementById("gel-mold").style.visibility = "visible";
    overallIteration++;
    setupMessage();
  } else if (x === 3 && overallIteration === -2) {
    document.getElementById("gel-comb").style.visibility = "visible";
    overallIteration++;
    setupMessage();
  } else if (x === 4 && overallIteration === -1) {
    document.getElementById("kit-row").style.visibility = "visible";
    overallIteration++;
    setupMessage();
  } else if (x === 5 && overallIteration === 0) {
    document.getElementById("chamber-row").style.visibility = "visible";
    overallIteration++;
    changeMessage();
  }
}

let instructionMessages = [
  "Click on the Gel Beaker to transfer small amount of the Gel substance into the empty Gel Mold",
  "Click on the Gel Comb to make wedges in the gel substance in the Gel Mold.",
  "Click on the Dye Kit once. Different colors of dye will be poured in the wedges created by the Gel Comb. Just observe as each of them gets poured in the wedges with the help of pipette.",
  "First the Purple dye goes in the wedges.",
  "Then the Blue dye goes in the wedges.",
  "Then the Yellow dye goes in the wedges.",
  "Then the Red dye goes in the wedges.",
  "Then the Green dye goes in the wedges",
  "Finally, the Dark Blue dye goes in the wedges",
  "Now Click on the Gel Mold to put it into the Electrophoresis Chamber.",
];
let iter1 = -1;
function changeMessage() {
  iter1++;
  document.getElementById("instruction").innerHTML = instructionMessages[iter1];
  document.getElementById("observation").innerHTML = instructionMessages[iter1];
}

document.getElementById("gel-beaker").style.cursor = "pointer";

let iter2 = -1;
let observationMessages = [
  "As soon as the power supply is turned on, the dyes start to move. Observe the movement of the dyes within the gel. The Electrophoresis run should be continued until the the fastest moving dye has migrated near to the end of the gel mold.",
];

function observeMessage() {
  if (restartAnimation) {
    return;
  }
  iter2++;

  document.getElementById("instruction").innerHTML = observationMessages[iter2];
  document.getElementById("observation").innerHTML = observationMessages[iter2];
}

function screenWidth() {
  divWidth = document.getElementById("workspace").clientWidth;
}

let originalSimulationHeight =
  document.getElementById("simulation").clientHeight;

document.getElementById("simulation").style.minHeight =
  originalSimulationHeight + "px";

let restartAnimation = false;

async function restart() {
  document.getElementById("simulation").style.height = originalSimulationHeight;

  document.getElementById("animation-video").style.display = "none";

  document.getElementById("head-instructions").innerHTML = "Instructions";
  document.getElementById("head-observations").innerHTML = "Instructions";
  document.getElementById("instruction").innerHTML = "";
  document.getElementById("observation").innerHTML = "";
  overallIteration = -4;
  iter2 = -1;
  iter1 = -1;
  setup = 0;
  setupMessage();
  document.getElementById("apparatus-bottles").style.display = "block";
  document.getElementById("apparatus-chamber").style.display = "block";
  document.getElementById("gel-beaker").style.visibility = "hidden";
  document.getElementById("gel-mold").style.visibility = "hidden";
  document.getElementById("gel-comb").style.visibility = "hidden";
  document.getElementById("chamber-row").style.visibility = "hidden";
  document.getElementById("kit-row").style.visibility = "hidden";
  document.getElementById("slidecontainer").style.display = "none";
  restartAnimation = true;

  document.getElementById("gel-comb").style.cursor = "default";
  document.getElementById("gel-beaker").style.cursor = "pointer";
  document.getElementById("gel-mold").style.cursor = "default";

  //Resetting the Mold
  document.getElementById("inside1").setAttribute("offset", "0%");
  document.getElementById("inside2").setAttribute("offset", "0%");
  document.getElementById("gel-mold").setAttribute("opacity", "1");

  //Resetting the Comb
  document.getElementById("gel-comb").style.opacity = 1;
  document.getElementById("comb-label").style.opacity = 1;
}

async function observe() {
  if (overallIteration === 5) {
    document.getElementById("slidecontainer").style.display = "block";
    document.getElementById("apparatus-bottles").style.display = "none";
    document.getElementById("apparatus-chamber").style.display = "none";
    document.getElementById("animation-video").style.display = "block";
    document.getElementById("animation-bottom-right").play();
    document.getElementById("head-instructions").innerHTML = "Observations";
    document.getElementById("head-observations").innerHTML = "Observations";
    document.getElementById("observation").innerHTML = "";
    document.getElementById("instruction").innerHTML = "";

    observeMessage();

    await new Promise((r) => setTimeout(r, 8000 * speedFactor));

    if (!restartAnimation) {
      overallIteration++;

      setTimeout(function () {
        document.getElementById("instruction").innerHTML =
          "Click on Restart option in the Control Menu to restart the experiment from scratch.";
        document.getElementById("observation").innerHTML =
          "Click on Restart option in the Control Menu to restart the experiment from scratch.";
      }, 10000);
    }
  }
}

let beaker = document.getElementById("gel-beaker");
beaker.addEventListener("click", movePipette);

let jrcell = document.getElementById("jrcell");
jrcell.addEventListener("click", function () {
  moveJrCell(0);
});

let slider = document.getElementById("slider");
let vid = document.getElementById("animation-bottom-right");
slider.oninput = function () {
  videoSpeed = slider.value;
  vid.playbackRate = videoSpeed;
  speedFactor = 1 / videoSpeed;
};
