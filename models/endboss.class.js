class Endboss extends MovableObject {
  height = 600;
  width = 600;
  y = -40;

  imagesIntro = [
    "img/Elara/enemies/endboss/dragon/Walk1.png",
    "img/Elara/enemies/endboss/dragon/Walk2.png",
    "img/Elara/enemies/endboss/dragon/Walk3.png",
    "img/Elara/enemies/endboss/dragon/Walk4.png",
    "img/Elara/enemies/endboss/dragon/Walk5.png",
  ];

  imagesIdle = [
    "img/Elara/enemies/endboss/dragon/Idle1.png",
    "img/Elara/enemies/endboss/dragon/Idle2.png",
    "img/Elara/enemies/endboss/dragon/Idle3.png",
  ];

  constructor() {
    super().loadImage(this.imagesIntro[6]);
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesIdle);

    this.x = 3800;
    this.animate();
  }

  animate() {
    this.playAnimation(this.imagesIntro);
    setInterval(() => {
      this.playAnimation(this.imagesIdle);
      this.otherDirection = true;
    }, 250);
  }
}
