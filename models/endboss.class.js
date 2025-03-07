class Endboss extends MovableObject {
  imagesIntro = [
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Walk2.png",
    "assets/img/enemies/endboss/dragon/Walk3.png",
    "assets/img/enemies/endboss/dragon/Walk4.png",
    "assets/img/enemies/endboss/dragon/Walk5.png",
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Walk2.png",
    "assets/img/enemies/endboss/dragon/Walk3.png",
    "assets/img/enemies/endboss/dragon/Walk4.png",
    "assets/img/enemies/endboss/dragon/Walk5.png",
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Walk2.png",
    "assets/img/enemies/endboss/dragon/Walk3.png",
    "assets/img/enemies/endboss/dragon/Walk4.png",
    "assets/img/enemies/endboss/dragon/Walk5.png",
    "assets/img/enemies/endboss/dragon/Attack1.png",
    "assets/img/enemies/endboss/dragon/Attack2.png",
    "assets/img/enemies/endboss/dragon/Attack3.png",
    "assets/img/enemies/endboss/dragon/Attack4.png",
  ];
  imagesIdle = [
    "assets/img/enemies/endboss/dragon/Idle1.png",
    "assets/img/enemies/endboss/dragon/Idle2.png",
    "assets/img/enemies/endboss/dragon/Idle3.png",
  ];
  imagesWalking = [
    "assets/img/enemies/endboss/dragon/Walk1.png",
    "assets/img/enemies/endboss/dragon/Walk2.png",
    "assets/img/enemies/endboss/dragon/Walk3.png",
    "assets/img/enemies/endboss/dragon/Walk4.png",
    "assets/img/enemies/endboss/dragon/Walk5.png",
  ];
  imagesAttack = [
    "assets/img/enemies/endboss/dragon/Attack1.png",
    "assets/img/enemies/endboss/dragon/Attack2.png",
    "assets/img/enemies/endboss/dragon/Attack3.png",
    "assets/img/enemies/endboss/dragon/Attack4.png",
  ];
  imagesFireattack = [
    "assets/img/enemies/endboss/dragon/Fire_Attack1.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack2.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack3.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack4.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack5.png",
    "assets/img/enemies/endboss/dragon/Fire_Attack6.png",
  ];
  imagesHurt = [
    "assets/img/enemies/endboss/dragon/Hurt1.png",
    "assets/img/enemies/endboss/dragon/Hurt2.png",
  ];
  imagesDying = [
    "assets/img/enemies/endboss/dragon/Death1.png",
    "assets/img/enemies/endboss/dragon/Death2.png",
    "assets/img/enemies/endboss/dragon/Death3.png",
    "assets/img/enemies/endboss/dragon/Death4.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
  ];
  hadFirstContact = false;

  constructor() {
    super();
    this.setImage(this.imagesIntro[1]);
    this.loadAllImages();
    this.loadAudio();
    this.setObjectProperties();
    this.animate();
  }

  /**
   * Loads all images for the Endboss.
   * @method loadAllImages
   */
  loadAllImages() {
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesFireattack);
    this.loadImages(this.imagesDying);
  }

  /**
   * Sets the object properties for the Endboss.
   * @method setObjectProperties
   */
  setObjectProperties() {
    this.height = 600;
    this.width = 600;
    this.speed = 10;
    this.x = 4000; //3800
    this.y = -40;
    this.offset = {
      top: 300,
      right: 100,
      bottom: 150,
      left: 150,
    };
    this.otherDirection = true;
  }

  /**
   * Loads audio files for endboss actions.
   * @method loadAudio
   */
  loadAudio() {
    this.audioEndbossRoar = sounds.dragonBoss.roar;
  }

  /**
   * Animates the Endboss, including intro and idle animations.
   * @method animate
   */
  animate() {
    let i = 0;
    setInterval(() => {
      if (i > 10) {
        this.playAnimation(this.imagesIdle);
      } else {
        this.playAnimation(this.imagesIntro);
        this.moveLeft(this.speed);
      }
      i++;
      if (world.character.x > 3300 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
        sounds.dragonBoss.roar.play();
        sounds.dragonBoss.roar.playbackRate = 0.8;
      }
      if (this.isDying) {
        this.playAnimation(this.imagesDying);
      }
    }, 250);
  }

  /**
   * Initiates the dying sequence for the Endboss.
   * @method die
   */
  die() {
    this.isDying = true;
    audioEndbossRoar.play();
    audioEndbossRoar.playbackRate = 0.8;
    setTimeout(() => {
      this.shouldRemove = true;
      gameWon = true;
      stopGame();
    }, 1000);
  }
}
