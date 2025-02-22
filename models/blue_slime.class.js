class BlueSlime extends MovableObject {
  y = 270;
  width = 150;
  height = 150;
  imagesWalking = [
    "img/Elara/enemies/blue_slime/walk/walk1.png",
    "img/Elara/enemies/blue_slime/walk/walk2.png",
    "img/Elara/enemies/blue_slime/walk/walk3.png",
    "img/Elara/enemies/blue_slime/walk/walk4.png",
    "img/Elara/enemies/blue_slime/walk/walk5.png",
    "img/Elara/enemies/blue_slime/walk/walk6.png",
    "img/Elara/enemies/blue_slime/walk/walk7.png",
    "img/Elara/enemies/blue_slime/walk/walk8.png",
  
  ];
  imagesDying = [
    "img/Elara/enemies/blue_slime/dead/dead1.png";
    "img/Elara/enemies/blue_slime/dead/dead2.png";
    "img/Elara/enemies/blue_slime/dead/dead3.png";
    // "";
  ]
  offset = {
    top: 120,
    right: 50,
    bottom: 0,
    left: 50,
  };

  constructor() {
    super().setImage("img/Elara/enemies/blue_slime/walk/walk1.png");
    this.loadImages(this.imagesWalking);
    this.x = 1000 + Math.random() * 3000;
    this.speed = 0.3 + Math.random() * 0.4;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
      this.otherDirection = true;
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.imagesWalking);
    }, 200);
  }
}
