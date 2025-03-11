/**
 * Represents the game world, handling game logic, drawing, and collision detection.
 */
class World {
  character = new Character();
  statusbar = new Statusbar();
  crystalbar = new Crystalbar();
  level = level2;
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
    this.render = new Render(this.ctx, this.canvas, this);
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
    this.render.clearCanvas();
    this.render.updateCameraPosition();
    if (!isPaused) {
      this.render.drawGameElements();
    } else {
      this.render.drawPauseScreen();
    }
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }
}
