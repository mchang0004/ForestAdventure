/*
This code creates a class for the player, a class for the enemies, and a class for chests.
It also handles the potions 
*/



//Player Stuff
let playerHealthPercent = 1;
let enemyHealthPercent = 1;
let playerSupplies = []; // array of weapon objects
let equippedWeapon; // current equipped weapon
let swordImage;

let playerHealthPotionCount = 0;
let healthPotionHealingAmount = 10; 
let playerAttacks = [];

let previousDamage;
let previousDamage_Enemy;

let enemiesKilled = 0;
let bossesKilled = 0;

let warriorClass = false;
let wizardClass = false;

let statsByLevel;
let xpToLevelUp;
let currentLevelStats;
let nextLevelXP;
let classWarrior = [ //HP, STR, DEX, INT, CHA, XP
  [12, 0, 0, 0, 0, 0],
//level 1
  [12, 1, 1, 1, 1, 20],
//level 2
  [17, 2, 2, 2, 2, 25],
//level 3
  [25, 3, 2, 2, 2, 45],
//level 4  
  [32, 4, 3, 3, 3, 60],
//level 5  
  [41, 5, 4, 3, 3, 80],
//level 6  
  [63, 6, 4, 4, 4, 105],
//level 7  
  [85, 7, 5, 4, 4, 140],
//level 8  
  [115, 8, 6, 5, 5, 2000]
];

let classWizard = [ //HP, STR, DEX, INT, CHA, XP
  [10, 0, 0, 0, 0, 0],
//level 1
  [10, 1, 1, 1, 1, 20],
//level 2
  [12, 1, 2, 2, 2, 25],
//level 3
  [15, 2, 2, 3, 2, 45],
//level 4  
  [25, 2, 3, 4, 3, 60],
//level 5  
  [38, 3, 3, 5, 4, 80],
//level 6  
  [49, 3, 4, 7, 4, 105],
//level 7  
  [69, 4, 4, 9, 5, 140],
//level 8  
  [95, 4, 5, 11, 6, 2000]
];



/*



                                                  Player Class



*/
class Player{
  constructor(name, level, maxHP, STR, DEX, INT, CHA, xp, playerClass = "Warrior"){
    if(playerClass == "Warrior") statsByLevel = classWarrior;
    if(playerClass == "Wizard") statsByLevel = classWizard;
    
    this.playerClass = playerClass;
    this.name = name;
    this.level = level;
    this.xp = xp;
    this.maxHP = maxHP + statsByLevel[this.level][0];
    this.currentHP = this.maxHP;    

    this.STR = STR + statsByLevel[this.level][1]; 
    this.DEX = DEX + statsByLevel[this.level][2];
    this.INT = INT + statsByLevel[this.level][3];
    this.CHA = CHA + statsByLevel[this.level][4];
   
 

    
  }
  
  getStats(){
    print(`Level: ${this.level}, HP: ${this.maxHP}, STR: ${this.STR}, DEX: ${this.DEX}, INT: ${this.INT}, CHA: ${this.CHA} `);
  }
  

    
    
//   }
  
  addXP(xpToAdd) {
  player.xp += xpToAdd;
  nextLevelXP = statsByLevel[player.level][5];
  // Check if player has leveled up
  currentLevelStats = statsByLevel[player.level]; 
  xpToLevelUp = currentLevelStats[5];
  if(this.level == 1){
      xpToLevelUp = 20;
  } else {
      xpToLevelUp = currentLevelStats[5];
  }
  while (player.xp >= xpToLevelUp) {
    player.level++;
    player.xp -= xpToLevelUp;
    xpToLevelUp = currentLevelStats[5];
    currentLevelStats = statsByLevel[player.level];
    this.currentHP += statsByLevel[this.level][0] - statsByLevel[this.level - 1][0];
  }
    
  this.STR = statsByLevel[this.level][1]; 
  this.DEX = statsByLevel[this.level][2];
  this.INT = statsByLevel[this.level][3];
  this.CHA = statsByLevel[this.level][4];
  this.maxHP = statsByLevel[this.level][0];
   if(this.currentHP > this.maxHP){
      this.currentHP = this.maxHP;
      if(debug) print("CurrentHP set to MaxHP");

    }  
}
  

  
  takeDamage(amount){
    if(debug) print("Damage Amount Taken: " + amount);
    this.currentHP -= amount;
    playerHealthPercent = this.currentHP / this.maxHP;
    //  if(playerHealthPercent < 0){
    //   playerHealthPercent = 0;
    // }
  }
  
  attack(target, range){
    let damage;
    if(equippedWeapon.damage == null && equippedWeapon.damageMagic == null ){
      damage = this.STR;
    } else {
      damage = this.STR + equippedWeapon.damage;
    }
    

    let damageRange = Math.floor(Math.random() * range * 2) - range; // generate a random value within the range
    if(damageRange < 0){
      damageRange *= -1;
    }
    

    damage += damageRange; // add the random value to the damage
    previousDamage = damage;

    target.enemyTakeDamage(damage);
   }

    attackMagic(target){
    let damage;
    if(equippedWeapon.damage == null && equippedWeapon.damageMagic == null ){
      damage = this.INT;
    } else {
      damage = this.INT + equippedWeapon.damageMagic;
    }  
      if(target.enemy_name == "Goldfall The Immortal" && equippedWeapon.title == "Water Staff"){
      if(debug) print("YES");
      damage += 10;
    }
    
    previousDamage = damage;
    target.enemyTakeDamage(damage);

    
    
  }
  
  

  equipItem(weapon){
    equippedWeapon = weapon;
    
  }
  
  addPotion(num){
      playerHealthPotionCount += num;
    
  }
    
  usePotion(){
    if(playerHealthPotionCount > 0){ // if Player Has A Potion
      playerHealthPotionCount -= 1;
      this.currentHP += (healthPotionHealingAmount + this.INT);
      if(debug) print("Current HP: " + this.currentHP);
      if(this.currentHP > this.maxHP){
        this.currentHP = this.maxHP;
        if(debug) print("Current HP: " + this.currentHP);

      }  
      return true
    } else { //no potion 
      if(debug) print("no potions!");
      return false;
    }
    

    updateUI();
    return false;
    
  }
}
/*



                                                      Enemy Class



*/
class Enemy{
  constructor(enemy_name, enemy_maxHP, enemy_STR, enemy_DEX, enemy_INT, enemy_CHA, xpEarned, enemyFelled, droppedWeapon = null){
    this.enemy_name = enemy_name;
    this.enemy_currentHP = enemy_maxHP;
    this.enemy_maxHP = enemy_maxHP;
    this.xpEarned = xpEarned;
    this.enemyFelled = enemyFelled;
    this.droppedWeapon = droppedWeapon;
    
    this.enemy_STR = enemy_STR;
    this.enemy_DEX = enemy_DEX;
    this.enemy_INT = enemy_INT;
    this.enemy_CHA = enemy_CHA;
    
  }
  
  enemyTakeDamage(amount){
    this.enemy_currentHP -= amount;
    enemyHealthPercent = this.enemy_currentHP / this.enemy_maxHP;
    if(enemyHealthPercent < 0){
      enemyHealthPercent = 0;
    }
    if(this.enemy_currentHP <= 0){
      //combat over
      this.enemyFelled = true; //at every combat encounter, check if enemy is felled before starting combat.
    }
  }
 
  enemyAttack(target, range){
    let damage = this.enemy_STR;
    let randomModifier = Math.floor(Math.random() * range * 2) - range; // generate random number within range

    if(randomModifier < 0){
      randomModifier *= -1;
      if(debug) print("RN " + randomModifier);
    }
 
    damage += randomModifier;
    previousDamage_Enemy = damage;
    if(debug) print("DM " + damage);
    target.takeDamage(damage);
  
    if(target.currentHP <= 0){
      gameOver = true;
    }
    
  
  }
  
  enemyDropWeapon(){
    if(this.droppedWeapon != null) playerSupplies.push(this.droppedWeapon);
    if(!menuShow && this.droppedWeapon != null){
      newItemSeen = false;
    } else {
      newItemSeen = true;
    }
  }
  
  enemyHeal(){
    this.currentHP += this.INT;
    if(this.currentHP > this.maxHP){
      this.currentHP = this.maxHP;
    }
    
  }
  
  
}
/*



                                                        Chest Class



*/
class Chest{
  constructor(opened, item, type, quantity, index){
    this.opened = opened;
    this.quantity = quantity;
    this.item = item;
    this.type = type;
    this.index = index;
    this.chestImageState = closedChestImage;
  }
  
  open(){
    if(!this.opened){
       switch(this.type){
        case 'p':
          if(debug) print("Potion");
          player.addPotion(this.quantity);
        
        break;
        case 'i':
          playerSupplies.push(this.item);
          if(!menuShow){
            newItemSeen = false;
          } else {
            newItemSeen = true;
          }
          
          //print("TEST");
      
          
        break;
        }
    }
    this.opened = true;
    this.chestImageState = chestImage;
  }
  
  isOpened(){
    if(this.opened){
      return true;
    }
    return false;
  }
  
}


