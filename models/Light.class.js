class Light extends MovableObject {
  y = 0;
  width = 500;
  height = 400;
  speed = 0.1;

  constructor(imgPath, x) {
    super().setImage(imgPath);
    this.x = x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
      this.otherDirection = true;
    }, 1000 / 60);
  }
}
