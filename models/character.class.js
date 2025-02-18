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
  speed = 10; //5
  world;

  constructor() {
    super().loadImage("img/1_Sharkie/1_IDLE/1.png");
    this.loadImages(this.imagesSwim);
    this.loadImages(this.imagesIdle);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 50;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.imagesSwim);
      } else {
        this.playAnimation(this.imagesIdle);
      }
    }, 150);
  }

  jump() {}
}
