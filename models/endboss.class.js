/**
 * Represents the final boss enemy in the game.
 * Extends the MovableObject class.
 */
class Endboss extends MovableObject {
  imagesIntro = [
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Walk2.png",
    "assets/img/enemies/endboss/dragon/Walk3.png",
    "assets/img/enemies/endboss/dragon/Walk4.png",
    "assets/img/enemies/endboss/dragon/Walk5.png",
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Attack1.png",
    "assets/img/enemies/endboss/dragon/Attack2.png",
    "assets/img/enemies/endboss/dragon/Attack3.png",
    "assets/img/enemies/endboss/dragon/Attack4.png",
  ];
  imagesIdle = [
    "assets/img/enemies/endboss/dragon/Idle1.png",
    "assets/img/enemies/endboss/dragon/Idle2.png",
    "assets/img/enemies/endboss/dragon/Idle3.png",
  ];
  imagesWalking = [
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Walk2.png",
    "assets/img/enemies/endboss/dragon/Walk3.png",
    "assets/img/enemies/endboss/dragon/Walk4.png",
    "assets/img/enemies/endboss/dragon/Walk5.png",
  ];
  imagesAttack = [
    "assets/img/enemies/endboss/dragon/Attack1.png",
    "assets/img/enemies/endboss/dragon/Attack2.png",
    "assets/img/enemies/endboss/dragon/Attack3.png",
    "assets/img/enemies/endboss/dragon/Attack4.png",
  ];
  imagesHurt = [
    "assets/img/enemies/endboss/dragon/Hurt1.png",
    "assets/img/enemies/endboss/dragon/Hurt2.png",
  ];
  imagesDying = [
    "assets/img/enemies/endboss/dragon/Death1.png",
    "assets/img/enemies/endboss/dragon/Death2.png",
    "assets/img/enemies/endboss/dragon/Death3.png",
    "assets/img/enemies/endboss/dragon/Death4.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
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
  fireballCooldown = 2000;
  lastFireballTime = 0;
  currentImage = 0;
  introPlayed = false;
  attackExecuted = false;
  hearts = 3;

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
    this.height = 600;
    this.width = 600;
    this.speed = 30;
    this.x = 3800;
    this.y = -40;
    this.offset = {
      top: 300,
      right: 100,
      bottom: 150,
      left: 150,
    };
    this.otherDirection = true;
  }

  /**
   * Loads audio files for endboss actions.
   */
  loadAudio() {
    this.audioEndbossRoar = sounds.dragonBoss.roar;
    this.audioEndbossHurt = sounds.dragonBoss.hurt;
    this.audioEndbossFire = sounds.dragonBoss.attack;
    this.audioEndbossDefeated = sounds.dragonBoss.ko;
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
    setGameInterval(() => this.updateStateMachine(), 250);
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
    this.handleIntroRoar(frame);
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
  handleIntroRoar(frame) {
    if (frame === 0 && !this.introRoarPlayed) {
      this.audioEndbossRoar.play();
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
   */
  handleIdleLogic() {
    this.playAnimation(this.imagesIdle);

    if (this.stateTimer++ > 6) {
      this.changeState(this.EnemyState.WALKING);
    }
  }

  /**
   * Handles the logic for the walking state.
   */
  handleWalkingLogic() {
    this.playAnimation(this.imagesWalking);
    this.moveLeft(this.speed);

    if (this.isPlayerInRange(180)) {
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
      this.checkFirebreathAttack();
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
  checkFirebreathAttack() {
    if (this.canFire() && !isPaused) {
      this.createDragonFire();
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
  createDragonFire() {
    const fireball = new FlyingObject(
      this.x - 50,
      this.y + 230,
      true,
      "firebreath"
    );
    world.flyingObjects.push(fireball);
    this.audioEndbossFire.play();
  }

  /**
   * Handles the logic for the dying state.
   */
  handleDyingState() {
    this.playAnimation(this.imagesDying);
    this.die();
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
    this.isDying = true;
    this.audioEndbossDefeated.play();
    this.audioEndbossDefeated.playbackRate = 1.5;
    setTimeout(() => {
      stopGame();
    }, 1500);
  }

  /**
   * Changes the background music to the boss fight music.
   */
  changeBackgroundMusicToBossFight() {
    world.level.changeBackgroundMusic(sounds.environment.bgBossfight.src);
  }
}
