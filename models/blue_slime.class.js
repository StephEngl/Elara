class BlueSlime extends MovableObject {
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
    "img/Elara/enemies/blue_slime/dead/dead1.png",
    "img/Elara/enemies/blue_slime/dead/dead2.png",
    "img/Elara/enemies/blue_slime/dead/dead3.png",
  ];

  constructor() {
    super().setImage("img/Elara/enemies/blue_slime/walk/walk1.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesDying);
    this.y = 260;
    this.x = 1000 + Math.random() * 3000;
    this.offset = {
      top: 120,
      right: 50,
      bottom: 0,
      left: 50,
    };
    this.speed = 0.3 + Math.random() * 0.4;
    this.setOtherDirection(true);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
      // this.switchDirection();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDying) {
        this.playAnimation(this.imagesDying);
      } else {
        this.playAnimation(this.imagesWalking);
      }
    }, 200);
  }

  die() {
    this.isDying = true;
    setTimeout(() => {
      this.remove();
    }, 600); // Nach 600ms (3 Bilder bei 200ms Intervall) wird das Objekt entfernt
  }
}
