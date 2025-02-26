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
  imagesDying = [
    "assets/img/enemies/endboss/dragon/Death1.png",
    "assets/img/enemies/endboss/dragon/Death2.png",
    "assets/img/enemies/endboss/dragon/Death3.png",
    "assets/img/enemies/endboss/dragon/Death4.png",
    "assets/img/enemies/endboss/dragon/Death5.png",
  ]
  hadFirstContact = false;

  constructor() {
    super().setImage(this.imagesIntro[1]);
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesDying);
    this.x = 4000; //3800
    this.y = -40;
    this.height = 600;
    this.width = 600;
    this.speed = 10;
    this.offset = {
      top: 300,
      right: 100,
      bottom: 150,
      left: 150,
    };
    // this.audioRoarIntro = this.createAudio("assets/audio/endboss_dragon_roar.mp3");
    this.setOtherDirection(true);
    this.animate();
  }

  animate() {
    let i = 0;
    setInterval(() => {
      if (i > 10) {
        this.playAnimation(this.imagesIdle);
      } else {
        this.playAnimation(this.imagesIntro);
        this.moveLeft(this.speed);

        // this.otherDirection = true;
      }
      i++;
      if (world.character.x > 3300 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
        sounds.dragonBoss.roar.play();
        sounds.dragonBoss.roar.playbackRate=0.8;
      }
    }, 250);
  }

  die() {
    this.isDying = true;
    setTimeout(() => {
      this.shouldRemove = true;
    }, 800);
  }
}
