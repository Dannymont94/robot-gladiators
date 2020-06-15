// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var fight = function(enemy) {
    while (enemy.health > 0 && playerInfo.health > 0) {
        // ask user whether to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        // if user picks "skip", confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            if (playerInfo.money >= 10) {
                // confirm user wants to skip
                var confirmSkip = window.confirm("Are you sure you'd like to quit?");

                // if yes (true), leave fight
                if (confirmSkip) {
                    window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                    // subtract money from playerInfo.money for skipping
                    playerInfo.money = playerInfo.money - 10;
                    console.log("Money: ", playerInfo.money);
                    break;
                }
            }
            else {
                window.alert("You don't have enough money!");
            }
        }
        
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
        
        // reduce enemy.health by subtracting the amount set in the playerInfo.attack variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + " for " + damage + " points of damage! " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            // aware player money for winning
            playerInfo.money = playerInfo.money + 20;
            // leave while() loop since enemy is dead
            break;
        } 
        else {
            // display enemy's remaining health if they are still alive after being attacked
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        
        // generate random damage value based on enemy's attack power
        var damage = randomNumber(enemy.attack -3, enemy.attack);

        // reduce playerInfo.health by subtracting the damage value generated
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + " for " + damage + " points of damage! " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // leave while() loop if player is dead
            break;
        } 
        else {
            // display player's remaining health if they are still alive after being attacked
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

// function to start a new game
var startGame = function () {
    // reset player stats before each game
    playerInfo.reset();

    // before each new round or if player robot dies
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // announce round number, remember that arrays start at 0
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) + "!");
        
            // pick new enemy to fight based on the index of the enemyInfo Object
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy's health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            // pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemy parameter
            fight(pickedEnemyObj);

            // if player is still alive and we're not at the last enemy in the array
                if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                    // ask if user wants to use the store before the next round
                    var storeConfirm = window.confirm("The fight is over. Visit the shop before the next round?");
                    
                    // if yes, take them to the shop() function
                    if (storeConfirm) {
                        shop();
                    }
                }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

var endGame = function() {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job! You survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store. Please enter one: REFILL, UPGRADE, or LEAVE to make a choice."
    );
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.")
            break;
        default:
            window.alert("Please enter a valid option.")
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};  

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};

// function to set name
var getPlayerName = function() {
    var name ="";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
}

// create playerInfo object
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    // reset player stats between games
    reset: function(){
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function(){
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function(){
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 20 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    }
};

// create enemyInfo object
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// start the game when the page loads
startGame();