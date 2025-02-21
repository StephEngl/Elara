class FlyingObject extends MovableObject {
    speedX;

    constructor(width, height) {
        this.x = world.charakter.x + world.charakter.width;
        this.y = world.charakter.y + world.charakter.offset.top;
        this.width = width;
        this.height = height;
    }
    
}