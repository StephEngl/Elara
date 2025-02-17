class PufferFish extends MovableObject {
width = 50;
height = 50;

    constructor() {
        super().loadImage("img/pufferFish/1.Swim/3.swim1.png");

        this.x = 250 + (Math.random() * 500);
      }

}