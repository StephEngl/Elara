let canvas;
let world;
let keyboard = new Keyboard();
let gameOver = false;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  checkOrientation();
  window.addEventListener("resize", checkOrientation);
}

function checkOrientation() {
  const dialog = document.getElementById("orientationDialog");
  if (window.innerHeight > window.innerWidth) {
    dialog.showModal();
  } else {
    dialog.close();
  }
}

function stopGame() {
  gameOver = true;
  setTimeout(() => {
    clearAllIntervals();
    showGameOverDialog();
    // weitere Aktionen nach dem Spielende ausführen
  }, 2000);
}

function openFullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) { /* Safari */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { /* IE11 */
    canvas.msRequestFullscreen();
  }
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function showGameOverDialog() {
  const dialog = document.getElementById("gameOverDialog");
  dialog.showModal();
  document
    .getElementById("restartButton")
    .addEventListener("click", restartGame);
}

function restartGame() {
  const dialog = document.getElementById("gameOverDialog");
  dialog.close();
  // Hier Logik zum Zurücksetzen des Spielzustands einfügen
  gameOver = false;
  // Spiel neu initialisieren
}

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = true;
  }
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = true;
  }
  if (event.code === "ArrowUp") {
    keyboard.UP = true;
  }
  if (event.code === "Space") {
    keyboard.SPACE = true;
  }
  if (event.code === "KeyD") {
    keyboard.D = true;
  }
  if (event.code === "KeyP") {
    keyboard.P = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (event.code === "ArrowUp") {
    keyboard.UP = false;
  }
  if (event.code === "Space") {
    keyboard.SPACE = false;
  }
  if (event.code === "KeyD") {
    keyboard.D = false;
  }
  if (event.code === "KeyP") {
    keyboard.P = false;
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
