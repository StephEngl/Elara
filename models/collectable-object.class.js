class CollectableObject extends DrawableObject {
  constructor() {
    super();
    this.width = 50;
    this.height = 50;
    this.x = 300 + Math.random() * 200;
  }
}
