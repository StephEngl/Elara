class DrawableObject {
  imageCache = {};
  currentImage = 0;
  world;

  constructor() {
    this.x = 100;
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
 * @method setWorld
 * @param {World} world - The game world.
 */
  setWorld(world) {
    this.world = world;
  }

/**
 * Sets the image for the object.
 * @method setImage
 * @param {string} path - The path to the image.
 */
  setImage(path) {
    this.img = new Image(); //this.img = document.getElemendById('image') <img id="image">
    this.img.src = path;
  }

/**
 * Loads images into the imageCache.
 * @method loadImages
 * @param {string[]} arr - Array of image paths.
 */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
 * Draws the object on the canvas.
 * @method draw
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
 * Draws a frame around the object (for debugging).
 * @method drawFrame
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 */
  // drawFrame(ctx) {
  //   if (
  //     this instanceof Character ||
  //     this instanceof LittleDragon ||
  //     this instanceof BlueSlime ||
  //     this instanceof Endboss ||
  //     this instanceof FlyingObject ||
  //     this instanceof CollectableObject
  //   ) {
  //     ctx.beginPath();
  //     ctx.lineWidth = "5";
  //     ctx.strokeStyle = "transparent";
  //     ctx.rect(this.x, this.y, this.width, this.height);
  //     ctx.stroke();
  //     ctx.beginPath();
  //     ctx.lineWidth = "3";
  //     ctx.strokeStyle = "teal";
  //     let rect = this.getCurrentCollisionRect();
  //     ctx.rect(rect.x1, rect.y1, rect.width, rect.height);
  //     ctx.stroke();
  //   }
  // }

  /**
 * Gets the current collision rectangle.
 * @method getCurrentCollisionRect
 * @returns {Object} - Object with x1, y1, width, height, x2, y2.
 */
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
 * Checks if the object is colliding with another object.
 * @method isColliding
 * @param {DrawableObject} drawObj - The other object to check collision with.
 * @returns {boolean} - True if colliding, false otherwise.
 */
  isColliding(drawObj) {
    let charCollisionRect = this.getCurrentCollisionRect();
    let doCollisionRect = drawObj.getCurrentCollisionRect();
    let cond1 = charCollisionRect.x2 >= doCollisionRect.x1;
    let cond2 = charCollisionRect.x1 <= doCollisionRect.x2;
    let cond3 = charCollisionRect.y2 >= doCollisionRect.y1;
    let cond4 = charCollisionRect.y1 <= doCollisionRect.y2;
    let collisionDetected = cond1 && cond2 && cond3 && cond4;
    return collisionDetected;
  }

/**
 * Marks the object for removal.
 * @method remove
 */
  remove() {
    this.shouldRemove = true;
  }
}
