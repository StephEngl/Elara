/**
 * Represents the crystal bar in the game, displaying the number of collected crystals.
 * Extends the DrawableObject class.
 */
class Crystalbar extends DrawableObject {
  collectedCrystals = 0;
  crystalImage = new Image();

  /**
   * Creates a Crystalbar instance.
   */
  constructor() {
    super();
    this.crystalImage.src = "assets/img/game_objects/fire-crystal.png";
    this.x = 210;
    this.y = 25;
    this.width = 30;
    this.height = 30;
  }

  /**
   * Zeichnet den Kristall und die Anzahl der gesammelten Kristalle.
   * @param {CanvasRenderingContext2D} ctx - Der Canvas Rendering Kontext.
   */
  draw(ctx) {
    this.drawCrystalImage(ctx);
    this.drawCollectedCrystals(ctx);
  }

  /**
   * Zeichnet das Kristallbild auf dem Canvas.
   * @param {CanvasRenderingContext2D} ctx - Der Canvas Rendering Kontext.
   */
  drawCrystalImage(ctx) {
    ctx.drawImage(this.crystalImage, this.x, this.y, this.width, this.height);
  }

  /**
   * Zeichnet die Anzahl der gesammelten Kristalle auf dem Canvas.
   * @param {CanvasRenderingContext2D} ctx - Der Canvas Rendering Kontext.
   */
  drawCollectedCrystals(ctx) {
    ctx.font = "20px magical_neverland";
    ctx.fillStyle = "white";
    ctx.fillText(
      this.collectedCrystals,
      this.x + this.width + 5,
      this.y + this.height - 5
    );
  }

  /**
   * Increases the number of collected crystals.
   * @method increaseCrystalCount
   */
  increaseCrystalCount(energyLevel) {
    this.collectedCrystals += energyLevel;
  }

  /**
   * Decreases the number of collected crystals.
   */
  decreaseCrystalCount() {
    this.collectedCrystals--;
  }
}
