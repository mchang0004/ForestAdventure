/*
Michael Chang
4/2/2023

 Forest Adventure | Project 3 | Version 1.9.1v
Changes from Version 1.8.2v
  - New Version Update!
    - New Items:
      - Added Magic Crest
      - Enchanted Sword now does 9 Magic Damage
    - Fixed trees going off the cropline
    - Added Alert for New Weapon
    - Changed Font Colors
    - Changed Inventory and Stats Colors
    - Reduced Rock Size
    - Players can now delete weapons and adjusted inventory accordingly
    - Made a statement for no weapon attacking

*/

/*
References:
https://editor.p5js.org/enickles/sketches/QpS9ujOuL
https://p5js.org/reference/#/p5/texture 
https://p5js.org/reference/#/p5/min 

*/






  let Initial_EnemyStatus = false; //enable true to disable combat for testing



//Print Statements Enabled:
let debug = false;
//Maps
var map1, map2, map3, map4, map5, map12, map13, map14, map15, map16, map17, map26, map27, map28, map29, map30, map39, map40, map41;
//Images:
let combatBackground, startBackground, gameOverBackground, helpMenuBackground, classBackground, combatForestBG;
let tree, grass, waterTop, waterMiddle, waterBottom, bridge, rockTileImage, pathImage;
let playerForward, playerBackward, playerRight, playerLeft;
let player2Forward, player2Backward, player2Right, player2Left;
let rustyIronSwordImage, ironSwordImage, axeImage, sharpGlaveImage, greatSwordImage, enchantedSwordImage; 
let potionImage, chestImage, closedChestImage;
let attackButton, healButton, itemsButton, negotiateButton, magicButton, meleeButton;
let enemyLeft, enemyRight, enemyDown, enemyUp;
let darkStaffImage, powerStaffImage, wandImage, waterStaffImage, voidBookImage, magicCrestImage;
let superGoblinDownImage, superGoblinUpImage, superGoblinLeftImage, superGoblinRightImage;
let castle;
//Chests:
let chest1, chest2, chest3, chest5, chest11, chest12, chest14, chest15, chest16, chest17, chest27, chest28, chest29, chest30, chest39, chest40; 
//Characters:
let player;
let targetEnemy; //Current Enemy in Combat
let enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10, enemy11, enemy12, enemy13, enemy14, enemy15, enemy16, enemy17, enemy18, enemy19, enemy20, enemy21, enemy22, enemy23, enemy24, enemy25, enemy26, enemy27, enemy28;
let boss1, boss2, boss3, boss4;
//Combat Tracking
let showInventory = false;
let disableMainButtons = false;
let attackSelected = false;
let lastAttackStopper = false; //Prevents Enemy from attacking after they are dead
let playerTurn = false;
let enemyTurn = false;
let attacked = false; //tracks whether or not the enemy has attacked for timing
//Map Canvas
let tileSize; //Tile Image Size
let playerX = 5; //Player Spawn
let playerY = 0;
let cnv;
let menuShow = false;
let hasMoved = false;
//Map Triggers
let nextTrigger = false;
let backTrigger = false;
let altNextTrigger = false;
let altBackTrigger = false;
let specialNextTrigger = false;
let specialBackTrigger = false;
//Map Size
let numRows;
let numCols;
//Player Sprite Lerp
let followingRectX = 0;
let followingRectY = 0;
let targetRectX = 100;
let targetRectY = 100;
//Type of Trigger Point (DELETE LATER)
let type = ["trigger", "move", "display"];
//Player Movement
let lerpSpeed = 0.5;
let moveDelay = 0.1; // delay timer
const moveSpeed = 10; // number of frames to delay for
//Weapons:
let rustyIronSword;
let noviceWand;
let enchantedSword;
let waterStaff;
let axe;
let ironSword;
let greatSword;
let sharpGlave;
let darkStaff;
let powerStaff;
let voidBook;
let magicCrest;
//Combat Canvas
let ui;
let menu;
let inv;
let fontSize;
let marginSpacer;
let BPdots;
let minSize = 40;
let maxSize = 60;
let fontScale = 0.9;
let enemyNameText;
//Combat Canvas Elements
let inCombat = false;
let inventoryOpen = false;
let newItemSeen;
let gameOver = true;
//Canvas Elements
let movementEnabled = false;
let showMainMenu = false;
let showHelpMenu = false;
let showGameOver = false;
let showClassSelection = false;
//Start Screen
let startMenu;
let showStartMenu = true;
//Sprite Swapping
let warriorClassImage = false;
let wizardClassImage = false;
//Texture/Font Loading
/*



                                                  Preload Function



*/
function preload() {
  if(debug) print("Preloaded Assets and Game Object Images");
  //https://fonts2u.com/pokemon-pixel-font-regular.font
  BPdots = loadFont("assets/pixel_font.ttf");
  //Tiles
  grass = loadImage("assets/tiles/grass.png");
  tree = loadImage("assets/tiles/TreeSprite.png");
  waterTop = loadImage("assets/tiles/WaterTop.png");
  waterMiddle = loadImage("assets/tiles/WaterMiddle.png");
  waterBottom = loadImage("assets/tiles/WaterBottom.png");
  bridge = loadImage("assets/tiles/Bridge.png");
  rockTileImage = loadImage("assets/tiles/rock.png");
  pathImage = loadImage("assets/tiles/path.png");
  //Structure
  castle = loadImage("assets/tiles/Castle.png");
  //Backgrounds
  startBackground = loadImage("assets/backgrounds/ForestAdventure.png");
  combatBackground = loadImage("assets/backgrounds/CombatUIBG.png");
  gameOverBackground = loadImage("assets/backgrounds/GameOver.png");
  helpMenuBackground = loadImage("assets/backgrounds/Help.png");
  classBackground = loadImage("assets/backgrounds/ClassSelection.png");
  combatForestBG = loadImage("assets/backgrounds/CombatBG.png");
  //Player
  playerForward = loadImage("assets/PlayerSprite/WalkForward.png");
  playerBackward = loadImage("assets/PlayerSprite/WalkBack.png");
  playerRight = loadImage("assets/PlayerSprite/WalkRight.png");
  playerLeft = loadImage("assets/PlayerSprite/WalkLeft.png");
  player2Forward = loadImage("assets/PlayerSprite/WizardForward.png");
  player2Backward = loadImage("assets/PlayerSprite/WizardBack.png");
  player2Right = loadImage("assets/PlayerSprite/WizardRight.png");
  player2Left = loadImage("assets/PlayerSprite/WizardLeft.png");
  //Weapons
  rustyIronSwordImage = loadImage("gameObjects/gameObjectImages/RustyIronSword.png");
  ironSwordImage = loadImage("gameObjects/gameObjectImages/IronSword.png");
  axeImage = loadImage("gameObjects/gameObjectImages/Axe.png");
  sharpGlaveImage = loadImage("gameObjects/gameObjectImages/SharpGlave.png");
  greatSwordImage = loadImage("gameObjects/gameObjectImages/GreatSword_1.png");
  enchantedSwordImage = loadImage("gameObjects/gameObjectImages/EnchantedSword.png");
  potionImage = loadImage("gameObjects/gameObjectImages/Potion.png");
  darkStaffImage = loadImage("gameObjects/gameObjectImages/DarkStaff.png");
  powerStaffImage = loadImage("gameObjects/gameObjectImages/PowerStaff.png");
  wandImage = loadImage("gameObjects/gameObjectImages/Wand.png");
  waterStaffImage = loadImage("gameObjects/gameObjectImages/WaterStaff.png");
  voidBookImage = loadImage("gameObjects/gameObjectImages/VoidBook.png");
  magicCrestImage = loadImage("gameObjects/gameObjectImages/MagicCrest.png");
  //Chest Images
  chestImage = loadImage("gameObjects/gameObjectImages/Chest.png");
  closedChestImage = loadImage("gameObjects/gameObjectImages/Chest_Closed.png");
  //Buttons
  attackButton = loadImage("assets/buttons/Attack.png");
  healButton = loadImage("assets/buttons/Heal.png");
  itemsButton = loadImage("assets/buttons/Items.png");
  negotiateButton = loadImage("assets/buttons/Negotiate.png");
  magicButton = loadImage("assets/buttons/Magic.png");
  meleeButton = loadImage("assets/buttons/Melee.png");
  //Enemy Images:
  enemyLeft = loadImage("assets/EnemySprite/GoblinLeft.png");
  enemyRight = loadImage("assets/EnemySprite/GoblinRight.png");
  enemyDown = loadImage("assets/EnemySprite/GoblinBack.png");
  enemyUp = loadImage("assets/EnemySprite/GoblinForward.png");
  bossImage1 = loadImage("assets/EnemySprite/Boss1.png");
  bossImage2 = loadImage("assets/EnemySprite/Boss2.png");
  bossImage3 = loadImage("assets/EnemySprite/Boss3.png");
  bossImage4 = loadImage("assets/EnemySprite/Boss4.png");
  superGoblinLeftImage  = loadImage("assets/EnemySprite/SuperGoblinLeft.png");
  superGoblinRightImage  = loadImage("assets/EnemySprite/SuperGoblinRight.png");
  superGoblinDownImage  = loadImage("assets/EnemySprite/SuperGoblinForward.png");
  superGoblinUpImage  = loadImage("assets/EnemySprite/SuperGoblinUp.png");
}
/*



                                                  Setup Function



*/
function setup() {
  frameRate(60);
  startMenu = createCanvas(width, height);
  cnv = createCanvas(width, height, WEBGL);
  ui = createCanvas(width, height);
  
  
  cnv.style('display', 'block');
  cnv.style('width', '100%');
  cnv.style('height', 'auto');
  cnv.elt.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    cnv.remove();
    alert('WebGL context lost. Please reload the page.');
  }, false);
  
  cnv.elt.setAttribute('antialias', 'true');
  
  //not sure why I need this, but without loading img, specifically buttons on the battle canvas do not load. Might be a P2D/WEBGL thing.
  image(grass, 0, 0);

  //Game Maps:
  map41 = new mapObject(mapPattern41);
  map40 = new mapObject(mapPattern40);
  map39 = new mapObject(mapPattern39);
  map30 = new mapObject(mapPattern30);
  map29 = new mapObject(mapPattern29);
  map28 = new mapObject(mapPattern28);
  map27 = new mapObject(mapPattern27);
  map26 = new mapObject(mapPattern26);
  map17 = new mapObject(mapPattern17);
  map16 = new mapObject(mapPattern16);
  map15 = new mapObject(mapPattern15);
  map14 = new mapObject(mapPattern14);
  map13 = new mapObject(mapPattern13);
  map12 = new mapObject(mapPattern12);
  map5 = new mapObject(mapPattern5);
  map4 = new mapObject(mapPattern4);
  map3 = new mapObject(mapPattern3);
  map2 = new mapObject(mapPattern2);
  map1 = new mapObject(mapPattern1);

  //Combat UI:
  ui.position(50, 50);
  menu = new bCanavs();
  menu.createChatBox();
  let newWidth = width - width / 2;
  let newHeight = height - height / 2;
  ui.position(newWidth, newHeight, "static");
  marginSpacer = width / 6;

  //Creating Player
  //                   name,     lvl hp s  d  i  c  xp
  player = new Player("Player 1", 1, 0, 0, 0, 0, 0, 0);
  //player = new Player("GOD", 8, 0, 30, 0, 0, 0, 0);

  player.addPotion(3); //Starting Potions

  /*Some Extra Commands for Testing*/
  //player.addXP(1);
  //player.getStats();

//Assign Weapons Stats
  rustyIronSword = {title: "Rusty Iron Sword", damage: 3, damageMagic: 0, image: rustyIronSwordImage};
  noviceWand = {title: "Novice Wand", damage: 0, damageMagic: 2, image: wandImage};
  enchantedSword = {title: "Enchanted Sword", damage: 10, damageMagic: 9, image: enchantedSwordImage};
  waterStaff = {title: "Water Staff", damage: 0, damageMagic: 13, image: waterStaffImage};
  axe = {title: "Axe", damage: 5, damageMagic: 0, image: axeImage};
  ironSword = {title: "Iron Sword", damage: 8, damageMagic: 0, image: ironSwordImage};
  greatSword = {title: "Great Sword", damage: 16, damageMagic: 0, image: greatSwordImage};
  sharpGlave = {title: "Sharp Glave", damage: 19, damageMagic: 0, image: sharpGlaveImage};
  darkStaff = {title: "Dark Staff", damage: 0, damageMagic: 20, image: darkStaffImage};
  powerStaff = {title: "Power Staff", damage: 0, damageMagic: 7, image: powerStaffImage};
  voidBook = {title: "Void Book", damage: 0, damageMagic: 16, image: voidBookImage};
  magicCrest = {title: "Magic Crest", damage: 0, damageMagic: 4, image: magicCrestImage};


//Creating Enemy
  //(enemy_name, enemy_maxHP, enemy_STR, enemy_DEX, enemy_INT, enemy_CHA, xpEarned, enemyFelled){
  enemy1  = new Enemy("Goblin",       10, 1, 2, 1, 1, 5 , Initial_EnemyStatus);
  enemy2  = new Enemy("Goblin",       15, 2, 2, 2, 1, 10, Initial_EnemyStatus, axe);
  enemy3  = new Enemy("Goblin",       12, 1, 2, 1, 1, 10, Initial_EnemyStatus);
  enemy4  = new Enemy("Goblin",       13, 2, 1, 2, 1, 10, Initial_EnemyStatus, magicCrest);
  enemy5  = new Enemy("Goblin",       26, 7, 4, 1, 1, 10, Initial_EnemyStatus);
  enemy6  = new Enemy("Goblin",       24, 7, 4, 2, 1, 10, Initial_EnemyStatus);
  enemy7  = new Enemy("Goblin",       15, 3, 3, 2, 1, 10, Initial_EnemyStatus, powerStaff);
  enemy8  = new Enemy("Goblin",       16, 3, 2, 2, 1, 10, Initial_EnemyStatus);
  enemy9  = new Enemy("Goblin",       18, 4, 3, 3, 1, 10, Initial_EnemyStatus);
  enemy10 = new Enemy("Goblin",       27, 3, 2, 2, 3, 10, Initial_EnemyStatus);
  enemy11 = new Enemy("Goblin",       27, 3, 2, 2, 4, 13, Initial_EnemyStatus);
  enemy12 = new Enemy("Goblin",       29, 5, 2, 2, 4, 13, Initial_EnemyStatus, ironSword);
  enemy13 = new Enemy("Goblin",       28, 3, 2, 2, 4, 13, Initial_EnemyStatus);
  enemy14 = new Enemy("Goblin",       27, 3, 2, 2, 4, 13, Initial_EnemyStatus);
  enemy15 = new Enemy("Goblin",       26, 4, 3, 2, 5, 13, Initial_EnemyStatus);
  enemy16 = new Enemy("Goblin",       29, 4, 3, 2, 4, 13, Initial_EnemyStatus);
  enemy17 = new Enemy("Super Goblin", 41, 5, 2, 2, 5, 13, Initial_EnemyStatus);
  enemy18 = new Enemy("Super Goblin", 53, 6, 4, 2, 5, 13, Initial_EnemyStatus);
  enemy19 = new Enemy("Super Goblin", 50, 7, 3, 2, 5, 13, Initial_EnemyStatus);
  enemy20 = new Enemy("Super Goblin", 51, 8, 3, 2, 5, 13, Initial_EnemyStatus);
  enemy21 = new Enemy("Super Goblin", 53, 6, 3, 2, 4, 15, Initial_EnemyStatus);
  enemy22 = new Enemy("Super Goblin", 52, 6, 3, 2, 5, 15, Initial_EnemyStatus);
  enemy23 = new Enemy("Super Goblin", 54, 7, 4, 2, 4, 15, Initial_EnemyStatus);
  enemy24 = new Enemy("Super Goblin", 55, 8, 3, 2, 4, 15, Initial_EnemyStatus, voidBook);
  enemy25 = new Enemy("Super Goblin", 74, 8, 4, 2, 5, 35, Initial_EnemyStatus);
  enemy26 = new Enemy("Super Goblin", 74, 8, 4, 2, 5, 35, Initial_EnemyStatus, darkStaff);
  enemy27 = new Enemy("Super Goblin", 73, 7, 4, 2, 5, 35, Initial_EnemyStatus);
  enemy28 = new Enemy("Super Goblin", 74, 8, 4, 2, 5, 35, Initial_EnemyStatus);
  
  boss1 = new Enemy("Silcross The Great", 50, 7, 10, 5, 10, 100, Initial_EnemyStatus, greatSword);
  boss2 = new Enemy("Goldfall The Immortal", 85, 7, 10, 5, 10, 100, Initial_EnemyStatus, sharpGlave);
  boss3 = new Enemy("Bale The Blood Breaker", 140, 13, 7, 5, 10, 100, Initial_EnemyStatus);
  boss4 = new Enemy("Ilra The Soul God", 145, 12, 15, 5, 10, 100, Initial_EnemyStatus);


  enemyNameText = enemy1.enemy_name;


  //starting weapons & auto equip first weapon:
  playerSupplies.push(rustyIronSword);
  playerSupplies.push(noviceWand);
 


  //create chests:
  chest1 = new Chest(false, null, "p", 1, 1);
  chest3 = new Chest(false, null, "p", 2, 3);
  chest5 = new Chest(false, enchantedSword, "i", 1, 5); //Enchanted Sword
  chest40 = new Chest(false, null, "p", 5, 40);
  chest39 = new Chest(false, null, "p", 5, 39);
  chest30 = new Chest(false, null, "p", 5, 30);
  chest29 = new Chest(false, null, "p", 4, 29);
  chest28 = new Chest(false, null, "p", 4, 28);
  chest27 = new Chest(false, null, "p", 3, 27);
  chest12 = new Chest(false, null, "p", 2, 12);
  chest13 = new Chest(false, null, "p", 2, 13);
  chest14 = new Chest(false, null, "p", 4, 14);
  chest15 = new Chest(false, null, "p", 0, 17); //Chest that is linked to chest 17
  chest16 = new Chest(false, null, "p", 3, 16);
  chest17 = new Chest(false, waterStaff, "i", 1, 17); //Water Staff

  windowResized();
}
/*



                                                  Draw Function



*/

var index = 1; //This variable handles which map is being displayed.

function draw() {
  cnv.translate(-width / 2, -height / 2, 0);
  if (showStartMenu) {
    startMenuUI();
  }
  

  if (!gameOver) {
    

    
    //Game State
    background(0);
    //ui.translate(0, 0, 0);

    if (inCombat) {
      if (this.currentHP > this.maxHP) {
        this.currentHP = this.maxHP;
      }
      background(220);
      ui.show();
      //ui.translate(-width / 2, -height / 2, 0);
      
      map(menu.currentWidth, 0, width, maxSize, minSize) * fontScale;
      menu.createCombatUI();
      menu.createButtons();
      menu.createHealthBars();
      menu.createChatBox();
      menu.displayPlayer();
      menu.displayEnemy(targetEnemy);
      if (attackSelected) {
        drawAttackButton(rect1_x, rect1_y, rect1_w, 2 * rect1_h, "white", 1);
        drawAttackButton(rect3_x, rect3_y, rect3_w, 2 * rect3_h, "white", 2);
      }

      if (showInventory) {
        menu.drawInventoryUI();
      }

      // playerAttackLoop();
      if (!lastAttackStopper) {
        enemyAttackLoop();
      }
    } else {
      //MAIN GAME STATE:
      ui.hide();
      cnv.show();
      const maps = {1: map1, 2: map2, 3: map3, 4: map4, 5: map5, 12: map12, 13: map13, 14: map14, 15: map15, 16: map16, 17: map17, 26: map26, 27: map27, 28: map28, 29: map29, 30: map30, 31: map41, 39: map39, 40: map40, 41: map41};

      if(debug) print(index);
      if (index in maps) {
        loadMap(maps[index]);
      }
      


      //player lerp tracker
      followingRectX = lerp(followingRectX, playerX * tileSize, lerpSpeed);
      followingRectY = lerp(followingRectY, playerY * tileSize, lerpSpeed);

      noFill();
      showUIMenu();
      playerSpriteLerp();
      if (moveDelay > 0) {
        moveDelay--;
      }
    }
  } else if (!showStartMenu) {
    //game over
    showGameOver = true;
    showStartMenu = true;
  }
}


/*



                                                    Key Press



*/
function keyPressed() {  
  if (!inCombat) {                          //open stats or inventory or heal using hotkeys while not in combat
    if (keyCode === 72) {
      player.usePotion();
    } 

  if (keyCode === 73) {
      if (clicksEnabled) {
        if (menuShow) {
          menuShow = false;
        } else {
          menuShow = true;
        }
      }
    }
  }
  
  if (keyCode === 84) { //print screen
    saveCanvas('myCanvas', 'png');
  }
  
  if(keyCode === 66){ //delete selected weapon
    let itemIndex = playerSupplies.indexOf(equippedWeapon);
    if(menuShow && equippedWeapon.title != null) {
      playerSupplies.splice(itemIndex, 1);
      equippedWeapon = playerSupplies.indexOf(0);
      
    }
    
    if(playerSupplies.length == 0){
      print("YES");
    }
    
  }
}
/*



                                                  START SCREEN UI



*/
//This function draws the start screen and help screen
function startMenuUI() {
  //translate(-width / 2, -height / 2);
  
  if(showHelpMenu){
    texture(helpMenuBackground);
    menuButtonCheck(  width * 0.95, height * 0.001,  "showStart" , width * 0.05, width * 0.05);
  
  } else if (showGameOver){
    texture(gameOverBackground);
    menuButtonCheck(width * 0.446, height * 0.767, "reset");

  } else if (showClassSelection) { 
    texture(classBackground); 
    menuButtonCheck(width * 0.185, height * 0.33, "Warrior", width * 0.26, height * 0.34);
    menuButtonCheck(width * 0.555, height * 0.33, "Wizard", width * 0.26, height * 0.34);
  } else {
    texture(startBackground);
    menuButtonCheck(width * 0.43, height * 0.515, "start");
    menuButtonCheck(width * 0.43, height * 0.575, "help");
    menuButtonCheck(width * 0.43, height * 0.637, "exit");
  }
  
  rect(0, 0, width, height); //Background Image
  if (showGameOver){
    fill(255);
  textSize(width * .02);
    textAlign(CENTER);
  
    
    text(`Enemies Killed: ${[enemiesKilled]} / 28 `, width * 0.40, height * 0.65, width * 0.2,  width * 0.2);
    text(`Bosses Killed: ${[bossesKilled]} / 4 `, width * 0.40, height * 0.68,  width * 0.2,  width * 0.2);
  }
  /* Rectangle Hitbox for Buttons
   stroke(5);
  fill(25, 25, 25, 25);
  rect(width * 0.43, height * 0.515, width * 0.11, height * 0.05);
  rect(width * 0.43, height * 0.575, width * 0.11, height * 0.05);
  rect(width * 0.43, height * 0.637, width * 0.11, height * 0.05);
  rect(width * 0.95, height * 0.001, width * 0.05);
  rect(width * 0.185, height * 0.33, width * 0.26, height * 0.34);
  rect(width * 0.555, height * 0.33, width * 0.26, height * 0.34);
  noStroke();
*/


  // startMenuButtonCheck(0, 0, 'start');
}
//This function handles to buttons in the start screen and help screen
function menuButtonCheck(x, y, event, w = width * 0.11, h = height * 0.05) {
if (mouseIsPressed && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    switch (event) {
      case "start":
        showClassSelection = true;
        break;
      case "help":
        showHelpMenu = true;
        break;
      case "exit":
        showStartMenu = false;
        gameOver = true;
        break;
      case "showStart":
        showHelpMenu = false;
        break;
      case "Warrior":
        SetClass("w");
        showClassSelection = false;
        gameOver = showStartMenu = false;
        clicksEnabled = true;
       
        break;
      case "Wizard":
        SetClass("wi");
        showClassSelection = false;
        gameOver = showStartMenu = false;
        clicksEnabled = true;
        
        break;
      case "reset":
        location.reload();
        break;
    }
  }
}

function SetClass(pC){
  if(pC == "w"){
    if(debug) print("Warrior");
    warriorClassImage = true;
    wizardClassImage = false;
    statsByLevel = classWarrior;
    player = new Player("Player 1", 1, 0, 0, 0, 0, 0, 0, "Warrior");
  } else if (pC == "wi"){
    if(debug) print("Wizard");
    wizardClassImage = true;
    warriorClassImage = false;
    statsByLevel = classWizard;
    player = new Player("Player 1", 1, 0, 0, 0, 0, 0, 0, "Wizard");
  }
  
    
  if(wizardClassImage){
      player.equipItem(noviceWand);
    } else {
      player.equipItem(rustyIronSword);
  }
  return statsByLevel;

  
}



/*



                                                Window Resize



*/



function windowResized() {
  // calculate the new canvas size based on the 16:9 ratio
  let canvasWidth = windowWidth;
  let canvasHeight = windowHeight;
  if (windowWidth / windowHeight < 16 / 9) {
    canvasHeight = (windowWidth * 9) / 16;
  } else {
    canvasWidth = (windowHeight * 16) / 9;
  }
  resizeCanvas(canvasWidth, canvasHeight, true);
  fontSize = windowWidth * 0.03;
  let x = (windowWidth - canvasWidth) / 2;
  let y = (windowHeight - canvasHeight) / 2;
  //let x = width;
  //let y = canvasHeight;
  tileSize = canvasWidth * 0.04;
  cnv.position(x, y);
}
