let sounds = {
  character: {
    attack: new Audio("assets/audio/fireball-sound.mp3"),
    hurt: new Audio("assets/audio/elara_hurting_sound.mp3"),
    jump: new Audio("assets/audio/elara_jumping_sound.mp3"),
    ko: new Audio("assets/audio/elara_defeated_sound.mp3"),
    footsteps: new Audio("assets/audio/elara_footsteps.mp3"),
  },
  blueSlime: {
    ko: new Audio("assets/audio/slime_defeated.mp3"),
  },
  littleDragon: {
    ko: new Audio("assets/audio/littleDragon_defeated.mp3"),
  },
  dragonBoss: {
    roar: new Audio("assets/audio/endboss_dragon_roar.mp3"),
    attack: new Audio(),
    hurt: new Audio(),
  },
  environment: {
    background: new Audio("assets/audio/bg-music-lvl1.mp3"),
    owlHootings: new Audio(),
  },
  collectibles: {
    crystal: new Audio("assets/audio/collectCrystal.mp3"),
    flower: new Audio("assets/audio/collectFlower.mp3"),
  },
  other: {
    gameWon: new Audio("assets/audio/bg-music-game-won.mp3"),
    gameOver: new Audio("assets/audio/bg-music-game-over.mp3"),
  },
};

function handleSoundState() {
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
 * @method toggleSound
 * Toggles the game sound on and off, updating UI elements accordingly.
 */
function toggleSound() {
  isMuted = !isMuted;
  handleSoundState();
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
  if (world.level && world.level.backgroundMusic) {
    world.level.backgroundMusic.muted = true;
    world.level.backgroundMusic.pause();
  }
  saveToLocalStorage();
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
  if (world.level && world.level.backgroundMusic) {
    world.level.backgroundMusic.muted = false;
    if (!world.isPaused) world.level.backgroundMusic.play();
  }
  saveToLocalStorage();
}
