class LittleDragon extends MovableObject {
  imagesIdle = [
    "assets/img/enemies/small_dragon/Walk1.png",
    "assets/img/enemies/small_dragon/Walk2.png",
    "assets/img/enemies/small_dragon/Walk3.png",
    "assets/img/enemies/small_dragon/Walk4.png",
  ];
  imagesAttacking = [
    "assets/img/enemies/small_dragon/Attack1.png",
    "assets/img/enemies/small_dragon/Attack2.png",
    "assets/img/enemies/small_dragon/Attack3.png",
  ];
  imagesDying = [
    "assets/img/enemies/small_dragon/Death1.png",
    "assets/img/enemies/small_dragon/Death2.png",
    "assets/img/enemies/small_dragon/Death3.png",
    "assets/img/enemies/small_dragon/Death4.png",
    "assets/img/enemies/small_dragon/Death4.png",
    "assets/img/enemies/small_dragon/Death4.png",
  ];

  constructor(x) {
    super();
    this.loadAllImages();
    this.setObjectProperties(x);
    this.animate();
  }

  /**
   * Loads all images for the LittleDragon.
   * @method loadAllImages
   */
  loadAllImages() {
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesAttacking);
    this.loadImages(this.imagesDying);
  }

  /**
   * Sets the object properties for the LittleDragon.
   * @method setObjectProperties
   */
  setObjectProperties(x) {
    this.setImage("assets/img/enemies/small_dragon/Idle1.png");
    this.y = 310;
    this.x = x;
    this.offset = {
      top: 60,
      right: 50,
      bottom: 50,
      left: 30,
    };
    this.speed = 0.3 + Math.random() * 0.4;
    this.isDying = false;
    this.otherDirection = true;
  }

  /**
   * Animates the LittleDragon, including movement and animation.
   * @method animate
   */
  animate() {
    setInterval(() => {
      this.moveLeft(this.speed, false, true);
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDying) {
        this.playAnimation(this.imagesDying);
      }
      if (this.isPlayerInRange(150) && !this.isAboveGround()) {
        this.playAnimation(this.imagesAttacking);
      } else {
        this.playAnimation(this.imagesIdle);
      }
    }, 200);
  }

  /**
   * Initiates the dying sequence for the LittleDragon.
   * @method die
   */
  die() {
    sounds.littleDragon.ko.play();
    this.isDying = true;
    setTimeout(() => {
      this.shouldRemove = true;
    }, 800);
  }
}
