class Render {
  constructor(ctx, canvas, world) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.world = world; // Referenz zum world-Objekt
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateCameraPosition() {
    const canvasWidth = this.canvas.width;
    const deadzoneWidth = canvasWidth * 0.3;
    const deadzoneOffset = 100;
    const characterX = this.world.character.x;
    const characterRelativeX = characterX + this.world.camera_x;
    let targetCameraX = this.world.camera_x;

    const deadzoneRight = deadzoneWidth + deadzoneOffset;

    // Linke Grenze der Deadzone (verschoben um den Offset)
    const deadzoneLeft = 0 + deadzoneOffset;

    if (characterRelativeX > deadzoneRight) {
      // Kamera folgt, wenn Charakter die rechte Grenze verlässt
      targetCameraX = -(characterX - deadzoneRight);
    } else if (characterRelativeX < deadzoneLeft) {
      // Kamera folgt, wenn Charakter die linke Grenze verlässt
      targetCameraX = -(characterX - deadzoneLeft);
    }

    targetCameraX = Math.max(
      targetCameraX,
      -(this.world.level.level_end_x + canvasWidth)
    );
    targetCameraX = Math.min(680, targetCameraX);
    this.world.camera_x = targetCameraX;
  }

  /**
   * Draws the game elements.
   */
  drawGameElements() {
    this.ctx.translate(this.world.camera_x, 0);
    this.drawGameObjects();
    this.drawFixedObjects();
    this.ctx.translate(-this.world.camera_x, 0);
  }

  /**
   * Draws the game objects.
   */
  drawGameObjects() {
    this.drawBackground();
    this.drawLights();
    if (!gameOver) {
      this.addObjectsToMap(this.world.level.enemies);
      this.addObjectsToMap(this.world.flyingObjects);
    }
    this.addToMap(this.world.character);
    this.addObjectsToMap(this.world.level.collectableObjects);
    this.addObjectsToMap(this.world.level.foregroundObjects);
  }

  /**
   * Draws the background objects.
   */
  drawBackground() {
    this.addObjectsToMap(this.world.level.backgroundObjects);
  }

  /**
   * Draws the light objects.
   */
  drawLights() {
    this.addObjectsToMap(this.world.level.lights);
  }

  /**
   * Draws the fixed objects (statusbar, crystalbar).
   */
  drawFixedObjects() {
    this.ctx.translate(-this.world.camera_x, 0);
    this.addToMap(this.world.statusbar);
    this.addToMap(this.world.crystalbar);
    this.ctx.translate(this.world.camera_x, 0);
  }

  /**
   * Draws the pause screen.
   */
  drawPauseScreen() {
    this.ctx.font = "30px magical_neverland";
    this.ctx.fillStyle = "white";
    const text = "Spiel pausiert";
    const textWidth = this.ctx.measureText(text).width;
    this.ctx.fillText(
      text,
      (this.canvas.width - textWidth) / 2,
      this.canvas.height / 2
    );
  }

  /**
   * Adds an array of objects to the map.
   * @param {MovableObject[]} objects - The array of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * Adds a single object to the map.
   * @param {MovableObject} mo - The object to add.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally.
   * @param {MovableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image after flipping.
   * @param {MovableObject} mo - The object to restore.
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}
