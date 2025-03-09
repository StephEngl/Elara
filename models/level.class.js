/**
 * Represents a level in the game.
 */
class Level {
  enemies;
  lights;
  backgroundObjects;
  foregroundObjects;
  level_end_x = 3600;
  backgroundMusic;
  collectableObjects;

  /**
   * Creates a Level instance.
   * @param {MovableObject[]} enemies - An array of enemies for the level.
   * @param {Light[]} lights - An array of lights for the level.
   * @param {BackgroundObject[]} backgroundObjects - An array of background objects for the level.
   * @param {BackgroundObject[]} foregroundObjects - An array of foreground objects for the level.
   * @param {string} backgroundMusicSrc - The source URL of the background music.
   * @param {CollectableObject[]} collectableObjects - An array of collectable objects for the level.
   */
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
   */
  playBackgroundMusic() {
    if (!isMuted) {
      this.backgroundMusic.play();
    }
  }

  /**
   * Stops the background music for the level.
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
