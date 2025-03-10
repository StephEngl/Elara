/**
 * Represents the game world, handling game logic, drawing, and collision detection.
 */
class World {
  character = new Character();
  statusbar = new Statusbar();
  crystalbar = new Crystalbar();
  level = level1;
  flyingObjects = [];
  runInterval = null;
  camera_x = 50;

  /**
   * Creates a World instance.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.endboss = this.level.enemies[this.level.enemies.length - 1];
    this.setWorld();
    this.draw();
    this.run();
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.setWorld(this);
  }

  /**
   * Starts the game loop.
   */
  run() {
    this.startMainLoop();
    this.startCollisionLoop();
  }

  /**
   * Starts the main game loop for background music, flying objects and cleaning up.
   */
  startMainLoop() {
    this.runInterval = setInterval(() => {
      if (!isPaused) {
        if (this.character.x > 3200 && !this.endboss.isActive) {
          this.endboss.activate();
        }
        this.updateGameElements();
      }
    }, 100);
  }

  /**
   * Updates the game elements in the main loop.
   */
  updateGameElements() {
    startBackgroundMusic();
    this.character.checkFlyingObjects();
    this.checkFireballCollisions();
    this.flyingObjects = this.removeObjectsFromGame(this.flyingObjects);
    this.level.enemies = this.removeObjectsFromGame(this.level.enemies);
  }

  /**
   * Starts the collision detection loop.
   * @property {number} collisionInterval - Interval ID for the collision detection loop.
   */
  startCollisionLoop() {
    this.collisionInterval = setInterval(() => {
      if (!isPaused) {
        this.handleCollisions();
      }
    }, 20);
  }

  /**
   * Handles all collision checks.
   */
  handleCollisions() {
    this.checkJumpingOn();
    this.checkCollisionsWithEnemy(this.level.enemies);
    this.checkCollisionsWithCollectible(this.level.collectableObjects);
  }

  /**
   * Sets the animation state for all enemies.
   * @param {boolean} isAnimationPaused - Whether the animation is paused.
   */
  setEnemyAnimationState(isAnimationPaused) {
    this.level.enemies.forEach((enemy) => (enemy.isPaused = isAnimationPaused));
  }

  /**
   * Checks for collisions between the character and enemies.
   * @param {MovableObject[]} enemies - The array of enemies to check collisions with.
   */
  checkCollisionsWithEnemy(enemies) {
    enemies.forEach((enemy) => {
      if (enemy.isDead()) return;
      if (this.character.isColliding(enemy)) {
        const isEndboss = enemies.indexOf(enemy) === enemies.length - 1;
        const damage = isEndboss ? 40 : 10;
        if (this.character.energy > 0) {
          this.character.hit(damage);
          this.statusbar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Checks for collisions between the character and collectible objects.
   * @param {MovableObject[]} objects - The array of collectible objects.
   */
  checkCollisionsWithCollectible(objects) {
    objects.forEach((object) => {
      if (this.character.isColliding(object)) {
        this.collectItem(object);
      }
    });
  }

  /**
   * Checks for collisions between fireballs and enemies.
   */
  checkFireballCollisions() {
    this.flyingObjects.forEach((fireball) => {
      this.level.enemies.forEach((enemy) => {
        this.handleFireballCollision(fireball, enemy);
      });
      this.handleBossFireCollision(fireball);
    });
  }

  /**
   * Handles collision logic between a fireball and an enemy.
   * @param {FlyingObject} fireball - The fireball object.
   * @param {MovableObject} enemy - The enemy object.
   */
  handleFireballCollision(fireball, enemy) {
    if (this.isFireballCollidingWithEnemy(fireball, enemy)) {
      this.applyFireballDamage(enemy);
      fireball.shouldRemove = true;
    }
  }

  /**
   * Checks if a fireball is colliding with an enemy.
   * @param {FlyingObject} fireball - The fireball object.
   * @param {MovableObject} enemy - The enemy object.
   * @returns {boolean} - True if the fireball is colliding with the enemy, false otherwise.
   */
  isFireballCollidingWithEnemy(fireball, enemy) {
    return fireball.isColliding(enemy) && !fireball.isBossFire;
  }

  /**
   * Applies damage to an enemy hit by a fireball.
   * @param {MovableObject} enemy - The enemy object.
   */
  applyFireballDamage(enemy) {
    if (enemy instanceof Endboss && enemy.energy > 0) {
      enemy.hit(35);
      enemy.isHurted = true;
    } else {
      enemy.reduceEnergy(100);
    }
  }

  /**
   * Handles collision logic between a boss fireball and the character.
   * @param {FlyingObject} fireball - The boss's fireball object.
   */
  handleBossFireCollision(fireball) {
    if (fireball.isBossFire && fireball.isColliding(this.character)) {
      this.character.hit(35);
      this.statusbar.setPercentage(this.character.energy);
      fireball.shouldRemove = true;
    }
  }

  /**
   * Collects an item, applying its effect and playing a sound.
   * @param {MovableObject} item - The item to collect.
   */
  collectItem(item) {
    this.applyItemEffect(item);
    this.playItemCollectSound(item);
    this.removeItemFromLevel(item);
  }

  /**
   * Applies the effect of a collected item.
   * @param {MovableObject} item - The item to apply the effect of.
   */
  applyItemEffect(item) {
    switch (true) {
      case item instanceof Flower:
        this.increaseCharacterEnergy();
        break;
      case item instanceof Crystal:
        this.increaseCrystalbar(item.getEnergyLevel());
        break;
    }
  }

  /**
   * Increases the character's energy.
   */
  increaseCharacterEnergy() {
    this.character.energy = Math.min(this.character.energy + 50, 100);
    this.statusbar.setPercentage(this.character.energy);
  }

  /**
   * Increases the crystal bar's count.
   * @param {number} energyLevel - The amount to increase the crystal count by.
   */
  increaseCrystalbar(energyLevel) {
    this.crystalbar.increaseCrystalCount(energyLevel);
  }

  /**
   * Decreases the crystal bar's count.
   */
  decreaseCrystalbar() {
    this.crystalbar.decreaseCrystalCount();
  }

  /**
   * Plays the sound for collecting an item.
   * @param {MovableObject} item - The item that was collected.
   */
  playItemCollectSound(item) {
    const soundKey =
      item instanceof Flower
        ? "flower"
        : item instanceof Crystal
        ? "crystal"
        : null;
    if (soundKey && !isMuted) {
      sounds.collectibles[soundKey].play();
    }
  }

  /**
   * Removes an item from the level's collectible objects.
   * @param {MovableObject} item - The item to remove.
   */
  removeItemFromLevel(item) {
    this.level.collectableObjects = this.level.collectableObjects.filter(
      (obj) => obj !== item
    );
  }

  /**
   * Checks if the character jumped on an enemy and kills the enemy if so.
   */
  checkJumpingOn() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        return;
      }
      if (this.character.isJumpedOn(enemy) && !enemy.isDead()) {
        enemy.reduceEnergy(100);
      }
    });
  }

  /**
   * Removes objects from the game that are marked for removal.
   * @param {MovableObject[]} objectArrayToRemove - The array of objects to filter.
   * @returns {MovableObject[]} - The filtered array of objects.
   */
  removeObjectsFromGame(objectArrayToRemove) {
    return objectArrayToRemove.filter((obj) => !obj.shouldRemove);
  }

  /**
   * Draws all game elements on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateCameraPosition();
    if (!isPaused) {
      this.drawGameElements();
    } else {
      this.drawPauseScreen();
    }
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  updateCameraPosition() {
    const canvasWidth = this.canvas.width;
    const deadzoneWidth = canvasWidth * 0.3;
    const deadzoneOffset = 100;
    const characterX = this.character.x;
    const characterRelativeX = characterX + this.camera_x;
    let targetCameraX = this.camera_x;

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

    targetCameraX = Math.max(targetCameraX, -this.level.level_end_x - canvasWidth
    );
    targetCameraX = Math.min(680, targetCameraX);
    this.camera_x = targetCameraX;
  }

  /**
   * Draws the game elements.
   */
  drawGameElements() {
    this.ctx.translate(this.camera_x, 0);
    this.drawGameObjects();
    this.drawFixedObjects();
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws the game objects.
   */
  drawGameObjects() {
    this.drawBackground();
    this.drawLights();
    if (!gameOver) {
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.flyingObjects);
    }
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.level.foregroundObjects);
  }

  /**
   * Draws the background objects.
   */
  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
  }

  /**
   * Draws the light objects.
   */
  drawLights() {
    this.addObjectsToMap(this.level.lights);
  }

  /**
   * Draws the fixed objects (statusbar, crystalbar).
   */
  drawFixedObjects() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.crystalbar);
    this.ctx.translate(this.camera_x, 0);
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
