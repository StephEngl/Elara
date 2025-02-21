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
    this.fire();
  }

  fire() {
    this.playAnimation(this.imagesFireball);
    this.applyGravity();
    setInterval(() => {
      this.x += 30;
    }, 30);
  }

  playAnimation(imagesToChange) {
    let i = this.currentImage % imagesToChange.length; // let i = 7 % 6 => 1, Rest 1 -> i = 0,1,...,17,0,1,...,17,...
    let path = imagesToChange[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
