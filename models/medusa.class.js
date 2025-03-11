/**
 * Represents a small dragon enemy.
 * Extends the MovableObject class.
 */
class Medusa extends MovableObject {
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
    this.animateEnemies();
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
    this.otherDirection = true;
    this.dyingTimeout = 600;
  }

  /**
   * Loads audio files for enemy actions.
   * @method loadAudio
   */
  loadAudio() {
    this.audioLittleDragonDefeated = sounds.littleDragon.ko;
  }

  /**
   * Plays the sound when character is defeated.
   * @method playDefeatedSound
   */
  playDefeatedSound() {
    if (!this.soundPlayed) {
      this.audioLittleDragonDefeated.play();
      this.soundPlayed = true;
    }
  }
}
