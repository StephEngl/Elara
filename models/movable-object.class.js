class MovableObject {
  x = 10;
  y = 150;
  img;
  height = 200;
  width = 200;

  loadImage(path) {
    this.img = new Image(); //this.img = document.getElemendById('image') <img id="image">
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}
