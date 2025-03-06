const sounds = {
  character: {
    attack: new Audio("assets/audio/fireball-sound.mp3"),
    hurt: new Audio("assets/audio/elara_hurting_sound.mp3"),
    jump: new Audio("assets/audio/elara_jumping_sound.mp3"),
    ko: new Audio("assets/audio/elara_defeated_sound.mp3"),
  },
  blueSlime: {
    attack: new Audio(),
    hurt: new Audio(),
    ko: new Audio("assets/audio/slime_defeated.mp3"),
  },
  littleDragon: {
    attack: new Audio(),
    hurt: new Audio(),
    ko: new Audio("assets/audio/littleDragon_defeated.mp3"),
  },
  dragonBoss: {
    roar: new Audio("assets/audio/endboss_dragon_roar.mp3"),
    attack: new Audio(),
    hurt: new Audio(),
  },
  environment: { background: new Audio("assets/audio/bg-music-lvl1.mp3"), owlHootings: new Audio(), footsteps: new Audio() },
  collectibles: {
    crystal: new Audio("assets/audio/collectCrystal.mp3"),
    flower: new Audio("assets/audio/collectFlower.mp3"),
  },
  other: {
    gameWon: new Audio("assets/audio/bg-music-game-won.mp3"),
    gameOver: new Audio("assets/audio/bg-music-game-over.mp3"),
  },
};
