class Crystal extends CollectableObject {
  constructor() {
    super().setImage("assets/img/game_objects/fire_crystal.png");
    this.y = 200 + Math.random() * 120;
    // this.width = 50;
    // this.height = 50;
  }
}
