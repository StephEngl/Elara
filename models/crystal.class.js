class Crystal extends CollectableObject {
  constructor(x, y) {
    super().setImage("assets/img/game_objects/fire-crystal.png");
    this.x = x || 1000 + Math.random() * 2500;
    this.y = y || 150 + Math.random() * 150;

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
