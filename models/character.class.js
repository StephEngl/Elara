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
  offset = {
    top: 90,
    right: 140,
    bottom: 120,
    left: 40,
  };
  speed = 5; //5
  world;
  idleTimer = 0;
  longIdleThreshold = 10000;

  constructor() {
    super().setImage("img/Elara/mage_elara/Jump/jump1.png");
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesLongIdle);
    this.loadImages(this.imagesJump);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDying);
    this.applyGravity();
    this.isLongIdleActive = false;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.resetIdleTimer();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft(this.speed);
        this.otherDirection = true;
        this.resetIdleTimer();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.resetIdleTimer();
      }

      this.idleTimer += 1000 / 60;
      this.world.camera_x = -this.x + 30;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDying);
      } else if (this.isHurt()) {
        this.playAnimation(this.imagesHurt);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.imagesJump);
        this.resetIdleTimer();
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.imagesWalking);
          this.resetIdleTimer();
        } else if (this.idleTimer >= this.longIdleThreshold) {
          this.playAnimation(this.imagesLongIdle);
        } else {
          this.playAnimation(this.imagesIdle);
        }
      }
    }, 200);
  }

  jump() {
    this.speedY = 30;
  }

  resetIdleTimer() {
    this.idleTimer = 0;
  }
}
