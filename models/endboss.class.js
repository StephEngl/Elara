class Endboss extends MovableObject {
  imagesIntro = [
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Walk2.png",
    "assets/img/enemies/endboss/dragon/Walk3.png",
    "assets/img/enemies/endboss/dragon/Walk4.png",
    "assets/img/enemies/endboss/dragon/Walk5.png",
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Walk2.png",
    "assets/img/enemies/endboss/dragon/Walk3.png",
    "assets/img/enemies/endboss/dragon/Walk4.png",
    "assets/img/enemies/endboss/dragon/Walk5.png",
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Walk2.png",
    "assets/img/enemies/endboss/dragon/Walk3.png",
    "assets/img/enemies/endboss/dragon/Walk4.png",
    "assets/img/enemies/endboss/dragon/Walk5.png",
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
  fireballCooldown = 2000; // 2 seconds between attacks
  lastFireballTime = 0;
  currentAnimationFrame = 0;
  lastFrameUpdate = 0;

  constructor() {
    super();
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
   * @method loadAllImages
   */
  loadAllImages() {
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesDying);
  }

  /**
   * Sets the object properties for the Endboss.
   * @method setObjectProperties
   */
  setObjectProperties() {
    this.height = 600;
    this.width = 600;
    this.speed = 20;
    this.x = 1000; //3800
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
   * @method loadAudio
   */
  loadAudio() {
    this.audioEndbossRoar = sounds.dragonBoss.roar;
    this.audioEndbossHurt = sounds.dragonBoss.hurt;
    this.audioEndbossFire = sounds.dragonBoss.attack;
    this.audioEndbossDefeated = sounds.dragonBoss.ko;
  }

  activate() {
    this.isActive = true;
    this.initializeStateMachine();
  }

  initializeStateMachine() {
    setInterval(() => this.updateStateMachine(), 250);
  }

  updateStateMachine() {
    if (!this.isActive || this.isPaused) return;
    if (this.isDying) {
      this.handleDyingState();
      return;
    }

    if (this.isHurted) {
      this.handleHurtState();
      return;
    }

    if (this.isPlayerInRange()) {
      this.changeState(this.EnemyState.ATTACKING);
    } else {
      this.changeState(this.EnemyState.WALKING);
    }

    switch (this.state) {
      case this.EnemyState.INTRO:
        this.handleIntroState();
        break;

      case this.EnemyState.IDLE:
        this.handleIdleState();
        break;

      case this.EnemyState.WALKING:
        this.handleWalkingState();
        break;

      case this.EnemyState.ATTACKING:
        this.handleAttackState();
        break;

      default:
        console.error("Ungültiger Zustand:", this.state);
    }
  }

  changeState(newState) {
    this.state = newState;
    this.stateTimer = 0;
  }

  handleIntroState() {
    this.audioEndbossRoar.play();
    this.playAnimation(this.imagesIntro);
    this.moveLeft(this.speed);

    if (this.stateTimer++ > 8) {
      this.changeState(this.EnemyState.IDLE);
    }
  }

  handleIdleState() {
    this.playAnimation(this.imagesIdle);

    if (this.stateTimer++ > 6) {
      this.changeState(this.EnemyState.WALKING);
    }
  }

  handleWalkingState() {
    this.playAnimation(this.imagesWalking);
    this.moveLeft(this.speed);

    if (this.isPlayerInRange()) {
      this.changeState(this.EnemyState.ATTACKING);
    }
  }

  handleAttackState() {
    // this.playAnimation(this.imagesAttack);
    // this.checkFirebreathAttack();

    // // Angriffslogik hier
    // if (this.stateTimer++ > 8) {
    //   // 4 * 250ms = 1000ms
    //   this.changeState(this.EnemyState.WALKING);
    // }
    this.playAnimation(this.imagesAttack);

    if (this.currentAnimationFrame === 2 && !this.attackExecuted) {
      this.checkFirebreathAttack();
      this.attackExecuted = true;
    }

    if (this.currentAnimationFrame >= this.imagesAttack.length - 1) {
      this.resetAttackState();
    }
  }

  resetAttackState() {
    this.changeState(this.EnemyState.WALKING);
    this.isAttacking = false;
    this.attackExecuted = false;
  }

  checkFirebreathAttack() {
    if (this.isPlayerInRange() && this.canFire() && !isPaused) {
      this.createDragonFire();
      this.lastFireballTime = Date.now();
    }
  }

  canFire() {
    return Date.now() - this.lastFireballTime > this.fireballCooldown;
  }

  createDragonFire() {
    const fireball = new FlyingObject(this.x - 20, this.y + 230, true, true);
    world.flyingObjects.push(fireball);
    this.audioEndbossFire.play();
  }

  changeState(newState) {
    this.state = newState;
    this.stateTimer = 0;
  }

  isPlayerInRange() {
    return Math.abs(this.x - world.character.x) < 200;
  }

  handleDyingState() {
    this.playAnimation(this.imagesDying);
  }

  /**
   * Initiates the dying sequence for the Endboss.
   * @method die
   */
  die() {
    this.isDying = true;
    this.audioEndbossDefeated.play();
    this.audioEndbossDefeated.playbackRate = 1.1;
    setTimeout(() => {
      this.shouldRemove = true;
      gameWon = true;
      stopGame();
    }, 900);
  }
}
