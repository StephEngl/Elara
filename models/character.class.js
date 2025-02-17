class Character extends MovableObject {
  speed = 5;
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
  world;

  constructor() {
    super().loadImage("img/1_Sharkie/1_IDLE/1.png");
    this.loadImages(this.imagesSwim);
    this.loadImages(this.imagesIdle);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
      }
      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
      } 
      
    }, 1000 / 60);
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //Walk animation
        let i = this.currentImage % this.imagesSwim.length; // let i = 7 % 6 => 1, Rest 1 -> i = 0,1,...,17,0,1,...,17,...
        let path = this.imagesSwim[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
      else {
        let i = this.currentImage % this.imagesIdle.length; // let i = 7 % 6 => 1, Rest 1 -> i = 0,1,...,17,0,1,...,17,...
        let path = this.imagesIdle[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 150);
  }

  jump() {}
}
