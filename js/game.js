let element;
let world;
let keyboard = new Keyboard();
let fireButtonPressed = false;
let isMuted = false;
let isPaused = false; 
let gameIsWon = false;
let gameOver = false;
let restart = false;

function init() {
  element = document.getElementById("canvas");
  showStartScreen();
}

function showStartScreen() {
  if (gameOver || gameIsWon) {
    restart = true;
    document.querySelector(".start-screen-container").style.display = "flex";
    document.querySelector(".content").style.display = "none";
    closeGameOverScreen();
    closeWinScreen();
  }
}

function startGame() {
  document.querySelector(".start-screen-container").style.display = "none";
  if (restart) {
    world.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  document.querySelector(".content").style.display = "flex";
  showLoadingSpinner();
  initLevel();
  setTimeout(() => {
    hideLoadingSpinner();
    world = new World(element, keyboard);
  }, 1500);
}

function showLoadingSpinner() {
  document.getElementById("loading-spinner").style.display = "flex";
  document.querySelector(".spinner-content").style.display = "flex";
  document.querySelector(".flame-effect").style.display = "block";
}

function hideLoadingSpinner() {
  document.getElementById("loading-spinner").style.display = "none";
  document.querySelector(".spinner-content").style.display = "none";
  document.querySelector(".flame-effect").style.display = "none";
  document.querySelector(".control-buttons").style.display = "flex";
}

function toggleSound() {
  isMuted = !isMuted;
  const soundButton = document.getElementById("sound-button");
  const soundIcon = document.getElementById("sound-icon");

  if (isMuted) {
    muteAllSounds();
    soundIcon.src = "assets/img/icons/speaker_mute.svg";
    soundIcon.alt = "Ton aus";
    soundButton.setAttribute("aria-label", "Ton ein");
  } else {
    unmuteAllSounds();
    soundIcon.src = "assets/img/icons/speaker_volume.svg";
    soundIcon.alt = "Ton ein";
    soundButton.setAttribute("aria-label", "Ton aus");
  }
}

// Sound functions
function startBackgroundMusic() {
  if (!isPaused && !isMuted) {
    world.level.playBackgroundMusic();
  }
}

function stopBackgroundMusic() {
  world.level.stopBackgroundMusic();
}

function muteAllSounds() {
  Object.values(sounds).forEach((category) => {
    Object.values(category).forEach((sound) => {
      sound.muted = true;
      sound.pause();
    });
  });
  if (world.level && world.level.backgroundMusic) {
    world.level.backgroundMusic.muted = true;
    world.level.backgroundMusic.pause();
  }
}

function unmuteAllSounds() {
  Object.values(sounds).forEach((category) => {
    Object.values(category).forEach((sound) => {
      sound.muted = false;
    });
  });
  if (world.level && world.level.backgroundMusic) {
    world.level.backgroundMusic.muted = false;
    if (!world.isPaused) world.level.backgroundMusic.play();
  }
}

function restartGame() {
  restart = true;
  closeGameOverScreen();
  closeWinScreen();
  init();
  startGame();
}

function showGameOverScreen() {
  document.querySelector(".content").style.display = "none";
  document.getElementById("game-over-container").style.display = "flex";
}

function closeGameOverScreen() {
  document.getElementById("game-over-container").style.display = "none";
  gameOver = false;
  sounds.other.gameOver.pause();
}

function showWinScreen() {
  gameIsWon = true;
  setTimeout(() => {
    clearAllIntervals();
    document.querySelector(".content").style.display = "none";
    document.getElementById("win-screen-container").style.display = "flex";
    world.stopBackgroundMusic();
    sounds.other.gameWon.play();
  }, 1000);
}

function closeWinScreen() {
  document.getElementById("win-screen-container").style.display = "none";
  gameIsWon = false;
  sounds.other.gameWon.pause();
}

function stopGame() {
  gameOver = true;
  setTimeout(() => {
    clearAllIntervals();
    world.stopBackgroundMusic();
    showGameOverScreen();
    sounds.other.gameOver.play();
  }, 1000);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

// Fullscreen
function toggleFullscreen() {
  let elem = document.documentElement;

  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

// Mobile buttons to keypress
function pressRight() {
  keyboard.RIGHT = true;
}

function releaseRight() {
  keyboard.RIGHT = false;
}

function pressLeft() {
  keyboard.LEFT = true;
}

function releaseLeft() {
  keyboard.LEFT = false;
}

function pressFireButton() {
  fireButtonPressed = true;
}

function pressJump() {
  if (!world.character.isAboveGround()) {
    world.character.jump();
  }
}

// Event Listener for key-events
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
