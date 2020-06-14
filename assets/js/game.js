var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10; 
var playerMoney = 10;

// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 10;
var enemyAttack = 12;

var fight = function(enemyName) {
    while(enemyHealth > 0) {
        // Ask user whether to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        console.log(promptFight);

        //if player chooses to fight
        if (promptFight === "fight" || promptFight === "FIGHT") {
            // Subtract the value of playerAttack from the value of enemyHealth and use that result to update the value in the enemyHealth variable
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
            
            //Subtract the value of enemyAttack from the value of playerHealth and use that result to update the value in the playerHealth variable
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        // if player chooses to skip
        } else if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm user wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                playerMoney = playerMoney - 2;
            // if no (false), ask question again by running fight() again
            } else {
                fight(enemyName);
            }
        } else {
            window.alert("You need to pick a valid option. Try again!");
        }
    }
};

for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}