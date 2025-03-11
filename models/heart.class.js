/**
 * Represents a heart object for displaying boss health.
 * Extends DrawableObject to inherit drawing capabilities.
 */
class Heart extends DrawableObject {
  /**
   * Create a Heart instance.
   * @param {number} x - The x-coordinate position.
   * @param {number} y - The y-coordinate position.
   */
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.setImage("assets/img/game_objects/heart-status.svg");
  }
}
