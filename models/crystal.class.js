class Crystal extends CollectableObject {
  constructor() {
    super().setImage("assets/img/game_objects/fire_crystal.png");
    this.y = 200 + Math.random() * 120;
    this.x = 300 + Math.random() * 3000;
  }
}
