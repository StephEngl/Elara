class LittleDragon extends MovableObject {
  imagesIdle = [
    "assets/img/enemies/small_dragon/Walk1.png",
    "assets/img/enemies/small_dragon/Walk2.png",
    "assets/img/enemies/small_dragon/Walk3.png",
    "assets/img/enemies/small_dragon/Walk4.png",
  ];
  imagesDying = [
    "assets/img/enemies/small_dragon/Death1.png",
    "assets/img/enemies/small_dragon/Death2.png",
    "assets/img/enemies/small_dragon/Death3.png",
    "assets/img/enemies/small_dragon/Death4.png",
  ];

  constructor() {
    super().setImage("assets/img/enemies/small_dragon/Idle1.png");
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesDying);
    this.y = 310;
    this.offset = {
      top: 60,
      right: 50,
      bottom: 50,
      left: 30,
    };
    this.x = 500 + Math.random() * 3000;
    this.speed = 0.3 + Math.random() * 0.4;
    this.isDying = false;
    this.otherDirection = true;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
      // this.otherDirection = true;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDying) {
        this.playAnimation(this.imagesDying);
      } else {
        this.playAnimation(this.imagesIdle);
      }
    }, 200);
  }

  die() {
    this.isDying = true;
    setTimeout(() => {
      this.remove();
    }, 800); // Nach 800ms (4 Bilder bei 200ms Intervall ) wird das Objekt entfernt
  }
}
