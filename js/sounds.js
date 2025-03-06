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
    die: new Audio("assets/audio/slime_die.mp3"),
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
    gameWon: new Audio("assets/audio/bg-music-game-won.mp3"),
    gameOver: new Audio("assets/audio/game_over_music.mp3"),
  },
};
