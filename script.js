
// first select your character
// place your selection in yourCharacterSection and disable clicking on this character
// take the remaining characters and move to the availableEnemies
// once user clicks an enemy to attack move them to the defenderSection and lock the remaining characters
// now enable the attackBTN
// when the user clicks the attackBTN make the do attackpower+= attackpower + 8 
// remove HP from the defender's HP, if defender HP > 0 then display You have defeated X character, you can choose to fight another enemy and unlock the remaining characters. If you characters are left display You have won, but the princess is in another castle.
// then deal the counter attack power = constant based on enemy character, if your character's HP > 0 then display You have been defeated, Game Over Man.




    $(document).ready(function() {
      // Variables

      var characters = {
        basicMario: {
          name: "Mario",
          hp: 100,
          attackPower: 1,
          counterAttackPower: 2
        },
        bootMario: {
          name: "Boot Mario",
          hp: 120,
          attackPower: 2,
          counterAttackPower: 4
        },
        frogMario: {
          name: "Frog Mario",
          hp: 180,
          attackPower: 3,
          counterAttackPower: 8
        },
        tanookiMario: {
          name: "Tanooki Mario",
          hp: 200,
          attackPower: 4,
          counterAttackPower: 16
        }
      };

      var yourEnemyPickComplete = false;
      var yourPlayerPickComplete = false;
      var lockEnemyButton = false;
      var lockAttackButton = false;

      // Check if a character is clicked...

      $(document).on("click", "button.character", function() {

        // Checks if it's a character and that its not locked

        if (!$(this).hasClass("current")) {
          
          // We'll then set our "hasNumber" variable to true to indicate that we can proceed in selecting an operator.

          if (yourPlayerPickComplete === false ) {
            
            $(this).addClass("current");
            $("#availableEnemies").append($(".character").not(".current").addClass("enemy"));
            var currentCharacter = $(".current").val();
            yourPlayerPickComplete = true;
            $("#result").text("You've selected " + currentCharacter.data("name") + ".");
          }
          
          else if (yourEnemyPickComplete === false ) {
            $(this).addClass("defender");
            $("#defenderSection").append($(".defender"));
            var currentCharacter = $(".current").val();
            var defenderCharacter = $(".defender").not(".hidden").val();
            yourEnemyPickComplete = true;
            $("#result").text(currentCharacter + " will start a fight with " + defenderCharacter + ". Click attack to try and murder " + defenderCharacter + ".");
          }
         
        };
      });

      var firstAttack = true;
      var firstAttackEver = true;
      var enemyHP;
      var currentHP;
      var enemyAttackPower;
      var currentAttackPower;

      $(document).on("click", "#attackBTN", function() {
        if (yourPlayerPickComplete === false || yourEnemyPickComplete === false) {
          $("#result").text("Please select a character and an enemy to continue.");
          return;
        }
        var defenderCharacter = $(".defender").not(".hidden").val();
        var currentCharacter = $(".current").val();
        var currentStats = characters[currentCharacter];
        var defenderStats = characters[defenderCharacter];
        if ( firstAttackEver === true ) {
          currentAttackPower = currentStats.attackPower;
          currentHP = currentStats.hp;

          firstAttackEver = false;
        }
        else {
          currentAttackPower *= 2;

        }
        if ( firstAttack === true ) {
          firstAttack = false;
          enemyAttackPower = defenderStats.attackPower;
          enemyHP = defenderStats.hp;
        }
        
        enemyHP = enemyHP - currentAttackPower;
        $("." + defenderCharacter + "HP").text(enemyHP);

        if (enemyHP <= 0) {
          if ($("#availableEnemies").is(':empty')) {
            $("#result").text("You have defeated " + defenderCharacter + ". The princess is at another castle.");
            $("#attackBTN").addClass("hidden");
          }
          else {
            $("#result").text("You have defeated " + defenderCharacter + ". Select a new enemy to attack.");
          }
          $(".defender").addClass("hidden");
          console.log(currentAttackPower);
          console.log(currentHP);
          yourEnemyPickComplete = false;
          firstAttack = true;
        }
        else{
          currentHP = currentHP - enemyAttackPower;
          $("." + currentCharacter + "HP").text(currentHP);
          if (currentHP <= 0) {
            $("#result").text(defenderCharacter + " has defeated " + currentCharacter + ". You loose.");
            $("#attackBTN").addClass("hidden");
          } 
          else{
            $("#result").text( currentCharacter + " has attacked " + defenderCharacter + " for " + currentAttackPower + ". " + defenderCharacter + " has attacked back with " + enemyAttackPower + "." );
          }
        } 
      });
    });