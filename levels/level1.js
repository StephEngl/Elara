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

  const bgLayerFolder = currentLevel === 1 ? "level-1-bg-layer" : "level-2-bg-layer";
  const xPositions = [];
  for (let x = -720; x <= 720 * 5; x += 720) {
    xPositions.push(x);
  }

  switch (currentLevel) {
    case 1:
      level1 = new Level(
        [
          ...Array(4).fill().map(() => new LittleDragon(getUniqueRandomPosition(usedPositions, 300))),
          ...Array(3).fill().map(() => new BlueSlime(getUniqueRandomPosition(usedPositions, 300))),
          new Endboss(),
        ],
        [
          ...[0, 900, 1900, 2900, 3900, 4900].map(
            (pos) => new Light("assets/img/backgrounds/lights/lights.png", pos)
          ),
        ],
        createBackgroundObjects(bgLayerFolder, xPositions),
        createGroundObjects(bgLayerFolder, xPositions), 
        ["assets/audio/bg-music-lvl1.mp3"],
        [
          new Crystal(300, 200, "assets/img/game_objects/fire-crystal.png"),
          new Crystal(400, 150, "assets/img/game_objects/fire-crystal.png"),
          new Crystal(500, 200, "assets/img/game_objects/fire-crystal.png"),
          ...Array(4).fill().map(() => new Crystal()),
          new Crystal(
            3210,
            350,
            "assets/img/game_objects/fire-crystal-large.png",
            5
          ),
          ...[-500, 3305].map(x => new Flower(x))
        ],
        ["level1"]
      );
      break;
    case 2:
      level2 = new Level(
        [ ...Array(4).fill().map(() => new Medusa(getUniqueRandomPosition(usedPositions))),
          ...Array(4).fill().map(() => new RedSlime(getUniqueRandomPosition(usedPositions))),
          new EndbossKitsune(),
        ],
        [ ...[0, 900, 1900, 2900, 3900, 4900].map(
          pos => new Light("assets/img/backgrounds/lights/lights.png", pos))
        ],
        createBackgroundObjects(bgLayerFolder, xPositions),
        createGroundObjects(bgLayerFolder, xPositions), 
        ["assets/audio/bg-music-lvl2.mp3"],
        [
          ...[ 
                [300, 200, "assets/img/game_objects/fire-crystal.png"],
                [400, 150, "assets/img/game_objects/fire-crystal.png"],
                [500, 200, "assets/img/game_objects/fire-crystal.png"]
              ].map(([x, y, img]) => new Crystal(x, y, img)),
          ...Array(4).fill().map(() => new Crystal()),
          ...[ 
                [3210, 350],
                [-400, 350]
              ].map(([x, y]) => new Crystal(x, y, "assets/img/game_objects/fire-crystal-large.png", 5)),
          ...[-500, 3305].map(x => new Flower(x))
        ],
        ["level2"]
      );
      break;
  }
}

/**
 * Generates an array of BackgroundObject instances for the background layers.
 * @param {string} folder - The folder name for the background layer images.
 * @param {number[]} xPositions - The x positions for each tile.
 * @returns {BackgroundObject[]} Array of background objects.
 */
function createBackgroundObjects(folder, xPositions) {
  const layers = [
    "sky.png",
    "bg_decor.png",
    "middleground.png",
    "foreground.png"
  ];
  let objects = [];
  for (let x of xPositions) {
    for (let layer of layers) {
      objects.push(
        new BackgroundObject(`assets/img/backgrounds/${folder}/${layer}`, x)
      );
    }
  }
  return objects;
}

/**
 * Generates an array of BackgroundObject instances for the ground layer.
 * @param {string} folder - The folder name for the ground image.
 * @param {number[]} xPositions - The x positions for each tile.
 * @returns {BackgroundObject[]} Array of ground objects.
 */
function createGroundObjects(folder, xPositions) {
  return xPositions.map(
    x => new BackgroundObject(`assets/img/backgrounds/${folder}/ground.png`, x)
  );
}