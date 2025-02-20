class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    // this.initializeBackgroundObjects();
    this.setWorld();
    this.draw();
    this.checkCollisions();
  }

  // initializeBackgroundObjects() {
  //   const originalObjects = [
  //     { imagePath: "img/3_Background/Layers/5_Water/L1.png", x: 0 },
  //     { imagePath: "img/3_Background/Layers/5_Water/L2.png", x: 720 },
  //     { imagePath: "img/3_Background/Layers/3_Fondo_1/L1.png", x: 0 },
  //     { imagePath: "img/3_Background/Layers/3_Fondo_1/L2.png", x: 720 },
  //     { imagePath: "img/3_Background/Layers/4_Fondo_2/L1.png", x: 0 },
  //     { imagePath: "img/3_Background/Layers/4_Fondo_2/L2.png", x: 720 },
  //     { imagePath: "img/3_Background/Layers/2_Floor/L2.png", x: 0 },
  //     { imagePath: "img/3_Background/Layers/2_Floor/L1.png", x: 720 },
  //   ];

  //   for (let i = -2; i <= 2; i++) {
  //     originalObjects.forEach(obj => {
  //       const x = i * 720 * 2 + obj.x;
  //       this.backgroundObjects.push(new BackgroundObject(obj.imagePath, x));
  //     });
  //   }
  // }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) && this.character.energy > 0) {
          this.character.hit();
        }
      });
    }, 200);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.lights);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.foregroundObjects);

    this.ctx.translate(-this.camera_x, 0);

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
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}
