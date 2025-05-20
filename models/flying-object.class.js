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
  imagesFoxFire = [
    "assets/img/enemies/endboss/kitsune/fire1.png",
    "assets/img/enemies/endboss/kitsune/fire2.png",
    "assets/img/enemies/endboss/kitsune/fire3.png",
    "assets/img/enemies/endboss/kitsune/fire4.png",
    "assets/img/enemies/endboss/kitsune/fire5.png",
    "assets/img/enemies/endboss/kitsune/fire6.png",
    "assets/img/enemies/endboss/kitsune/fire7.png",
    "assets/img/enemies/endboss/kitsune/fire8.png",
    "assets/img/enemies/endboss/kitsune/fire9.png",
    "assets/img/enemies/endboss/kitsune/fire10.png",
  ];

  /**
   * Creates a FlyingObject instance.
   * @param {number} x - The initial x-coordinate of the flying object.
   * @param {number} y - The initial y-coordinate of the flying object.
   * @param {boolean} isMovingLeft - Indicates whether the object is moving left.
   * @param {string} [fireType='fireball'] - Type of fire: 'fireball', 'firebreath', or 'foxfire'.
   */
  constructor(x, y, isMovingLeft, fireType = "fireball") {
    super();
    this.fireType = fireType;
    this.otherDirection = isMovingLeft;
    this.setObjectProperties(x, y, fireType);
    const images = this.getImagesByType(fireType);
    this.loadImages(images);
    this.setImage(images[0]);
    this.currentImageIndex = 0;
    this.fire(images);
  }

  /**
   * Sets the object properties for the flying object based on fire type.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   * @param {string} fireType - Type of fire: 'fireball', 'firebreath', or 'foxfire'.
   */
  setObjectProperties(x, y, fireType) {
    this.x = x;
    this.y = y;
    if (fireType === "firebreath") {
      this.width = 250;
      this.height = 250;
      this.speedX = 10;
    } else if (fireType === "foxfire") {
      this.width = 100;
      this.height = 100;
      this.speedX = 20;
    } else {
      this.width = 50;
      this.height = 50;
      this.speedX = 40;
    }
  }

  /**
   * Returns the appropriate image array based on the fire type.
   * @param {string} fireType - Type of fire: 'fireball', 'firebreath', or 'foxfire'.
   * @returns {string[]} Array of image paths.
   */
  getImagesByType(fireType) {
    if (fireType === "firebreath") {
      return this.imagesFireBreath;
    } else if (fireType === "foxfire") {
      return this.imagesFoxFire;
    } else {
      return this.imagesFireball;
    }
  }

  /**
   * Initiates the firing animation and movement.
   * @param {string[]} imagesAttack - Array of image paths for the animation.
   */
  fire(imagesAttack) {
    const animationInterval = setGameInterval(() => {
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
