class MovableObject extends DrawableObject {
  lastHit;

  constructor() {
    super();
    this.speed;
    this.otherDirection = false;
    this.speedY = 0;
    this.acceleration = 2.5;
    this.energy = 100;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof FlyingObject) {
      return true;
    } else {
      return this.y < 230;
    }
  }

  isColliding(mo) {
    let cond1 =
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left;
    let cond2 = this.x + this.offset.left <= mo.x + mo.width - mo.offset.right;
    let cond3 =
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top;
    let cond4 = this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
    return cond1 && cond2 && cond3 && cond4;
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; //Difference in ms
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft(speed) {
    this.x -= speed;
  }

  playAnimation(imagesToChange) {
    let i = this.currentImage % imagesToChange.length; // let i = 7 % 6 => 1, Rest 1 -> i = 0,1,...,17,0,1,...,17,...
    let path = imagesToChange[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
