class World {
  character = new Character();
  statusbar = new Statusbar();
  crystalbar = new Crystalbar();
  level = level1;
  camera_x;
  lastFireballTime = 0;
  flyingObjects = [];
  runInterval = null;

  /**
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
      this.updateGameElements();
    }
  }, 200);
}

/**
 * Updates the game elements in the main loop.
 */
updateGameElements() {
  startBackgroundMusic();
  this.checkFlyingObjects();
  this.checkFireballCollisions();
  this.flyingObjects = this.removeObjectsFromGame(this.flyingObjects);
  this.level.enemies = this.removeObjectsFromGame(this.level.enemies);
}

/**
 * Starts the collision detection loop.
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
      if (enemy.isDying) {
        return;
      }
      if (this.character.isColliding(enemy)) {
        if (this.character.energy > 0) {
          this.character.hit();
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
        if (fireball.isColliding(enemy)) {
          enemy.die();
          fireball.shouldRemove = true;
        }
      });
    });
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
      if (this.character.isJumpedOn(enemy) && !enemy.isDying) {
        console.log(`Elara jumped on ${enemy}`);
        enemy.die();
      }
    });
  }

  /**
   * Checks if a fireball should be created and creates one if necessary.
   */
  checkFlyingObjects() {
    if (this.shouldCreateFireball()) {
      this.createFireball();
    }
  }

  /**
   * Checks if the conditions to create a fireball are met.
   * @returns {boolean} True if a fireball should be created, false otherwise.
   */
  shouldCreateFireball() {
    const currentTime = Date.now();
    const cooldownPeriod = 150;
    return (
      (this.keyboard.F || fireButtonPressed) &&
      this.crystalbar.collectedCrystals > 0 &&
      currentTime - this.lastFireballTime >= cooldownPeriod
    );
  }

  /**
   * Creates a new fireball and adds it to the flyingObjects array.
   */
  createFireball() {
    this.character.playAnimation(this.character.imagesAttack);
    const fireball = this.createNewFireball();
    this.flyingObjects.push(fireball);
    sounds.character.attack.play();
    this.decreaseCrystalbar();
    fireButtonPressed = false;
    this.lastFireballTime = Date.now();
  }

  /**
   * Creates a new FlyingObject (fireball).
   * @returns {FlyingObject} The new FlyingObject.
   */
  createNewFireball() {
    return new FlyingObject(
      this.character.x + this.character.offset.right,
      this.character.y + this.character.offset.top,
      this.character.otherDirection
    );
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
    mo.drawFrame(this.ctx);
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
