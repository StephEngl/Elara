class MovableObject {
  x = 10;
  y = 80; //130
  img;
  height = 200;
  width = 200;
  speed;
  imageCache = {};
  currentImage = 0;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  energy = 100;
  lastHit;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 230;
  }

  setImage(path) {
    this.img = new Image(); //this.img = document.getElemendById('image') <img id="image">
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof LittleDragon ||
      this instanceof BlueSlime
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
      this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
      this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom
    );
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
    console.log(timePassed);
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
