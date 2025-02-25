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

  constructor(x, y) {
    super().setImage("img/Elara/mage_elara/Fire/fire1.png");
    this.loadImages(this.imagesFireball);
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speedX = 10;
    this.acceleration = 0.5;
    this.currentImageIndex = 0;
    this.shouldRemove = false;

    this.fire(this.imagesFireball);
  }

  fire(imagesAttack) {
    // this.applyGravity();
    const animationInterval = setInterval(() => {
      if (this.currentImageIndex >= imagesAttack.length) {
        clearInterval(animationInterval);
        this.setRemoveState();
      } else {
        this.animateFireball(imagesAttack);
        this.x += 40;
      }
    }, 100);
  }

  animateFireball(imagesAttack) {
    if (this.currentImageIndex < imagesAttack.length) {
      let path = imagesAttack[this.currentImageIndex];
      this.img = this.imageCache[path];
      this.currentImageIndex++;
    }
  }
}
