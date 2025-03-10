/**
 * Represents a small dragon enemy.
 * Extends the MovableObject class.
 */
class LittleDragon extends MovableObject {
  imagesWalking = [
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

  /**
   * Creates a LittleDragon instance.
   * @param {number} x - The initial x-coordinate of the LittleDragon.
   */
  constructor(x) {
    super();
    this.loadAllImages();
    this.setObjectProperties(x);
    this.loadAudio();
    this.animate();
  }

  /**
   * Loads all images for the LittleDragon.
   */
  loadAllImages() {
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAttacking);
    this.loadImages(this.imagesDying);
  }

  /**
   * Sets the object properties for the LittleDragon.
   * @param {number} x - The initial x-coordinate of the LittleDragon.
   */
  setObjectProperties(x) {
    this.setImage("assets/img/enemies/small_dragon/Walk1.png");
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
   * Loads audio files for enemy actions.
   * @method loadAudio
   */
  loadAudio() {
    this.audioLittleDragonDefeated = sounds.littleDragon.ko;
  }

  /**
   * Animates the LittleDragon, including movement and animation.
   * Handles walking and dying animations in separate intervals.
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
        this.playAnimation(this.imagesWalking);
      }
    }, 200);
  }

  /**
   * Initiates the dying sequence for the LittleDragon.
   */
  die() {
    this.audioLittleDragonDefeated.play();
    this.isDying = true;
    setTimeout(() => {
      this.shouldRemove = true;
    }, 800);
  }
}
