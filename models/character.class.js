class Character extends MovableObject {
  imagesIntro = [
    "img/Elara/mage_elara/Idle/idle1.png",
    "img/Elara/mage_elara/Idle/idle8.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle8.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle8.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle10.png",
    "img/Elara/mage_elara/Idle/idle11.png",
    "img/Elara/mage_elara/Idle/idle12.png",
    "img/Elara/mage_elara/Idle/idle13.png",
    "img/Elara/mage_elara/Idle/idle14.png",
  ];
  imagesWalking = [
    "img/Elara/mage_elara/Walk/walk1.png",
    "img/Elara/mage_elara/Walk/walk2.png",
    "img/Elara/mage_elara/Walk/walk3.png",
    "img/Elara/mage_elara/Walk/walk4.png",
    "img/Elara/mage_elara/Walk/walk5.png",
    "img/Elara/mage_elara/Walk/walk6.png",
  ];
  imagesIdle = [
    "img/Elara/mage_elara/Idle/idle1.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle10.png",
    "img/Elara/mage_elara/Idle/idle11.png",
    "img/Elara/mage_elara/Idle/idle12.png",
    "img/Elara/mage_elara/Idle/idle13.png",
    "img/Elara/mage_elara/Idle/idle14.png",
  ];
  imagesLongIdle = [
    "img/Elara/mage_elara/Idle/idle1.png",
    "img/Elara/mage_elara/Idle/idle2.png",
    "img/Elara/mage_elara/Idle/idle3.png",
    "img/Elara/mage_elara/Idle/idle4.png",
    "img/Elara/mage_elara/Idle/idle5.png",
    "img/Elara/mage_elara/Idle/idle6.png",
    "img/Elara/mage_elara/Idle/idle7.png",
    "img/Elara/mage_elara/Idle/idle8.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle10.png",
    "img/Elara/mage_elara/Idle/idle11.png",
    "img/Elara/mage_elara/Idle/idle12.png",
    "img/Elara/mage_elara/Idle/idle13.png",
    "img/Elara/mage_elara/Idle/idle14.png",
  ];
  imagesJump = [
    "img/Elara/mage_elara/Jump/jump1.png",
    "img/Elara/mage_elara/Jump/jump2.png",
    "img/Elara/mage_elara/Jump/jump3.png",
    "img/Elara/mage_elara/Jump/jump4.png",
    "img/Elara/mage_elara/Jump/jump5.png",
    "img/Elara/mage_elara/Jump/jump6.png",
    "img/Elara/mage_elara/Jump/jump7.png",
  ];
  imagesHurt = [
    "img/Elara/mage_elara/Hurt/hurt1.png",
    "img/Elara/mage_elara/Hurt/hurt2.png",
    "img/Elara/mage_elara/Hurt/hurt3.png",
    "img/Elara/mage_elara/Hurt/hurt4.png",
  ];
  imagesDying = [
    "img/Elara/mage_elara/Death/death1.png",
    "img/Elara/mage_elara/Death/death2.png",
    "img/Elara/mage_elara/Death/death3.png",
    "img/Elara/mage_elara/Death/death4.png",
    "img/Elara/mage_elara/Death/death5.png",
    "img/Elara/mage_elara/Death/death6.png",
    "img/Elara/mage_elara/Death/death7.png",
    "img/Elara/mage_elara/Death/death8.png",
    "img/Elara/mage_elara/Death/death9.png",
    "img/Elara/mage_elara/Death/death10.png",
  ];
  imagesAttack = [
    "img/Elara/mage_elara/Attack/attack1.png",
    "img/Elara/mage_elara/Attack/attack2.png",
    "img/Elara/mage_elara/Attack/attack3.png",
    "img/Elara/mage_elara/Attack/attack4.png",
    "img/Elara/mage_elara/Attack/attack5.png",
    "img/Elara/mage_elara/Attack/attack6.png",
    "img/Elara/mage_elara/Attack/attack7.png",
  ];
  idleTimer = 0;
  longIdleThreshold = 10000;
  isAttacking = false;
  elaraJumpedOnEnemy = false;

  constructor() {
    super().setImage("img/Elara/mage_elara/Jump/jump1.png");
    this.y = 270;
    this.offset = {
      top: 70,
      right: 75,
      bottom: 20,
      left: 30,
    };
    this.speed = 5;
    this.loadAllImages();
    this.loadAudio();
    this.applyGravity();
    this.isLongIdleActive = false;
    this.animate();
    this.deathAnimationFrame = 0;
    this.deathAnimationComplete = false;
    this.deathAnimationInterval = null; // Intervall für die normale Todesanimation
    this.finalDeathAnimationInterval = null; // Intervall für das schnelle Blinken
  }

  /**
   * Loads audio files for character actions.
   * @method loadAudio
   */
  loadAudio() {
    this.audioDyingSound = this.createAudio(
      "assets/audio/elara_dying_sound.mp3"
    );
    this.audioHittingSound = this.createAudio("assets/audio/hurting_sound.mp3");
    this.audioJumpingSound = this.createAudio(
      "assets/audio/elara_jumping_sound.mp3"
    );
  }

  /**
   * Loads all character images.
   * @method loadAllImages
   */
  loadAllImages() {
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesLongIdle);
    this.loadImages(this.imagesJump);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDying);
    this.loadImages(this.imagesAttack);
  }

  /**
   * Starts the animation and movement intervals for the character.
   * @method animate
   */
  animate() {
    this.startMovementInterval();
    this.startAnimationInterval();
  }

  /**
   * Sets up the movement interval for the character.
   * @method startMovementInterval
   */
  startMovementInterval() {
    setInterval(() => {
      if (!this.isDead()) {
        this.handleMovement();
        this.updateIdleTimer();
      }
      this.updateCameraPosition();
    }, 1000 / 60);
  }

  /**
   * Handles character movement based on keyboard input.
   * @method handleMovement
   */
  handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.setOtherDirection(false);
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft(this.speed);
      this.setOtherDirection(true);
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
    }
    this.resetIdleTimer();
  }

  /**
   * Updates the idle timer.
   * @method updateIdleTimer
   */
  updateIdleTimer() {
    this.idleTimer += 1000 / 60;
  }

  /**
   * Updates the camera position based on the character's position.
   * @method updateCameraPosition
   */
  updateCameraPosition() {
    this.world.camera_x = -this.x + 30;
  }

  /**
   * Sets up the animation interval for the character.
   * @method startAnimationInterval
   */
  startAnimationInterval() {
    setInterval(() => {
      this.updateCharacterState();
    }, 200);
  }

  /**
   * Updates the character's state based on various conditions (dead, hurt, jumping, etc.).
   * @method updateCharacterState
   */
  updateCharacterState() {
    if (this.isDead()) {
      this.handleDeathState();
    } else if (this.isHurt()) {
      this.handleHurtState();
    } else if (this.isAboveGround()) {
      this.handleJumpState();
    } else {
      this.handleGroundState();
    }
  }

  /**
 * Handles the character's death state.
 * @method handleDeathState
 */
  handleDeathState() {
    if (!this.deathAnimationComplete) {
      this.playDeathAnimation();
      this.resetIdleTimer();
    } else {
      this.remove();
      stopGame();
    }
  }

  /**
 * Handles the character's hurt state.
 * @method handleHurtState
 */
  handleHurtState() {
    this.playAnimation(this.imagesHurt);
    this.playSound(this.audioHittingSound);
    this.resetIdleTimer();
  }

  /**
 * Handles the character's jump state.
 * @method handleJumpState
 */
  handleJumpState() {
    this.playAnimation(this.imagesJump);
    this.resetIdleTimer();
  }

  /**
 * Handles the character's state when on the ground.
 * @method handleGroundState
 */
  handleGroundState() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.imagesWalking);
      this.resetIdleTimer();
    } else if (this.idleTimer >= this.longIdleThreshold) {
      this.playAnimation(this.imagesLongIdle);
    } else {
      this.playAnimation(this.imagesIdle);
    }
  }

  /**
 * Makes the character jump.
 * @method jump
 */
  jump() {
    this.speedY = 30;
    this.playSound(this.audioJumpingSound);
  }

  /**
 * Checks if the character jumped on an enemy.
 * @method isJumpedOn
 * @param {MovableObject} mo - The movable object to check collision with.
 * @returns {boolean} - True if the character jumped on the enemy, false otherwise.
 */
  isJumpedOn(/** @type MovableObject */ mo) {
    let isFalling = this.speedY < 0;
    if (!isFalling) {
      return false;
    }
    let charCollisionRect = this.getCurrentCollisionRect();
    let moCollisionRect = mo.getCurrentCollisionRect();
    if (charCollisionRect.y2 < moCollisionRect.y1) {
      return false;
    }
    let charMid = (charCollisionRect.x1 + charCollisionRect.x2) / 2;
    let moMid = (moCollisionRect.x1 + moCollisionRect.x2) / 2;
    let tolerance = (charCollisionRect.x2 - charCollisionRect.x1) / 2;
    tolerance = 60;
    let moBoundLeft = moMid - tolerance;
    let moBoundRight = moMid + tolerance;
    let horizontalOverlap = charMid >= moBoundLeft && charMid <= moBoundRight;
    this.elaraJumpedOnEnemy = horizontalOverlap;
    return horizontalOverlap;
  }

  /**
 * Resets the idle timer.
 * @method resetIdleTimer
 */
  resetIdleTimer() {
    this.idleTimer = 0;
  }

/**
 * Plays the death animation.
 * @method playDeathAnimation
 */
  playDeathAnimation() {
    if (!this.deathAnimationComplete) {
      this.playDyingSounds();
      this.img = this.imageCache[this.imagesDying[this.deathAnimationFrame]];
      this.deathAnimationFrame++;
      if (this.deathAnimationFrame >= this.imagesDying.length) {
        this.deathAnimationComplete = true;
      }
    } else {
      // Wechselt zwischen den letzten beiden Bildern
      this.deathAnimationFrame++;
      const animationLength = this.imagesDying.length;
      this.deathAnimationFrame =
        (this.deathAnimationFrame % 2) + (animationLength - 2);
      this.img = this.imageCache[this.imagesDying[this.deathAnimationFrame]];
    }
  }

  /**
 * Plays the dying sounds.
 * @method playDyingSounds
 */
  playDyingSounds() {
    let dyingSound = this.playSound(this.audioDyingSound);
    dyingSound.playbackRate = 0.7;
  }
}
