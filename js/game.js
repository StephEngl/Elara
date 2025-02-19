let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (event) => {
if (event.code === "ArrowRight") {
  keyboard.RIGHT = true;
}
if (event.code === "ArrowLeft") {
  keyboard.LEFT = true;
}
if (event.code === "ArrowUp") {
  keyboard.UP = true;
}
if (event.code === "ArrowDown") {
  keyboard.DOWN = true;
}
if (event.code === "Space") {
  keyboard.SPACE = true;
}
});

window.addEventListener('keyup', (event) => {
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.code === "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.code === "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (event.code === "Space") {
    keyboard.SPACE = false;
  }
  });

  // window.addEventListener('keyup', (event) => {
  //   switch (event.code) {
  //     case 'ArrowLeft':
  //       this.LEFT = false;
  //       break;
  //     case 'ArrowRight':
  //       this.RIGHT = false;
  //       break;
  //     case 'ArrowUp':
  //       this.UP = false;
  //       break;
  //     case 'ArrowDown':
  //       this.DOWN = false;
  //       break;
  //     case 'Space':
  //       this.SPACE = false;
  //       break;
  //   }
  // });

  // window.addEventListener('keydown', (event) => {
  //   switch (event.code) {
  //     case 'ArrowRight':
  //       keyboard.RIGHT = true;
  //       break;
  //     case 'ArrowLeft':
  //       keyboard.LEFT = true;
  //       break;
  //     case 'ArrowUp':
  //       keyboard.UP = true;
  //       break;
  //     case 'ArrowDown':
  //       keyboard.DOWN = true;
  //       break;
  //     case 'Space':
  //       keyboard.SPACE = true;
  //       break;
  //   }
  // });
