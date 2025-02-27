const sounds = {
  character: {
    attack: new Audio(),
    battlecry: new Audio(),
    hurt: new Audio(),
    jump: new Audio(),
    die: new Audio(),
  },
  blueSlime: {
    attack: new Audio(),
    hurt: new Audio(),
    die: new Audio(),
  },
  littleDragon: {
    attack: new Audio(),
    hurt: new Audio(),
    dyingSound: new Audio("assets/audio/littleDragon_deathcry.mp3"),
  },
  dragonBoss: {
    roar: new Audio("assets/audio/endboss_dragon_roar.mp3"),
    attack: new Audio(),
    hurt: new Audio(),
    die: new Audio(),
  },
  environment: { background: new Audio(), owlHootings: new Audio(), footsteps: new Audio() },
  collectibles: {
    crystal: new Audio("assets/audio/collectCrystal.mp3"),
    flower: new Audio("assets/audio/collectFlower.mp3"),
  },
  other: {
    menu: new Audio(),
    gameWon: new Audio(),
    gameOver: new Audio(),
  },
};
