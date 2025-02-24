let level1;

initLevel();

function initLevel() {
  level1 = new Level(
    [
      new LittleDragon(),
      // new LittleDragon(),
      // new LittleDragon(),
      // new LittleDragon(),
      new BlueSlime(),
      // new BlueSlime(),
      // new BlueSlime(),
      // new BlueSlime(),
      new Endboss(),
    ],
    [
      new Light("img/Elara/background/light/1.png", 0),
      new Light("img/Elara/background/light/2.png", 400),
      new Light("img/Elara/background/light/1.png", 900),
      new Light("img/Elara/background/light/2.png", 1400),
      new Light("img/Elara/background/light/1.png", 1900),
      new Light("img/Elara/background/light/2.png", 2400),
      new Light("img/Elara/background/light/1.png", 2900),
      new Light("img/Elara/background/light/2.png", 3400),
      new Light("img/Elara/background/light/1.png", 3900),
      new Light("img/Elara/background/light/2.png", 4400),
      new Light("img/Elara/background/light/1.png", 4900),
      new Light("img/Elara/background/light/2.png", 5400),
    ],
    [
      new BackgroundObject("img/Elara/background/sky.png", -720),
      new BackgroundObject("img/Elara/background/bg_decor.png", -720),
      new BackgroundObject("img/Elara/background/middleground.png", -720),
      new BackgroundObject("img/Elara/background/foreground.png", -720),

      new BackgroundObject("img/Elara/background/sky.png", 0),
      new BackgroundObject("img/Elara/background/bg_decor.png", 0),
      new BackgroundObject("img/Elara/background/middleground.png", 0),
      new BackgroundObject("img/Elara/background/foreground.png", 0),

      new BackgroundObject("img/Elara/background/sky.png", 720),
      new BackgroundObject("img/Elara/background/bg_decor.png", 720),
      new BackgroundObject("img/Elara/background/middleground.png", 720),
      new BackgroundObject("img/Elara/background/foreground.png", 720),

      new BackgroundObject("img/Elara/background/sky.png", 720 * 2),
      new BackgroundObject("img/Elara/background/bg_decor.png", 720 * 2),
      new BackgroundObject("img/Elara/background/middleground.png", 720 * 2),
      new BackgroundObject("img/Elara/background/foreground.png", 720 * 2),

      new BackgroundObject("img/Elara/background/sky.png", 720 * 3),
      new BackgroundObject("img/Elara/background/bg_decor.png", 720 * 3),
      new BackgroundObject("img/Elara/background/middleground.png", 720 * 3),
      new BackgroundObject("img/Elara/background/foreground.png", 720 * 3),

      new BackgroundObject("img/Elara/background/sky.png", 720 * 4),
      new BackgroundObject("img/Elara/background/bg_decor.png", 720 * 4),
      new BackgroundObject("img/Elara/background/middleground.png", 720 * 4),
      new BackgroundObject("img/Elara/background/foreground.png", 720 * 4),

      new BackgroundObject("img/Elara/background/sky.png", 720 * 5),
      new BackgroundObject("img/Elara/background/bg_decor.png", 720 * 5),
      new BackgroundObject("img/Elara/background/middleground.png", 720 * 5),
      new BackgroundObject("img/Elara/background/foreground.png", 720 * 5),
    ],
    [
      new BackgroundObject("img/Elara/background/ground.png", -720),
      new BackgroundObject("img/Elara/background/ground.png", 0),
      new BackgroundObject("img/Elara/background/ground.png", 720),
      new BackgroundObject("img/Elara/background/ground.png", 720 * 2),
      new BackgroundObject("img/Elara/background/ground.png", 720 * 3),
      new BackgroundObject("img/Elara/background/ground.png", 720 * 4),
      new BackgroundObject("img/Elara/background/ground.png", 720 * 5),
    ],
    ["assets/audio/backgroundmusik_lvl1.mp3"],
  );
}
