class DrawableObject {
  x = 10;
  y = 80; //130
  img;
  height = 200;
  width = 200;
  imageCache = {};
  currentImage = 0;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

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
      let objLeftBorder = this.x + this.offset.left;
      let objUpperBorder = this.y+this.offset.top;
      let objWidth = this.width - this.offset.left - this.offset.right;
      let objHeight = this.height - this.offset.top - this.offset.bottom;
      ctx.rect(objLeftBorder, objUpperBorder, objWidth, objHeight);
      ctx.stroke();
    }
  }
}
