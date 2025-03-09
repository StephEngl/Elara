/**
 * Represents a flower object in the game.
 * Extends the CollectableObject class.
 */
class Flower extends CollectableObject {
  /**
   * Creates a Flower instance.
   * @param {number} x - The initial x-coordinate of the flower.
   */
  constructor(x) {
    super();
    this.setImage("assets/img/game_objects/flower.png");
    this.x = x;
    this.y = 360;
  }
}
