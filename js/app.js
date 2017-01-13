var ticTacToeModule = +function () {
    'use strict';
    // Variables

    // Board.
    var board = document.getElementsByClassName('board')[0];
    var startButton = document.getElementById('start-button');
    var screenStartDiv = document.getElementById('start');
    var winScreenDiv = document.getElementsByClassName('screen-win')[0];
    var playerListItem1 = document.getElementById("player1");
    var playerListItem2 = document.getElementById("player2");
    var boxes = Array.prototype.slice.call(document.getElementsByClassName("box"));
    //var boxesNodeList = Array.prototype.slice.call(document.getElementsByClassName('box'));
    console.log(boxes);

    // When the page loads, the startup screen should appear.
    window.onload = function () {
        board.style.display = 'none';
        winScreenDiv.style.display = 'none';
    };

    // When the start button is clicked, display the in progress board and hide the start screen.
    startButton.addEventListener("click", function (event) {
        screenStartDiv.style.display = 'none';
        //winScreenDiv.style.display = 'none';
        board.style.display = 'block';
        playerListItem1.classList.add('active');
    });

    // Player object. List item is the current player as displayed at the top left and right of screen
    function PlayerObject(name, listitem) {
        this.name = name;
        this.turn = false;
        this.listitem = document.getElementById(listitem);
    }

    PlayerObject.prototype.turnTrue = function () {
        this.turn = true;
    }

    PlayerObject.prototype.turnFalse = function () {
        this.turn = false;
    }

    // Player X contructor function; inherits from player object.
    function Player1(name, listitem) {
        PlayerObject.call(this, name, listitem);
    }

    Player1.prototype = Object.create(PlayerObject.prototype);

    // Player O constructor function; inherits from player object.
    function Player2(name, listitem) {
        PlayerObject.call(this, name, listitem);
    }

    Player2.prototype = Object.create(PlayerObject.prototype);

    // Instantiating player objects "X" and "O".
    var playerX = new Player1("X", "player1");
    var playerO = new Player2("O", "player2");
    console.log(playerX);
    console.log(playerO);

    // If it's X's turn, set O turn to false; vice versa.
    // The current player is indicated at the top of the page -- the box with the symbol O or X 
    // is highlighted for the current player.
    playerX.turnTrue();
    console.log(playerX.turn);

    // if (playerX.turn == true) {
    //     playerO.turn = false;
    //     // Highlight the box with X and make X active
    //     playerListItem1.classList.add('active');
    //     console.log(playerListItem1);
    // } else if (playerX.turn == false) {
    //     playerO.turn = true;
    //     // Highlight the box with O and make O active
    //     playerListItem2.classList.add('active');
    // }

    // Loop over the boxes; when user is hovering over one, add the CSS class to that box
    // When the user clicks a box, add class to selected box and switch active player and hover state

        for (var i = 0; i < boxes.length; i++) {
            var box = boxes[i];
            console.log(box);
            box.addEventListener('mouseover', function (event) {
                if (playerX.turn && playerListItem1.className == 'players active' && this.className != 'box box-filled-2' 
                && this.className != 'box box-filled-1') {
                    this.classList.add('xSVG');
                }
                if (playerO.turn && playerListItem2.className == 'players active' && this.className != 'box box-filled-2' 
                && this.className != 'box box-filled-1') {
                    this.classList.add('oSVG');
                }
            }, false);

            box.addEventListener('mouseout', function (event) {
                if (this.className != 'box-filled-2' && this.className != 'box-filled-1') {
                    this.classList.remove('xSVG');
                    this.classList.remove('oSVG');
                }
            }, false);

            box.addEventListener('click', function(event) {
                if (playerX.turn) {
                    if (this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
                        // add the symbol by adding the CSS class
                        this.classList.add('box-filled-1');
                        // switch active players
                        playerListItem1.classList.remove('active');
                        playerListItem2.classList.add('active');
                        playerX.turnFalse();
                        playerO.turnTrue();
                        playerXCheckedBoxes.push(boxes.indexOf(this));
                        console.log(playerXCheckedBoxes);
                        
                        console.log(playerO.turn);
                        console.log(playerX.turn);
                        console.log(playerListItem2.classList);
                    }
                } else if (playerO.turn) {
                    if (this.className != 'box box-filled-1' && this.className != 'box box-filled-2') {
                        // add the symbol by adding the CSS class
                        this.classList.add('box-filled-2');
                        // switch active players
                        playerListItem2.classList.remove('active');
                        playerListItem1.classList.add('active');
                        playerO.turnFalse();
                        playerX.turnTrue();
                        playerOCheckedBoxes.push(boxes.indexOf(this));
                        console.log(playerOCheckedBoxes);

                        console.log(playerX.turn);
                        console.log(playerO.turn);
                        console.log(playerListItem1.classList);
                    }
                }
            }, false);
        }

         // The game ends when one player has three of their symbols in a row either horizontally, vertically 
         // or diagonally. If all of the squares are filled and no players have three in a row, the game is a tie

         // Arrays to hold the indices of the selected boxes
         var playerXCheckedBoxes = [];
         var playerOCheckedBoxes = [];

         var winningCombos = [
             // Horizontally
             [0,1,2], [3,4,5], [6,7,8],
             // Vertically
             [0,3,6], [1,4,7], [2,5,8],
             // Diagonally
             [0,4,8], [2,4,6]
         ];

         // Loop through the winning combinations and select one to match against player's selected box array
         for (var i = 0; i < winningCombos.length; i++) {
             var winningCombo = winningCombos[i];
             console.log(winningCombo);
             if (playerXCheckedBoxes === winningCombo) {
                 // player X wins
                 board.style.display = 'none';
                 winScreenDiv.style.display = 'block';
             } else if (playerOCheckedBoxes === winningCombo) {
                 // player O wins
                 board.style.display = 'none';
                 winScreenDiv.style.display = 'block';
             }
         }
}();