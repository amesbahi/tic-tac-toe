var ticTacToeModule = +function () {
    'use strict';
    // Variables

    // Board.
    var board = document.getElementsByClassName('board')[0];
    var startButton = document.getElementById('start-button');
    var screenStartDiv = document.getElementById('start');
    var playerListItem1 = document.getElementById("player1");
    var playerListItem2 = document.getElementById("player2");
    var boxes = document.getElementsByClassName("box");
    console.log(boxes);

    // When the page loads, the startup screen should appear.
    window.onload = function () {
        board.style.display = 'none';
    };

    // When the start button is clicked, display the in progress board and hide the start screen.
    startButton.addEventListener("click", function (event) {
        screenStartDiv.style.display = 'none';
        board.style.display = 'block';
        playerListItem1.className = "players active";
    });

    // Player object. List item is the current player
    function PlayerObject(name, listitem) {
        this.name = name;
        this.turn = false;
        this.active = false;
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

    if (playerX.turn == true) {
        playerO.turn = false;
        // Highlight the box with O and make O active
        playerX.active = true;
        playerListItem1.className = "players active";
    } else if (playerX.turn == false) {
        playerO.turn = true;
        // Highlight the box with O and make O active
        playerX.active = false;
        playerListItem2.className = "players active";
    }

    // loop over the boxes; when user is hovering over one, add the CSS class to that box
    // when the user clicks a box, add class to selected box and switch player
        for (var i = 0; i < boxes.length; i++) {
            var box = boxes[i];
            console.log(box);
            box.addEventListener('mouseover', function (event) {
                if (playerX.turn) { 
                    this.classList.add('xSVG');
                    this.classList.remove('oSVG');
                }
                if (playerO.turn) {
                    this.classList.add('oSVG');
                    this.classList.remove('xSVG');
                }
            }, false);

            box.addEventListener('click', function() {
                
            }, false);
        }
}();