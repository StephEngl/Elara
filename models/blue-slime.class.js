class BlueSlime extends MovableObject {
  imagesWalking = [
    "assets/img/enemies/blue_slime/walk/walk1.png",
    "assets/img/enemies/blue_slime/walk/walk2.png",
    "assets/img/enemies/blue_slime/walk/walk3.png",
    "assets/img/enemies/blue_slime/walk/walk4.png",
    "assets/img/enemies/blue_slime/walk/walk5.png",
    "assets/img/enemies/blue_slime/walk/walk6.png",
    "assets/img/enemies/blue_slime/walk/walk7.png",
    "assets/img/enemies/blue_slime/walk/walk8.png",
  ];
  imagesDying = [
    "assets/img/enemies/blue_slime/dead/dead1.png",
    "assets/img/enemies/blue_slime/dead/dead2.png",
    "assets/img/enemies/blue_slime/dead/dead3.png",
  ];

  constructor() {
    super().setImage("assets/img/enemies/blue_slime/walk/walk1.png");
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

  /**
   * Animates the BlueSlime's movement and appearance.
   * Handles walking and dying animations in separate intervals.
   * @method animate
   */
  animate() {
    setInterval(() => {
      this.moveLeft(this.speed, false, true);
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDying) {
        this.playAnimation(this.imagesDying);
      } else {
        this.playAnimation(this.imagesWalking);
      }
    }, 200);
  }

  /**
   * Triggers the death sequence for the BlueSlime.
   * Plays a death sound and schedules the object for removal after 600ms.
   * @method die
   */
  die() {
    this.isDying = true;
    sounds.blueSlime.ko.play();
    setTimeout(() => {
      this.shouldRemove = true;
    }, 600); // Nach 600ms (3 Bilder bei 200ms Intervall) wird das Objekt entfernt
  }
}
