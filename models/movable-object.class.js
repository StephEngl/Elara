class MovableObject {
  x = 20;
  y = 150;
  img;
  height = 150;
  width = 150;

  loadImage(path) {
    this.img = new Image(); //this.img = document.getElemendById('image') <img id="image">
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}
