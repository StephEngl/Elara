class Crystalbar extends DrawableObject {
  imagesCrystalbar = [
    "assets/img/game_objects/statusbars/crystalbar_0.png",
    "assets/img/game_objects/statusbars/crystalbar_20.png",
    "assets/img/game_objects/statusbars/crystalbar_40.png",
    "assets/img/game_objects/statusbars/crystalbar_60.png",
    "assets/img/game_objects/statusbars/crystalbar_80.png",
    "assets/img/game_objects/statusbars/crystalbar_100.png",
  ];
  loadingLevel = 0;

  constructor() {
    super();
    this.loadImages(this.imagesCrystalbar);
    this.x = 20;
    this.y = 65;
    this.width = 150;
    this.height = 35;
    this.setLoadingLevel(0);
  }

  setLoadingLevel(loadingLevel) {
    this.loadingLevel = loadingLevel;
    let imagePath = this.imagesCrystalbar[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  resolveImageIndex() {
    if ((this.loadingLevel = 5)) {
      return 5;
    } else if ((this.loadingLevel = 4)) {
      return 4;
    } else if ((this.loadingLevel = 3)) {
      return 3;
    } else if ((this.loadingLevel = 2)) {
      return 2;
    } else if ((this.loadingLevel = 1)) {
      return 1;
    } else {
      return 0;
    }
  }
}
