var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName);

// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        // ask user whether to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        // if user picks "skip", confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            if (playerMoney >= 10) {
                // confirm user wants to skip
                var confirmSkip = window.confirm("Are you sure you'd like to quit?");

                // if yes (true), leave fight
                if (confirmSkip) {
                    window.alert(playerName + " has decided to skip this fight. Goodbye!");
                    // subtract money from playerMoney for skipping
                    playerMoney = playerMoney - 10;
                    console.log("playerMoney", playerMoney);
                    break;
                }
            }
            else {
                window.alert("You don't have enough money!");
            }
        }
        
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack -3, playerAttack);
        
        // reduce enemyHealth by subtracting the amount set in the playerAttack variable
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            // aware player money for winning
            playerMoney = playerMoney + 20;
            // leave while() loop since enemy is dead
            break;
        } 
        else {
            // display enemy's remaining health if they are still alive after being attacked
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        
        // generate random damage value based on enemy's attack power
        var damage = randomNumber(enemyAttack -3, enemyAttack);

        // reduce playerHealth by subtracting the damage value generated
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // leave while() loop if player is dead
            break;
        } 
        else {
            // display player's remaining health if they are still alive after being attacked
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

// function to start a new game
var startGame = function () {
    // reset player stats before each game
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // before each new round or if player robot dies
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // announce round number, remember that arrays start at 0
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) + "!");
        
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight
            enemyHealth = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            // if player is still alive and we're not at the last enemy in the array
                if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
        window.alert("Great job! You survived the game! You now have a score of " + playerMoney + ".");
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
            window.alert("Refilling player's health by 20 for 7 dollars.");
            //increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
            console.log("Health: " + playerHealth + ", Money: " + playerMoney);
            break;
        case "UPGRADE":
        case "upgrade":
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            //increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
            console.log("Attack: " + playerAttack + ", Money: " + playerMoney);
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

// start the game when the page loads
startGame();