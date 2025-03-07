let element;
let world;
let keyboard = new Keyboard();
let fireButtonPressed = false;
let isMuted = false;
let isPaused = false;
let gameWon = false;
let gameOver = false;
let restart = false;

/**
 * @method init
 * Initializes the game by getting the canvas element and showing the start screen.
 */
function init() {
  element = document.getElementById("canvas");
  getFromLocalStorage();
  showStartScreen();
}

/**
 * @method showStartScreen
 * Displays the start screen and hides the game content.
 * Also handles game restart scenarios.
 */
function showStartScreen() {
  if (gameOver || gameWon) {
    restart = true;
    closeGameOverScreen();
    closeWinScreen();
  }
  document.querySelector(".start-screen-container").style.display = "flex";
  document.querySelector(".content").style.display = "none";
}

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
 * @method startGame
 * Starts the game by hiding the start screen, initializing the level,
 * and creating a new World instance after a short delay.
 */
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

/**
 * @method showLoadingSpinner
 * Displays the loading spinner and related elements.
 */
function showLoadingSpinner() {
  document.getElementById("loading-spinner").style.display = "flex";
  document.querySelector(".spinner-content").style.display = "flex";
  document.querySelector(".flame-effect").style.display = "block";
}

/**
 * @method hideLoadingSpinner
 * Hides the loading spinner and related elements, and shows control buttons.
 */
function hideLoadingSpinner() {
  document.getElementById("loading-spinner").style.display = "none";
  document.querySelector(".spinner-content").style.display = "none";
  document.querySelector(".flame-effect").style.display = "none";
  document.querySelector(".control-buttons").style.display = "flex";
}

/**
 * @method toggleSound
 * Toggles the game sound on and off, updating UI elements accordingly.
 */
function toggleSound() {
  isMuted = !isMuted;
  const soundButton = document.getElementById("sound-button");
  const soundIcon = document.getElementById("sound-icon");

  if (isMuted) {
    muteAllSounds();
    setSoundIconMuted(soundIcon, soundButton);
  } else {
    unmuteAllSounds();
    setSoundIconUnmuted(soundIcon, soundButton);
  }
}

/**
 * @method setSoundIconMuted
 * Sets the sound icon properties for muted state.
 * @param {HTMLElement} icon - The sound icon element.
 * @param {HTMLElement} button - The sound button element.
 */
function setSoundIconMuted(icon, button) {
  icon.src = "assets/img/icons/speaker_mute.svg";
  icon.alt = "Ton aus";
  button.setAttribute("aria-label", "Ton ein");
}

/**
 * @method setSoundIconUnmuted
 * Sets the sound icon properties for unmuted state.
 * @param {HTMLElement} icon - The sound icon element.
 * @param {HTMLElement} button - The sound button element.
 */
function setSoundIconUnmuted(icon, button) {
  icon.src = "assets/img/icons/speaker_volume.svg";
  icon.alt = "Ton ein";
  button.setAttribute("aria-label", "Ton aus");
}

/**
 * @method startBackgroundMusic
 * Starts playing the background music if the game is not paused or muted.
 */
function startBackgroundMusic() {
  if (!isPaused && !isMuted) {
    world.level.playBackgroundMusic();
  }
}

/**
 * @method stopBackgroundMusic
 * Stops the background music.
 */
function stopBackgroundMusic() {
  world.level.stopBackgroundMusic();
}

/**
 * @method muteAllSounds
 * Mutes all game sounds including background music.
 */
function muteAllSounds() {
  Object.values(sounds).forEach((category) => {
    Object.values(category).forEach((sound) => {
      sound.muted = true;
      sound.pause();
    });
  });
  saveToLocalStorage();
  // if (world.level && world.level.backgroundMusic) {
  //   world.level.backgroundMusic.muted = true;
  //   world.level.backgroundMusic.pause();
  // }
}

/**
 * @method unmuteAllSounds
 * Unmutes all game sounds and resumes background music if the game is not paused.
 */
function unmuteAllSounds() {
  Object.values(sounds).forEach((category) => {
    Object.values(category).forEach((sound) => {
      sound.muted = false;
    });
  });
  saveToLocalStorage();
  // if (world.level && world.level.backgroundMusic) {
  //   world.level.backgroundMusic.muted = false;
  //   if (!world.isPaused) world.level.backgroundMusic.play();
  // }
}

// Local Storage
function saveToLocalStorage() {
  localStorage.setItem("sounds", JSON.stringify(sounds));
}

function getFromLocalStorage() {
  let mySounds = JSON.parse(localStorage.getItem("sounds"));
  if (null != mySounds) {
    sounds = mySounds;
  }
}

/**
 * @method togglePause
 * Toggles the game's pause state, stopping or resuming animations and sounds accordingly.
 */
function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    stopBackgroundMusic();
    world.setEnemyAnimationState(true);
    clearInterval(world.runInterval);
  } else {
    world.setEnemyAnimationState(false);
    world.run();
    if (!isMuted) startBackgroundMusic();
  }
}

/**
 * @method restartGame
 * Restarts the game by reinitializing and starting a new game.
 */
function restartGame() {
  restart = true;
  closeGameOverScreen();
  closeWinScreen();
  init();
  startGame();
}

/**
 * @method showGameOverScreen
 * Displays the game over screen and hides the game content.
 */
function showGameOverScreen() {
  gameOver = true;
  document.querySelector(".content").style.display = "none";
  document.getElementById("game-over-container").style.display = "flex";
}

/**
 * @method closeGameOverScreen
 * Hides the game over screen and resets the game over state.
 */
function closeGameOverScreen() {
  gameOver = false;
  document.getElementById("game-over-container").style.display = "none";
  sounds.other.gameOver.pause();
}

/**
 * @method showWinScreen
 * Displays the win screen, set the game won state and hides the game content.
 */
function showWinScreen() {
  gameWon = true;
  document.querySelector(".content").style.display = "none";
  document.getElementById("win-screen-container").style.display = "flex";
}

/**
 * @method closeWinScreen
 * Hides the win screen, resets the game won state, and stops the victory sound.
 */
function closeWinScreen() {
  gameWon = false;
  document.getElementById("win-screen-container").style.display = "none";
  sounds.other.gameWon.pause();
}

/**
 * @method stopGame
 * Ends the game, clears intervals, stops background music, and shows appropriate end screen.
 * @param {boolean} endstatus - The game end status (gameOver or gameIsWon).
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
 * @method clearAllIntervals
 * Clears all active intervals to stop ongoing game processes.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * @method toggleFullscreen
 * Toggles the fullscreen mode of the game.
 */
function toggleFullscreen() {
  const elem = document.documentElement;
  isFullscreen() ? exitFullscreen() : enterFullscreen(elem);
}

/**
 * @method isFullscreen
 * @returns {boolean} True if the game is in fullscreen mode, false otherwise.
 */
function isFullscreen() {
  return document.fullscreenElement || document.webkitFullscreenElement;
}

/**
 * @method enterFullscreen
 * @param {HTMLElement} elem - The element to make fullscreen.
 * Enters fullscreen mode for the specified element.
 */
function enterFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}

/**
 * @method exitFullscreen
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
 * @method pressRight
 * Simulates pressing the right arrow key.
 */
function pressRight() {
  keyboard.RIGHT = true;
}

/**
 * @method releaseRight
 * Simulates releasing the right arrow key.
 */
function releaseRight() {
  keyboard.RIGHT = false;
}

/**
 * @method pressLeft
 * Simulates pressing the left arrow key.
 */
function pressLeft() {
  keyboard.LEFT = true;
}

/**
 * @method releaseLeft
 * Simulates releasing the left arrow key.
 */
function releaseLeft() {
  keyboard.LEFT = false;
}

/**
 * @method pressFireButton
 * Simulates pressing the fire button.
 */
function pressFireButton() {
  fireButtonPressed = true;
}

/**
 * @method pressJump
 * Makes the character jump if it's on the ground.
 */
function pressJump() {
  if (!world.character.isAboveGround()) {
    world.character.jump();
  }
}

/**
 * @method handleKeyDown
 * Handles the `keydown` event to update the state of the keyboard object or trigger specific actions.
 * @param {KeyboardEvent} event - The keyboard event triggered when a key is pressed.
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
    default:
      console.log("Unhandled key released:", event.code);
      break;
  }
});

/**
 * @method handleKeyUp
 * Handles the `keyup` event to update the state of the keyboard object when a key is released.
 * @param {KeyboardEvent} event - The keyboard event triggered when a key is released.
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
