class Endboss extends MovableObject {
  offset = {
    top: 300,
    right: 100,
    bottom: 150,
    left: 150,
  };

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
    super().setImage(this.imagesIntro[1]);
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesIdle);
    this.x = 3800;
    this.height = 600;
    this.width = 600;
    this.y = -40;
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
