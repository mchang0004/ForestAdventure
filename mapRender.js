//This function calls 3 different functions to condense the switch statements when loading different maps.
function loadMap(mapIndex) {
  translate(width/2,height/2,0);
  countMap(mapIndex);
  translate(0,0,-1);
  drawPlayer(mapIndex);
  drawMap(mapIndex);
  translate(0,0,1);
}

//This function determines where to position the map based on width. It also offsets the map slightly for the top status bar.
function countMap(newMap) {
  updateUI();
  showUIMenu();
  numRows = newMap.mP.length;
  numCols = newMap.mP[0].length;

  if (numCols % 2 == 0) {
    //    cnv.translate((-displace*tileSize)+(-tileSize*numCols/2), -height/2);
    cnv.translate(
      (-tileSize * numCols) / 2,
      -height / 2 - tileSize / 2 + tileSize
    );
  } else {
    //    cnv.translate((-displace*tileSize)+(0.5*tileSize)+(-tileSize*numCols/2), -height/2);
    cnv.translate(
      0.5 * tileSize + (-tileSize * numCols) / 2,
      -height / 2 - tileSize / 2 + tileSize
    );
  }
}





function updateUI() {
    
  
  
  translate(0,0, 5);
  playerHealthPercent = player.currentHP / player.maxHP;


  let size = width * 0.03;
  
  if(!newItemSeen){
    if (frameCount % 30 < 15) {
    fill(205, 25, 25);
  } else {
    fill(180);
  }
    
  stroke("white");
  rect(width / 2 - (size + width * .02), height / 2 - (size + width * .02), size);
  
  } else {
  fill(180);
  stroke("orange");
  rect(width / 2 - (size + width * .02), height / 2 - (size + width * .02), size);
  
  }
  
  if(equippedWeapon.image != null){
    texture(equippedWeapon.image);
  } else {
    fill("red");
  }
  rect(width / 2 - (size + width * .02), height / 2 - (size + width * .02), size);
  
  
  fill(180);
  textSize(height * .02);
  text(VersionText, -width/2 + (width * .002) + (width * .005) , height/2 - (width * .005), width, height* 0.05);
  
  
  noStroke();
  let hpTextSize = height / 32;
  //let hpTextSize =  map(width, 0, width, 155, 32) * .5;
  fill(35);
  rect(-width / 2, -height / 2, width, height * 0.056);
  fill(80);
 
  
  
  
  rect(
    -width / 2 + width * 0.02,
    -height / 2 + width * 0.025,
    width / 6,
    height / 256
  );

  fill(255, 0, 0);
  rect(
    -width / 2 + width * 0.02,
    -height / 2 + width * 0.025,
    (width / 6) * playerHealthPercent,
    height / 256
  );

  textSize(hpTextSize);
  fill(255);
  text(
    `HP: ${[player.currentHP]} / ${[player.maxHP]} `,
    -width / 2 + width * 0.02,
    -height / 2 + width * 0.018,
    width,
    10
  );
  textAlign(LEFT);
  texture(potionImage);
  rect(width / 2 - height * 0.056, -height / 2 + (height * .01), height * 0.036, height * 0.036);
 
  textAlign(LEFT);
  fill(255, 180, 100); 
  text(`(WASD) to move        `,
    -width / 2 + width * 0.735,
    -height / 2 + width * 0.021,
    width,
    10
  );
  textAlign(LEFT);
  fill("white"); 
  text(`(I) items`,
    -width / 2 + width * 0.835,
    -height / 2 + width * 0.021,
    width,
    10
  );
  fill(255, 45, 45); 
 textAlign(LEFT);
  text(`        (H) heal #: ${playerHealthPotionCount} `,
    -width / 2 + width * 0.90,
    -height / 2 + width * 0.021,
    width,
    10
  );
  textAlign(LEFT);
  //Text for amount
  translate(0,0,-5);
}

function showUIMenu() {
  translate(0,0, 6);
  nextLevelXP = statsByLevel[player.level][5];

  if (menuShow) {
    stroke(185);
    strokeWeight(width*.001);
    fill(25);
    rect(
      -width / 2 + width * 0.855,
      -height / 2 + height * 0.065,
      width * 0.13,
      width / 6,
      width * 0.01
    );
    noStroke();
    fill(255);
    //Class, Level, XP, STR, DEX, INT, CHA, 
    let textOffsetY =  .02;
    text(
      `Class:  ${player.playerClass}`,
      -width / 2 + width * 0.875,
      -height / 2 + height * (0.08 + textOffsetY),
      width * 0.13,
      width / 6
    );
    //Maybe Add Classes (Warrior, Mage, Ranger)
    text(
       `Level: ${player.level}`,
      -width / 2 + width * 0.875,
      -height / 2 + height * (0.11 + textOffsetY),
      width * 0.13,
      width / 6
    );
    text(
      `XP: ${player.xp} / ${nextLevelXP}`, 
      -width / 2 + width * 0.875,
      -height / 2 + height * (0.14 + textOffsetY),
      width * 0.13,
      width / 6
    );
    text(
       `Strength: ${player.STR}`,
      -width / 2 + width * 0.875,
      -height / 2 + height * (0.17 + textOffsetY),
      width * 0.13,
      width / 6
    );
    text(
     `Dexterity: ${player.DEX}`, 
      -width / 2 + width * 0.875,
      -height / 2 + height * (0.2 + textOffsetY),
      width * 0.13,
      width / 6
    );
    text(
       `Intelligence: ${player.INT}`,
      -width / 2 + width * 0.875,
      -height / 2 + height * (0.23 + textOffsetY),
      width * 0.13,
      width / 6
    );
    text(
     `Charisma: ${player.CHA}`, 
      -width / 2 + width * 0.875,
      -height / 2 + height * (0.26 + textOffsetY),
      width * 0.13,
      width / 6
    );
    text(
      `Enemies Killed: ${enemiesKilled}`,
      -width / 2 + width * 0.875,
      -height / 2 + height * (0.29 + textOffsetY),
      width * 0.13,
      width / 6
    );
    text(
     `Bosses Killed: ${bossesKilled}`,
      -width / 2 + width * 0.875,
      -height / 2 + height * (0.32 + textOffsetY),
      width * 0.13,
      width / 6
    );
    
    
    
    
    
  }

  if (menuShow) {
    //Stats Menu
    
    newItemSeen = true;
    //Inventory UI properties
    const inventoryX = -width / 2 + (width *.021);
    const inventoryY = -height / 2 + height * 0.121;
    const hitboxX = inventoryX - (-width / 2 );
    const hitboxY = inventoryY -  (-height / 2);
    const inventoryWidth = width / 6;
    const SizeMod = width / 4;
    const inventoryItemSize = SizeMod * 0.12;
    const inventoryPadding = 5;
    const inventoryHeight =
      inventoryPadding +
      (inventoryPadding + inventoryItemSize) * playerSupplies.length;
    // Define the weapon UI properties
    const weaponImageSize = SizeMod * 0.1;
    const weaponTitleSize = SizeMod * 0.06;
    const weaponDamageSize = SizeMod * 0.05;

    // Draw the inventory background
    strokeWeight(width * 0.001);
    stroke(185);
    fill(55);
    
  
   
    //Top Bar of inventory
    rect(inventoryX, inventoryY - (height * .06), inventoryWidth, height * 0.056, width * 0.01);
    textAlign(CENTER);
    fill(255);
    text("Items", inventoryX, inventoryY - (height * .03), inventoryWidth, height * 0.055)
    textSize(weaponDamageSize);
    text("(B) to delete", inventoryX, inventoryY - (height * .014), inventoryWidth, height * 0.055)

    textAlign(LEFT);
    
    

    //inventory
    fill(55);
    rect(inventoryX, inventoryY, inventoryWidth, inventoryHeight, width * 0.01);
    noStroke();
    // Draw the inventory items
    let Inv_y = inventoryY + inventoryPadding;
    let hitbox_Inv_y = hitboxY + inventoryPadding;
    let highestDamageItem = null;
    for (let i = 0; i < playerSupplies.length; i++) {
      const item = playerSupplies[i];
      const isSelected = item === equippedWeapon;
  
      //fill(255, 0, 0);
      //rect(hitboxX + inventoryPadding, hitbox_Inv_y - inventoryPadding - inventoryItemSize, inventoryWidth - 2 * inventoryPadding, inventoryItemSize + inventoryPadding);
     
      // Draw the item background
      fill(isSelected ? color(247, 255, 133) : color(200));
      rect(
        inventoryX + inventoryPadding,
        Inv_y,
        inventoryWidth - 2 * inventoryPadding,
        inventoryItemSize,
        width * 0.01
      );

      // Draw the weapon image
      image(
        item.image,
        inventoryX +
          inventoryPadding +
          (inventoryItemSize - weaponImageSize) / 2,
        Inv_y + (inventoryItemSize - weaponImageSize) / 2,
        weaponImageSize,
        weaponImageSize
      );

      // Draw the weapon title
      textSize(weaponTitleSize);

      fill(0);
      text(
        item.title,
        inventoryX + 3 * inventoryPadding + weaponImageSize,
        Inv_y + weaponTitleSize
      );

      // Draw the weapon damage
      textSize(weaponDamageSize);

      fill(0);
      text(
        `DMG: ${item.damage} | MAG: ${item.damageMagic}`,
        inventoryX + 2 * inventoryPadding + weaponImageSize,
        Inv_y + weaponTitleSize + weaponDamageSize
      );

      // Update the Inv_y position for the next item
      Inv_y += inventoryItemSize + inventoryPadding;
      hitbox_Inv_y += inventoryItemSize + inventoryPadding;
      // Check if the item is clicked
      if (
        mouseIsPressed &&
        mouseX > hitboxX + inventoryPadding &&
        mouseX < hitboxX + inventoryWidth - inventoryPadding &&
        mouseY > hitbox_Inv_y - inventoryItemSize - inventoryPadding &&
        mouseY < hitbox_Inv_y - inventoryPadding
      ) {
        equippedWeapon = item;
      }

      // Check if the item has the highest damage
      if (!highestDamageItem || item.damage > highestDamageItem.damage) {
        highestDamageItem = item;
      }
    }

    // Set equippedWeapon to the item with the highest damage if no item is clicked
    if (!equippedWeapon) {
      equippedWeapon = highestDamageItem;
    }
  }
  translate(0,0, -6);
}

function showFPS() {
  let fps = frameRate();

  textSize(35);
  fill(255);
  stroke(0);
  //textAlign(CENTER)
  text("FPS: " + fps.toFixed(2), 10, height - 10);
}


//This function takes a map and sets a texture and draws the tile
function drawMap(newMap) {
  

  noStroke();
  texture(grass);
  rect(-width * .0045, height * .001, tileSize * newMap.mP[1].length + (width * .0045 * 2), tileSize * newMap.mP.length);

  let chestList = [ chest3, chest5, chest12, chest13, chest14, chest15, chest16, chest17, chest27, chest28, chest29, chest30, chest39, chest40];

 
  
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (newMap.mP[row][col] == "2" || newMap.mP[row][col] == "8" || newMap.mP[row][col] == "6" || newMap.mP[row][col] == "3" || newMap.mP[row][col] == "S1" || newMap.mP[row][col] == "S2"){
          texture(pathImage); 
          let path = rect(col * tileSize - (tileSize * 0.1), row * tileSize + (tileSize *0.5), tileSize * 1.2, tileSize * 1.5);   
      }
    }
  }
  
 
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const tile = newMap.mP[row][col];
      
      switch (tile) {
       
          
        case "bs1":
          texture(bossImage1);
          rect(col * tileSize - (tileSize * 0.5), row * tileSize - (tileSize * 0.5), tileSize * 2);
          break;
        case "bs2":
          texture(bossImage2);
          rect(col * tileSize - (tileSize * 0.5), row * tileSize - (tileSize * 0.5), tileSize * 2);
          break;
        case "bs3":
          texture(bossImage4);
          rect(col * tileSize - (tileSize * 0.5), row * tileSize - (tileSize * 0.5), tileSize * 2);
          break;
        case "bs4":
          texture(bossImage3);
          rect(col * tileSize - (tileSize * 0.5), row * tileSize - (tileSize * 0.5), tileSize * 2);
          break;
        case "eL":
          texture(enemyLeft);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;
        case "eR":
          texture(enemyRight);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;
        case "eU":
          texture(enemyUp);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;
        case "eD":
          texture(enemyDown);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;
        case "sL":
          texture(superGoblinLeftImage);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;
        case "sR":
          texture(superGoblinRightImage);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;
        case "sD":
          texture(superGoblinUpImage);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;
        case "sU":
          texture(superGoblinDownImage);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;   
        case "castle":
          texture(castle);
          rect(col * tileSize - (tileSize * 7), row * tileSize - (tileSize * 11.5),  tileSize * 15);
          break;
        case "r":
          texture(rockTileImage);
         
          rect(col * tileSize, row * tileSize + (tileSize * .3), tileSize * .85, tileSize * 1.1);
          break;
        case "0":
          texture(tree);
          let xOffset = -0.5;
          let yOffset = 0.55;
          let xOffset2 = -0.0;
          let yOffset2 = 0.05;
          quad(
            (col + xOffset2) * tileSize,
            (row + yOffset2) * tileSize - (1 * tileSize) / 8,
            (col + xOffset2 + 1.5) * tileSize,
            (row + yOffset2) * tileSize - (1 * tileSize) / 8,
            (col + xOffset2 + 1.5) * tileSize,
            (row + yOffset2 + 1) * tileSize + (3 * tileSize) / 8,
            (col + xOffset2) * tileSize,
            (row + yOffset2 + 1) * tileSize + (3 * tileSize) / 8
          );
          quad(
            (col + xOffset) * tileSize,
            (row + yOffset) * tileSize - (1 * tileSize) / 8,
            (col + xOffset + 1.5) * tileSize,
            (row + yOffset) * tileSize - (1 * tileSize) / 8,
            (col + xOffset + 1.5) * tileSize,
            (row + yOffset + 1) * tileSize + (3 * tileSize) / 8,
            (col + xOffset) * tileSize,
            (row + yOffset + 1) * tileSize + (3 * tileSize) / 8
          );

          break;
        case "wT":
          texture(waterTop);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);

          break;
        case "wM":
          texture(waterMiddle);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);

          break;
        case "wB":
          texture(waterBottom);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;
        case "c":
          for (let i = 0; i < chestList.length; i++) {
            //print(chestList[i].index + " | "+ chestList[i].isOpened());
            if (chestList[i].index == index) {
              texture(chestList[i].chestImageState);
            }
            if (chest17.isOpened() && index == 15) {
              chest15.open();
              texture(chest17.chestImageState);
            } else if (index == 15 && !chest17.opened) {
              texture(chest17.chestImageState);
            }
          }
          rect(
            col * tileSize + tileSize * 0.25,
            row * tileSize + tileSize * 0.5,
            tileSize * 0.5,
            tileSize * 0.5
          );
          break;
        case "2":
          noFill();
          //rect(col * tileSize, row * tileSize, tileSize, tileSize);
          break;
        case "br":
          texture(bridge);
          rect(col * tileSize, row * tileSize, tileSize, tileSize);

          break;
        default:
          break;
      }
    }
  }
  fill(0);
  rect(-width * .01, 0, width * .01, height);
  rect(tileSize * newMap.mP[1].length, 0, width * .01, height);


   /*
   
translate(0,0,1);
 fill(122);
 rect(
   -width * .0045,
   -height * 0.036,
   width,
   height * 0.056
); 
   
 rect(
   -width * .0045,
   -height * 0.036,
   width,
   height * 0.036
 );
*/
 
 
  //rect(width / 2, -height / 2, width, );

 
}

//This function draws the player square, not the player lerp
function drawPlayer(newMap) {


  
  //draws the player's location when going back to a previous map
  if (nextTrigger) {
    playerX = newMap.findIndex("5")[0];
    playerY = newMap.findIndex("5")[1];
    nextTrigger = false;
  } else if (backTrigger) {
    playerX = newMap.findIndex("4")[0];
    playerY = newMap.findIndex("4")[1];
    backTrigger = false;
  } else if (altNextTrigger) {
    playerX = newMap.findIndex("5")[0];
    playerY = newMap.findIndex("5")[1];
    altNextTrigger = false;
  } else if (altBackTrigger) {
    playerX = newMap.findIndex("7")[0];
    playerY = newMap.findIndex("7")[1];
    altBackTrigger = false;
  } else if (specialNextTrigger) {
    playerX = newMap.findIndex("G2")[0];
    playerY = newMap.findIndex("G2")[1];
    specialNextTrigger = false;
  } else if (specialBackTrigger) {
    playerX = newMap.findIndex("S1")[0];
    playerY = newMap.findIndex("S1")[1];
    specialBackTrigger = false;
  }

  const moveLeft = keyIsDown(65);
  const moveRight = keyIsDown(68);
  const moveUp = keyIsDown(87);
  const moveDown = keyIsDown(83);
  
  // texture(playerForward);
  // rect(playerX * tileSize, playerY * tileSize, tileSize, tileSize);

  const speed = 1;
  const dx = (moveRight ? speed : 0) + (moveLeft ? -speed : 0);
  const dy = (moveDown ? speed : 0) + (moveUp ? -speed : 0);
  const nextX = playerX + dx;
  const nextY = playerY + dy;

  //This code handles what each tile does when the player walks on it
  if (moveDelay <= 0) {
    const chests = {40: chest40, 39: chest39, 30: chest30, 29: chest29, 28: chest28, 27: chest27, 17: chest17, 16: chest16, 14: chest14, 13: chest13, 12: chest12, 5: chest5, 3: chest3};
    

    const movementAllowed = ["1","2","3","4","5","6","7","8","S2","S1","G1","G2","br","e1","e2","e3","e4","e5","e6","e7","e8","e9","e10","e11","e12","e13","e14","e15","e16","e17","e18","e19","e20","e21","e22","e23","e24","e25","e26","e27","e28","b1","b2","b3","b4"];



   
    for (var i = 0; i <= movementAllowed.length; i++) {
      allowPlayerMovement(nextX, nextY, movementAllowed[i], newMap);
    }

    //Triggers (This switch statement handles what happens when the player steps on certain tiles)
    switch (nextX >= 0 && nextX < numCols && nextY >= 0 && nextY < numRows && newMap.mP[nextY][nextX]){
      case "1":
        break;
      case "2":
        if(debug) print("Next Map");
        nextTrigger = true;
        index += 1;
        break;
      case "3":
        if(debug) print("Previous Map");
        backTrigger = true;
        index -= 1;
        break;
      case "6":
        if(debug) print("Go to alternative Map");
        altNextTrigger = true;
        index += 10;
        break;
      case "8":
        if(debug) print("Go back from alternative Map");
        altBackTrigger = true;
        index -= 10;
        break;
      case "S2":
        if(debug) print("Go to map4");
        index = 4;
        specialBackTrigger = true;
        break;
      case "G1":
        if(debug) print("Go to map26");
        index = 26;
        specialNextTrigger = true;
        break;
      case "e1":
        startCombat(enemy1);
        break;
      case "e2":
        startCombat(enemy2);
        break;
      case "e3":
        startCombat(enemy3);
        break;
      case "e4":
        startCombat(enemy4);
        break;
      case "e5":
        startCombat(enemy5);
        break;
      case "e6":
        startCombat(enemy6);
        break;
      case "e7":
        startCombat(enemy7);
        break;
      case "e8":
        startCombat(enemy8);
        break;
      case "e9":
        startCombat(enemy9);
        break;
      case "e10":
        startCombat(enemy10);
        break;
      case "e11":
        startCombat(enemy11);
        break;
      case "e12":
        startCombat(enemy12);
        break;
      case "e13":
        startCombat(enemy13);
        break;
      case "e14":
        startCombat(enemy14);
        break;
      case "e15":
        startCombat(enemy15);
        break;
      case "e16":
        startCombat(enemy16);
        break;
      case "e17":
        startCombat(enemy17);
        break;
      case "e18":
        startCombat(enemy18);
        break;
      case "e19":
        startCombat(enemy19);
        break;
      case "e20":
        startCombat(enemy20);
        break;
      case "e21":
        startCombat(enemy21);
        break;
      case "e22":
        startCombat(enemy22);
        break;
      case "e23":
        startCombat(enemy23);
        break;
      case "e24":
        startCombat(enemy24);
        break;
      case "e25":
        startCombat(enemy25);
        break;
      case "e26":
        startCombat(enemy26);
        break;
      case "e27":
        startCombat(enemy27);
        break;
      case "e28":
        startCombat(enemy28);
        break;
      case "b1":
        startCombat(boss1);
        break;
      case "b2":
        startCombat(boss2);
        break;
      case "b3":
        startCombat(boss3);
        break;
      case "b4":
        startCombat(boss4);
        break;
      case "c":
        if (chests[index]) {
          chests[index].open();
        }
        break;
      case 'end':
        gameOver = true;
        showGameOver = true;
        showStartMenu = true;
        break;
    }
  }
}

function allowPlayerMovement(nX, nY, tileCode, map) {
  if (
    nX >= 0 &&
    nX < numCols &&
    nY >= 0 &&
    nY < numRows &&
    map.mP[nY][nX] == tileCode
  ) {
    playerX = nX;
    playerY = nY;
    moveDelay = moveSpeed;
  }
}

let direction;
let lastDirection;
let keys = {};

//this function handles input of the arrow keys
function checkArrowKeys() {
  keys.up = keyIsDown(87);
  keys.down = keyIsDown(83);
  keys.left = keyIsDown(65);
  keys.right = keyIsDown(68);
  return keys;
}

//This function handles the player sprite's direction
function playerSpriteLerp() {
 
  if (wizardClassImage) {                       //initial spawn texture
    texture(player2Forward);
  } else {
    texture(playerForward);
  }
  
  let arrowKeys = checkArrowKeys();
  if (arrowKeys.down) {
    direction = lastDirection = 1;
    hasMoved = true;
  } else if (arrowKeys.up) {
    direction = lastDirection = 2;
  } else if (arrowKeys.left) {
    direction = lastDirection = 3;
  } else if (arrowKeys.right) {
    direction = lastDirection = 4;
  } else {
    direction = 5;
  }
  
  let forwardSprite, backSprite, leftSprite, rightSprite;
  
  if (wizardClassImage) { 
    forwardSprite = player2Forward;
    backSprite = player2Backward;
    leftSprite = player2Left;
    rightSprite = player2Right;
  } else {
    forwardSprite = playerForward;
    backSprite = playerBackward;
    leftSprite = playerLeft;
    rightSprite = playerRight;
  }
    
  switch (direction) {
    case 1:
      texture(forwardSprite);
      break;
    case 2:
      texture(backSprite);
      break;
    case 3:
      texture(leftSprite);
      break;
    case 4:
      texture(rightSprite);
      break;
    case 5:
      switch (lastDirection) {
        case 1:
          texture(forwardSprite);
          break;
        case 2:
          texture(backSprite);
          break;
        case 3:
          texture(leftSprite);
          break;
        case 4:
          texture(rightSprite);
          break;
      }
      
      break;
  }

  
  rect(followingRectX, followingRectY, tileSize, tileSize);
}
