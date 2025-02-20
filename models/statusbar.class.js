class Statusbar extends DrawableObject {
  imagesLifes = [
    "img/Elara/statusbar/lifes/0.png",
    "img/Elara/statusbar/lifes/20.png",
    "img/Elara/statusbar/lifes/40.png",
    "img/Elara/statusbar/lifes/60.png",
    "img/Elara/statusbar/lifes/80.png",
    "img/Elara/statusbar/lifes/100.png",
  ];
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.imagesLifes);
    this.x = 20;
    this.y = 20;
    this.width = 150;
    this.height = 35;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this. imagesLifes[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
