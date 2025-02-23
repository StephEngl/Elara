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
    let charX1 = this.x + this.offset.left;
    let charX2 = this.x + this.width - this.offset.right;
    let charY1 = this.y + this.offset.top;
    let charY2 = this.y + this.height - this.offset.bottom;
    let moX1 = mo.x + mo.offset.left;
    let moX2 = mo.x + mo.width - mo.offset.right;
    let moY1 = mo.y + mo.offset.top;
    let moY2 = mo.y + mo.height - mo.offset.bottom;
    let cond1 = charX2 >= moX1;
    let cond2 = charX1 <= moX2;
    let cond3 = charY2 >= moY1;
    let cond4 = charY1 <= moY2;
    return cond1 && cond2 && cond3 && cond4;
  }

  isJumpedOn(mo) {
    let charX1 = this.x + this.offset.left;
    let charX2 = this.x + this.width - this.offset.right;
    let charY2 = this.y + this.height - this.offset.bottom;
    let moX1 = mo.x + mo.offset.left;
    let moX2 = mo.x + mo.width - mo.offset.right;
    let moY1 = mo.y + mo.offset.top;
    let moY2 = mo.y + mo.height - mo.offset.bottom;

    let horizontalOverlap = charX1 < moX2 && charX2 > moX1;
    let verticalCondition = charY2 >= moY1;
    let isAboveEnemy = charY2 > moY2; 

    return horizontalOverlap && verticalCondition && isAboveEnemy;
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
