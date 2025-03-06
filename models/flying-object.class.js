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

  constructor(x, y, isMovingLeft) {
    super().setImage("img/Elara/mage_elara/Fire/fire1.png");
    this.loadImages(this.imagesFireball);
    this.setObjectProperties(x, y);
    this.currentImageIndex = 0;
    this.isMovingLeft = isMovingLeft;
    this.fire(this.imagesFireball);
  }

  /**
   * Sets the object properties for the flying object.
   * @method setObjectProperties
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  setObjectProperties(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speedX = 10;
    this.acceleration = 0.5;
  }

  /**
   * Initiates the firing animation and movement.
   * @method fire
   * @param {string[]} imagesAttack - Array of image paths for the animation.
   */
  fire(imagesAttack) {
    // this.applyGravity();
    const animationInterval = setInterval(() => {
      this.animateFireball(imagesAttack);
      if (this.isMovingLeft) {
        this.x -= 40;
      } else {
        this.x += 40;
      }

      if (this.currentImageIndex >= imagesAttack.length) {
        clearInterval(animationInterval);
        this.shouldRemove = true;
      }
    }, 100);
  }

  /**
   * Animates the fireball by updating the image.
   * @method animateFireball
   * @param {string[]} imagesAttack - Array of image paths for the animation.
   */
  animateFireball(imagesAttack) {
    if (this.currentImageIndex < imagesAttack.length) {
      let path = imagesAttack[this.currentImageIndex];
      this.img = this.imageCache[path];
      this.currentImageIndex++;
    }
  }
}
