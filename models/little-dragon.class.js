class LittleDragon extends MovableObject {
  imagesIdle = [
    "img/Elara/enemies/small_dragon/Walk1.png",
    "img/Elara/enemies/small_dragon/Walk2.png",
    "img/Elara/enemies/small_dragon/Walk3.png",
    "img/Elara/enemies/small_dragon/Walk4.png"
  ];

  constructor() {
    super().setImage("img/Elara/enemies/small_dragon/Idle1.png");
    this.loadImages(this.imagesIdle);
    this.offset = {
      top: 60,
      right: 50,
      bottom: 50,
      left: 30,
    };
    this.y = 320;
    this.width = 150;
    this.height = 150;
    this.x = 500 + Math.random() * 3000;
    this.speed = 0.3 + Math.random() * 0.4;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
      this.otherDirection = true;
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.imagesIdle);
    }, 200);
  }
}
