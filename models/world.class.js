class World {
  character = new Character();
  statusbar = new Statusbar();
  crystalbar = new Crystalbar();
  level = level1;
  camera_x;
  lastFireballTime = 0;
  flyingObjects = [];
  runInterval = null;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.endboss = this.level.enemies[this.level.enemies.length -1]
    this.setWorld();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.setWorld(this);
  }

  run() {
    this.runInterval = setInterval(() => {
      if (!isPaused) {
        startBackgroundMusic();
        this.checkFlyingObjects();
        this.checkFireballCollisions();
        this.flyingObjects = this.removeObjectsFromGame(this.flyingObjects);
        this.level.enemies = this.removeObjectsFromGame(this.level.enemies);
      }
    }, 200);
    this.collisionInterval = setInterval(() => {
      if (!isPaused) {
        this.checkJumpingOn();
        this.checkCollisionsWithEnemy(this.level.enemies);
        this.checkCollisionsWithCollectible(this.level.collectableObjects);
      }
    }, 20);
  }

  setEnemyAnimationState(isAnimationPaused) {
    this.level.enemies.forEach((enemy) => (enemy.isPaused = isAnimationPaused));
  }

  // Collision checks
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

  checkCollisionsWithCollectible(objects) {
    objects.forEach((object) => {
      if (this.character.isColliding(object)) {
        this.collectItem(object);
        }
      });
  }

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

  // Collect Item
  collectItem(item) {
    this.applyItemEffect(item);
    this.playItemCollectSound(item);
    this.removeItemFromLevel(item);
  }

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

  increaseCharacterEnergy() {
    this.character.energy = Math.min(this.character.energy + 50, 100);
    this.statusbar.setPercentage(this.character.energy);
  }

  increaseCrystalbar(energyLevel) {
    this.crystalbar.increaseCrystalCount(energyLevel);
  }

  decreaseCrystalbar() {
    this.crystalbar.decreaseCrystalCount();
  }

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

  removeItemFromLevel(item) {
    this.level.collectableObjects = this.level.collectableObjects.filter(
      (obj) => obj !== item
    );
  }

  // Ceck Jumping on Enemys
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

  removeObjectsFromGame(objectArrayToRemove) {
    return objectArrayToRemove.filter((obj) => !obj.shouldRemove);
  }

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

  drawGameElements() {
    this.ctx.translate(this.camera_x, 0);
    this.drawGameObjects();
    this.drawFixedObjects();
    this.ctx.translate(-this.camera_x, 0);
  }

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

  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects);
  }

  drawLights() {
    this.addObjectsToMap(this.level.lights);
  }

  drawFixedObjects() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.crystalbar);
    this.ctx.translate(this.camera_x, 0);
  }

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

  cleanupEnemies() {
    this.level.enemies = this.level.enemies.filter(
      (enemy) => !enemy.shouldRemove
    );
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
