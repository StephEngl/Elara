/**
 * Represents a background object in the game.
 * Extends the MovableObject class.
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a BackgroundObject instance.
   * @param {string} imgPath - The path to the image for the background object.
   * @param {number} x - The initial x-coordinate of the background object.
   */
  constructor(imgPath, x) {
    super().setImage(imgPath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
