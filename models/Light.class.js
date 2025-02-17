class Light extends MovableObject {
y = 0;
width = 500;
height = 400;

    constructor() {
        super().loadImage("img/3_Background/Layers/1_Light/1.png");

        this.x = Math.random() * 500;
      }
}