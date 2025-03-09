let element;
let world;
let keyboard = new Keyboard();
let fireButtonPressed = false;
let isMuted = false;
let isPaused = false;
let gameWon = false;
let gameOver = false;

/**
 * Initializes the game by getting the canvas element and showing the start screen.
 */
function init() {
  element = document.getElementById("canvas");
  getFromLocalStorage();
  showStartScreen();
}

/**
 * Displays the start screen and hides the game content.
 */
function showStartScreen() {
  if (gameOver || gameWon) {
    closeGameOverScreen();
    closeWinScreen();
  }
  document.querySelector(".start-screen-container").style.display = "flex";
  document.querySelector(".content").style.display = "none";
}

/**
 * Generates a unique random position with a minimum distance from existing positions.
 * @param {number[]} usedPositions - Array of already used positions.
 * @param {number} [minDistance=300] - Minimum distance between positions.
 * @returns {number} The new unique random position.
 */
function getUniqueRandomPosition(usedPositions, minDistance = 300) {
  let newPosition;
  do {
    newPosition = 500 + Math.random() * 3000;
  } while (
    usedPositions.some((pos) => Math.abs(pos - newPosition) < minDistance)
  );
  usedPositions.push(newPosition);

  return newPosition;
}

/**
 * Starts the game by hiding the start screen, initializing the level, and creating a new World instance.
 */
function startGame() {
  document.querySelector(".start-screen-container").style.display = "none";
  document.querySelector(".content").style.display = "flex";
  showLoadingSpinner();
  initLevel();
  setTimeout(() => {
    hideLoadingSpinner();
    world = new World(element, keyboard);
    handleSoundState();
  }, 1500);
}

/**
 * Displays the loading spinner.
 */
function showLoadingSpinner() {
  document.getElementById("loading-spinner").style.display = "flex";
  document.querySelector(".spinner-content").style.display = "flex";
  document.querySelector(".flame-effect").style.display = "block";
}

/**
 * Hides the loading spinner and shows control buttons.
 */
function hideLoadingSpinner() {
  document.getElementById("loading-spinner").style.display = "none";
  document.querySelector(".spinner-content").style.display = "none";
  document.querySelector(".flame-effect").style.display = "none";
  document.querySelector(".control-buttons").style.display = "flex";
}

/**
 * Saves the isMuted state to local storage.
 */
function saveToLocalStorage() {
  localStorage.setItem("isMuted", JSON.stringify(isMuted));
}

/**
 * Retrieves the isMuted state from local storage.
 */
function getFromLocalStorage() {
  let isMutedFromLocalStorage = JSON.parse(localStorage.getItem("isMuted"));
  if (null != isMutedFromLocalStorage) {
    isMuted = isMutedFromLocalStorage;
  }
}

/**
 * Toggles the game's pause state.
 */
function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    stopBackgroundMusic();
    world.setEnemyAnimationState(true);
    clearInterval(world.runInterval);
    muteAllSounds();
  } else {
    world.setEnemyAnimationState(false);
    world.run();
    if (!isMuted) {
      unmuteAllSounds();
      startBackgroundMusic();
    }
  }
}

/**
 * Restarts the game.
 */
function restartGame() {
  closeGameOverScreen();
  closeWinScreen();
  init();
  startGame();
}

/**
 * Displays the game over screen.
 */
function showGameOverScreen() {
  gameOver = true;
  document.querySelector(".content").style.display = "none";
  document.getElementById("game-over-container").style.display = "flex";
}

/**
 * Hides the game over screen.
 */
function closeGameOverScreen() {
  gameOver = false;
  document.getElementById("game-over-container").style.display = "none";
  sounds.other.gameOver.pause();
}

/**
 * Displays the win screen.
 */
function showWinScreen() {
  gameWon = true;
  document.querySelector(".content").style.display = "none";
  document.getElementById("win-screen-container").style.display = "flex";
}

/**
 * Hides the win screen.
 */
function closeWinScreen() {
  gameWon = false;
  document.getElementById("win-screen-container").style.display = "none";
  sounds.other.gameWon.pause();
}

/**
 * Ends the game, clears intervals, stops background music, and shows the appropriate end screen.
 */
function stopGame() {
  setTimeout(() => {
    clearAllIntervals();
    stopBackgroundMusic();
    if (gameOver) {
      showGameOverScreen();
      sounds.other.gameOver.play();
    }
    if (gameWon) {
      showWinScreen();
      sounds.other.gameWon.play();
    }
  }, 1000);
}

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Toggles fullscreen mode.
 */
function toggleFullscreen() {
  const elem = document.documentElement;
  isFullscreen() ? exitFullscreen() : enterFullscreen(elem);
}

/**
 * Checks if the game is in fullscreen mode.
 * @returns {boolean} True if in fullscreen, false otherwise.
 */
function isFullscreen() {
  return document.fullscreenElement || document.webkitFullscreenElement;
}

/**
 * Enters fullscreen mode.
 * @param {HTMLElement} element - The element to make fullscreen.
 */
function enterFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Simulates pressing the right arrow key.
 */
function pressRight() {
  keyboard.RIGHT = true;
}

/**
 * Simulates releasing the right arrow key.
 */
function releaseRight() {
  keyboard.RIGHT = false;
}

/**
 * Simulates pressing the left arrow key.
 */
function pressLeft() {
  keyboard.LEFT = true;
}

/**
 * Simulates releasing the left arrow key.
 */
function releaseLeft() {
  keyboard.LEFT = false;
}

/**
 * Simulates pressing the fire button.
 */
function pressFireButton() {
  fireButtonPressed = true;
}

/**
 * Simulates pressing the jump button.
 */
function pressJump() {
  if (world && world.character && !world.character.isAboveGround()) {
    world.character.jump();
  }
}

/**
 * Handles keydown events.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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
      togglePause();
      break;
  }
});

/**
 * Handles keyup events.
 * @param {KeyboardEvent} event - The keyboard event.
 */
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
