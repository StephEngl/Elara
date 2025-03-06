class Crystalbar extends DrawableObject {
  collectedCrystals = 0;
  crystalImage = new Image();

  constructor() {
    super();
    this.crystalImage.src = "assets/img/game_objects/fire-crystal.png";
    this.x = 190;
    this.y = 25;
    this.width = 30;
    this.height = 30;
  }

  draw(ctx) {
    // Zeichne das Kristallbild
    ctx.drawImage(this.crystalImage, this.x, this.y, this.width, this.height);

    // Zeichne die Anzahl der gesammelten Kristalle
    ctx.font = "20px magical_neverland";
    ctx.fillStyle = "white";
    ctx.fillText(
      this.collectedCrystals,
      this.x + this.width + 5,
      this.y + this.height - 5
    );
  }

  /**
   * Erhöhe die Anzahl der gesammelten Kristalle
   */
  increaseCrystalCount() {
    this.collectedCrystals++;
  }

  decreaseCrystalCount() {
    this.collectedCrystals--;
  }
}
