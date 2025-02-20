class LittleDragon extends MovableObject {
  y = 320;
  width = 150;
  height = 150;
  imagesIdle = [
    "img/Elara/enemies/small_dragon/Walk1.png",
    "img/Elara/enemies/small_dragon/Walk2.png",
    "img/Elara/enemies/small_dragon/Walk3.png",
    "img/Elara/enemies/small_dragon/Walk4.png"
  ];
  offset = {
    top: 60,
    right: 50,
    bottom: 50,
    left: 30,
  };


  constructor() {
    super().setImage("img/Elara/enemies/small_dragon/Idle1.png");
    this.loadImages(this.imagesIdle);

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
