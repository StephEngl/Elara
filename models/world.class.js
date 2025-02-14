class World {
  character = new Character();
  enemies = [new PufferFish(), new PufferFish(), new PufferFish()];
  ctx;

  constructor (canvas) {
    this.ctx = canvas.getContext("2d");
    this.draw();
  }
  draw() {
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width);
    for (let i = 0; i < this.enemies.length; i++) {
        let offset_x = 150 * (i+1);
        let offset_y = 50 * i;

        this.ctx.drawImage(this.enemies[i].img, this.character.x + offset_x, this.character.y + offset_y, this.character.height, this.character.width);  
    }

  }
}
