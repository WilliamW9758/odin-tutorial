let artboard = document.querySelector(".artboard");
let blackBtn = document.querySelector("#black");
let colorBtn = document.querySelector("#color");
let eraseBtn = document.querySelector("#erase");
let clearBtn = document.querySelector("#clear");
let sizeBtn = document.querySelector("#canva-size");

let mode = "black";
blackBtn.style.cssText += "color: black; background-color: white;";
let size = 2; // 1, 2, 4, 8 * 8 -> 8, 16, 32, 64
let cellWidth = 46 / (8 * size);
let drawing = false;

function draw() {
  if (drawing) {
    console.log("Drawing");
    if (mode === "black") {
      event.target.style.cssText += "background-color: black;";
    } else if (mode === "color") {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      event.target.style.cssText += "background-color: #" + randomColor + ";";
    } else if (mode === "erase") {
      event.target.style.cssText += "background-color: white;";
    }
  }
}

const downListener = () => {
  drawing = true;
  draw();
};

const moveListener = (event) => {
  draw();
};

const upListener = () => {
  console.log("Stop Drawing");
  drawing = false;
};

generateArtboard();

function generateArtboard() {
  for (let i = 0; i < size * 8; i++) {
    let columnContainer = document.createElement("div");
    columnContainer.style.cssText += "display: flex; flex-direction: column;";

    for (let j = 0; j < size * 8; j++) {
      let cell = document.createElement("div");
      cell.style.cssText +=
        "background-color: white;;position: aboslute;width: " +
        cellWidth +
        "vw;height: " +
        cellWidth +
        "vw;";
      cell.addEventListener("mousedown", downListener);
      cell.addEventListener("mousemove", moveListener);
      cell.addEventListener("mouseup", upListener);
      columnContainer.appendChild(cell);
    }
    artboard.appendChild(columnContainer);
  }
}

function blackMode() {
  mode = "black";
  blackBtn.style.cssText += "color: black; background-color: white;";
  colorBtn.style.cssText += "color: white; background-color: black;";
  eraseBtn.style.cssText += "color: white; background-color: black;";
}

function colorMode() {
  mode = "color";
  blackBtn.style.cssText += "color: white; background-color: black;";
  colorBtn.style.cssText += "color: black; background-color: white;";
  eraseBtn.style.cssText += "color: white; background-color: black;";
}

function eraseMode() {
  mode = "erase";
  blackBtn.style.cssText += "color: white; background-color: black;";
  colorBtn.style.cssText += "color: white; background-color: black;";
  eraseBtn.style.cssText += "color: black; background-color: white;";
}

function clear() {
  while (artboard.lastElementChild) {
    artboard.removeChild(artboard.lastElementChild);
  }
}

function clearArtboard() {
  clear();
  generateArtboard();
}

function changeArtboardSize() {
  clear();
  if (size === 1) {
    size = 2;
    sizeBtn.textContent = "16X16";
  } else if (size === 2) {
    size = 4;
    sizeBtn.textContent = "32X32";
  } else if (size === 4) {
    size = 8;
    sizeBtn.textContent = "64X64";
  } else {
    size = 1;
    sizeBtn.textContent = "8X8";
  }
  cellWidth = 46 / (8 * size);
  generateArtboard();
}
