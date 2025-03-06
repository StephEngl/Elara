class World {
  character = new Character();
  statusbar = new Statusbar();
  crystalbar = new Crystalbar();
  level = level1;
  camera_x;
  flyingObjects = [];
  runInterval = null;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
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
        this.checkJumpingOn();
        startBackgroundMusic();
        this.checkFlyingObjects();
        this.checkFireballCollisions();
        this.flyingObjects = this.removeObjectsFromGame(this.flyingObjects);
        this.level.enemies = this.removeObjectsFromGame(this.level.enemies);
      }
    }, 200);
    this.collisionInterval = setInterval(() => {
      if (!isPaused && !this.character.elaraJumpedOnEnemy) {
        this.checkCollisions(this.level.enemies);
        this.checkCollisions(this.level.collectableObjects);
      }
    }, 20);
  }

  setEnemyAnimationState(isAnimationPaused) {
    this.level.enemies.forEach((enemy) => (enemy.isPaused = isAnimationPaused));
  }

  // Collision checks
  checkCollisions(targets) {
    targets.forEach((target) => {
      if (target.isDying) {
        console.log("Enemy is dying", target);
        return;
      }
      if (this.character.isColliding(target)) {
        if (targets === this.level.enemies && this.character.energy > 0) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        } else if (targets === this.level.collectableObjects) {
          this.collectItem(target);
        }
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
    if (item instanceof Flower) {
      this.increaseCharacterEnergy();
    } else if (item instanceof Crystal) {
      this.increaseCrystalbar();
    }
  }

  increaseCharacterEnergy() {
    this.character.energy = Math.min(this.character.energy + 50, 100);
    this.statusbar.setPercentage(this.character.energy);
  }

  increaseCrystalbar() {
    this.crystalbar.increaseCrystalCount();
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
        // Optional: Hier können Sie dem Charakter Punkte geben oder andere Aktionen auslösen
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
    return (
      (this.keyboard.F || fireButtonPressed) && this.crystalbar.collectedCrystals > 0
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
    if (!gameOver) this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.flyingObjects);
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
