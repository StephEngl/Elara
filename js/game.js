let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);


  // console.log("My character is ", world.character);
}

window.addEventListener('keydown', (event) => {
if (event.key === "ArrowRight") {
  keyboard.RIGHT = true;
}
if (event.key === "ArrowLeft") {
  keyboard.LEFT = true;
}
if (event.key === "ArrowUp") {
  keyboard.UP = true;
}
if (event.key === "ArrowDown") {
  keyboard.DOWN = true;
}
if (event.key === " ") {
  keyboard.SPACE = true;
}
});

window.addEventListener('keyup', (event) => {
  if (event.key === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.key === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.key === "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.key === "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (event.key === " ") {
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
