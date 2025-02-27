let element;
let world;
let keyboard = new Keyboard();
let isMuted = false;
let gameOver = false;
let gameOverMusic = new Audio("assets/audio/game_over_music.mp3");

function init() {
  element = document.getElementById("canvas");
  // window.addEventListener("resize", checkOrientation);
  showStartScreen();
}

function showStartScreen() {
  if (gameOver) {
    closeGameOverDialog();
    document.querySelector(".startScreenContainer").style.display = "flex";
  }
  startScreenDialog.showModal();
}

function startGame() {
  document.getElementById("startScreenDialog").close();
  document.querySelector(".startScreenContainer").style.display = "none";
  initLevel();
  world = new World(element, keyboard);
}

function stopGame() {
  gameOver = true;
  setTimeout(() => {
    clearAllIntervals();
    world.stopBackgroundMusic();
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

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function restartGame() {
  closeGameOverDialog();
  init();
  startGame();
}

function showGameOverDialog() {
  const dialog = document.getElementById("gameOverDialog");
  dialog.showModal();
}

function closeGameOverDialog() {
  const dialog = document.getElementById("gameOverDialog");
  dialog.close();
  gameOver = false;
  gameOverMusic.pause();
}

function fullscreen() {
  let divToFullscreen = document.getElementById("canvas_wrapper");
  openFullscreen(divToFullscreen);
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

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "Space":
      keyboard.SPACE = true;
      break;
    case "KeyF":
      keyboard.F = true;
      break;
    case "KeyP":
      world.togglePause();
      break;
    default:
      console.log("Unhandled key released:", event.code);
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "Space":
      keyboard.SPACE = false;
      break;
    case "KeyF":
      keyboard.F = false;
      break;
  }
});
