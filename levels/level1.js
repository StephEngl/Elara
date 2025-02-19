const level1 = new Level(
  [new PufferFish(), new PufferFish(), new PufferFish(), new Endboss()],
  [
    new Light("img/Elara/background/light/1.png"),
    new Light("img/Elara/background/light/2.png"),
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
  ]
);
