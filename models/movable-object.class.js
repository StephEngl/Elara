class MovableObject extends DrawableObject {
  lastHit;
  world;

  constructor() {
    super();
    this.speed;
    this.otherDirection = false;
    this.width = 150;
    this.height = 150;
    this.speedY = 0;
    this.acceleration = 2.5;
    this.energy = 100;
    this.isDying = false;
  }

  setWorld(world) {
    this.world = world;
  }

  createAudio(src) {
    return this.world ? this.world.createAudio(src) : new Audio(src);
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof FlyingObject) {
      return true;
    } else {
      return this.y < 280;
    }
  }

  setOtherDirection(value) {
    let directionChanged = this.otherDirection !== value;
    this.otherDirection = value;

    // if (directionChanged) {
    //   let temp = this.offset.left;
    //   this.offset.left = this.offset.right;
    //   this.offset.right = temp;
    // }
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
    let charCollisionRect = this.getCurrentCollisionRect();
    let moCollisionRect = mo.getCurrentCollisionRect();
    let cond1 = charCollisionRect.x2  >= moCollisionRect.x1;
    let cond2 = charCollisionRect.x1  <= moCollisionRect.x2;
    let cond3 = charCollisionRect.y2  >= moCollisionRect.y1;
    let cond4 = charCollisionRect.y1  <= moCollisionRect.y2;
    let collisionDetected = cond1 && cond2 && cond3 && cond4
    if (collisionDetected) {
      console.log('collision detetced', charCollisionRect, moCollisionRect);
    }
    return collisionDetected;
  }

  hit() {
    this.energy -= 5;
    console.log('character is hit', this.energy);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; //Difference in ms
    timePassed = timePassed / 1000;
    let isHurted = timePassed < 0.1;
    if (isHurted) {
      console.log('character is hurted', timePassed);
    }
    return isHurted;
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

  remove() {
    // Implementieren Sie hier die Logik zum Entfernen des Objekts aus dem Spiel
    this.shouldRemove = true;
  }
}
