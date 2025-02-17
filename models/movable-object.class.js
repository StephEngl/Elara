class MovableObject {
  x = 10;
  y = 150;
  img;
  height = 200;
  width = 200;
  speed;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
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

  moveRight() {
    console.log("Moving right");
  }

  moveLeft(speed) {
    setInterval(() => {
      this.x -= speed;
    }, 1000 / 60);
  }
}
