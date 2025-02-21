class FlyingObject extends MovableObject {
  imagesFireball = [
    "img/Elara/mage_elara/Fire/fire1.png",
    "img/Elara/mage_elara/Fire/fire2.png",
    "img/Elara/mage_elara/Fire/fire3.png",
    "img/Elara/mage_elara/Fire/fire4.png",
    "img/Elara/mage_elara/Fire/fire5.png",
    "img/Elara/mage_elara/Fire/fire6.png",
    "img/Elara/mage_elara/Fire/fire7.png",
    "img/Elara/mage_elara/Fire/fire8.png",
    "img/Elara/mage_elara/Fire/fire9.png",
  ];

  //   x, y, width, height, speedX
  constructor(x, y) {
    super().setImage("img/Elara/mage_elara/Fire/fire1.png");
    this.loadImages(this.imagesFireball);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speedX = 10;
    this.acceleration = 0.5;

    this.fire();
  }

  fire() {
    this.playAnimation(this.imagesFireball);
    // this.applyGravity();
    setInterval(() => {
      this.x += 40;
    }, 500);
  }
}
