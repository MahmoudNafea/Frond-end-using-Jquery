var player1 = prompt('player1: enter your mane , your color is blue');
var player1Color = 'rgb(86, 151, 255)';
var player2 = prompt('player2: enter your name , your color is red');
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr')

//create reportwin function
function reportWin(rowNum, colNum) {
    console.log('you won starting at this row,col');
    console.log(rowNum);
    console.log(colNum);

}

//create a function to change the color
function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

//create a function to report back the current color 
function returnColor(rowIndex, colIndex) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button'.css('background-color'));
}
//take in col index and return the row still grey
function checkBottom(colIndex) {
    var reportcolor = returnColor(5, colIndex);
    for (let row = 5; row > -1; row--) {
        colorreport = returnColor(rowIndex, colIndex);
        if (colorreport === 'rgb(128, 128, 128)') {
            return row
        }

    }

}
//check if 4 inputs have the same color
function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128,128,128' && one !== undefined);
}
//check for horizental win
function horizontalWinCheck() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                console.log('horizontal');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }

        }

    }
}

//check for vertical win
function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                console.log('vertical');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                console.log('diag');
                reportWin(row, col);
                return true;
            } else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                console.log('diag');
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

//creating game logic

// Game End
function gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 7; row++) {
            $('h3').fadeOut('fast');
            $('h2').fadeOut('fast');
            $('h1').text(winningPlayer + " has won! Refresh your browser to play again!").css("fontSize", "50px")
        }
    }
}

//start with player one
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;

//starting with player1
$('h3').text(player1 + ": please pick up a column to drop your blue chip")
$('.board button').on('click', function () {

    //recogize which column was chosen
    var col = $(this).closest("td").index();

    //check which avilable row to change
    var bottomAvail = checkBottom(col);

    //drop the chip in that avilable column in the bottom
    changeColor(bottomAvail, col, currentColor)

    //check for a win or a tie
    if (horizontalWinCheck || verticalWinCheck || diagonalWinCheck) {
        gameEnd(currentName);
    }


    // if no win or a tie continue to next player
    currentPlayer = currentPlayer * -1

    //recheck who the current player is
    if (currentPlayer === 1) {
        currentName = player1;
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
        currentColor = player1Color;
    } else {
        currentName = player2
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
        currentColor = player2Color;
    }

})