/**
 * Represents the main character in the game.
 * Extends the MovableObject class to provide movement, animations, and interactions.
 */
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
  lastFireballTime = 0;

  /**
   * Initializes a new instance of the Character class and sets up its properties, animations, and behavior.
   */
  constructor() {
    super();
    this.setObjectProperties();
    this.loadAllImages();
    this.loadAudio();
    this.applyGravity();
    this.animate();
    this.defeatedAnimationFrame = 0;
    this.defeatedAnimationComplete = false;
  }

  /**
   * Sets the object properties for the Charakter.
   * @method setObjectProperties
   */
  setObjectProperties() {
    this.setImage("assets/img/elara/Jump/jump1.png");
    this.x = 180;
    this.y = 290;
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
    this.audioCharakterAttack = sounds.character.attack;
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
    setGameInterval(() => {
      if (!this.isDead()) {
        this.handleMovement();
        this.updateIdleTimer();
      }
    }, 1000 / 60);
  }

  /**
   * Handles character movement based on keyboard input.
   * @method handleMovement
   */
  handleMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.handleRightMovement();
    }
    if (this.world.keyboard.LEFT && this.x > -680) {
      this.handleLeftMovement();
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.resetIdleTimer();
    }
  }

  /**
   * Handles movement to the right.
   */
  handleRightMovement() {
    this.moveRight();
    this.setOtherDirection(false);
    this.resetIdleTimer();
  }

  /**
   * Handles movement to the left.
   */
  handleLeftMovement() {
    this.moveLeft(this.speed);
    this.setOtherDirection(true);
    this.resetIdleTimer();
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
   * Sets up the animation interval for the character.
   * @method startAnimationInterval
   */
  startAnimationInterval() {
    setGameInterval(() => {
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
    gameOver = true;
    if (!this.defeatedAnimationComplete) {
      this.playDefeatedSound();
      this.playDefeatedAnimation();
    } else {
      this.remove();
      stopGame();
    }
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
    if (!this.soundPlayed) {
      this.audioCharakterDefeated.play();
      this.audioCharakterDefeated.playbackRate = 0.7;
      this.soundPlayed = true;
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
   * @param {MovableObject} mo - The movable object to check collision with.
   * @returns {boolean} - True if the character jumped on the enemy, false otherwise.
   */
  isJumpedOn(/** @type MovableObject */ mo) {
    if (!this.isCharacterFalling() || mo instanceof Endboss) {
      return false;
    }
    return this.isColliding(mo);
  }

  /**
   * Checks if the character is currently falling.
   * @returns {boolean} - True if the character is falling, false otherwise.
   */
  isCharacterFalling() {
    return this.speedY < 0;
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
    const cooldownPeriod = 200;
    return (
      (this.world.keyboard.F || fireButtonPressed) &&
      this.world.crystalbar.collectedCrystals > 0 &&
      currentTime - this.lastFireballTime >= cooldownPeriod
    );
  }

  /**
   * Creates a new fireball and adds it to the flyingObjects array.
   */
  createFireball() {
    this.playAnimation(this.imagesAttack);
    this.audioCharakterAttack.play();
    const fireball = this.createNewFireball();
    this.world.flyingObjects.push(fireball);
    this.world.decreaseCrystalbar();
    fireButtonPressed = false;
    this.lastFireballTime = Date.now();
  }

  /**
   * Creates a new FlyingObject (fireball).
   * @returns {FlyingObject} The new FlyingObject.
   */
  createNewFireball() {
    return new FlyingObject(
      this.x + this.offset.right,
      this.y + this.offset.top,
      this.otherDirection
    );
  }
}
