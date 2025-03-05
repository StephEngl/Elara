class DrawableObject {
  imageCache = {};
  currentImage = 0;
  world;

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
    this.shouldRemove = false;
  }

    /**
   * Sets the game world for this object.
   * @param {World} world - The game world.
   */
    setWorld(world) {
      this.world = world;
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
      this instanceof FlyingObject ||
      this instanceof CollectableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "transparent";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "transparent";
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
      y2: objUpperBorder + objHeight,
    };
  }

  /**
   * Checks if this object is colliding with another movable object.
   * @param {DrawableObject} drawObj - The other movable object to check for collision with.
   * @returns {boolean} - True if the objects are colliding, false otherwise.
   */
  isColliding(drawObj) {
    let charCollisionRect = this.getCurrentCollisionRect();
    let doCollisionRect = drawObj.getCurrentCollisionRect();
    let cond1 = charCollisionRect.x2 >= doCollisionRect.x1;
    let cond2 = charCollisionRect.x1 <= doCollisionRect.x2;
    let cond3 = charCollisionRect.y2 >= doCollisionRect.y1;
    let cond4 = charCollisionRect.y1 <= doCollisionRect.y2;
    let collisionDetected = cond1 && cond2 && cond3 && cond4;
    if (collisionDetected) {
      console.log("collision detetced", charCollisionRect, doCollisionRect);
    }
    return collisionDetected;
  }

  /**
   * Sets remove status for removing the object from the game.
   */
  remove() {
    this.shouldRemove = true;
  }
}
