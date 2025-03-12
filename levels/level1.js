let level1;
let level2;

/**
 * Initializes level 1 with game objects and configurations
 * @function initLevel
 * @description Creates level 1 with enemies, lights, background elements, collectibles, and audio
 * @see Level
 */
function initLevel() {
  let usedPositions = [];
  switch (currentLevel) {
    case 1:
      level1 = new Level(
        [
          new LittleDragon(getUniqueRandomPosition(usedPositions)),
          new LittleDragon(getUniqueRandomPosition(usedPositions)),
          new LittleDragon(getUniqueRandomPosition(usedPositions)),
          new LittleDragon(getUniqueRandomPosition(usedPositions)),
          new BlueSlime(getUniqueRandomPosition(usedPositions)),
          new BlueSlime(getUniqueRandomPosition(usedPositions)),
          new BlueSlime(getUniqueRandomPosition(usedPositions)),
          new Endboss(),
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
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/sky.png",
            -720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/bg_decor.png",
            -720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/middleground.png",
            -720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/foreground.png",
            -720
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/sky.png",
            0
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/bg_decor.png",
            0
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/middleground.png",
            0
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/foreground.png",
            0
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/sky.png",
            720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/bg_decor.png",
            720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/middleground.png",
            720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/foreground.png",
            720
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/sky.png",
            720 * 2
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/bg_decor.png",
            720 * 2
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/middleground.png",
            720 * 2
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/foreground.png",
            720 * 2
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/sky.png",
            720 * 3
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/bg_decor.png",
            720 * 3
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/middleground.png",
            720 * 3
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/foreground.png",
            720 * 3
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/sky.png",
            720 * 4
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/bg_decor.png",
            720 * 4
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/middleground.png",
            720 * 4
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/foreground.png",
            720 * 4
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/sky.png",
            720 * 5
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/bg_decor.png",
            720 * 5
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/middleground.png",
            720 * 5
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/foreground.png",
            720 * 5
          ),
        ],
        [
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/ground.png",
            -720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/ground.png",
            0
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/ground.png",
            720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/ground.png",
            720 * 2
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/ground.png",
            720 * 3
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/ground.png",
            720 * 4
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-1-bg-layer/ground.png",
            720 * 5
          ),
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
        ],
        ["level1"]
      );
      break;
    case 2:
      level2 = new Level(
        [
          new Medusa(getUniqueRandomPosition(usedPositions)),
          new Medusa(getUniqueRandomPosition(usedPositions)),
          new Medusa(getUniqueRandomPosition(usedPositions)),
          new Medusa(getUniqueRandomPosition(usedPositions)),
          new RedSlime(getUniqueRandomPosition(usedPositions)),
          new RedSlime(getUniqueRandomPosition(usedPositions)),
          new RedSlime(getUniqueRandomPosition(usedPositions)),
          new RedSlime(getUniqueRandomPosition(usedPositions)),
          new EndbossKitsune(),
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
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/sky.png",
            -720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/bg_decor.png",
            -720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/middleground.png",
            -720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/foreground.png",
            -720
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/sky.png",
            0
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/bg_decor.png",
            0
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/middleground.png",
            0
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/foreground.png",
            0
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/sky.png",
            720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/bg_decor.png",
            720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/middleground.png",
            720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/foreground.png",
            720
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/sky.png",
            720 * 2
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/bg_decor.png",
            720 * 2
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/middleground.png",
            720 * 2
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/foreground.png",
            720 * 2
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/sky.png",
            720 * 3
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/bg_decor.png",
            720 * 3
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/middleground.png",
            720 * 3
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/foreground.png",
            720 * 3
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/sky.png",
            720 * 4
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/bg_decor.png",
            720 * 4
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/middleground.png",
            720 * 4
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/foreground.png",
            720 * 4
          ),

          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/sky.png",
            720 * 5
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/bg_decor.png",
            720 * 5
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/middleground.png",
            720 * 5
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/foreground.png",
            720 * 5
          ),
        ],
        [
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/ground.png",
            -720
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/ground.png",
            0, 10
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/ground.png",
            720, 10
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/ground.png",
            720 * 2, 10
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/ground.png",
            720 * 3, 10
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/ground.png",
            720 * 4, 10
          ),
          new BackgroundObject(
            "assets/img/backgrounds/level-2-bg-layer/ground.png",
            720 * 5, 10
          ),
        ],
        ["assets/audio/bg-music-lvl2.mp3"],
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
        ],
        ["level2"]
      );
      break;
  }
}
