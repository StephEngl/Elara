class World {
  character = new Character();
  statusbar = new Statusbar();
  crystalbar = new Crystalbar();
  level = level1;
  camera_x;
  flyingObjects = [];
  audioElements = [];
  isPaused = false;
  runInterval = null;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
    this.addBackgroundMusicToAudioElements();
  }

  setWorld() {
    this.character.setWorld(this);
  }

  run() {
    this.runInterval = setInterval(() => {
      if (!this.isPaused) {
        this.checkJumpingOn();
        this.startBackgroundMusic();
        this.checkFlyingObjects();
        this.checkFireballCollisions();
        this.flyingObjects = this.removeObjectsFromGame(this.flyingObjects);
        this.level.enemies = this.removeObjectsFromGame(this.level.enemies);
      }
    }, 200);
    this.collisionInterval = setInterval(() => {
      if (!this.isPaused && !this.character.elaraJumpedOnEnemy) {
        this.checkCollisions(this.level.enemies);
        this.checkCollisions(this.level.collectableObjects);
      }
    }, 20);
  }

  // Sound functions
  addBackgroundMusicToAudioElements() {
    if (this.level && this.level.backgroundMusic) {
      this.audioElements.push(this.level.backgroundMusic);
    }
  }

  startBackgroundMusic() {
    if (!this.isPaused && !isMuted) {
      this.level.playBackgroundMusic();
    }
  }

  stopBackgroundMusic() {
    this.level.stopBackgroundMusic();
  }

  addAudio(audio) {
    this.audioElements.push(audio);
  }

  createAudio(src) {
    let audio = new Audio(src);
    this.addAudio(audio);
    return audio;
  }

  muteAllSounds() {
    this.audioElements.forEach((audio) => {
      audio.muted = true;
      audio.pause();
    });
    Object.values(sounds).forEach((category) => {
      Object.values(category).forEach((sound) => {
        if (sound instanceof Audio) {
          sound.muted = true;
          audio.pause();
        }
      });
    });
    if (this.level && this.level.backgroundMusic) {
      this.level.backgroundMusic.muted = true;
      this.level.backgroundMusic.pause();
    }
  }

  unmuteAllSounds() {
    this.audioElements.forEach((audio) => {
      audio.muted = false;
    });
    Object.values(sounds).forEach((category) => {
      Object.values(category).forEach((sound) => {
        if (sound instanceof Audio) {
          sound.muted = false;
        }
      });
    });
    if (this.level && this.level.backgroundMusic) {
      this.level.backgroundMusic.muted = false;
      if (!this.isPaused) this.level.backgroundMusic.play();
    }
  }

  // Pause function
  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.stopBackgroundMusic();
      this.setEnemyAnimationState(true);
      clearInterval(this.runInterval);
    } else {
      this.setEnemyAnimationState(false);
      this.run();
      if (!isMuted) this.startBackgroundMusic();
    }
  }

  setEnemyAnimationState(isAnimationPaused) {
    this.level.enemies.forEach((enemy) => (enemy.isPaused = isAnimationPaused));
  }

  // Collision checks
  checkCollisions(target) {
    target.forEach((element) => {
      if (this.character.isColliding(element)) {
        if (target === this.level.enemies && this.character.energy > 0) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
        } else if (target === this.level.collectableObjects) {
          this.collectItem(element);
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
    console.log("Item collected:", item);
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
    this.crystalbar.loadingLevel++;
    this.crystalbar.setLoadingLevel(this.crystalbar.loadingLevel);
  }

  decreaseCrystalbar() {
    this.crystalbar.loadingLevel--;
    this.crystalbar.setLoadingLevel(this.crystalbar.loadingLevel);
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

  checkFlyingObjects() {
    if (
      (this.keyboard.F || fireButtonPressed) &&
      this.crystalbar.loadingLevel > 0
    ) {
      this.character.playAnimation(this.character.imagesAttack);
      let fireball = new FlyingObject(
        this.character.x + this.character.offset.right,
        this.character.y + this.character.offset.top,
        this.character.otherDirection
      );
      this.flyingObjects.push(fireball);
      this.decreaseCrystalbar();
      fireButtonPressed = false;
    }
  }

  removeObjectsFromGame(objectArrayToRemove) {
    return objectArrayToRemove.filter((obj) => !obj.shouldRemove);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.isPaused) {
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
