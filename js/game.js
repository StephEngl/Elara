let element;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let gameOver = false;
let gameOverMusic = new Audio ("assets/audio/game_over_music.mp3")

function init() {
  element = document.getElementById("canvas");
  world = new World(element, keyboard);
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
    world.stopLevel();
    showGameOverDialog();
    gameOverMusic.play();
    // weitere Aktionen nach dem Spielende ausführen
  }, 2000);
}

function toggleSound() {
  isMuted = !isMuted;
  const soundButton = document.getElementById("soundButton");
  const soundIcon = document.getElementById("soundIcon");

  if (isMuted) {
    world.muteAllSounds();
    soundIcon.src = "assets/img/icons/speaker_mute.svg";
    soundIcon.alt = "Ton aus";
    soundButton.setAttribute("aria-label", "Ton ein");
  } else {
    world.unmuteAllSounds();
    soundIcon.src = "assets/img/icons/speaker_volume.svg";
    soundIcon.alt = "Ton ein";
    soundButton.setAttribute("aria-label", "Ton aus");
  }
}

function fullscreen() {
  let divToFullscreen = document.getElementById("canvas_wrapper");
  openFullscreen(divToFullscreen)
}

function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    /* Safari */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE11 */
    element.msRequestFullscreen();
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
  gameOverMusic.pause();
  init();
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
