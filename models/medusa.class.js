/**
 * Represents a small dragon enemy.
 * Extends the MovableObject class.
 */
class Medusa extends MovableObject {
  imagesWalking = [
    "assets/img/enemies/medusa/Walk1.png",
    "assets/img/enemies/medusa/Walk2.png",
    "assets/img/enemies/medusa/Walk3.png",
    "assets/img/enemies/medusa/Walk4.png",
  ];
  imagesAttacking = [
    "assets/img/enemies/medusa/Attack1.png",
    "assets/img/enemies/medusa/Attack2.png",
    "assets/img/enemies/medusa/Attack3.png",
    "assets/img/enemies/medusa/Attack4.png",
    "assets/img/enemies/medusa/Attack5.png",
    "assets/img/enemies/medusa/Attack6.png",
  ];
  imagesDying = [
    "assets/img/enemies/medusa/Death1.png",
    "assets/img/enemies/medusa/Death2.png",
    "assets/img/enemies/medusa/Death3.png",
    "assets/img/enemies/medusa/Death4.png",
    "assets/img/enemies/medusa/Death5.png",
    "assets/img/enemies/medusa/Death6.png",
  ];

  /**
   * Creates a medusa instance.
   * @param {number} x - The initial x-coordinate of the medusa.
   */
  constructor(x) {
    super();
    this.loadAllImages();
    this.setObjectProperties(x);
    this.loadAudio();
    this.animateEnemies();
  }

  /**
   * Loads all images for the medusa.
   */
  loadAllImages() {
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAttacking);
    this.loadImages(this.imagesDying);
  }

  /**
   * Sets the object properties for the medusa.
   * @param {number} x - The initial x-coordinate of the medusa.
   */
  setObjectProperties(x) {
    this.setImage("assets/img/enemies/medusa/Walk1.png");
    this.y = 330;
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
    this.audiomedusaDefeated = sounds.medusa.ko;
  }

  /**
   * Plays the sound when character is defeated.
   * @method playDefeatedSound
   */
  playDefeatedSound() {
    if (!this.soundPlayed) {
      this.audiomedusaDefeated.play();
      this.soundPlayed = true;
    }
  }
}
