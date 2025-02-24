class Level {
  enemies;
  lights;
  backgroundObjects;
  foregroundObjects;
  level_end_x = 3600;
  backgroundMusic;

  constructor(
    enemies,
    lights,
    backgroundObjects,
    foregroundObjects,
    backgroundMusicSrc
  ) {
    this.enemies = enemies;
    this.lights = lights;
    this.backgroundObjects = backgroundObjects;
    this.foregroundObjects = foregroundObjects;
    this.backgroundMusic = new Audio(backgroundMusicSrc);
    this.backgroundMusic.loop = true; // Musik wird in Schleife abgespielt
  }

  playBackgroundMusic() {
    if (!isMuted) {
      this.backgroundMusic.play();
    }
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }
}
