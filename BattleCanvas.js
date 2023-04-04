
//let onCanvas = true;


//UI
let rect1, rect2, rect3, rect4;          //buttons
let rect5, rect6, rect7, rect8;          //hpBars
let textBox;                             //textBox   
let textInBox;                           //text string

let rect1_x, rect1_y, rect1_w, rect1_h;  //Bounding Boxes for Rectangles
let rect2_x, rect2_y, rect2_w, rect2_h;
let rect3_x, rect3_y, rect3_w, rect3_h;
let rect4_x, rect4_y, rect4_w, rect4_h;


let textIsDone = false;

//colors
let buttonColor;
let color_empty;
let color_black;
let color_gray;
let color_red;
let currentWidth;
let currentLength = 0;
let maxLines = 3;

textInBox = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.";

let clicksEnabled;
let negotiated = false;


class bCanavs{
  
  constructor(){
    color_black = color(25, 25, 25, 255);
    color_gray = color(50, 50, 50, 255);
    color_empty = color(25, 25, 25, 0);
    color_red = color(205, 0, 0, 255);
    buttonColor = color_black;
    this.currentWidth = textWidth(textInBox);
    this.marginSpacer = marginSpacer;
    this.backgroundColor = color(255);
    this.textColor = color(0);
    this.textIsDone = textIsDone;
 
  }


  draw() {    //don't think this does anything
 
  rect(0, 0, width, height);
  fill(this.textColor);
  //textSize(this.fontSize);
  textAlign(CENTER);
  text("This is the UI", width/2, height/2);
    
  }
  
  
  createCombatUI(){
    texture(combatForestBG);
    rect(0, 0, width, height)
    texture(combatBackground);
    rect(0, 0, width, height);
    fontSize = width * 0.03;
    textSize(fontSize);
    text("Player", width * 0.1, height * .11);
    text(enemyNameText, width * 0.75, height * .11);
    textSize(width * .02);
    textAlign(LEFT);
    text(`${[player.currentHP]} / ${[player.maxHP]} `,  width * 0.26, height * .145, width, 10);
    textAlign(RIGHT);
    text(`${[targetEnemy.enemy_currentHP]} / ${[targetEnemy.enemy_maxHP]} `,  width * 0.64, height * .145, width * .1, 10);
    textAlign(LEFT);
  }
  
  
  createButtons(){
    noStroke();
    fill(buttonColor);

    rect1_x = width * 0.2;
    rect1_y = (3*height/4);
    rect1_w = width * 0.3;
    rect1_h = height * .12;
    rect2_x = width * 0.2;
    rect2_y = 7*height/8;
    rect2_w = width * 0.3;
    rect2_h = height * .12;
    rect3_x = (width/2)+5;
    rect3_y = (3*height/4);
    rect3_w = width * 0.3;
    rect3_h = height * .12;
    rect4_x = (width/2)+5;
    rect4_y = 7*height/8;
    rect4_w = width * 0.3;
    rect4_h = height * .12;
    
    drawButton("Attack", rect1_x, rect1_y, rect1_w, rect1_h, "white", 1);
    drawButton("Heal", rect2_x, rect2_y, rect2_w, rect2_h, "white", 2);
    drawButton("Items", rect3_x, rect3_y, rect3_w, rect3_h, "white", 3);
    drawButton("Negotiate", rect4_x, rect4_y, rect4_w, rect4_h, "white", 4);
/*hitboxes for buttons*/
    //rect1 = rect(rect1_x, rect1_y, rect1_w, rect1_h, 55, 5, 5, 5);
    //rect2 = rect(rect2_x, rect2_y, rect2_w, rect2_h, 5, 5, 5, 55);
    //rect3 = rect(rect3_x, rect3_y, rect3_w, rect3_h, 5, 55, 5, 5);
    //rect4 = rect(rect4_x, rect4_y, rect4_w, rect4_h, 5, 5, 55, 5);
  }
  
  
  displayPlayer(action = null){
    
    if(wizardClassImage){
      texture(player2Right);
    } else {
      texture(playerRight);
    }
    
    let playerRect = rect(width * 0.15, height * 0.20, width * 0.15 , width * 0.15);
  }
  
  displayEnemy(enemy, action = null){ 
    switch(enemy.enemy_name){
      case "Goblin":
        texture(enemyLeft);
        break;
      case "Super Goblin":
        texture(superGoblinLeftImage);
        break;
      case "Bale The Blood Breaker":
        texture(bossImage4);
        break;
      case "Ilra The Soul God":
        texture(bossImage3);
        break;
      case "Goldfall The Immortal":
        texture(bossImage2);
        break;
      case "Silcross The Great":
        texture(bossImage1);
        break;
      
    }
    


    let enemyRect = rect(width * 0.7, height * 0.20, width * 0.15 , width * 0.15);
    
    
  }
  
  
  
  createHealthBars(){
    //background color of healthbar
    fill(color_gray);
    rect5 = rect(width * 0.1, height/8, width * 0.15, height/128);
    rect6 = rect(width * 0.75, height/8, width * .15, height/128);
 
    fill(color_red);
    rect7 = rect(width * 0.1, height/8 , width * 0.15 * playerHealthPercent, height/128);
    rect8 = rect(width * 0.75, height/8 , width * 0.15 * enemyHealthPercent, height/128);
 
     }
  
  
  
  createChatBox(){
    fontSize =  width * 0.03;
    textSize(fontSize);
    textFont(BPdots);
    
    fill(205);
    textBox = text(textInBox.substring(0, currentLength), width *0.20 , (height * 0.6), width * 0.58, (height/4));
    currentLength = min(currentLength + 1, textInBox.length);
    fill(25);
  }


  writeText(textString){
    textSize(fontSize);
    textFont(BPdots);
    fill(205);
    currentLength = 0;
    currentLength = min(currentLength + 1, textInBox.length);
    textBox = text(textInBox.substring(0, currentLength), width *0.20 , (height * 0.6), width * 0.58, (height/4));
    textInBox = textString; 
    fill(25);
  }

  
  toggleInventory(){
      if(!showInventory){
        showInventory = true;
      } else {
        showInventory = false;
      }
  }
  
  

  
  // Draw the inventory UI
  
drawInventoryUI() {


  //Inventory UI properties
  const inventoryX = 10;
  const inventoryY = 10;
  const inventoryWidth = width/6;
  const SizeMod = width/4;
  const inventoryItemSize = SizeMod * 0.12;
  const inventoryPadding = 5;
  const inventoryHeight = inventoryPadding + (inventoryPadding + inventoryItemSize ) * (playerSupplies.length);
  // Define the weapon UI properties
  const weaponImageSize = (SizeMod * 0.10);
  const weaponTitleSize = SizeMod * 0.06;
  const weaponDamageSize = SizeMod * 0.05;

    // Draw the inventory background
    stroke(width * .001);
    fill(85);
    rect(inventoryX, inventoryY, inventoryWidth, inventoryHeight, width * .01);
    noStroke();
    // Draw the inventory items
    let Inv_y = inventoryY + inventoryPadding;
    let highestDamageItem = null;
    for (let i = 0; i < playerSupplies.length; i++) {
      const item = playerSupplies[i];
      const isSelected = item === equippedWeapon;

      // Draw the item background
      fill(isSelected ? color(247, 255, 133) : color(200));
      rect(inventoryX + inventoryPadding, Inv_y, inventoryWidth - 2 * inventoryPadding, inventoryItemSize, width * .01);

      // Draw the weapon image
      image(item.image, inventoryX + inventoryPadding + (inventoryItemSize - weaponImageSize) / 2, Inv_y + (inventoryItemSize - weaponImageSize) / 2, weaponImageSize, weaponImageSize);

      // Draw the weapon title
      textSize(weaponTitleSize);
      
      fill(0);
      text(item.title, inventoryX + 3 * inventoryPadding + weaponImageSize, Inv_y + weaponTitleSize);

      // Draw the weapon damage
      textSize(weaponDamageSize);
      
      fill(0);
      text(`DMG: ${item.damage} | MAG: ${item.damageMagic}`,  inventoryX + 2 * inventoryPadding + weaponImageSize, Inv_y + weaponTitleSize + weaponDamageSize);

      // Update the Inv_y position for the next item
      Inv_y += inventoryItemSize + inventoryPadding;

      // Check if the item is clicked
      if (mouseIsPressed && mouseX > inventoryX + inventoryPadding && mouseX < inventoryX + inventoryWidth - inventoryPadding &&
          mouseY > Inv_y - inventoryItemSize - inventoryPadding && mouseY < Inv_y - inventoryPadding) {
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




  
  


}


function drawButton(label, x, y, w, h, color, type) {
  push();
  
  // Check if mouse is over the button
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    fill(220);
  } else {
    fill(color);
  }
  
  noStroke();
  // Draw button rectangle
  switch (type) {
    case 1:
      texture(attackButton);
      rect(x, y, w, h, width * .05, 5, 5, 5);
      break;
    case 2:
      texture(healButton);
      rect(x, y, w, h, 5, 5, 5, width * .05);
      break;
    case 3:
      texture(itemsButton);
      rect(x, y, w, h, 5, width * .05, 5, 5);
      break;
    case 4:
      texture(negotiateButton);
      rect(x, y, w, h, 5, 5, width * .05, 5);
      break;
    default:
      rect(x, y, w, h);
  }


  fill(0);
  //text(label, x + w / 2, y + h / 2 + 6);
  pop();
}


function drawAttackButton(x, y, w, h, color, type){
  switch (type) {
    case 1:
      texture(meleeButton);
      rect(x, y, w, h, width * .04, 5, 5, width * .04);
      break;
    case 2:
      texture(magicButton);
      rect(x, y, w, h, 5, width * .04, width * .04, 5);
      break;
  }
}


function startCombat(target) {
  if(debug) print("Combat Trigger");
  lastAttackStopper = false;
  negotiated = false;
  playerTurn, (clicksEnabled = true);
  targetEnemy = target;
  enemyNameText = targetEnemy.enemy_name;
  enemyHealthPercent = targetEnemy.enemy_currentHP / targetEnemy.enemy_maxHP;
  
  if (!targetEnemy.enemyFelled) {
    
    displayText("An Enemy!");
    //displayText(textInBox); //Lorem Ipsum Tester

    inCombat = true;
    
    if (player.DEX < targetEnemy.enemy_DEX){
      if(debug) print("TRUE");
      // enemyTurn = true;
      // playerTurn = false;
      clicksEnabled = false;
   
      setTimeout(progressNext, 2000);
   
    }
  } 

}

function enemyAttackLoop() {
  if(enemyTurn) {
    if(targetEnemy.enemy_name == "Goblin"){
      targetEnemy.enemyAttack(player, 2);
    } else if (targetEnemy.enemy_name == "Super Goblin"){
      targetEnemy.enemyAttack(player, 3);
    } else {
      targetEnemy.enemyAttack(player, 5);
    }
    
    menu.writeText("The Enemy Attacks and deals  " + previousDamage_Enemy + "  damage!");

    if(debug) print("Player HP: " + player.currentHP);
    enemyTurn = false;
    playerTurn = true;
    clicksEnabled = true;

    if (player.currentHP <= 0) {
      endGame();
    }
  }
}
      

function endCombat() {  
  //player.getStats();
  displayText("Combat is over!");
  playerTurn = false;
  enemyTurn = false;
  clicksEnabled = false;
  showInventory = false;
  setTimeout(toggleEndCombat, 3000);
}

function endGame() {
  displayText("You Died!");

  playerTurn = false;
  enemyTurn = false;
  clicksEnabled = false;
  setTimeout(toggleEndGame, 3000);
}

function toggleEndCombat() {
  displayText(" ");
  attackSelected = false;
  inCombat = false;
}

function toggleEndGame() {
  inCombat = false;
  gameOver = true;
}

function displayText(w) {
  textInBox = w;
  menu.createChatBox();
}


function checkHover(x, y, w, h, type, attackType) {
  if (clicksEnabled && !attackSelected) {
    if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
      switch (type) {
        case 1:
          attackSelected = true;

          break;
        case 2:
          //heal function, add hp
          if(player.usePotion()){
            
            playerHealthPercent = player.currentHP / player.maxHP;
            menu.writeText("You use a healing potion.");

          } else {
            menu.writeText("You have no potions!");

          }
          //enemy turn?
          attacked = true;

          break;
        case 3:
          menu.toggleInventory()
          break;
        case 4:

          if(player.CHA > targetEnemy.enemy_CHA){
          
            negotiated = true;
            menu.writeText("The enemy is feeling generous and lets you pass.");
            targetEnemy.enemyFelled = true;
            targetEnemy.enemy_currentHP = 0;
            targetEnemy.xpEarned = 0;
            setTimeout(progressNext, 2000);

          } else {
            menu.writeText("The enemy is not letting you get away.");
          }
          
          

          attacked = true;
          //enemy turn

          break;
      }

      if (attacked) {
        attacked = false;
        clicksEnabled = false;
        playerTurn = false;
        setTimeout(progressNext, 2000);
      }
    }
  } else if (clicksEnabled && attackSelected){
    
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
            switch (attackType) {
            case 1:
          
              player.attack(targetEnemy, 2);

              //attack function do damage etc
              menu.writeText("You attack the enemy and deal   " + previousDamage + "   damage!");
              //add response for after text, enemy attacks and response
              if(debug) print("Enemy HP: " + targetEnemy.enemy_currentHP);
           

              attackSelected = false;
              attacked = true;
              break;
              
            case 2:
                
              player.attackMagic(targetEnemy);
              menu.writeText("You attack the enemy and deal   " + previousDamage + "   damage!");

              if(debug) print("Enemy HP: " + targetEnemy.enemy_currentHP);
              attackSelected = false;
              attacked = true;
              break;
          }
          if (attacked) {
            attacked = false;
            clicksEnabled = false;
            playerTurn = false;
            setTimeout(progressNext, 2000);
          }
              
        }
    }
}

function progressNext() {
  if (targetEnemy.enemy_currentHP <= 0) {
    lastAttackStopper = true;
    endCombat();
    if(negotiated){
    if(debug) print("negotiated");
  } else {
    targetEnemy.enemyDropWeapon();
    player.addXP(targetEnemy.xpEarned);
    
    if(targetEnemy.enemy_name == "Goblin" || targetEnemy.enemy_name == "Super Goblin"){
       enemiesKilled++;
    } else {
      bossesKilled++;
    }   
    
  }
  } else {
    enemyTurn = true;
  }
}

function mousePressed() {
  if (clicksEnabled && !attackSelected) {
    checkHover(rect1_x, rect1_y, rect1_w, rect1_h, 1, 0);
    checkHover(rect2_x, rect2_y, rect2_w, rect2_h, 2, 0);
    checkHover(rect3_x, rect3_y, rect3_w, rect3_h, 3, 0);
    checkHover(rect4_x, rect4_y, rect4_w, rect4_h, 4, 0);
  } else if (clicksEnabled && attackSelected){
    checkHover(rect1_x, rect1_y, rect1_w, 2 * rect1_h, 1, 1);
    checkHover(rect3_x, rect3_y, rect3_w, 2 * rect3_h, 1, 2);
  }

}
  


/*
function windowResized() {
  resizeCanvas(width, height);
} */
