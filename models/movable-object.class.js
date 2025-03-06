/**
 * @class MovableObject
 * @extends DrawableObject
 * Represents a movable object in the game.
 */
class MovableObject extends DrawableObject {
  lastHit;

  constructor() {
    super();
    this.speed;
    this.otherDirection = false;
    this.width = 150;
    this.height = 150;
    this.speedY = 0;
    this.acceleration = 2.5;
    this.energy = 100;
    this.isDying = false;
    this.isPaused = false;
  }

  /**
   * Creates an audio object.
   * @param {string} src - The source URL of the audio file.
   * @returns {HTMLAudioElement} - The audio element.
   */
  createAudio(src) {
    return this.world ? this.world.createAudio(src) : new Audio(src);
  }

  /**
   * Applies gravity to the object, causing it to fall.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} - True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof FlyingObject) {
      return true;
    } else {
      return this.y < 280;
    }
  }

  /**
   * Sets the otherDirection property and potentially swaps the offset values.
   * @param {boolean} value - The new value for the otherDirection property.
   */
  setOtherDirection(value) {
    let directionChanged = this.otherDirection !== value;
    this.otherDirection = value;

    // if (directionChanged) {
    //   let temp = this.offset.left;
    //   this.offset.left = this.offset.right;
    //   this.offset.right = temp;
    // }
  }

  /**
   * Handles the logic for when the character is hit, reducing energy based on conditions.
   */
  hit() {
    console.log("enemy isdying: ", this.isDying);
    if (!this.isHurt() && !this.isAboveGround() && !this.elaraJumpedOnEnemy) {
      // Wenn der Charakter nicht springt und nicht auf einen Gegner gesprungen ist,
      this.reduceEnergy();
    }
  }

  /**
   * Reduces the character's energy and updates the lastHit timestamp.
   */
  reduceEnergy() {
    this.energy -= 10;
    // console.log("character is hit", this.energy);

    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the character is currently hurt (recently hit)
   * for giving back time for showing hurt-animation.
   * @returns {boolean} True if the character is hurt, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; //Difference in ms
    timePassed = timePassed / 1000;
    let isHurted = timePassed < 0.8; //showing 4 images from hurt state (200ms)
    if (isHurted) {
      // console.log("character is hurted", timePassed, isHurted);
    }
    return isHurted;
  }

  /**
   * Checks if the character is dead (energy is zero).
   * @returns {boolean} True if the character is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the character to the right.
   */
  moveRight() {
    if (!this.isPaused) {
      this.x += this.speed;
    }
  }

  /**
   * Moves the character to the left.
   * @param {number} speed - The speed at which to move the character to the left.
   */
  moveLeft(speed) {
    if (!this.isPaused) {
      this.x -= speed;
    }
  }

  /**
   * Plays a sound if the game is not paused and not muted.
   * @param {HTMLAudioElement} sound - The sound element to play.
   * @returns {HTMLAudioElement | undefined} The sound element if played, undefined otherwise.
   */
  playSound(sound) {
    if (!this.world.isPaused && !isMuted) {
      sound.play();
      return sound;
    }
  }

  /**
   * Plays an animation by cycling through a set of images.
   * @param {string[]} imagesToChange - An array of image paths to use for the animation.
   */
  playAnimation(imagesToChange) {
    let i = this.currentImage % imagesToChange.length; // let i = 7 % 6 => 1, Rest 1 -> i = 0,1,...,17,0,1,...,17,...
    let path = imagesToChange[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
