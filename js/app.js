var ticTacToeModule = +function() {
    'use strict';
    // Variables

    // Board.
    var board = document.getElementsByClassName('board')[0];
    var startButton = document.getElementById('start-button');
    var screenStartDiv = document.getElementById('start');
    var playerListItem1 = document.getElementById("player1");
    var playerListItem2 = document.getElementById("player2");
    var box = document.getElementsByClassName("box");

    // When the page loads, the startup screen should appear.
    window.onload = function() {
        board.style.display = 'none';
    };

    // When the start button is clicked, display the in progress board and hide the start screen and original board.
    startButton.addEventListener("click", function(event) {
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

    PlayerObject.prototype.turnTrue = function() {
        this.turn = true;
    }

    PlayerObject.prototype.turnFalse = function() {
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
    var playerO = new Player1("O", "player1");
    var playerX = new Player2("X", "player2");
    console.log(playerX);
    console.log(playerO);

    // If it's X's turn, set O turn to false; vice versa.
    // The current player is indicated at the top of the page -- the box with the symbol O or X 
    // is highlighted for the current player.
    playerO.turnTrue();

    // On hover functions for each player to display the symbols on the boxes
    var oHover = function() {
        box.style.backgroundImage = "url(../img/o.svg)";
    }

    var xHover = function() {
        box.style.backgroundImage = "url(../img/x.svg)";
    }

    if (playerO.turn == true) {
        playerX.turn = false;
        // Highlight the box with O and make O active
        playerO.active = true;
        playerListItem1.className = "players active";
    } else if (playerX.turn == true) {
        playerO.turn = false;
        // Highlight the box with O and make O active
        playerX.active = true;
        playerListItem2.className = "players active";
    }

    // If X or O hovers over a box, display the symbol for that box
    box.addEventListener('mouseover', function(event) {
        // if O is true if O hovers show the symbol in the box
        if (playerO.turn == true) {
            oHover();
        } else if (playerX.turn == true) {
            xHover();
        }
    }, false);
}();