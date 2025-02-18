class PufferFish extends MovableObject {
  y = 250;
  width = 50;
  height = 50;
  imagesIdle = [
    "img/pufferFish/Swim/swim1.png",
    "img/pufferFish/Swim/swim2.png",
    "img/pufferFish/Swim/swim3.png",
    "img/pufferFish/Swim/swim4.png",
    "img/pufferFish/Swim/swim5.png",
  ];

  constructor() {
    super().loadImage("img/pufferFish/Swim/swim1.png");
    this.loadImages(this.imagesIdle);

    this.x = 250 + Math.random() * 500;
    this.speed = 0.3 + Math.random() * 0.4;
    this.animate();
  }

  animate() {
    this.moveLeft(this.speed);

    setInterval(() => {
      this.playAnimation(this.imagesIdle);
    }, 200);
  }
}
