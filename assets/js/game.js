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
var enemyHealth = 10;
var enemyAttack = 12;

var fight = function(enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        // ask user whether to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        console.log(promptFight);

        // if user picks "skip", confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
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
        
        // reduce enemyHealth by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
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
        
        // reduce playerHealth by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
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
            enemyHealth = 50;

            // use debugger to pause script from running and check what's going on at that moment in the code
            debugger;

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
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

// start the game when the page loads
startGame();