class Level {
  enemies;
  lights;
  backgroundObjects;
  foregroundObjects;
  level_end_x = 3600;
  backgroundMusic;
  collectableObjects;

  constructor(
    enemies,
    lights,
    backgroundObjects,
    foregroundObjects,
    backgroundMusicSrc,
    collectableObjects
  ) {
    this.enemies = enemies;
    this.lights = lights;
    this.backgroundObjects = backgroundObjects;
    this.foregroundObjects = foregroundObjects;
    this.backgroundMusic = new Audio(backgroundMusicSrc);
    this.backgroundMusic.loop = true;
    this.collectableObjects = collectableObjects;
  }

  /**
   * Plays the background music for the level.
   * @method playBackgroundMusic
   */
  playBackgroundMusic() {
    if (!isMuted) {
      this.backgroundMusic.play();
    }
  }

  /**
   * Stops the background music for the level.
   * @method stopBackgroundMusic
   */
  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  /**
   * Changes the background music to a new track.
   * @param {string} newMusicSrc - The path to the new background music file.
   */
  changeBackgroundMusic(newMusicSrc) {
    this.stopBackgroundMusic();
    this.backgroundMusic = new Audio(newMusicSrc);
    this.backgroundMusic.loop = true;
    this.playBackgroundMusic();
  }
}
