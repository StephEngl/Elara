class World {
  character = new Character();
  statusbar = new Statusbar();
  level = level1;
  camera_x;
  flyingObjects = [];



  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.checkCollisions();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkFlyingObjects();
    }, 300);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.energy > 0) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

  checkFlyingObjects() {
    if (this.keyboard.D) {
      this.character.playAnimation(this.character.imagesAttack);
      let fireball = new FlyingObject(this.character.x + this.character.offset.right, this.character.y + this.character.offset.top);
      this.flyingObjects.push(fireball);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    // Space for fixed objects//
    this.addToMap(this.statusbar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.lights);
    if (!gameOver) {
      this.addObjectsToMap(this.level.enemies);
    }
    this.addObjectsToMap(this.flyingObjects);
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
