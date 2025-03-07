class Crystal extends CollectableObject {
  static lastX = 700;
  energyLevel;

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
    this.y = y || 150 + Math.random() * 100;
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

  getEnergyLevel() {
    return this.energyLevel;
  }
}
