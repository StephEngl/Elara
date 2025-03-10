/**
 * Represents a blue slime enemy.
 * Extends the MovableObject class.
 */
class BlueSlime extends MovableObject {
  imagesWalking = [
    "assets/img/enemies/blue_slime/walk/walk1.png",
    "assets/img/enemies/blue_slime/walk/walk2.png",
    "assets/img/enemies/blue_slime/walk/walk3.png",
    "assets/img/enemies/blue_slime/walk/walk4.png",
    "assets/img/enemies/blue_slime/walk/walk5.png",
    "assets/img/enemies/blue_slime/walk/walk6.png",
    "assets/img/enemies/blue_slime/walk/walk7.png",
    "assets/img/enemies/blue_slime/walk/walk8.png",
  ];
  imagesAttacking = [
    "assets/img/enemies/blue_slime/attack/attack1.png",
    "assets/img/enemies/blue_slime/attack/attack2.png",
    "assets/img/enemies/blue_slime/attack/attack3.png",
    "assets/img/enemies/blue_slime/attack/attack4.png",
  ];
  imagesDying = [
    "assets/img/enemies/blue_slime/dead/dead1.png",
    "assets/img/enemies/blue_slime/dead/dead2.png",
    "assets/img/enemies/blue_slime/dead/dead3.png",
  ];

  /**
   * Creates a BlueSlime instance.
   * @param {number} x - The initial x-coordinate of the BlueSlime.
   */
  constructor(x) {
    super();
    this.loadAllImages();
    this.setObjectProperties(x);
    this.loadAudio();
    this.animateEnemies();
  }

  /**
   * Loads all images for the BlueSlime.
   */
  loadAllImages() {
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAttacking);
    this.loadImages(this.imagesDying);
  }

  /**
   * Sets the object properties for the BlueSlime.
   * @param {number} x - The initial x-coordinate of the BlueSlime.
   */
  setObjectProperties(x) {
    this.setImage("assets/img/enemies/blue_slime/walk/walk1.png");
    this.y = 260;
    this.x = x;
    this.offset = {
      top: 120,
      right: 50,
      bottom: 0,
      left: 50,
    };
    this.speed = 0.3 + Math.random() * 0.4;
    this.otherDirection = true;
    this.dyingTimeout = 600; // Nach 600ms (3 Bilder bei 200ms Intervall) wird das Objekt entfernt
  }

  /**
   * Loads audio files for enemy actions.
   * @method loadAudio
   */
  loadAudio() {
    this.audioBlueSlimeDefeated = sounds.blueSlime.ko;
  }

  /**
   * Plays the sound when character is defeated.
   * @method playDefeatedSound
   */
  playDefeatedSound() {
    if (!this.soundPlayed) {
      this.audioBlueSlimeDefeated.play();
      this.soundPlayed = true;
    }
  }
}
