class Character extends MovableObject {
  imagesWalking = [
    "assets/img/elara/Walk/walk1.png",
    "assets/img/elara/Walk/walk2.png",
    "assets/img/elara/Walk/walk3.png",
    "assets/img/elara/Walk/walk4.png",
    "assets/img/elara/Walk/walk5.png",
    "assets/img/elara/Walk/walk6.png",
  ];
  imagesIdle = [
    "assets/img/elara/Idle/idle1.png",
    "assets/img/elara/Idle/idle9.png",
    "assets/img/elara/Idle/idle10.png",
    "assets/img/elara/Idle/idle11.png",
    "assets/img/elara/Idle/idle12.png",
    "assets/img/elara/Idle/idle13.png",
    "assets/img/elara/Idle/idle14.png",
  ];
  imagesLongIdle = [
    "assets/img/elara/Idle/idle1.png",
    "assets/img/elara/Idle/idle2.png",
    "assets/img/elara/Idle/idle3.png",
    "assets/img/elara/Idle/idle4.png",
    "assets/img/elara/Idle/idle5.png",
    "assets/img/elara/Idle/idle6.png",
    "assets/img/elara/Idle/idle7.png",
    "assets/img/elara/Idle/idle8.png",
    "assets/img/elara/Idle/idle9.png",
    "assets/img/elara/Idle/idle10.png",
    "assets/img/elara/Idle/idle11.png",
    "assets/img/elara/Idle/idle12.png",
    "assets/img/elara/Idle/idle13.png",
    "assets/img/elara/Idle/idle14.png",
  ];
  imagesJump = [
    "assets/img/elara/Jump/jump1.png",
    "assets/img/elara/Jump/jump2.png",
    "assets/img/elara/Jump/jump3.png",
    "assets/img/elara/Jump/jump4.png",
    "assets/img/elara/Jump/jump5.png",
    "assets/img/elara/Jump/jump6.png",
    "assets/img/elara/Jump/jump7.png",
  ];
  imagesHurt = [
    "assets/img/elara/Hurt/hurt1.png",
    "assets/img/elara/Hurt/hurt2.png",
    "assets/img/elara/Hurt/hurt3.png",
    "assets/img/elara/Hurt/hurt4.png",
  ];
  imagesDying = [
    "assets/img/elara/Death/death1.png",
    "assets/img/elara/Death/death2.png",
    "assets/img/elara/Death/death3.png",
    "assets/img/elara/Death/death4.png",
    "assets/img/elara/Death/death5.png",
    "assets/img/elara/Death/death6.png",
    "assets/img/elara/Death/death7.png",
    "assets/img/elara/Death/death8.png",
    "assets/img/elara/Death/death9.png",
    "assets/img/elara/Death/death10.png",
  ];
  imagesAttack = [
    "assets/img/elara/Attack/attack1.png",
    "assets/img/elara/Attack/attack2.png",
    "assets/img/elara/Attack/attack3.png",
    "assets/img/elara/Attack/attack4.png",
    "assets/img/elara/Attack/attack5.png",
    "assets/img/elara/Attack/attack6.png",
    "assets/img/elara/Attack/attack7.png",
  ];
  idleTimer = 0;
  longIdleThreshold = 8000;
  isAttacking = false;

  constructor() {
    super();
    this.setObjectProperties();
    this.loadAllImages();
    this.loadAudio();
    this.applyGravity();
    this.animate();
    this.defeatedAnimationFrame = 0;
    this.defeatedAnimationComplete = false;
    this.deathAnimationInterval = null;
  }

  /**
   * Sets the object properties for the Charakter.
   * @method setObjectProperties
   */
  setObjectProperties() {
    this.setImage("assets/img/elara/Jump/jump1.png");
    this.y = 270;
    this.speed = 5;
    this.offset = {
      top: 70,
      right: 75,
      bottom: 20,
      left: 30,
    };
  }

  /**
   * Loads all character images.
   * @method loadAllImages
   */
  loadAllImages() {
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesLongIdle);
    this.loadImages(this.imagesJump);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDying);
    this.loadImages(this.imagesAttack);
  }

  /**
   * Loads audio files for character actions.
   * @method loadAudio
   */
  loadAudio() {
    this.audioCharakterDefeated = sounds.character.ko;
    this.audioCharakterHit = sounds.character.hurt;
    this.audioCharakterJump = sounds.character.jump;
    this.audioCharakterFootsteps = sounds.character.footsteps;
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
      this.resetIdleTimer();
    }
    if (this.world.keyboard.LEFT && this.x > -680) {
      this.moveLeft(this.speed);
      this.setOtherDirection(true);
      this.resetIdleTimer();
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.resetIdleTimer();
    }
  }

  /**
   * Resets the idle timer.
   * @method resetIdleTimer
   */
  resetIdleTimer() {
    this.idleTimer = 0;
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
    this.world.camera_x = -this.x + 50;
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
    if (!this.defeatedAnimationComplete) {
      this.playDefeatedAnimation();
    } else {
      this.remove();
      gameOver = true;
      stopGame();
    }
  }

  /**
   * Handles the character's hurt state.
   * @method handleHurtState
   */
  handleHurtState() {
    this.playAnimation(this.imagesHurt);
    this.audioCharakterHit.play();
    this.audioCharakterFootsteps.pause();
    this.resetIdleTimer();
  }

  /**
   * Handles the character's jump state.
   * @method handleJumpState
   */
  handleJumpState() {
    this.playAnimation(this.imagesJump);
    sounds.character.footsteps.pause();
  }

  /**
   * Handles the character's state when on the ground.
   * @method handleGroundState
   */
  handleGroundState() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.imagesWalking);
      this.audioCharakterFootsteps.play();
    } else if (this.idleTimer >= this.longIdleThreshold) {
      this.playAnimation(this.imagesLongIdle);
      this.audioCharakterFootsteps.pause();
    } else {
      this.playAnimation(this.imagesIdle);
      this.audioCharakterFootsteps.pause();
    }
  }

  /**
   * Makes the character jump.
   * @method jump
   */
  jump() {
    this.speedY = 30;
    this.audioCharakterJump.play();
  }

  /**
   * Checks if the character jumped on an enemy.
   * @method isJumpedOn
   * @param {MovableObject} mo - The movable object to check collision with.
   * @returns {boolean} - True if the character jumped on the enemy, false otherwise.
   */
  isJumpedOn(/** @type MovableObject */ mo) {
    if (!this.isCharacterFalling() || mo instanceof Endboss) {
      return false;
    }
    return this.isColliding(mo);
  }

  isCharacterFalling() {
    return this.speedY < 0;
  }

  /**
   * Plays the death animation.
   * @method playDefeatedAnimation
   */
  playDefeatedAnimation() {
    if (this.defeatedAnimationFrame < this.imagesDying.length) {
      this.img = this.imageCache[this.imagesDying[this.defeatedAnimationFrame]];
      this.defeatedAnimationFrame++;
    } else {
      this.defeatedAnimationComplete = true;
    }
  }

  /**
   * Plays the sound when character is defeated.
   * @method playDefeatedSound
   */
  playDefeatedSound() {
    this.audioCharakterDefeated.play();
    this.audioCharakterDefeated.playbackRate = 0.7;
  }
}
