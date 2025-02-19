class Light extends MovableObject {
  y = 0;
  width = 500;
  height = 400;
  speed = 0.2;

  constructor() {
    super().loadImage("img/Elara/background/light/1.png");

    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    this.moveLeft(this.speed);
  }
}
