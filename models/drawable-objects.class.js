class DrawableObject {
  imageCache = {};
  currentImage = 0;

  constructor() {
    this.x = 10;
    this.y;
    this.img;
    this.height;
    this.width;
    this.offset = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
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
      this instanceof BlueSlime ||
      this instanceof Endboss ||
      this instanceof FlyingObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      let rect = this.getCurrentCollisionRect();
      ctx.rect(rect.x1, rect.y1, rect.width, rect.height);
      ctx.stroke();
    }
  }

  getCurrentCollisionRect() {
    let objLeftBorder = this.x + this.offset.left;
    let objUpperBorder = this.y + this.offset.top;
    let objWidth = this.width - this.offset.left - this.offset.right;
    let objHeight = this.height - this.offset.top - this.offset.bottom;
    return {
      x1: objLeftBorder,
      y1: objUpperBorder,
      width: objWidth,
      height: objHeight,
      x2: objLeftBorder + objWidth,
      y2: objUpperBorder + objHeight
    };
  }
}
