let WEAPONCHOSEN;
let CHOSEORBS;
let CHOSESWORD;
let SWORDDAMAGE;
let BG;
let MOUSEIMG;
let x1;
let y1;
let x2;
let y2;
let PLAYER;
let PLAYERHEALTH;
let SCORE;
let EXP;
let LVL;
let EXPPOINTS;
let ENEMIES;
let TIME;
let ORBS;
let SWORDS;
let BOMBS;
let HEALTHS;
let PLAYERSPEED;
let BULLETDAMAGE;
let PLAYERMAXHEALTH;
let EARTH;
let EARTHON;
let AIR;
let AIRON;
let BOUNCESPEED;
let xdirection;
let ydirection;
let WATERON;
let WATER;
let FIRE;
let FIREON;
let FIRECT;
let RESISTANCE;
let FIREBALLDAMAGE;
let WATERFIELDDAMAGE;
let BOUNCERDAMAGE;
let ROTATORDAMAGE;
let BGMUSIC;
let BOMBSOUND;
let HEALTHSOUND;
let EXPERIENCESOUND;
let SUNATKSOUND;
let UPGRADESOUND;
let SUNLVLUPSOUND;
let WATERLVLUPSOUND;
let FIRELVLUPSOUND;
let AIRLVLUPSOUND;
let EARTHLVLUPSOUND;
let SPEEDLVLUPSOUND;
let HEALTHLVLUPSOUND;
let DEFENSELVLUPSOUND;
let PLAYERRIGHTIMG;
let PLAYERLEFTIMG;
let ENEMYLEFTIMG;
let ENEMYRIGHTIMG;
let FIREIMG;
let WATERIMG;
let AIRIMG;
let EARTHIMG;
let ORBIMG;
let SWORDIMG_L;
let SWORDIMG_R;
let SWORDIMG_U;
let SWORDIMG_D;
let BOMBIMG;
let HEALTHIMG;
let EXPIMG;
let PLAYERSTANDLEFTIMG;
let PLAYERSTANDRIGHTIMG;
let FACING;
// let rightattack;
// let leftattack;
let TIMERID;
let LOSESOUND;
let PAUSED;
let UPGRADEDESC = {0:["Add a Fireball", "Fire burn through enemies dealing massive damage!"], 1:["Add an Earthwall", "Indestructible earth surround you, preventing enemies from getting near you. Enemies hit are permanently slowed."], 2:["Increase Speed", "Move faster to dodge and weave past enemies."], 3:["Increase Health", "More health makes you able to take more damage for longer and increase your vision."], 4:["Increase Defense", "Bolster your armor and take less damage from enemies."], 5:["Power up your Airball", "Enemies won't know when it's coming, but when it does, it's too late."], 6:["Increase Sun Damage", "Shadows try to avoid the sun as much as possible, as it does massive damage."], 7:["Power up your Waterfield", "Surround yourself in an endless whirlpool that slows enemies in the tide."]};

p5.disableFriendlyErrors = true;

function preload() {
  PLAYERSTANDLEFTIMG = loadAnimation("images/left1.png");
  PLAYERSTANDRIGHTIMG = loadAnimation("images/right1.png");
  // leftattack = loadAnimation("images/leftattack.png");
  // rightattack = loadAnimation("images/rightattack.png");
  PLAYERRIGHTIMG = loadAnimation("images/right2.png", 3);
  PLAYERRIGHTIMG.frameDelay = 12;
  PLAYERLEFTIMG = loadAnimation("images/left2.png", 3);
  PLAYERLEFTIMG.frameDelay = 12;
  ENEMYRIGHTIMG = loadAnimation("images/enemy2.png");
  ENEMYLEFTIMG = loadAnimation("images/enemy.png");
  FIREIMG = loadAnimation("images/fire.png");
  WATERIMG = loadAnimation("images/water1.png", 9);
  WATERIMG.frameDelay = 8;
  AIRIMG = loadAnimation("images/air.png");
  EARTHIMG = loadAnimation("images/earth.png");
  ORBIMG = loadAnimation("images/sun.png");
  SWORDIMG_L = loadAnimation("images/sword2.png");
  SWORDIMG_R = loadAnimation("images/sword.png");
  SWORDIMG_U = loadAnimation("images/sword3.png");
  SWORDIMG_D = loadAnimation("images/sword4.png");
  BOMBIMG = loadAnimation("images/bomb.png");
  HEALTHIMG = loadAnimation("images/health.png");
  EXPIMG = loadAnimation("images/experience.png");
  let musicnumber = Math.ceil(Math.random() * 3);
  soundFormats("mp3");
  BGMUSIC = loadSound("music/background" + musicnumber + ".mp3");
  LOSESOUND = loadSound("music/lose");
  BOMBSOUND = loadSound("music/bomb");
  HEALTHSOUND = loadSound("music/health");
  EXPERIENCESOUND = loadSound("music/experience");
  UPGRADESOUND = loadSound("music/selectability");
  SUNATKSOUND = loadSound("music/sunorb");
  WATERLVLUPSOUND = loadSound("music/water");
  FIRELVLUPSOUND = loadSound("music/fireballs");
  AIRLVLUPSOUND = loadSound("music/air");
  EARTHLVLUPSOUND = loadSound("music/earth");
  SPEEDLVLUPSOUND = loadSound("music/speed");
  HEALTHLVLUPSOUND = loadSound("music/healthincrease");
  DEFENSELVLUPSOUND = loadSound("music/defense");
  SUNLVLUPSOUND = loadSound("music/sun");
}
// to do:
// save high SCORE, if they have completed tutorial
// add projectile enemies
// enemy damaged sound
// add boss levels
// cleaner visuals (UPGRADEDESC and LVL in bottom right)
// multiple files, JSON

window.setup = () => {
  initialize();
};

function initialize() {
  let pause = createButton("Pause");
  pause.style("border-radius", windowWidth / 220 + "px");
  pause.style("font-size", windowWidth / 120 + "px");
  pause.style("border", "none");
  pause.size(50, 20);
  pause.position(20, windowHeight / 20 + 10);
  pause.mousePressed(() => {
    if (!PAUSED) {
      pause.html("Play");
      noLoop();
      clearInterval(TIMERID);
      PAUSED = true;
      BGMUSIC.setVolume(.001);
    } else {
      pause.html("Pause");
      startTime();
      loop();
      BGMUSIC.setVolume(.005);
      PAUSED = false;
    }
  });
  PLAYER = new Sprite(windowWidth / 2, windowHeight / 2, 20, 40);
  startTime();
  resetStats();
  groupInit();
  physicsInit();
  visualInit();
  createCanvas(windowWidth, windowHeight);
	while (EXP.length < 30) {
    new EXP.Sprite();
    EXP.x = () => Math.random() * windowWidth;
    EXP.y = () => Math.random() * windowHeight;
	}
  overlapCheck();
  backgroundmusic();
  let imagenumber = Math.ceil(Math.random() * 4);
  BG = loadImage("images/" + imagenumber + "-min.jpg");
  MOUSEIMG = loadImage("images/mouse.png");
}

function backgroundmusic() {
  BGMUSIC.play();
  BGMUSIC.loop();
  BGMUSIC.setVolume(.005);
  userStartAudio();
}

function visualInit() {
  ENEMIES.addAnimation("ENEMYLEFTIMG", ENEMYLEFTIMG);
  ENEMIES.addAnimation("ENEMYRIGHTIMG", ENEMYRIGHTIMG);
  WATER.addAnimation("WATERIMG", WATERIMG);
  // PLAYER.addAnimation("rightattack", rightattack);
	// PLAYER.addAnimation("leftattack", leftattack);
  PLAYER.addAnimation("right", PLAYERRIGHTIMG);
	PLAYER.addAnimation("left", PLAYERLEFTIMG);
  PLAYER.addAnimation("PLAYERSTANDRIGHTIMG", PLAYERSTANDRIGHTIMG);
	PLAYER.addAnimation("PLAYERSTANDLEFTIMG", PLAYERSTANDLEFTIMG);
  AIR.addAnimation("AIRIMG", AIRIMG);
  EARTH.addAnimation("EARTHIMG", EARTHIMG);
  FIRE.addAnimation("FIREIMG", FIREIMG);
  ORBS.addAnimation("ORBIMG", ORBIMG);
  SWORDS.addAnimation("SWORDIMG_L", SWORDIMG_L);
  SWORDIMG_L.offset.x = -45;
  SWORDIMG_L.offset.y = -45;
  SWORDS.addAnimation("SWORDIMG_R", SWORDIMG_R);
  SWORDIMG_R.offset.x = 45;
  SWORDIMG_R.offset.y = 45;
  SWORDS.addAnimation("SWORDIMG_U", SWORDIMG_U);
  SWORDIMG_U.offset.x = 45;
  SWORDIMG_U.offset.y = -45;
  SWORDS.addAnimation("SWORDIMG_D", SWORDIMG_D);
  SWORDIMG_D.offset.x = -45;
  SWORDIMG_D.offset.y = 45;
  HEALTHS.addAnimation("HEALTHIMG", HEALTHIMG);
  BOMBS.addAnimation("BOMBIMG", BOMBIMG);
  EXP.addAnimation("EXPIMG", EXPIMG);
}

function resetStats() {
  WEAPONCHOSEN = false;
  CHOSEORBS = false;
  CHOSESWORD = false;
  FACING = "right";
  PAUSED = false;
  x1 = 0;
  y1 = 0;
  x2 = windowWidth;
  y2 = windowHeight;
  // PLAYERHEALTH = 1;
  PLAYERHEALTH = 100;
  // PLAYERHEALTH = 100000;
  PLAYERMAXHEALTH = 100;
  // PLAYERMAXHEALTH = 100000;
  SCORE = 0;
  EXPPOINTS = 10;
  // EXPPOINTS = 29;
  LVL = 1;
  TIME = 1;
  // TIME = 25;
  // TIME = 600;
  PLAYERSPEED = 3.25;
  BULLETDAMAGE = 840;
  SWORDDAMAGE = 1040;
  EARTHON = false;
  AIRON = false;
  xdirection = 1;
  ydirection = 1;
  WATERON = false;
  FIREON = false;
  FIRECT = 0;
  RESISTANCE = 1;
  FIREBALLDAMAGE = 320;
  WATERFIELDDAMAGE = 4;
  BOUNCERDAMAGE = 1450;
  ROTATORDAMAGE = 520;
  BOUNCESPEED = 15;
}

function chooseWeapon() {
  noLoop();
  clearInterval(TIMERID);
  fill(0, 0, 0, 180);
  rect(0, 0, windowWidth, windowHeight);
  optionsdescription = ["Select a sun orb that you can use to shoot enemies from afar", "Select a sun sword that allows you to slash through multiple enemies at close range"];
  options = ["Select Sun Orb", "Select Sun Sword"];
  for (let i = 0; i < 2; i++) {
    let buttonback = createButton(optionsdescription[i]);
    buttonback.style("border-radius", windowWidth / 80 + "px");
    buttonback.style("background-image", "radial-gradient(#FFD654 21%, #FFF054 80%)");
    buttonback.style("color", "#373737");
    buttonback.style("font-size", windowWidth / 50 + "px");
    buttonback.style("border", windowWidth / 200 + "px solid black");
    buttonback.size(windowWidth / 4, 2 * windowHeight / 3);
    buttonback.position(i * windowWidth / 3 + windowWidth / 26 + windowWidth / 6, windowHeight / 5);
    let button = createButton(options[i]);
    button.style("border-radius", windowWidth / 120 + "px");
    button.style("background-color", "white");
    button.style("border", "1px solid");
    button.size(windowWidth / 10, windowHeight / 15);
    button.position(i * windowWidth / 3 + 3 * windowWidth / 26 + windowWidth / 6, 4 * windowHeight / 5 - 20);
    button.attribute = options[i];
    button.mousePressed(() => {
      WEAPONCHOSEN = true;
      if (button.attribute === "Select Sun Orb") {
        CHOSEORBS = true;
      } else if (button.attribute === "Select Sun Sword") {
        CHOSESWORD = true;
      }
      let buttons = selectAll("button");
      for (let i = 1; i < buttons.length; i++) {
        buttons[i].remove();
      }
      startTime();
      loop();
    });
  }
}

function groupInit() {
  BOMBS = new Group();
  EARTH = new Group();
  HEALTHS = new Group();
  ORBS = new Group();
  SWORDS = new Group();
  AIR = new Group();
  WATER = new Group();
  ENEMIES = new Group();
	EXP = new Group();
  FIRE = new Group();
}

function physicsInit() {
  PLAYER.collider = "kinematic";
  SWORDS.collider = "kinematic";
  PLAYER.rotationLock = true;
  AIR.x = PLAYER.x;
  AIR.y = PLAYER.y;
  ENEMIES.rotationLock = true;
}

function overlapCheck() {
  PLAYER.overlaps(EXP, expCollect);
  ENEMIES.collides(PLAYER, damagePlayer);
  ENEMIES.colliding(PLAYER, damagePlayer);
  PLAYER.overlaps(ORBS);
  PLAYER.overlaps(BOMBS, bombCollect);
  PLAYER.overlaps(HEALTHS, hpCollect);
  PLAYER.overlaps(EARTH);
  PLAYER.overlaps(FIRE);
  PLAYER.overlaps(WATER);
  PLAYER.overlaps(AIR);
  PLAYER.overlaps(SWORDS);

  EXP.overlaps(EXP);
  EXP.overlaps(ORBS);
  EXP.overlaps(ENEMIES);
  EXP.overlaps(BOMBS);
  EXP.overlaps(HEALTHS);
  EXP.overlaps(EARTH);
  EXP.overlaps(AIR);
  EXP.overlaps(WATER);
  EXP.overlaps(FIRE);
  EXP.overlaps(SWORDS);

  ENEMIES.collides(ENEMIES);
  ENEMIES.overlaps(BOMBS);
  ENEMIES.overlaps(HEALTHS);
  FIRE.overlapping(ENEMIES, fireballToEnemy);
  EARTH.collides(ENEMIES, earthToEnemy);
  AIR.overlaps(ENEMIES, airToEnemy);
  WATER.overlapping(ENEMIES, waterToEnemy);
  ORBS.collides(ENEMIES, orbToEnemy);
  SWORDS.collides(ENEMIES, swordToEnemy);

  ORBS.overlaps(ORBS);
  ORBS.overlaps(BOMBS);
  ORBS.overlaps(HEALTHS);
  ORBS.overlaps(EARTH);
  ORBS.overlaps(AIR);
  ORBS.overlaps(WATER);
  ORBS.overlaps(FIRE);

  BOMBS.overlaps(BOMBS);
  BOMBS.overlaps(HEALTHS);
  BOMBS.overlaps(EARTH);
  BOMBS.overlaps(AIR);
  BOMBS.overlaps(WATER);
  BOMBS.overlaps(FIRE);

  HEALTHS.overlaps(HEALTHS);
  HEALTHS.overlaps(EARTH);
  HEALTHS.overlaps(AIR);
  HEALTHS.overlaps(WATER);
  HEALTHS.overlaps(FIRE);

  EARTH.overlaps(EARTH);
  EARTH.overlaps(AIR);
  EARTH.overlaps(WATER);
  EARTH.overlaps(FIRE);

  AIR.overlaps(WATER);
  AIR.overlaps(FIRE);

  WATER.overlaps(FIRE);

  FIRE.overlaps(FIRE);

  SWORDS.overlaps(ORBS);
  SWORDS.overlaps(SWORDS);
  SWORDS.overlaps(BOMBS);
  SWORDS.overlaps(HEALTHS);
  SWORDS.overlaps(EARTH);
  SWORDS.overlaps(AIR);
  SWORDS.overlaps(WATER);
  SWORDS.overlaps(FIRE);
}

function startTime() {
  TIMERID = setInterval(function() {
    TIME += 1;
  }, 1000);
}

function expCollect(PLAYER, EXP) {
  EXPERIENCESOUND.play();
  EXPERIENCESOUND.setVolume(.05);
  EXP.remove();
  EXPPOINTS += 1;
  checkLevel();
}

function bombCollect(PLAYER, bomb) {
  BOMBSOUND.play();
  BOMBSOUND.setVolume(.25);
  fill(255, 255, 255, 160);
  rect(0, 0, windowWidth, windowHeight);
  bomb.remove();
  for (let i = 0; i < ENEMIES.length; i++) {
    bombToEnemy(bomb, ENEMIES[i]);
  }
}

function hpCollect(PLAYER, health) {
  HEALTHSOUND.play();
  HEALTHSOUND.setVolume(.25);
  health.remove();
  PLAYERHEALTH = PLAYERMAXHEALTH;
}

function damagePlayer(PLAYER) {
  PLAYERHEALTH -= RESISTANCE * TIME / 1000;
  fill(255, 0, 0, 25);
  rect(0, 0, windowWidth, windowHeight);
}

function orbToEnemy(weapon, enemy) {
  enemy.life -= BULLETDAMAGE;
  enemyDeadUpdate(enemy);
  weapon.remove();
}

function swordToEnemy(weapon, enemy) {
  enemy.life -= SWORDDAMAGE;
  enemyDeadUpdate(enemy);
}

function fireballToEnemy(weapon, enemy) {
  enemy.life -= FIREBALLDAMAGE;
  enemyDeadUpdate(enemy);
}

function waterToEnemy(weapon, enemy) {
  enemy.life -= WATERFIELDDAMAGE;
  if (enemy.drag != -2 && WATERON) {
    enemy.drag = -1;
  }
  enemyDeadUpdate(enemy);
}

function airToEnemy(weapon, enemy) {
  enemy.life -= BOUNCERDAMAGE;
  enemyDeadUpdate(enemy);
}

function earthToEnemy(weapon, enemy) {
  enemy.life -= ROTATORDAMAGE;
  enemy.drag = -2;
  enemyDeadUpdate(enemy);
}

function bombToEnemy(weapon, enemy) {
  enemy.life = -1;
  enemyDeadUpdate(enemy);
}

function enemyDeadUpdate(enemy) {
  if (enemy.life <= 0) {
    new EXP.Sprite(enemy.x, enemy.y);
    if (Math.random() * 1000 > 998.5) {
      new BOMBS.Sprite(enemy.x - 10, enemy.y - 10);
    }
    if (Math.random() * 1000 > 998.25) {
      new HEALTHS.Sprite(enemy.x + 10, enemy.y - 10);
    }
    enemy.remove();
    SCORE += 100 + TIME;
  }
}

function checkLevel() {
  if (EXPPOINTS < 268) {
    LVL = EXPPOINTS / 10;
  } else {
    LVL = Math.pow(EXPPOINTS, 1 / 1.7);
  }
  if (EXPPOINTS % 30 === 0 && EXPPOINTS < 240 || EXPPOINTS === 250 || EXPPOINTS === 324 || EXPPOINTS === 421 || EXPPOINTS === 529 || EXPPOINTS === 646 || EXPPOINTS === 773 || EXPPOINTS === 909 || EXPPOINTS === 1054 || EXPPOINTS === 1207 || EXPPOINTS === 1370 || EXPPOINTS === 1540 || EXPPOINTS === 1719 || EXPPOINTS === 1905 || EXPPOINTS === 2100 || EXPPOINTS === 2303 || EXPPOINTS === 2512 || EXPPOINTS === 2729 || EXPPOINTS === 2953 || EXPPOINTS === 3185 || EXPPOINTS === 3424 || EXPPOINTS === 3670 || EXPPOINTS === 3923 || EXPPOINTS === 4183 || EXPPOINTS === 4450 || EXPPOINTS === 4724 || EXPPOINTS === 5004) {
    redraw();
    UPGRADESOUND.play();
    UPGRADESOUND.setVolume(.1);
    generateUpgrades();
  }
}

function generateUpgrades() {
  noLoop();
  clearInterval(TIMERID);
  fill(0, 0, 0, 180);
  rect(0, 0, windowWidth, windowHeight);
  let option1 = Math.floor(Math.random() * 8);
  let option2 = Math.floor(Math.random() * 8);
  let option3 = Math.floor(Math.random() * 8);
  while (option2 === option1) {
    option2 = Math.floor(Math.random() * 8);
  }
  while (option3 === option1 || option3 === option2) {
    option3 = Math.floor(Math.random() * 8);
  }
  let options = [option1, option2, option3];
  for (let i = 0; i < 3; i++) {
    let buttonback = createButton(UPGRADEDESC[options[i]][1]);
    buttonback.style("border-radius", windowWidth / 80 + "px");
    if (options[i] === 0) {
      buttonback.style("background-image", "radial-gradient(#FDFF7A 21%, #FF4040 80%)");
    } else if (options[i] === 1) {
      buttonback.style("background-image", "radial-gradient(#B0B0B0 21%, #8C5400 80%)");
    } else if (options[i] === 2) {
      buttonback.style("background-image", "radial-gradient(#F4FF00 21%, #FF0000 80%)");
    } else if (options[i] === 3) {
      buttonback.style("background-image", "radial-gradient(#FFE6E6 21%, #FF1515 80%)");
    } else if (options[i] === 4) {
      buttonback.style("background-image", "radial-gradient(#C8C8C8 21%, #333333 80%)");
    } else if (options[i] === 5) {
      buttonback.style("background-image", "radial-gradient(#DDFFFD 21%, #54FFF5 90%)");
    } else if (options[i] === 6) {
      buttonback.style("background-image", "radial-gradient(#FFD654 21%, #FFF054 80%)");
    } else if (options[i] === 7) {
      buttonback.style("background-image", "radial-gradient(#5BB5D6 21%, #548AFF 80%)");
    }
    buttonback.style("color", "#373737");
    buttonback.style("font-size", windowWidth / 50 + "px");
    buttonback.style("border", windowWidth / 200 + "px solid black");
    buttonback.size(windowWidth / 4, 2 * windowHeight / 3);
    buttonback.position(i * windowWidth / 3 + windowWidth / 26, windowHeight / 5);
    let button = createButton(UPGRADEDESC[options[i]][0]);
    button.style("border-radius", windowWidth / 120 + "px");
    button.style("background-color", "white");
    button.style("border", "1px solid");
    button.size(windowWidth / 10, windowHeight / 15);
    button.position(i * windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5 - 20);
    button.attribute = options[i];
    button.mousePressed(() => {
    if (button.attribute === 0) {
      if (!FIREON) {
        FIREON = true;
      }
      FIRECT += 1;
      FIREBALLDAMAGE += 50;
      FIRELVLUPSOUND.play();
      FIRELVLUPSOUND.setVolume(.3);
    } else if (button.attribute === 1) {
      EARTHON = true;
      new EARTH.Sprite();
      ROTATORDAMAGE += 25;
      EARTHLVLUPSOUND.play();
      EARTHLVLUPSOUND.setVolume(.08);
    } else if (button.attribute === 2) {
      PLAYERSPEED += .25;
      SPEEDLVLUPSOUND.play();
      SPEEDLVLUPSOUND.setVolume(.2);
    } else if (button.attribute === 3) {
      let healthgained = PLAYERMAXHEALTH;
      PLAYERMAXHEALTH += healthgained;
      PLAYERHEALTH += healthgained;
      HEALTHLVLUPSOUND.play();
      HEALTHLVLUPSOUND.setVolume(.3);
    } else if (button.attribute === 4) {
      RESISTANCE *= .96;
      DEFENSELVLUPSOUND.play();
      DEFENSELVLUPSOUND.setVolume(.2);
    } else if (button.attribute === 5) {
      if (!AIRON) {
        new AIR.Sprite();
        AIRON = true;
      } else {
        BOUNCESPEED += 1;
        BOUNCERDAMAGE += 300;
      }
      AIRLVLUPSOUND.play();
      AIRLVLUPSOUND.setVolume(.25);
    } else if (button.attribute === 6) {
      BULLETDAMAGE += 300;
      SWORDDAMAGE += 350;
      SUNLVLUPSOUND.play();
      SUNLVLUPSOUND.setVolume(.1);
    } else if (button.attribute === 7) {
      if (!WATERON) {
        new WATER.Sprite();
        WATER.layer = -100;
        WATERON = true;
      } else {
        WATERFIELDDAMAGE += .6;
      }
      WATERLVLUPSOUND.play();
      WATERLVLUPSOUND.setVolume(.2);
    }
    let buttons = selectAll("button");
    for (let i = 1; i < buttons.length; i++) {
      buttons[i].remove();
    }
    startTime();
    loop();
  });

  }
}

function spawnEnemy() {
  let enemy = new ENEMIES.Sprite();
  enemy.life = 100 + Math.pow(TIME, 1.35);
  if (Math.random() * 2 > 1) {
    if (Math.random() * 2 > 1) {
      enemy.x = Math.random() * (PLAYER.x + windowWidth / 2);
      enemy.y = PLAYER.y - windowHeight / 2;
    } else {
      enemy.x = Math.random() * (PLAYER.x + windowWidth / 2);
      enemy.y = PLAYER.y + windowHeight / 2;
    }
  } else {
    if (Math.random() * 2 > 1) {
      enemy.x = PLAYER.x - windowWidth / 2;
      enemy.y = Math.random() * (PLAYER.y + windowHeight / 2);
    } else {
      enemy.x = PLAYER.x + windowWidth / 2;
      enemy.y = Math.random() * (PLAYER.y + windowHeight / 2);
    }
  }
}

window.mousePressed = () => {
  if (CHOSEORBS) {
    SUNATKSOUND.play();
    SUNATKSOUND.setVolume(.2);
    let orb = new ORBS.Sprite(PLAYER.x, PLAYER.y, 15, 15);
    orb.moveTowards(mouse.x + PLAYER.mouse.x, mouse.y + PLAYER.mouse.y);
    orb.speed = 20;
  } else if (CHOSESWORD && SWORDS.length < 1) {
    SUNATKSOUND.play();
    SUNATKSOUND.setVolume(.2);
    let sword = new SWORDS.Sprite([[PLAYER.x, PLAYER.y], [mouse.x + PLAYER.mouse.x, mouse.y + PLAYER.mouse.y]]);
    if (PLAYER.x > mouse.x + PLAYER.mouse.x) {
      if (PLAYER.y > mouse.y + PLAYER.mouse.y) {
        sword.ani = "SWORDIMG_L";
      } else {
        sword.ani = "SWORDIMG_D";
      }
    } else {
      if (PLAYER.y > mouse.y + PLAYER.mouse.y) {
        sword.ani = "SWORDIMG_U";
      } else {
        sword.ani = "SWORDIMG_R";
      }
    }
    sword.width = 80;
    sword.height = 80;
    sword.rotate(90, 4.6).then(() => {
      SWORDS.remove();
    });
  }
};

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight);
}

window.draw = () => {
  if (PLAYERHEALTH <= 0) {
    noLoop();
    clearInterval(TIMERID);
    BGMUSIC.stop();
    LOSESOUND.play();
    LOSESOUND.loop();
    LOSESOUND.setVolume(.3);
    let buttonback = createButton("Game over. The shadows have taken over the land and soon the Sun.");
    buttonback.style("border-radius", windowWidth / 80 + "px");
    buttonback.style("background-image", "radial-gradient(red 21%, black 80%)");
    buttonback.style("color", "white");
    buttonback.style("border", "none");
    buttonback.style("font-size", windowWidth / 50 + "px");
    buttonback.size(windowWidth / 2, 2 * windowHeight / 3);
    buttonback.position(windowWidth / 6 + 2 / 24 * windowWidth, windowHeight / 5);
    let div = createDiv("Score: " + SCORE);
    div.style("color", "white");
    div.style("font-size", windowWidth / 60 + "px");
    div.size(windowWidth / 10, windowHeight / 15);
    div.style("text-align","center");
    div.position(windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5 - 110);
    let playagain = createButton("Play Again");
    playagain.style("border-radius", windowWidth / 280 + "px");
    playagain.style("background-color", "black");
    playagain.style("color", "white");
    playagain.style("border", "none");
    playagain.size(windowWidth / 10, windowHeight / 15);
    playagain.position(windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5 - 20);
    playagain.mousePressed(() => {
      allSprites.remove();
      clear();
      LOSESOUND.stop();
      initialize();
      TIME = 30;
      loop();
      buttonback.remove();
      div.remove();
      playagain.remove();
    });
  }
  for (let i = 0; i < ORBS.length; i ++) {
    if (ORBS[i].x > PLAYER.x + 2 * windowWidth / 3 || ORBS[i].y > PLAYER.y + 2 * windowHeight / 3 || ORBS[i].x < PLAYER.x - 2 * windowWidth / 3 || ORBS[i].y < PLAYER.y - 2 * windowHeight / 3) {
      ORBS[i].remove();
    }
  }
  clear();
  image(BG, x1, y1, windowWidth + 8, windowHeight + 8);
  image(BG, x2, y2, windowWidth + 8, windowHeight + 8);
  image(BG, x1, y2, windowWidth + 8, windowHeight + 8);
  image(BG, x2, y1, windowWidth + 8, windowHeight + 8);
  image(MOUSEIMG, 15, 18.25 * windowHeight / 20, 35, 35);
  // image(FIREIMG, 0, 10, 20, 50);
  fill(65, 65, 65, TIME / 1.5 - PLAYERHEALTH * 2);
  rect(0, 0, windowWidth, windowHeight);
  if (x1 < -windowWidth){
    x1 = windowWidth;
  } else if (x1 > windowWidth) {
    x1 = -windowWidth;
  }
  if (x2 < -windowWidth){
    x2 = windowWidth;
  } else if (x2 > windowWidth) {
    x2 = -windowWidth;
  }
  if (y1 < -windowHeight){
    y1 = windowHeight;
  } else if (y1 > windowHeight) {
    y1 = -windowHeight;
  }
  if (y2 < -windowHeight){
    y2 = windowHeight;
  } else if (y2 > windowHeight) {
    y2 = -windowHeight;
  }
  if (frameCount % 200 === 0 && TIME > 20) {
    for (let i = 0; i < TIME * Math.pow(windowWidth, 2) / 15000000; i++) {
      if (ENEMIES.length < Math.pow(windowWidth, 2) / 13000) {
        spawnEnemy();
      }
    }
  }
  for (let i = 0; i < ENEMIES.length; i++) {
    if (ENEMIES[i].x > PLAYER.x + 2 * windowWidth / 3 || ENEMIES[i].y > PLAYER.y + 2 * windowHeight / 3 || ENEMIES[i].x < PLAYER.x - 2 * windowWidth / 3 || ENEMIES[i].y < PLAYER.y - 2 * windowHeight / 3) {
      ENEMIES[i].remove();
      spawnEnemy();
    }
    let enemydirection = Math.atan2(PLAYER.y - ENEMIES[i].y, PLAYER.x - ENEMIES[i].x) * 180 / Math.PI;
    ENEMIES[i].direction = enemydirection;
    ENEMIES[i].speed = 2.5 + TIME / 250;
    if (ENEMIES[i].x < PLAYER.x) {
      ENEMIES[i].ani = "ENEMYRIGHTIMG";
    } else {
      ENEMIES[i].ani = "ENEMYLEFTIMG";
    }
    ENEMIES[i].life += 1;
    if (ENEMIES[i].drag === -1) {
      ENEMIES[i].speed = .25 * (2.5 + TIME / 300);
      ENEMIES[i].drag = 0;
    } else if (ENEMIES[i].drag === -2) {
      ENEMIES[i].speed = .75 * (2.5 + TIME / 300);
    }
  }
  if (kb.pressing("down") && kb.pressing("left")) {
    PLAYER.ani = "left";
    FACING = "left";
    PLAYER.move(PLAYERSPEED * 1.5, 135, PLAYERSPEED - 1);
    y1 -= PLAYERSPEED - 1;
    y2 -= PLAYERSPEED - 1;
    x1 += PLAYERSPEED - 1;
    x2 += PLAYERSPEED - 1;
	} else if (kb.pressing("down") && kb.pressing("right")) {
    PLAYER.ani = "right";
    FACING = "right";
    PLAYER.move(PLAYERSPEED * 1.5, 45, PLAYERSPEED - 1);
    y1 -= PLAYERSPEED - 1;
    y2 -= PLAYERSPEED - 1;
    x1 -= PLAYERSPEED - 1;
    x2 -= PLAYERSPEED - 1;
	} else if (kb.pressing("up") && kb.pressing("left")) {
    PLAYER.ani = "left";
    FACING = "left";
    PLAYER.move(PLAYERSPEED * 1.5, 225, PLAYERSPEED - 1);
    y1 += PLAYERSPEED - 1;
    y2 += PLAYERSPEED - 1;
    x1 += PLAYERSPEED - 1;
    x2 += PLAYERSPEED - 1;
	} else if (kb.pressing("up") && kb.pressing("right")) {
    PLAYER.ani = "right";
    FACING = "right";
    x1 -= PLAYERSPEED - 1;
    x2 -= PLAYERSPEED - 1;
    y1 += PLAYERSPEED - 1;
    y2 += PLAYERSPEED - 1;
    PLAYER.move(PLAYERSPEED * 1.5, 315, PLAYERSPEED - 1);
	} else if (kb.pressing("right")) {
    PLAYER.ani = "right";
    FACING = "right";
    x1 -= PLAYERSPEED;
    x2 -= PLAYERSPEED;
		PLAYER.move(PLAYERSPEED * 1.5, "right", PLAYERSPEED);
	} else if (kb.pressing("left")) {
    PLAYER.ani = "left";
    FACING = "left";
    x1 += PLAYERSPEED;
    x2 += PLAYERSPEED;
    PLAYER.move(PLAYERSPEED * 1.5, "left", PLAYERSPEED);
  } else if (kb.pressing("up")) {
    y1 += PLAYERSPEED;
    y2 += PLAYERSPEED;
    PLAYER.move(PLAYERSPEED * 1.5, "up", PLAYERSPEED);
	} else if (kb.pressing("down")) {
    PLAYER.move(PLAYERSPEED * 1.5, "down", PLAYERSPEED);
    y1 -= PLAYERSPEED;
    y2 -= PLAYERSPEED;
	} else {
    if (FACING === "right") {
      PLAYER.ani = "PLAYERSTANDRIGHTIMG";
    } else {
      PLAYER.ani = "PLAYERSTANDLEFTIMG";
    }
  }
  if (TIME <= 32) {
    let texttutorial = ["Fight against the shadow warriors who are plotting to attack the Sun.",
        "Be careful not to get near the shadows.", "Move around with WASD and dodge their necrotic attacks.", "Attack with your LMB and use abilities to defeat them.",
        "As you defeat more shadows, they'll drop sun souls.", "Use these souls to level up and become stronger.",
        "As you collect souls, you'll gain powers.",
        "Help save the Sun from danger. Good luck!"];
    fill("white");
    textSize(windowWidth / 50);
    textAlign(CENTER);
    text(texttutorial[Math.floor(TIME / 4)], windowWidth / 2, windowHeight / 4);
  }
  textAlign(CENTER);
  noFill();
  rect(windowWidth * 3 / 10, windowHeight / 10, windowWidth * 2 / 5, windowHeight / 20);
  rect(windowWidth * 97 / 200, windowHeight / 1.8, windowWidth * 3 / 100, windowHeight / 60);
  fill("green");
  rect(windowWidth * 3 / 10, windowHeight / 10, map(LVL - Math.floor(LVL), 0, 1, 0, windowWidth * 2 / 5), windowHeight / 20);
  fill("red");
  rect(windowWidth * 97 / 200, windowHeight / 1.8, map(PLAYERHEALTH, 0, PLAYERMAXHEALTH, 0, windowWidth * 3 / 100), windowHeight / 60);
  fill("white");
  textFont("Courier New");
  stroke(45, 45, 45);
  strokeWeight(2.5);
  textSize(windowWidth / 70);
  text("Score: " + SCORE, windowWidth - 140, windowHeight / 20);
  let minutes = Math.floor(TIME / 60);
  let extraSeconds = TIME % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
  text("Time: " + minutes + ":" + extraSeconds, 80, windowHeight / 20);
  text("   : Attack", 80, windowHeight * 19 / 20);
  text("Health: " + Math.floor(PLAYERHEALTH) + "/" + PLAYERMAXHEALTH, windowWidth * 10 / 13, windowHeight * 2 / 15);
  textSize(windowWidth / 60);
  textFont("Arial");
  text("Level: " + Math.floor(LVL), windowWidth / 2, windowHeight / 11);
  if (EARTHON) {
    for (let i = 1; i < EARTH.length + 1; i++) {
      let spacing = (i * 2 * Math.PI / EARTH.length);
      let circularx = Math.cos(frameCount / 20) * Math.cos((spacing));
      let circulary = Math.sin(frameCount / 20) * Math.sin((spacing));
      EARTH[i - 1].x = PLAYER.x + 150 * circularx;
      EARTH[i - 1].y = PLAYER.y + 150 * circulary;
    }
  }
  if (AIRON) {
    AIR.x = constrain(AIR.x, PLAYER.x - windowWidth / 2, PLAYER.x + windowWidth / 2);
    AIR.y = constrain(AIR.y, PLAYER.y - windowHeight / 2, PLAYER.y + windowHeight / 2);
    AIR.x += BOUNCESPEED * xdirection;
    AIR.y += BOUNCESPEED * ydirection;
    if (AIR.x > PLAYER.x + windowWidth / 2 || AIR.x < PLAYER.x - windowWidth / 2) {
      xdirection *= -1;
    }
    if (AIR.y > PLAYER.y + windowHeight / 2 || AIR.y < PLAYER.y - windowHeight / 2) {
      ydirection *= -1;
    }
  }
  if (WATERON) {
    WATER.x = PLAYER.x;
    WATER.y = PLAYER.y;
  }
  if (SWORDS[0]) {
    SWORDS[0].x = PLAYER.x;
    SWORDS[0].y = PLAYER.y;
  }
  camera.x = PLAYER.x;
  camera.y = PLAYER.y;
  if (FIREON && frameCount % 130 === 0) {
    for (let i = 0; i < FIRECT; i++) {
      let fireball = new FIRE.Sprite();
      fireball.x = PLAYER.x;
      fireball.y = PLAYER.y;
      fireball.speed = 40;
      let spacing = (i * 2 * Math.PI / FIRECT) + Math.PI / 2;
      fireball.moveTowards(PLAYER.x + 200 * Math.cos(spacing), PLAYER.y + 200 * Math.sin(spacing));
      if (FIRE[i].x > PLAYER.x + 2 * windowWidth / 3 || FIRE[i].y > PLAYER.y + 2 * windowHeight / 3 || FIRE[i].x < PLAYER.x - 2 * windowWidth / 3 || FIRE[i].y < PLAYER.y - 2 * windowHeight / 3) {
        FIRE[i].remove();
      }
    }
  }
  if (TIME > 15 && !WEAPONCHOSEN) {
    redraw();
    UPGRADESOUND.play();
    UPGRADESOUND.setVolume(.1);
    chooseWeapon();
  }
};