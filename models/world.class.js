class World {
  character = new Character();
  statusbar = new Statusbar();
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
    this.character.world = this;
  }

  run() {
    this.runInterval = setInterval(() => {
      if (!this.isPaused) {
        this.checkJumpingOn();
        this.startLevel();
        this.checkFlyingObjects();
        this.cleanupFlyingObjects();
        this.cleanupEnemies();
        this.cleanupCharacter();
      }
    }, 200);
    this.collisionInterval = setInterval(() => {
      if (!this.isPaused && !this.character.elaraJumpedOnEnemy) {
        this.checkCollisions();
      }
    }, 50);
  }

  addBackgroundMusicToAudioElements() {
    if (this.level && this.level.backgroundMusic) {
      this.audioElements.push(this.level.backgroundMusic);
    }
  }

  startLevel() {
    if (!this.isPaused && !isMuted) {
      this.level.playBackgroundMusic();
    }
  }

  stopLevel() {
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
    if (this.level && this.level.backgroundMusic) {
      this.level.backgroundMusic.muted = true;
      this.level.backgroundMusic.pause();
    }
  }

  unmuteAllSounds() {
    this.audioElements.forEach((audio) => {
      audio.muted = false;
    });
    if (this.level && this.level.backgroundMusic) {
      this.level.backgroundMusic.muted = false;
      if (!this.isPaused) this.level.backgroundMusic.play();
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.stopLevel();
      console.log("Spiel pausiert");
      clearInterval(this.runInterval);
    } else {
      console.log("Spiel fortgesetzt");
      this.run();
      if (!isMuted) this.startLevel();
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.energy > 0) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

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
    if (this.keyboard.F) {
      this.character.playAnimation(this.character.imagesAttack);
      let fireball = new FlyingObject(
        this.character.x + this.character.offset.right,
        this.character.y + this.character.offset.top
      );
      this.flyingObjects.push(fireball);
    }
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
    this.addObjectsToMap(this.flyingObjects.filter((obj) => !obj.shouldRemove));
    this.addToMap(this.character);
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

  cleanupCharacter() {
    // this.world.character = this.world.character.filter((obj) => !obj.shouldRemove);
  }

  cleanupFlyingObjects() {
    this.flyingObjects = this.flyingObjects.filter((obj) => !obj.shouldRemove);
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
