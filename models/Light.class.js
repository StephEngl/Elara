/**
 * Represents a light object in the game, providing illumination.
 * Extends the MovableObject class.
 */
class Light extends MovableObject {
  y = 0;
  width = 1000;
  height = 400;
  speed = 0.1;

  /**
   * Creates a Light instance.
   * @param {string} imgPath - The path to the image for the light.
   * @param {number} x - The initial x-coordinate of the light.
   */
  constructor(imgPath, x) {
    super().setImage(imgPath);
    this.x = x;
    this.otherDirection = true;
    this.animate();
  }

  /**
   * Starts the animation for the light object.
   */
  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }
}
