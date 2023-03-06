let PLAYAGAINED;
let WEAPONCHOSEN;
let CHOSEORBS;
let CHOSESWORD;
let SWORDDAMAGE;
let BG;
let x1;
let y1;
let x2;
let y2;
let PLAYER;
let PLAYERHEALTH;
let SCORE;
let experience;
let LVL;
let EXPPOINTS;
let enemies;
let time;
let orbs;
let swords;
let bombs;
let healths;
let PLAYERSPEED;
let BULLETDAMAGE;
let PLAYERMAXHEALTH;
let rotators;
let rotatorson;
let bouncer;
let bounceron;
let BOUNCESPEED;
let xdirection;
let ydirection;
let wateron;
let waterfield;
let fireballs;
let fireballon;
let fireballct;
let RESISTANCE;
let FIREBALLDAMAGE;
let WATERFIELDDAMAGE;
let BOUNCERDAMAGE;
let ROTATORDAMAGE;
let backgroundsounds;
let bombsound;
let healthsound;
let experiencesound;
let sun;
let selectability;
let sunlevelup;
let waterlevelup;
let firelevelup;
let airlevelup;
let earthlevelup;
let speedlevelup;
let healthlevelup;
let defenselevelup;
let testimage;
let test2image;
let enemyimage;
let enemyimage2;
let fireimage;
let waterimage;
let airimage;
let earthimage;
let sunimage;
let swordimageL;
let swordimageR;
let swordimageU;
let swordimageD;
let bombimage;
let healthimage;
let experienceimage;
let standleft;
let standright;
let facing;
// let rightattack;
// let leftattack;
let timerid;
let losesound;
let PAUSED;
let powerups = {0:["Add a Fireball", "Fireballs burn through enemies dealing massive damage!"], 1:["Add a Stonewall", "Indestructible stones surround you, preventing enemies from getting near you. Enemies hit are permanently slowed."], 2:["Increase Speed", "Move faster to dodge and weave past enemies."], 3:["Increase Health", "More health makes you able to take more damage for longer."], 4:["Increase Defense", "Bolster your armor and take less damage from enemies."], 5:["Power up your Airball", "Enemies won't know when it's coming, but when it does, it's too late."], 6:["Increase Sun Damage", "Shadows try to avoid the sun as much as possible, as it does massive damage."], 7:["Power up your Waterfield", "Surround yourself in an endless whirlpool that slows enemies in the tide."]};

p5.disableFriendlyErrors = true;

function preload() {
  standleft = loadAnimation("images/left1.png");
  standright = loadAnimation("images/right1.png");
  // leftattack = loadAnimation("images/leftattack.png");
  // rightattack = loadAnimation("images/rightattack.png");
  testimage = loadAnimation("images/right2.png", 3);
  testimage.frameDelay = 12;
  test2image = loadAnimation("images/left2.png", 3);
  test2image.frameDelay = 12;
  enemyimage2 = loadAnimation("images/enemy2.png");
  enemyimage = loadAnimation("images/enemy.png");
  fireimage = loadAnimation("images/fire.png");
  waterimage = loadAnimation("images/water1.png", 9);
  waterimage.frameDelay = 8;
  airimage = loadAnimation("images/air.png");
  earthimage = loadAnimation("images/earth.png");
  sunimage = loadAnimation("images/sun.png");
  swordimageL = loadAnimation("images/sword2.png");
  swordimageR = loadAnimation("images/sword.png");
  swordimageU = loadAnimation("images/sword3.png");
  swordimageD = loadAnimation("images/sword4.png");
  bombimage = loadAnimation("images/bomb.png");
  healthimage = loadAnimation("images/health.png");
  experienceimage = loadAnimation("images/experience.png");
  let musicnumber = Math.ceil(random(3));
  soundFormats("mp3");
  backgroundsounds = loadSound("music/background" + musicnumber + ".mp3");
  losesound = loadSound("music/lose");
  bombsound = loadSound("music/bomb");
  healthsound = loadSound("music/health");
  experiencesound = loadSound("music/experience");
  selectability = loadSound("music/selectability");
  sun = loadSound("music/sunorb");
  waterlevelup = loadSound("music/water");
  firelevelup = loadSound("music/fireballs");
  airlevelup = loadSound("music/air");
  earthlevelup = loadSound("music/earth");
  speedlevelup = loadSound("music/speed");
  healthlevelup = loadSound("music/healthincrease");
  defenselevelup = loadSound("music/defense");
  sunlevelup = loadSound("music/sun");
}
// to do:
// save high SCORE, if they have completed tutorial
// add projectile enemies
// enemy damaged sound
// add boss levels
// cleaner visuals (powerups and LVL in bottom right)
// camelcase function, uppercase globals, hannah's suggestion

window.setup = () => {
  initialize();
};

function initialize() {
  let pause = createButton("Pause");
  pause.style("border-radius", "5px");
  pause.style("font-size", "12px");
  pause.style("border", "none");
  pause.size(50, 20);
  pause.position(20, windowHeight * 1 / 20 + 10);
  pause.mousePressed(() => {
    if (!PAUSED) {
      pause.html("Play");
      noLoop();
      clearInterval(timerid);
      PAUSED = true;
      backgroundsounds.setVolume(.002);
    } else {
      pause.html("Pause");
      startTime();
      loop();
      backgroundsounds.setVolume(.012);
      PAUSED = false;
    }
  });
  PLAYER = new Sprite(windowWidth / 2, windowHeight / 2, 20, 40);
  if (!PLAYAGAINED) {
    startTime();
  }
  resetStats();
  groupInit();
  physicsInit();
  visualInit();
  createCanvas(windowWidth, windowHeight);
	while (experience.length < 30) {
    new experience.Sprite();
    experience.x = () => random(0, windowWidth);
    experience.y = () => random(0, windowHeight);
	}
  overlapCheck();
  backgroundmusic();
  let imagenumber = Math.ceil(random(5));
  BG = loadImage("images/" + imagenumber + "-min.jpg");
}

function backgroundmusic() {
  backgroundsounds.play();
  backgroundsounds.loop();
  backgroundsounds.setVolume(.012);
  userStartAudio();
}

function visualInit() {
  enemies.addAnimation("enemyimage", enemyimage);
  enemies.addAnimation("enemyimage2", enemyimage2);
  waterfield.addAnimation("waterimage", waterimage);
  // PLAYER.addAnimation("rightattack", rightattack);
	// PLAYER.addAnimation("leftattack", leftattack);
  PLAYER.addAnimation("right", testimage);
	PLAYER.addAnimation("left", test2image);
  PLAYER.addAnimation("standright", standright);
	PLAYER.addAnimation("standleft", standleft);
  bouncer.addAnimation("airimage", airimage);
  rotators.addAnimation("earthimage", earthimage);
  fireballs.addAnimation("fireimage", fireimage);
  orbs.addAnimation("sunimage", sunimage);
  swords.addAnimation("swordimageL", swordimageL);
  swordimageL.offset.x = -45;
  swordimageL.offset.y = -45;
  swords.addAnimation("swordimageR", swordimageR);
  swordimageR.offset.x = 45;
  swordimageR.offset.y = 45;
  swords.addAnimation("swordimageU", swordimageU);
  swordimageU.offset.x = 45;
  swordimageU.offset.y = -45;
  swords.addAnimation("swordimageD", swordimageD);
  swordimageD.offset.x = -45;
  swordimageD.offset.y = 45;
  healths.addAnimation("healthimage", healthimage);
  bombs.addAnimation("bombimage", bombimage);
  experience.addAnimation("experienceimage", experienceimage);
}

function resetStats() {
  WEAPONCHOSEN = false;
  CHOSEORBS = false;
  CHOSESWORD = false;
  PLAYAGAINED = false;
  facing = "right";
  PAUSED = false;
  x1 = 0;
  y1 = 0;
  x2 = windowWidth;
  y2 = windowHeight;
  PLAYERHEALTH = 100;
  // PLAYERHEALTH = 100000;
  PLAYERMAXHEALTH = 100;
  // PLAYERMAXHEALTH = 100000;
  SCORE = 0;
  EXPPOINTS = 10;
  // EXPPOINTS = 29;
  LVL = 1;
  time = 19;
  // time = 25;
  // time = 600;
  PLAYERSPEED = 3.25;
  BULLETDAMAGE = 840;
  SWORDDAMAGE = 1040;
  rotatorson = false;
  bounceron = false;
  xdirection = 1;
  ydirection = 1;
  wateron = false;
  fireballon = false;
  fireballct = 0;
  RESISTANCE = 1;
  FIREBALLDAMAGE = 320;
  WATERFIELDDAMAGE = 4;
  BOUNCERDAMAGE = 1450;
  ROTATORDAMAGE = 520;
  BOUNCESPEED = 15;
}

function chooseWeapon() {
  fill(0,0,0,180);
  rect(0, 0, windowWidth, windowHeight);
  optionsdescription = ["Select a Sun Orb that you can use to shoot enemies from afar", "Select a Sun Sword that allows you to slash through multiple enemies at close range"];
  options = ["Select Sun Orb", "Select Sun Sword"];
  for (let i = 0; i < 2; i++) {
    let buttonback = createButton(optionsdescription[i]);
    buttonback.style("border-radius", "45px");
    buttonback.style("background-image", "radial-gradient(#FFD654 21%, #FFF054 80%)");
    buttonback.style("color", "#373737");
    buttonback.style("font-size", "28px");
    buttonback.style("border", "3px solid black");
    buttonback.size(windowWidth / 4, 2 * windowHeight / 3);
    buttonback.position(i * windowWidth / 3 + 1 * windowWidth / 26 + windowWidth / 6, 1 * windowHeight / 5);
    let button = createButton(options[i]);
    button.style("border-radius", "5px");
    button.style("background-color", "white");
    button.style("border", "1px solid");
    button.size(windowWidth / 10, windowHeight / 15);
    button.position(i * windowWidth / 3 + 3 * windowWidth / 26 + windowWidth / 6, 4 * windowHeight / 5 - 20);
    button.attribute = options[i];
    noLoop();
    clearInterval(timerid);
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
  bombs = new Group();
  rotators = new Group();
  healths = new Group();
  orbs = new Group();
  swords = new Group();
  bouncer = new Group();
  waterfield = new Group();
  enemies = new Group();
	experience = new Group();
  fireballs = new Group();
}

function physicsInit() {
  // allSprites.autoCull = false;
  // bombs.diameter = 20;
  // rotators.diameter = 60;
  // healths.diameter = 30;
  // fireballs.diameter = 80;
	// experience.diameter = 10;
  PLAYER.collider = "kinematic";
  swords.collider = "kinematic";
  PLAYER.rotationLock = true;
  // bouncer.friction = 0;
  bouncer.x = PLAYER.x;
  bouncer.y = PLAYER.y;
  // bouncer.diameter = 55;
  // waterfield.diameter = 180;
  // enemies.width = 15;
  // enemies.height = 30;
  enemies.rotationLock = true;
}

function overlapCheck() {
  PLAYER.overlaps(experience, expCollect);
  enemies.collides(PLAYER, damagePlayer);
  enemies.colliding(PLAYER, damagePlayer);
  PLAYER.overlaps(orbs);
  PLAYER.overlaps(bombs, bombCollect);
  PLAYER.overlaps(healths, hpCollect);
  PLAYER.overlaps(rotators);
  PLAYER.overlaps(fireballs);
  PLAYER.overlaps(waterfield);
  PLAYER.overlaps(bouncer);
  PLAYER.overlaps(swords);

  experience.overlaps(experience);
  experience.overlaps(orbs);
  experience.overlaps(enemies);
  experience.overlaps(bombs);
  experience.overlaps(healths);
  experience.overlaps(rotators);
  experience.overlaps(bouncer);
  experience.overlaps(waterfield);
  experience.overlaps(fireballs);
  experience.overlaps(swords);

  enemies.collides(enemies);
  enemies.overlaps(bombs);
  enemies.overlaps(healths);
  fireballs.overlapping(enemies, fireballToEnemy);
  rotators.collides(enemies, earthToEnemy);
  bouncer.overlaps(enemies, airToEnemy);
  waterfield.overlapping(enemies, waterToEnemy);
  orbs.collides(enemies, orbToEnemy);
  swords.collides(enemies, swordToEnemy);

  orbs.overlaps(orbs);
  orbs.overlaps(bombs);
  orbs.overlaps(healths);
  orbs.overlaps(rotators);
  orbs.overlaps(bouncer);
  orbs.overlaps(waterfield);
  orbs.overlaps(fireballs);

  bombs.overlaps(bombs);
  bombs.overlaps(healths);
  bombs.overlaps(rotators);
  bombs.overlaps(bouncer);
  bombs.overlaps(waterfield);
  bombs.overlaps(fireballs);

  healths.overlaps(healths);
  healths.overlaps(rotators);
  healths.overlaps(bouncer);
  healths.overlaps(waterfield);
  healths.overlaps(fireballs);

  rotators.overlaps(rotators);
  rotators.overlaps(bouncer);
  rotators.overlaps(waterfield);
  rotators.overlaps(fireballs);

  bouncer.overlaps(waterfield);
  bouncer.overlaps(fireballs);

  waterfield.overlaps(fireballs);

  fireballs.overlaps(fireballs);

  swords.overlaps(orbs);
  swords.overlaps(swords);
  swords.overlaps(bombs);
  swords.overlaps(healths);
  swords.overlaps(rotators);
  swords.overlaps(bouncer);
  swords.overlaps(waterfield);
  swords.overlaps(fireballs);
}

function startTime() {
  timerid = setInterval(function() {
    time += 1;
  }, 1000);
}

function expCollect(PLAYER, experience) {
  experiencesound.play();
  experiencesound.setVolume(.05);
  experience.remove();
  EXPPOINTS += 1;
  checkLevel();
}

function bombCollect(PLAYER, bomb) {
  bombsound.play();
  bombsound.setVolume(.25);
  bomb.remove();
  for (let i = 0; i < enemies.length; i++) {
    bombToEnemy(bomb, enemies[i]);
  }
}

function hpCollect(PLAYER, health) {
  healthsound.play();
  healthsound.setVolume(.25);
  health.remove();
  PLAYERHEALTH = PLAYERMAXHEALTH;
}

function damagePlayer(PLAYER) {
  PLAYERHEALTH -= RESISTANCE * time / 700;
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
  if (enemy.drag != -2 && wateron) {
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
  // fill(10, 10, 10, 25);
  // rect(0, 0, windowWidth, windowHeight);
}

function enemyDeadUpdate(enemy) {
  if (enemy.life <= 0) {
    if (random(10) > 3) {
      new experience.Sprite(enemy.x, enemy.y);
    }
    if (random(1000) > 998.5) {
      new bombs.Sprite(enemy.x - 10, enemy.y - 10);
    }
    if (random(1000) > 998.25) {
      new healths.Sprite(enemy.x + 10, enemy.y - 10);
    }
    enemy.remove();
    SCORE += 100 + time;
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
    selectability.play();
    selectability.setVolume(.1);
    generateUpgrades();
  }
}

function generateUpgrades() {
  fill(0,0,0,180);
  rect(0, 0, windowWidth, windowHeight);
  let option1 = Math.floor(random(0, 8));
  let option2 = Math.floor(random(0, 8));
  let option3 = Math.floor(random(0, 8));
  while (option2 === option1) {
    option2 = Math.floor(random(0, 8));
  }
  while (option3 === option1 || option3 === option2) {
    option3 = Math.floor(random(0, 8));
  }
  let options = [option1, option2, option3];
  for (let i = 0; i < 3; i++) {
    let buttonback = createButton(powerups[options[i]][1]);
    buttonback.style("border-radius", "45px");
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
    buttonback.style("font-size", "28px");
    buttonback.style("border", "3px solid black");
    buttonback.size(windowWidth / 4, 2 * windowHeight / 3);
    buttonback.position(i * windowWidth / 3 + 1 * windowWidth / 26, 1 * windowHeight / 5);
    let button = createButton(powerups[options[i]][0]);
    button.style("border-radius", "5px");
    button.style("background-color", "white");
    button.style("border", "1px solid");
    button.size(windowWidth / 10, windowHeight / 15);
    button.position(i * windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5 - 20);
    button.attribute = options[i];
    noLoop();
    clearInterval(timerid);
    button.mousePressed(() => {
    if (button.attribute === 0) {
      if (!fireballon) {
        fireballon = true;
      }
      fireballct += 1;
      FIREBALLDAMAGE += 50;
      firelevelup.play();
      firelevelup.setVolume(.3);
    } else if (button.attribute === 1) {
      rotatorson = true;
      new rotators.Sprite();
      ROTATORDAMAGE += 25;
      earthlevelup.play();
      earthlevelup.setVolume(.08);
    } else if (button.attribute === 2) {
      PLAYERSPEED += .25;
      speedlevelup.play();
      speedlevelup.setVolume(.2);
    } else if (button.attribute === 3) {
      let healthgained = PLAYERMAXHEALTH;
      PLAYERMAXHEALTH += healthgained;
      PLAYERHEALTH += healthgained;
      healthlevelup.play();
      healthlevelup.setVolume(.3);
    } else if (button.attribute === 4) {
      RESISTANCE = RESISTANCE * .96;
      defenselevelup.play();
      defenselevelup.setVolume(.2);
    } else if (button.attribute === 5) {
      if (!bounceron) {
        new bouncer.Sprite();
        bounceron = true;
      } else {
        BOUNCESPEED += 1;
        BOUNCERDAMAGE += 300;
      }
      airlevelup.play();
      airlevelup.setVolume(.25);
    } else if (button.attribute === 6) {
      BULLETDAMAGE += 300;
      SWORDDAMAGE += 350;
      sunlevelup.play();
      sunlevelup.setVolume(.1);
    } else if (button.attribute === 7) {
      if (!wateron) {
        new waterfield.Sprite();
        waterfield.layer = 1;
        wateron = true;
      } else {
        WATERFIELDDAMAGE += .6;
      }
      waterlevelup.play();
      waterlevelup.setVolume(.2);
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
  let enemy = new enemies.Sprite();
  enemy.life = 100 + Math.pow(time, 1.35);
  if (random(2) > 1) {
    if (random(2) > 1) {
      enemy.x = random(0, PLAYER.x + windowWidth / 2);
      enemy.y = PLAYER.y - windowHeight / 2;
    } else {
      enemy.x = random(0, PLAYER.x + windowWidth / 2);
      enemy.y = PLAYER.y + windowHeight / 2;
    }
  } else {
    if (random(2) > 1) {
      enemy.x = PLAYER.x - windowWidth / 2;
      enemy.y = random(0, PLAYER.y + windowHeight / 2);
    } else {
      enemy.x = PLAYER.x + windowWidth / 2;
      enemy.y = random(0, PLAYER.y + windowHeight / 2);
    }
  }
}

window.mousePressed = () => {
  if (CHOSEORBS) {
    sun.play();
    sun.setVolume(.2);
    let orb = new orbs.Sprite(PLAYER.x, PLAYER.y, 15, 15);
    orb.moveTowards(mouse.x + PLAYER.mouse.x, mouse.y + PLAYER.mouse.y);
    orb.speed = 20;
  } else if (CHOSESWORD && swords.length < 1) {
    sun.play();
    sun.setVolume(.2);
    let sword = new swords.Sprite([[PLAYER.x, PLAYER.y], [mouse.x + PLAYER.mouse.x, mouse.y + PLAYER.mouse.y]]);
    if (PLAYER.x > mouse.x + PLAYER.mouse.x) {
      if (PLAYER.y > mouse.y + PLAYER.mouse.y) {
        // offset can be done preload
        sword.ani = "swordimageL";
      } else {
        sword.ani = "swordimageD";
      }
    } else {
      if (PLAYER.y > mouse.y + PLAYER.mouse.y) {
        sword.ani = "swordimageU";
      } else {
        sword.ani = "swordimageR";
      }
    }
    sword.width = 80;
    sword.height = 80;
    sword.rotate(90, 4.6).then(() => {
      swords.remove();
    });
  }
};

window.draw = () => {
  if (Math.floor(PLAYERHEALTH) <= 0) {
    noLoop();
    clearInterval(timerid);
    backgroundsounds.stop();
    losesound.play();
    losesound.setVolume(.3);
    let buttonback = createButton("Game over. The shadows have taken over the land and soon the Sun.");
    buttonback.style("border-radius", "15px");
    buttonback.style("background-image", "radial-gradient(red 21%, black 80%)");
    buttonback.style("color", "white");
    buttonback.style("border", "none");
    buttonback.style("font-size", "30px");
    buttonback.size(windowWidth / 2, 2 * windowHeight / 3);
    buttonback.position(windowWidth / 6 + 2 / 24 * windowWidth, 1 * windowHeight / 5);
    let div = createDiv("Score: " + SCORE);
    div.style("color", "white");
    div.style("font-size", "25px");
    div.size(windowWidth / 10, windowHeight / 15);
    div.style("text-align","center");
    div.position(windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5 - 110);
    let playagain = createButton("Play Again");
    playagain.style("background-color", "black");
    playagain.style("color", "white");
    playagain.style("border", "none");
    playagain.size(windowWidth / 10, windowHeight / 15);
    playagain.position(windowWidth / 3 + 3 * windowWidth / 26, 4 * windowHeight / 5 - 20);
    playagain.mousePressed(() => {
      PLAYAGAINED = true;
      allSprites.remove();
      clear();
      losesound.stop();
      initialize();
      time = 20;
      loop();
      buttonback.remove();
      div.remove();
      playagain.remove();
    });
  }
  for (let i = 0; i < orbs.length; i ++) {
    if (orbs[i].x > PLAYER.x + 2 * windowWidth / 3 || orbs[i].y > PLAYER.y + 2 * windowHeight / 3 || orbs[i].x < PLAYER.x - 2 * windowWidth / 3 || orbs[i].y < PLAYER.y - 2 * windowHeight / 3) {
      orbs[i].remove();
    }
  }
  clear();
  image(BG, x1, y1, windowWidth + 8, windowHeight + 8);
  image(BG, x2, y2, windowWidth + 8, windowHeight + 8);
  image(BG, x1, y2, windowWidth + 8, windowHeight + 8);
  image(BG, x2, y1, windowWidth + 8, windowHeight + 8);
  // image(fireimage, 0, 10, 20, 50);
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
  if (frameCount % 200 === 0 && time > 20) {
    for (let i = 0; i < time * Math.pow(windowWidth, 2) / 15000000; i++) {
      if (enemies.length < Math.pow(windowWidth, 2) / 12000) {
        spawnEnemy();
      }
    }
  }
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].x > PLAYER.x + 2 * windowWidth / 3 || enemies[i].y > PLAYER.y + 2 * windowHeight / 3 || enemies[i].x < PLAYER.x - 2 * windowWidth / 3 || enemies[i].y < PLAYER.y - 2 * windowHeight / 3) {
      enemies[i].remove();
      spawnEnemy();
    }
    let enemydirection = Math.atan2(PLAYER.y - enemies[i].y, PLAYER.x - enemies[i].x) * 180 / Math.PI;
    enemies[i].direction = enemydirection;
    enemies[i].speed = 2.5 + time / 250;
    if (enemies[i].x < PLAYER.x) {
      enemies[i].ani = "enemyimage2";
    } else {
      enemies[i].ani = "enemyimage";
    }
    enemies[i].life += 1;
    if (enemies[i].drag === -1) {
      enemies[i].speed = .25 * (2.5 + time / 300);
      enemies[i].drag = 0;
    } else if (enemies[i].drag === -2) {
      enemies[i].speed = .75 * (2.5 + time / 300);
    }
  }
  // for (let i = 0; i < experience.length; i++) {
  //   if (experience[i].life <= 99997300) {
  //     experience[i].remove();
  //     EXPPOINTS += 1;
  //   }
  // }
  if (kb.pressing("down") && kb.pressing("left")) {
    PLAYER.ani = "left";
    facing = "left";
    PLAYER.move(PLAYERSPEED * 1.5, 135, PLAYERSPEED - 1);
    y1 -= PLAYERSPEED - 1;
    y2 -= PLAYERSPEED - 1;
    x1 += PLAYERSPEED - 1;
    x2 += PLAYERSPEED - 1;
	} else if (kb.pressing("down") && kb.pressing("right")) {
    PLAYER.ani = "right";
    facing = "right";
    PLAYER.move(PLAYERSPEED * 1.5, 45, PLAYERSPEED - 1);
    y1 -= PLAYERSPEED - 1;
    y2 -= PLAYERSPEED - 1;
    x1 -= PLAYERSPEED - 1;
    x2 -= PLAYERSPEED - 1;
	} else if (kb.pressing("up") && kb.pressing("left")) {
    PLAYER.ani = "left";
    facing = "left";
    PLAYER.move(PLAYERSPEED * 1.5, 225, PLAYERSPEED - 1);
    y1 += PLAYERSPEED - 1;
    y2 += PLAYERSPEED - 1;
    x1 += PLAYERSPEED - 1;
    x2 += PLAYERSPEED - 1;
	} else if (kb.pressing("up") && kb.pressing("right")) {
    PLAYER.ani = "right";
    facing = "right";
    x1 -= PLAYERSPEED - 1;
    x2 -= PLAYERSPEED - 1;
    y1 += PLAYERSPEED - 1;
    y2 += PLAYERSPEED - 1;
    PLAYER.move(PLAYERSPEED * 1.5, 315, PLAYERSPEED - 1);
	} else if (kb.pressing("right")) {
    PLAYER.ani = "right";
    facing = "right";
    x1 -= PLAYERSPEED;
    x2 -= PLAYERSPEED;
		PLAYER.move(PLAYERSPEED * 1.5, "right", PLAYERSPEED);
	} else if (kb.pressing("left")) {
    PLAYER.ani = "left";
    facing = "left";
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
    if (facing === "right") {
      PLAYER.ani = "standright";
    } else {
      PLAYER.ani = "standleft";
    }
  }
  if (time <= 24) {
    let texttutorial = ["Fight against the shadow warriors who are plotting to attack the Sun.", "Attack with your LMB and use abilities to defeat them.",
        "Be careful not to get near the shadows.", "Move around with WASD and dodge their necrotic attacks.",
        "As you defeat more shadows, they'll drop sun souls.", "Use these souls to level up and become stronger.",
        "As you collect souls, you'll gain powers.",
        "Help save the Sun from danger. Good luck!"];
    fill("white");
    textSize(windowWidth / 50);
    textAlign(CENTER);
    text(texttutorial[Math.floor(time / 3)], windowWidth / 2, windowHeight * 5 / 20);
  }
  textAlign(CENTER);
  stroke(0);
  noFill();
  rect(windowWidth * 3 / 10, windowHeight * 1 / 10, windowWidth * 4 / 10, windowHeight * 1 / 20);
  noStroke();
  fill("green");
  rect(windowWidth * 3 / 10, windowHeight * 1 / 10, map(LVL- Math.floor(LVL), 0, 1, 0, windowWidth * 4 / 10), windowHeight * 1 / 20);
  fill("white");
  textFont("Courier New");
  stroke(55, 55, 55);
  strokeWeight(2);
  textSize(windowWidth / 80);
  text("Score: " + SCORE, windowWidth - 140, windowHeight * 1 / 20);
  let minutes = Math.floor(time / 60);
  let extraSeconds = time % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
  text("Time: " + minutes + ":" + extraSeconds, 80, windowHeight * 1 / 20);
  text("LMB: Attack", 80, windowHeight * 19 / 20);
  text("Health: " + Math.floor(PLAYERHEALTH) + "/" + PLAYERMAXHEALTH, windowWidth * 10 / 13, windowHeight * 2 / 15);
  textSize(windowWidth / 60);
  textFont("Arial");
  text("Level: " + Math.floor(LVL), windowWidth / 2, windowHeight * 1 / 11);
  if (rotatorson) {
    for (let i = 1; i < rotators.length + 1; i++) {
      let spacing = (i * 2 * Math.PI / rotators.length);
      let circularx = Math.cos(frameCount / 20) * Math.cos((spacing));
      let circulary = Math.sin(frameCount / 20) * Math.sin((spacing));
      rotators[i - 1].x = PLAYER.x + 150 * circularx;
      rotators[i - 1].y = PLAYER.y + 150 * circulary;
    }
  }
  if (bounceron) {
    bouncer.x = constrain(bouncer.x, PLAYER.x - windowWidth / 2, PLAYER.x + windowWidth / 2);
    bouncer.y = constrain(bouncer.y, PLAYER.y - windowHeight / 2, PLAYER.y + windowHeight / 2);
    bouncer.x += BOUNCESPEED * xdirection;
    bouncer.y += BOUNCESPEED * ydirection;
    if (bouncer.x > PLAYER.x + windowWidth / 2 || bouncer.x < PLAYER.x - windowWidth / 2) {
      xdirection *= -1;
    }
    if (bouncer.y > PLAYER.y + windowHeight / 2 || bouncer.y < PLAYER.y - windowHeight / 2) {
      ydirection *= -1;
    }
  }
  if (wateron) {
    waterfield.x = PLAYER.x;
    waterfield.y = PLAYER.y;
  }
  if (swords[0]) {
    swords[0].x = PLAYER.x;
    swords[0].y = PLAYER.y;
  }
  camera.x = PLAYER.x;
  camera.y = PLAYER.y;
  if (fireballon && frameCount % 150 === 0) {
    for (let i = 0; i < fireballct; i++) {
      let fireball = new fireballs.Sprite();
      fireball.x = PLAYER.x;
      fireball.y = PLAYER.y;
      fireball.speed = 40;
      let spacing = (i * 2 * Math.PI / fireballct) + Math.PI / 2;
      fireball.moveTowards(PLAYER.x + 200 * Math.cos(spacing), PLAYER.y + 200 * Math.sin(spacing));
      if (fireballs[i].x > PLAYER.x + 2 * windowWidth / 3 || fireballs[i].y > PLAYER.y + 2 * windowHeight / 3 || fireballs[i].x < PLAYER.x - 2 * windowWidth / 3 || fireballs[i].y < PLAYER.y - 2 * windowHeight / 3) {
        fireballs[i].remove();
      }
    }
    // if (facing === "right") {
    //   PLAYER.ani = "rightattack";
    // } else {
    //   PLAYER.ani = "leftattack";
    // }
  }
  // if (time % 180 === 0) {
  //   enemies.remove();
  //   experience.remove();
  //   bombs.remove();
  //   healths.remove();
  //   orbs.remove();
  //   fireballs.remove();
  //   time += 1;
  // }
  if (time > 20 && !WEAPONCHOSEN) {
    redraw();
    selectability.play();
    selectability.setVolume(.1);
    chooseWeapon();
  }
};