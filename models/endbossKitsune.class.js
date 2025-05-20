/**
 * Represents the final boss enemy in the game.
 * Extends the MovableObject class.
 */
class EndbossKitsune extends MovableObject {
  imagesIntro = [
    "assets/img/enemies/endboss/kitsune/walk1.png",
    "assets/img/enemies/endboss/kitsune/walk2.png",
    "assets/img/enemies/endboss/kitsune/walk3.png",
    "assets/img/enemies/endboss/kitsune/walk4.png",
    "assets/img/enemies/endboss/kitsune/walk5.png",
  ];
  imagesIdle = [
    "assets/img/enemies/endboss/kitsune/idle1.png",
    "assets/img/enemies/endboss/kitsune/idle2.png",
    "assets/img/enemies/endboss/kitsune/idle3.png",
    "assets/img/enemies/endboss/kitsune/idle4.png",
    "assets/img/enemies/endboss/kitsune/idle5.png",
  ];
  imagesWalking = [
    "assets/img/enemies/endboss/kitsune/walk1.png",
    "assets/img/enemies/endboss/kitsune/walk2.png",
    "assets/img/enemies/endboss/kitsune/walk3.png",
    "assets/img/enemies/endboss/kitsune/walk4.png",
    "assets/img/enemies/endboss/kitsune/walk5.png",
    "assets/img/enemies/endboss/kitsune/walk6.png",
    "assets/img/enemies/endboss/kitsune/walk7.png",
    "assets/img/enemies/endboss/kitsune/walk8.png",
  ];
  imagesAttack = [
    "assets/img/enemies/endboss/kitsune/attack1.png",
    "assets/img/enemies/endboss/kitsune/attack2.png",
    "assets/img/enemies/endboss/kitsune/attack3.png",
    "assets/img/enemies/endboss/kitsune/attack4.png",
    "assets/img/enemies/endboss/kitsune/attack5.png",
    "assets/img/enemies/endboss/kitsune/attack6.png",
    "assets/img/enemies/endboss/kitsune/attack7.png",
    "assets/img/enemies/endboss/kitsune/attack8.png",
    "assets/img/enemies/endboss/kitsune/attack9.png",
  ];
  imagesHurt = [
    "assets/img/enemies/endboss/kitsune/hurt1.png",
    "assets/img/enemies/endboss/kitsune/hurt2.png",
  ];
  imagesDying = [
    "assets/img/enemies/endboss/kitsune/dead1.png",
    "assets/img/enemies/endboss/kitsune/dead2.png",
    "assets/img/enemies/endboss/kitsune/dead3.png",
    "assets/img/enemies/endboss/kitsune/dead4.png",
    "assets/img/enemies/endboss/kitsune/dead5.png",
    "assets/img/enemies/endboss/kitsune/dead6.png",
    "assets/img/enemies/endboss/kitsune/dead7.png",
    "assets/img/enemies/endboss/kitsune/dead8.png",
    "assets/img/enemies/endboss/kitsune/dead9.png",
    "assets/img/enemies/endboss/kitsune/dead10.png",
  ];
  hadFirstContact = false;
  EnemyState = {
    INTRO: "intro",
    IDLE: "idle",
    WALKING: "walking",
    ATTACKING: "attacking",
    HURT: "hurting",
    DYING: "dying",
  };
  fireballCooldown = 1000;
  lastFireballTime = 0;
  currentImage = 0;
  introPlayed = false;
  attackExecuted = false;
  hearts = 5;

  /**
   * Creates an instance of Endboss.
   */
  constructor(level) {
    super(level);
    this.setImage(this.imagesIntro[1]);
    this.loadAllImages();
    this.loadAudio();
    this.setObjectProperties();
    this.state = this.EnemyState.INTRO;
    this.stateTimer = 0;
    this.dyingAnimationPlayed = false;
    this.isActive = false;
  }

  /**
   * Loads all images for the Endboss.
   */
  loadAllImages() {
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDying);
  }

  /**
   * Sets the object properties for the Endboss.
   */
  setObjectProperties() {
    this.height = 300;
    this.width = 300;
    this.speed = 20;
    this.x = 3800;
    this.y = 140;
    this.offset = {
      top: 100,
      right: 100,
      bottom: 0,
      left: 50,
    };
    this.otherDirection = true;
  }

  /**
   * Loads audio files for endboss actions.
   */
  loadAudio() {
    this.audioEndbossLaugh = sounds.kitsune.laugh;
    this.audioEndbossHurt = sounds.kitsune.hurt;
    this.audioEndbossDefeated = sounds.kitsune.ko;
  }

  /**
   * Activates the Endboss, initializing its state machine.
   */
  activate() {
    this.isActive = true;
    this.initializeStateMachine();
  }

  /**
   * Initializes the state machine by setting up a timer to update the state.
   */
  initializeStateMachine() {
    setGameInterval(() => this.updateStateMachine(), 150);
  }

  /**
   * Updates the state machine of the Endboss based on various conditions.
   */
  updateStateMachine() {
    if (!this.isActive || this.isPaused) return;
    if (this.isFirstContact()) {
      this.handleFirstContact();
    }
    if (this.isDead()) {
      this.handleDyingState();
      return;
    }
    if (this.isHurted) {
      this.handleHurtState();
      return;
    }
    if (this.isActive) {
      this.handleActiveState();
    }
  }

  /**
   * Checks if this is the first contact with the Endboss.
   * @returns {boolean}
   */
  isFirstContact() {
    return this.isActive && !this.hadFirstContact;
  }

  /**
   * Handles the first contact with the Endboss.
   */
  handleFirstContact() {
    this.changeBackgroundMusicToBossFight();
    this.hadFirstContact = true;
  }

  /**
   * Handles the active state of the Endboss.
   */
  handleActiveState() {
    const frame = this.currentImage % this.getCurrentAnimationLength();
    this.handleStateSpecificLogic(frame);
  }

  /**
   * Gets the length of the current animation based on the current state.
   * @returns {number} The length of the current animation.
   */
  getCurrentAnimationLength() {
    switch (this.state) {
      case this.EnemyState.INTRO:
        return this.imagesIntro.length;
      case this.EnemyState.IDLE:
        return this.imagesIdle.length;
      case this.EnemyState.WALKING:
        return this.imagesWalking.length;
      case this.EnemyState.ATTACKING:
        return this.imagesAttack.length;
      case this.EnemyState.DYING:
        return this.imagesDying.length;
    }
  }

  /**
   * Handles the state-specific logic based on the current state and frame.
   * @param {number} frame - The current frame of the animation.
   */
  handleStateSpecificLogic(frame) {
    const stateHandlers = {
      [this.EnemyState.INTRO]: () => this.handleIntroLogic(frame),
      [this.EnemyState.IDLE]: () => this.handleIdleLogic(frame),
      [this.EnemyState.WALKING]: () => this.handleWalkingLogic(frame),
      [this.EnemyState.ATTACKING]: () => this.handleAttackLogic(frame),
      default: () => console.error("Ungültiger Zustand:", this.state),
    };
    (stateHandlers[this.state] || stateHandlers.default)();
  }

  /**
   * Changes the state of the Endboss to a new state.
   * @param {string} newState - The new state to change to.
   */
  changeState(newState) {
    this.state = newState;
    this.stateTimer = 0;
    this.currentImage = 0;
    this.attackExecuted = false;
  }

  /**
   * Handles the logic for the intro state.
   * @param {number} frame - The current frame of the animation.
   */
  handleIntroLogic(frame) {
    this.handleIntroLaugh(frame);
    this.playAnimation(this.imagesIntro);
    this.moveLeft(this.speed);
    if (this.stateTimer++ > 8) {
      this.transitionToIdleState();
    }
  }

  /**
   * Handles the roar sound during the intro state.
   * @param {number} frame - The current frame of the animation.
   */
  handleIntroLaugh(frame) {
    if (frame === 0 && !this.introRoarPlayed) {
      this.audioEndbossLaugh.play();
      this.introRoarPlayed = true;
    }
  }

  /**
   * Transitions the Endboss to the idle state after the intro is complete.
   */
  transitionToIdleState() {
    this.changeState(this.EnemyState.IDLE);
    this.introRoarPlayed = false;
    this.introPlayed = true;
  }

  /**
   * Handles the logic for the idle state.
   * @param {number} frame - The current frame of the animation.
   */
  handleIdleLogic(frame) {
    this.playAnimation(this.imagesIdle);

    if (this.stateTimer++ > 6) {
      this.changeState(this.EnemyState.WALKING);
    }
  }

  /**
   * Handles the logic for the walking state.
   * @param {number} frame - The current frame of the animation.
   */
  handleWalkingLogic(frame) {
    this.playAnimation(this.imagesWalking);
    this.moveLeft(this.speed);

    if (this.isPlayerInRange(200)) {
      this.changeState(this.EnemyState.ATTACKING);
    }
  }

  /**
   * Handles the logic for the attacking state.
   * @param {number} frame - The current frame of the animation.
   */
  handleAttackLogic(frame) {
    this.playAnimation(this.imagesAttack);
    if (frame === 2 && !this.attackExecuted) {
      this.checkFoxfireAttack();
      this.attackExecuted = true;
    }

    if (frame >= this.imagesAttack.length - 1) {
      this.resetAttackState();
    }
  }

  /**
   * Resets the attack state, changing the state back to walking.
   */
  resetAttackState() {
    this.changeState(this.EnemyState.WALKING);
    this.isAttacking = false;
    this.attackExecuted = false;
  }

  /**
   * Checks if a firebreath attack can be executed and triggers it.
   */
  checkFoxfireAttack() {
    if (this.canFire() && !isPaused) {
      this.createFoxFire();
      this.lastFireballTime = Date.now();
    }
  }

  /**
   * Checks if the fireball cooldown has passed.
   * @returns {boolean} True if the Endboss can fire a fireball, false otherwise.
   */
  canFire() {
    return Date.now() - this.lastFireballTime > this.fireballCooldown;
  }

  /**
   * Creates a fireball and adds it to the game world.
   */
  createFoxFire() {
    const fireball = new FlyingObject(this.x, this.y + 160, true, "foxfire");
    world.flyingObjects.push(fireball);
    this.audioEndbossLaugh.play();
  }

  /**
   * Handles the logic for the dying state.
   */
  handleDyingState() {
    if (!this.dyingAnimationPlayed) {
      this.isDying = true;
      this.audioEndbossDefeated.play();
      this.dyingAnimationPlayed = true;
    }
    this.playAnimation(this.imagesDying);

    if (this.currentImage >= this.imagesDying.length - 1) {
      this.die();
    }
  }

  /**
   * Handles the logic for the hurt state.
   */
  handleHurtState() {
    this.playAnimation(this.imagesHurt);
    this.audioEndbossHurt.play();

    if (this.stateTimer++ > 2) {
      this.isHurted = false;
      this.changeState(this.EnemyState.WALKING);
    }
  }

  /**
   * Reduces the number of hearts the Endboss has.
   */
  reduceHeart() {
    if (this.hearts > 0) {
      this.hearts--;
    }

    if (this.hearts <= 0) this.energy = 0;
  }

  /**
   * Initiates the dying sequence for the Endboss.
   */
  die() {
    this.shouldRemove = true;
    setTimeout(() => {
      gameWon = true;
      stopGame();
    }, 500);
  }

  /**
   * Changes the background music to the boss fight music.
   */
  changeBackgroundMusicToBossFight() {
    world.level.changeBackgroundMusic(sounds.environment.bgBossfight.src);
  }
}
