class World {
  character = new Character();
  enemies = [new PufferFish(), new PufferFish(), new PufferFish()];
  lights = [new Light()];
  backgroundObjects = [
    new BackgroundObject("img/3_Background/Layers/5_Water/L1.png", 0),
    new BackgroundObject("img/3_Background/Layers/5_Water/L2.png", 0),
    new BackgroundObject("img/3_Background/Layers/3_Fondo_1/L1.png", 0),
    new BackgroundObject("img/3_Background/Layers/3_Fondo_1/L2.png", 0),
    new BackgroundObject("img/3_Background/Layers/4_Fondo_2/L1.png", 0),
    new BackgroundObject("img/3_Background/Layers/4_Fondo_2/L2.png", 0),
    new BackgroundObject("img/3_Background/Layers/2_Floor/L2.png", 0),
    new BackgroundObject("img/3_Background/Layers/2_Floor/L1.png", 0),
  ];
  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.lights);
    this.addObjectsToMap(this.enemies)
    this.addToMap(this.character);

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
