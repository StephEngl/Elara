/**
 * Represents a collectable object in the game.
 * Extends the DrawableObject class.
 */
class CollectableObject extends DrawableObject {
  /**
   * Creates a CollectableObject instance.
   */
  constructor() {
    super();
    this.width = 50;
    this.height = 50;
    this.x = 3300;
  }
}
