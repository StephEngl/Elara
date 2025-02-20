class Level {
  enemies;
  lights;
  backgroundObjects;
  foregroundObjects;
  statusbar;
  level_end_x = 3600;

  constructor(enemies, lights, backgroundObjects, foregroundObjects, statusbar) {
    this.enemies = enemies;
    this.lights = lights;
    this.backgroundObjects = backgroundObjects;
    this.foregroundObjects = foregroundObjects;
    this.statusbar = statusbar;
  }
}
