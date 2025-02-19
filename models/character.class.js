class Character extends MovableObject {
  imagesIdle = [
    "img/1_Sharkie/1_IDLE/1.png",
    "img/1_Sharkie/1_IDLE/2.png",
    "img/1_Sharkie/1_IDLE/3.png",
    "img/1_Sharkie/1_IDLE/4.png",
    "img/1_Sharkie/1_IDLE/5.png",
    "img/1_Sharkie/1_IDLE/6.png",
    "img/1_Sharkie/1_IDLE/7.png",
    "img/1_Sharkie/1_IDLE/8.png",
    "img/1_Sharkie/1_IDLE/9.png",
    "img/1_Sharkie/1_IDLE/10.png",
    "img/1_Sharkie/1_IDLE/11.png",
    "img/1_Sharkie/1_IDLE/12.png",
    "img/1_Sharkie/1_IDLE/13.png",
    "img/1_Sharkie/1_IDLE/14.png",
    "img/1_Sharkie/1_IDLE/15.png",
    "img/1_Sharkie/1_IDLE/16.png",
    "img/1_Sharkie/1_IDLE/17.png",
    "img/1_Sharkie/1_IDLE/18.png",
  ];

  imagesSwim = [
    "img/1_Sharkie/3_Swim/1.png",
    "img/1_Sharkie/3_Swim/2.png",
    "img/1_Sharkie/3_Swim/3.png",
    "img/1_Sharkie/3_Swim/4.png",
    "img/1_Sharkie/3_Swim/5.png",
    "img/1_Sharkie/3_Swim/6.png",
  ];

  imagesLongIdle = [
    "img/1_Sharkie/2_Long_IDLE/i1.png",
    "img/1_Sharkie/2_Long_IDLE/I2.png",
    "img/1_Sharkie/2_Long_IDLE/I3.png",
    "img/1_Sharkie/2_Long_IDLE/I4.png",
    "img/1_Sharkie/2_Long_IDLE/I5.png",
    "img/1_Sharkie/2_Long_IDLE/I6.png",
    "img/1_Sharkie/2_Long_IDLE/I7.png",
    "img/1_Sharkie/2_Long_IDLE/I8.png",
    "img/1_Sharkie/2_Long_IDLE/I9.png",
    "img/1_Sharkie/2_Long_IDLE/I10.png",
    "img/1_Sharkie/2_Long_IDLE/I11.png",
    "img/1_Sharkie/2_Long_IDLE/I12.png",
    "img/1_Sharkie/2_Long_IDLE/I13.png",
    "img/1_Sharkie/2_Long_IDLE/I14.png",
  ];
  speed = 10; //5
  world;

  constructor() {
    super().loadImage("img/1_Sharkie/1_IDLE/1.png");
    this.loadImages(this.imagesSwim);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesLongIdle);
    // this.applyGravity();
    this.spawn();
    this.swimmingDown();
    this.swimmingUp();
    this.isLongIdleActive = false;
    this.longIdleStartIndex = 9; // Index von I10 im imagesLongIdle Array

    this.animate();
  }

  animate() {
    let idleTimer = 0;
    const LONG_IDLE_THRESHOLD = 10000;

    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        idleTimer = 0;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        idleTimer = 0;
      }
      // if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      //   this.jump();
      //   idleTimer = 0;
      // }
      if (this.world.keyboard.UP && this.y > 0) {
        this.speedY = 10;
        this.swimmingUp();
        idleTimer = 0;
      }
      if (this.world.keyboard.DOWN && this.y < 300) {
        this.speedY = -10;
        this.swimmingDown();
        idleTimer = 0;
      }

      idleTimer += 1000 / 60;
      this.world.camera_x = -this.x + 50;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.imagesSwim);
        idleTimer = 0;
      } else if (idleTimer >= LONG_IDLE_THRESHOLD) {
        this.playLongIdleAnimation();
      } else {
        this.playAnimation(this.imagesIdle);
      }
    }, 150);
  }

  spawn() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  swimmingUp() {
    this.y -= this.speedY;
    // this.speedY += this.acceleration;
}

  swimmingDown() {
        this.y -= this.speedY;
        // this.speedY += this.acceleration;
        console.log(this.speedY);
        
  }

  playLongIdleAnimation() {
    if (!this.isLongIdleActive) {
      // Spiele die komplette Animation einmal ab
      this.playAnimation(this.imagesLongIdle);
      if (this.currentImage >= this.imagesLongIdle.length) {
        this.isLongIdleActive = true;
        this.currentImage = this.longIdleStartIndex;
      }
    } else {
      // Spiele nur die letzten Bilder (I10-I14) in Schleife
      let i =
        (this.currentImage - this.longIdleStartIndex) %
        (this.imagesLongIdle.length - this.longIdleStartIndex);
      let path = this.imagesLongIdle[i + this.longIdleStartIndex];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  jump() {
    this.speedY = 30;
  }
}
