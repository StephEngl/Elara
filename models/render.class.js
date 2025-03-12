/**
 * Class representing the rendering logic for the game.
 */
class Render {
  /**
   * Create a Render instance.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {World} world - The game world object.
   */
  constructor(ctx, canvas, world) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.canvasWidth = this.canvas.width;
    this.world = world;
    this.deadzoneRight = this.canvasWidth * 0.3 + 100;
    this.deadzoneLeft = 50;
  }

  /**
   * Clears the entire canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Updates the camera position based on the character's position.
   */
  updateCameraPosition() {
    const characterX = this.world.character.x;
    const characterRelativeX = characterX + this.world.camera_x;
    let targetCameraX = this.calculateTargetCameraX(
      characterRelativeX,
      characterX
    );
    targetCameraX = Math.max(
      targetCameraX,
      -(this.world.level.level_end_x + this.canvasWidth)
    );
    targetCameraX = Math.min(680, targetCameraX);
    this.world.camera_x = targetCameraX;
  }

  /**
   * Calculates the target camera X position.
   * @param {number} characterRelativeX - The character's relative X position.
   * @param {number} characterX - The character's absolute X position.
   * @returns {number} The calculated target camera X position.
   */
  calculateTargetCameraX(characterRelativeX, characterX) {
    if (characterRelativeX > this.deadzoneRight) {
      return -(characterX - this.deadzoneRight);
    } else if (characterRelativeX < this.deadzoneLeft) {
      return -(characterX - this.deadzoneLeft);
    }
    return this.world.camera_x;
  }

  /**
   * Draws all game elements.
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
    if (this.world.endboss.isActive) this.drawEndbossHearts(this.world.endboss);
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
   * Draws the Endboss hearts.
   * @param {Endboss} endboss - The Endboss instance.
   */
  drawEndbossHearts(endboss) {
    if (!endboss.isActive) return;

    const spacing = 10;
    let startX = endboss.x + endboss.width / 2 - 60;
    const yPos = this.setYpos(endboss);

    for (let i = 0; i < endboss.hearts; i++) {
      const xPos = startX + i * (new Heart(0, 0).width + spacing);
      const heart = new Heart(xPos, yPos);
      heart.draw(this.ctx);
    }
  }

  setYpos(endboss) {
    if (endboss instanceof EndbossKitsune) {
      return endboss.y + 50;
    } else {
      return endboss.y + 165;
    }
  }

  /**
   * Draws the fixed objects (statusbar, crystalbar).
   */
  drawFixedObjects() {
    this.ctx.translate(-this.world.camera_x, 0);
    this.addToMap(this.world.heart);
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
