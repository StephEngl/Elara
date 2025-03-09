/**
 * Represents a flying object, such as a fireball, in the game.
 * Extends the MovableObject class.
 */
class FlyingObject extends MovableObject {
  imagesFireball = [
    "assets/img/elara/Fire/fire1.png",
    "assets/img/elara/Fire/fire2.png",
    "assets/img/elara/Fire/fire3.png",
    "assets/img/elara/Fire/fire4.png",
    "assets/img/elara/Fire/fire5.png",
    "assets/img/elara/Fire/fire6.png",
    "assets/img/elara/Fire/fire7.png",
    "assets/img/elara/Fire/fire8.png",
    "assets/img/elara/Fire/fire9.png",
  ];
  imagesFireBreath = [
    "assets/img/enemies/endboss/dragon/Fire_Attack1.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack2.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack3.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack4.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack5.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack6.png",
  ];

  /**
   * Creates a FlyingObject instance.
   * @param {number} x - The initial x-coordinate of the flying object.
   * @param {number} y - The initial y-coordinate of the flying object.
   * @param {boolean} isMovingLeft - Indicates whether the object is moving left.
   * @param {boolean} [isBossFire=false] - Indicates whether the object is a boss's fire (uses different properties).
   */
  constructor(x, y, isMovingLeft, isBossFire = false) {
    super();
    this.isBossFire = isBossFire;
    this.otherDirection = isMovingLeft;
    this.setObjectProperties(x, y, isBossFire);
    this.loadImages(isBossFire ? this.imagesFireBreath : this.imagesFireball);
    this.setImage(
      isBossFire ? this.imagesFireBreath[0] : this.imagesFireball[0]
    );
    this.currentImageIndex = 0;
    this.fire(isBossFire ? this.imagesFireBreath : this.imagesFireball);
  }

  /**
   * Sets the object properties for the flying object.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {boolean} isBossFire - Indicates whether the object is a boss's fire.
   */
  setObjectProperties(x, y, isBossFire) {
    this.x = x;
    this.y = y;
    this.width = isBossFire ? 250 : 50;
    this.height = isBossFire ? 250 : 50;
    this.speedX = isBossFire ? 10 : 40;
  }

  /**
   * Initiates the firing animation and movement.
   * @param {string[]} imagesAttack - Array of image paths for the animation.
   */
  fire(imagesAttack) {
    const animationInterval = setInterval(() => {
      this.animateFireball(imagesAttack);
      this.updatePosition();

      if (this.currentImageIndex >= imagesAttack.length) {
        clearInterval(animationInterval);
        this.shouldRemove = true;
      }
    }, 100);
  }

  /**
   * Updates the position of the flying object.
   */
  updatePosition() {
    this.x += this.otherDirection ? -this.speedX : this.speedX;
  }

  /**
   * Animates the fireball by updating the image.
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
