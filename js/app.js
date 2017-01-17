var ticTacToeModule = +function () {
    'use strict';
    // Variables

    // Board
    var board = document.getElementsByClassName('board')[0];
    var startButton = document.getElementById('start-button');
    var screenStartDiv = document.getElementById('start');
    var screenWin1Div = document.getElementsByClassName('screen-win-one')[0];
    var screenWin2Div = document.getElementsByClassName('screen-win-two')[0];
    var drawScreen = document.getElementsByClassName('screen-win-tie')[0];
    var playerListItem1 = document.getElementById("player1");
    var playerListItem2 = document.getElementById("player2");
    var boxes = Array.prototype.slice.call(document.getElementsByClassName("box"));
    var newGameWin1 = document.getElementsByClassName('button-win-1')[0];
    var newGameWin2 = document.getElementsByClassName('button-win-2')[0];
    var newGameDraw = document.getElementsByClassName('button-draw')[0];
    //var boxesNodeList = Array.prototype.slice.call(document.getElementsByClassName('box'));
    console.log(boxes);
    console.log(newGameWin1);
    console.log(newGameWin2);
    console.log(newGameDraw);

    // When the page loads, the startup screen should appear.
    window.onload = function () {
        board.style.display = 'none';
        screenWin1Div.style.display = 'none';
        screenWin2Div.style.display = 'none';
        drawScreen.style.display = 'none';
    };

    // When the start button is clicked, display the in progress board and hide the start screen.
    startButton.addEventListener("click", function (event) {
        screenStartDiv.style.display = 'none';
        screenWin1Div.style.display = 'none';
        screenWin2Div.style.display = 'none';
        drawScreen.style.display = 'none';
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

    // The game ends when one player has three of their symbols in a row either horizontally, vertically 
    // or diagonally. If all of the squares are filled and no players have three in a row, the game is a tie

    // Arrays to hold the indices of the selected boxes
    var playerXCheckedBoxes = [];
    var playerOCheckedBoxes = [];

    var winningCombos = [
        // Horizontally
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertically
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonally
        [0, 4, 8], [2, 4, 6]
    ];

    var newGame = function () {
        boxes.classList && boxes.classList.remove('box-filled-1');
        console.log(boxes);
        boxes.classList && boxes.classList.remove('box-filled-2');
        playerListItem1.classList.add('active');
        playerListItem2.classList.remove('active');
        playerX.turnTrue();
        playerO.turnFalse();
        board.style.display = 'block';
        screenWin1Div.style.display = 'none';
        screenWin2Div.style.display = 'none';
        drawScreen.style.display = 'none';
        playerXCheckedBoxes = [];
        playerOCheckedBoxes = [];
    };

    var boardIsFilled = function () {
        // Arrays to hold the indices of the selected boxes
        playerXCheckedBoxes;
        playerOCheckedBoxes;
    }
    console.log(boardIsFilled());

    var isGameOver = function () {
        var hasPlayerWon = false;
        // Loop through the winning combinations and select one to match against player's selected box array
        for (var i = 0; i < winningCombos.length; i++) {
            var winningCombo = winningCombos[i];
            console.log(winningCombo);
            var playerXCounter = 0;
            var playerOCounter = 0;
            // loop through the players checkedboxes array and see if the index matches one of the indexes for
            // a winning combo. If it does, increment the counter by 1. Then if the length of the counter is 
            // equal to the length of the winning combo, the player wins and game ends
            for (var j = 0; j < playerXCheckedBoxes.length; j++) {
                console.log(playerXCheckedBoxes.length);
                var player1SelectedBox = playerXCheckedBoxes[j];
                console.log(player1SelectedBox);
                if (winningCombo.includes(player1SelectedBox)) {
                    playerXCounter++;
                    console.log(playerXCounter);
                }
                if (playerXCounter == 3) {
                    // player wins
                    hasPlayerWon = true;
                    board.style.display = 'none';
                    screenWin1Div.style.display = 'block';
                } else if (playerXCheckedBoxes.length >= 5 && hasPlayerWon == false) {
                    drawScreen.style.display = 'block';
                }
            }

            for (var n = 0; n < playerOCheckedBoxes.length; n++) {
                var player2SelectedBox = playerOCheckedBoxes[n];
                console.log(player2SelectedBox);
                if (winningCombo.includes(player2SelectedBox)) {
                    playerOCounter++;
                    console.log(playerOCounter);
                }
                if (playerOCounter == 3) {
                    // player wins
                    hasPlayerWon = true;
                    board.style.display = 'none';
                    screenWin2Div.style.display = 'block';
                } else if (playerOCheckedBoxes.length >= 5 && hasPlayerWon == false) {
                    drawScreen.style.display = 'block';
                }
            }
        }
        if (boardIsFilled() && (!isGameOver())) {
            // display draw screen
            drawScreen.style.display = 'block';
        }
    };

    // When user clicks on new game button, new game begins
    newGameWin1.addEventListener('click', function (event) { // varible is undefined maybe because button only displays
        // when user wins game?
        newGame();
    });

    newGameWin2.addEventListener('click', function (event) {
        newGame();
    });

    newGameDraw.addEventListener('click', function (event) {
        newGame();
    });

    // Loop over the boxes; when user is hovering over one, add the CSS class to that box
    // When the user clicks a box, add class to selected box and switch active player and hover state

    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        console.log(box);
        box.addEventListener('mouseover', function (event) {
            if (playerX.turn && playerListItem1.className == 'players active' && this.className != 'box box-filled-2'
                && this.className != 'box box-filled-1' && this.className != 'box box-filled-1 box-filled-2') {
                this.classList.add('xSVG');
            }
            if (playerO.turn && playerListItem2.className == 'players active' && this.className != 'box box-filled-2'
                && this.className != 'box box-filled-1' && this.className != 'box box-filled-1 box-filled-2' &&
                this.className != 'box box-filled-2 box-filled-1') {
                this.classList.add('oSVG');
            }
        }, false);

        box.addEventListener('mouseout', function (event) {
            if ((this.className != 'box-filled-2' || this.className != 'box-filled-1') || this.className !=
                'box box-filled-1 box-filled-2' || this.className != 'box box-filled-2 box-filled-1') {
                this.classList.remove('xSVG');
                this.classList.remove('oSVG');
            }
        }, false);

        box.addEventListener('click', function (event) {
            if (playerX.turn && playerListItem1.className == 'players active') {
                if (this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
                    // add the symbol by adding the CSS class
                    this.classList.add('box-filled-1');
                    // remove SVG hover so user cannot click same box again without mousing out
                    this.classList.remove('xSVG');
                    // switch active players
                    playerListItem1.classList.remove('active');
                    playerListItem2.classList.add('active');
                    playerX.turnFalse();
                    playerO.turnTrue();
                    playerXCheckedBoxes.push(boxes.indexOf(this));
                    isGameOver();
                    console.log(playerXCheckedBoxes);

                    console.log(playerO.turn);
                    console.log(playerX.turn);
                    console.log(playerListItem2.classList);
                }
            } else if (playerO.turn && playerListItem2.className == 'players active') {
                if (this.className != 'box box-filled-1' && this.className != 'box box-filled-2') {
                    // add the symbol by adding the CSS class
                    this.classList.add('box-filled-2');
                    // remove SVG hover so user cannot click same box again without mousing out
                    this.classList.remove('oSVG');
                    // switch active players
                    playerListItem2.classList.remove('active');
                    playerListItem1.classList.add('active');
                    playerO.turnFalse();
                    playerX.turnTrue();
                    playerOCheckedBoxes.push(boxes.indexOf(this));
                    isGameOver();
                    console.log(playerOCheckedBoxes);

                    console.log(playerX.turn);
                    console.log(playerO.turn);
                    console.log(playerListItem1.classList);
                }
            }
        }, false);
    }
} ();