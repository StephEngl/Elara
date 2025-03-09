let level1;

function initLevel() {
  let usedPositions = [];
  level1 = new Level(
    [
      new LittleDragon(getUniqueRandomPosition(usedPositions)),
      new LittleDragon(getUniqueRandomPosition(usedPositions)),
      new LittleDragon(getUniqueRandomPosition(usedPositions)),
      new LittleDragon(getUniqueRandomPosition(usedPositions)),
      new BlueSlime(getUniqueRandomPosition(usedPositions)),
      new BlueSlime(getUniqueRandomPosition(usedPositions)),
      new BlueSlime(getUniqueRandomPosition(usedPositions)),
      new Endboss(sounds.dragonBoss),
    ],
    [
      new Light("assets/img/backgrounds/lights/lights.png", 0),
      new Light("assets/img/backgrounds/lights/lights.png", 900),
      new Light("assets/img/backgrounds/lights/lights.png", 1900),
      new Light("assets/img/backgrounds/lights/lights.png", 2900),
      new Light("assets/img/backgrounds/lights/lights.png", 3900),
      new Light("assets/img/backgrounds/lights/lights.png", 4900),
    ],
    [
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/sky.png", -720),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/bg_decor.png", -720),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/middleground.png", -720),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/foreground.png", -720),

      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/sky.png", 0),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/bg_decor.png", 0),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/middleground.png", 0),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/foreground.png", 0),

      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/sky.png", 720),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/bg_decor.png", 720),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/middleground.png", 720),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/foreground.png", 720),

      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/sky.png", 720 * 2),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/bg_decor.png", 720 * 2),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/middleground.png", 720 * 2),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/foreground.png", 720 * 2),

      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/sky.png", 720 * 3),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/bg_decor.png", 720 * 3),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/middleground.png", 720 * 3),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/foreground.png", 720 * 3),

      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/sky.png", 720 * 4),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/bg_decor.png", 720 * 4),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/middleground.png", 720 * 4),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/foreground.png", 720 * 4),

      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/sky.png", 720 * 5),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/bg_decor.png", 720 * 5),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/middleground.png", 720 * 5),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/foreground.png", 720 * 5),
    ],
    [
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/ground.png", -720),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/ground.png", 0),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/ground.png", 720),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/ground.png", 720 * 2),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/ground.png", 720 * 3),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/ground.png", 720 * 4),
      new BackgroundObject("assets/img/backgrounds/level-1-bg-layer/ground.png", 720 * 5),
    ],
    ["assets/audio/bg-music-lvl1.mp3"],
    [
      new Crystal(300, 200, "assets/img/game_objects/fire-crystal.png"),
      new Crystal(400, 150, "assets/img/game_objects/fire-crystal.png"),
      new Crystal(500, 200, "assets/img/game_objects/fire-crystal.png"),
      new Crystal(
        3210,
        350,
        "assets/img/game_objects/fire-crystal-large.png",
        5
      ),
      new Crystal(),
      new Crystal(),
      new Crystal(),
      new Crystal(),
      new Flower(-500),
      new Flower(3305),
    ]
  );
}
