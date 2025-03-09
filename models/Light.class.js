class Light extends MovableObject {
  y = 0;
  width = 1000;
  height = 400;
  speed = 0.1;

  constructor(imgPath, x) {
    super().setImage(imgPath);
    this.x = x;
    this.otherDirection = true;
    this.animate();
  }

  /**
 * Starts the animation for the light object.
 * @method animate
 */
  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }
}
