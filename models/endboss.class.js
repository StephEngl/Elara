class Endboss extends MovableObject {
  height = 500;
  width = 500;
  y = -50;

  imagesIntro = [
    "img/endboss/introduce/1.png",
    "img/endboss/introduce/2.png",
    "img/endboss/introduce/3.png",
    "img/endboss/introduce/4.png",
    "img/endboss/introduce/5.png",
    "img/endboss/introduce/6.png",
    "img/endboss/introduce/7.png",
    "img/endboss/introduce/8.png",
    "img/endboss/introduce/9.png",
    "img/endboss/introduce/10.png",
  ];

  imagesFloating = [
    "img/endboss/floating/1.png",
    "img/endboss/floating/2.png",
    "img/endboss/floating/3.png",
    "img/endboss/floating/4.png",
    "img/endboss/floating/5.png",
    "img/endboss/floating/6.png",
    "img/endboss/floating/7.png",
    "img/endboss/floating/8.png",
    "img/endboss/floating/9.png",
    "img/endboss/floating/10.png",
    "img/endboss/floating/11.png",
    "img/endboss/floating/12.png",
    "img/endboss/floating/13.png",
  ];

  constructor() {
    super().loadImage(this.imagesIntro[6]);
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesFloating);

    this.x = 2200;
    this.animate();
  }

  animate() {
    this.playAnimation(this.imagesIntro);
    setInterval(() => {
      this.playAnimation(this.imagesFloating);
    }, 200);
  }
}
