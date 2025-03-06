class Crystal extends CollectableObject {
  static lastX = 700;

  constructor(x, y) {
    super().setImage("assets/img/game_objects/fire-crystal.png");
    this.x = x || this.generateXPosition();
    this.y = y || 150 + Math.random() * 150;
  }

  /**
   * Generates an x position for the crystal based on the previous crystal's position.
   * @method generateXPosition
   * @returns {number} The generated x position.
   */
  generateXPosition() {
    let newX = Crystal.lastX + 300 + Math.random() * 200;
    Crystal.lastX = newX;
    return newX;
  }

  /**
   * Creates a crystal with fixed x-position
   * @param {number} x - The fixed x-position
   * @returns {Crystal} - The crystal with the fixed x-position
   */
  static createFixedCrystal(x, y) {
    const crystal = new Crystal(x, y);
    crystal.x = x;
    crystal.y = y;
    return crystal;
  }
}
