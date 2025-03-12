/**
 * Represents a crystal object in the game.
 * Extends the CollectableObject class.
 */
class Crystal extends CollectableObject {
  static lastX = 700;
  energyLevel;

  /**
   * Creates a Crystal instance.
   * @param {number} [x] - The initial x-coordinate of the crystal. If not provided, it will be generated.
   * @param {number} [y] - The initial y-coordinate of the crystal. If not provided, it will be randomly generated.
   * @param {string} [imgSrc="assets/img/game_objects/fire-crystal.png"] - The image source for the crystal.
   * @param {number} [energyLevel=1] - The energy level of the crystal.
   */
  constructor(
    x,
    y,
    imgSrc = "assets/img/game_objects/fire-crystal.png",
    energyLevel = 1
  ) {
    super();
    this.setImage(imgSrc);
    this.energyLevel = energyLevel;
    this.x = x || this.generateXPosition();
    this.y = y || 160 + Math.random() * 50;
  }

  /**
   * Generates an x position for the crystal based on the previous crystal's position.
   * @returns {number} The generated x position.
   */
  generateXPosition() {
    let newX = Crystal.lastX + 250 + Math.random() * 200;
    if (newX > 3000) {
      newX = -500;
    }
    Crystal.lastX = newX;
    return newX;
  }

  /**
   * Gets the energy level of the crystal.
   * @returns {number} The energy level of the crystal.
   */
  getEnergyLevel() {
    return this.energyLevel;
  }
}
