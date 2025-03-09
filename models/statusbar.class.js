/**
 * Represents the status bar in the game, displaying the remaining health.
 * Extends the DrawableObject class.
 */
class Statusbar extends DrawableObject {
  imagesLifes = [
    "assets/img/game_objects/statusbars/0.png",
    "assets/img/game_objects/statusbars/20.png",
    "assets/img/game_objects/statusbars/40.png",
    "assets/img/game_objects/statusbars/60.png",
    "assets/img/game_objects/statusbars/80.png",
    "assets/img/game_objects/statusbars/100.png",
  ];
  percentage = 100;

  /**
   * Creates a Statusbar instance.
   */
  constructor() {
    super();
    this.loadImages(this.imagesLifes);
    this.x = 20;
    this.y = 20;
    this.width = 150;
    this.height = 35;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage of the status bar and updates the image accordingly.
   * @param {number} percentage - The percentage to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let imagePath = this.imagesLifes[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Resolves the image index based on the current percentage.
   * @returns {number} The index of the image to display.
   */
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
