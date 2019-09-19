//FLAG --> Turn player: 1(x) || 2(o)
let turn = true;
let moves = 0;
let check;
let playerX = 0;
let playerO = 0;
var array = [ //bidimensional matrix
    ["v", "v", "v"],
    ["v", "v", "v"],
    ["v", "v", "v"],
];
// VARs for localStorage;
let savedTurn;
let savedMoves;
let savedCheck;
let savedX;
let savedO;
let savedArray;

//FUNCTION FOR A GAME MOVE
function move(id) {
    moves += 1;
    //If the space clicked is empty
    if (array[id[0]][id[1]] === "v") {
        //Update "logical" board
        loadLogicalBoard(id);
        //Update visual board according to logical board
        loadVisualBoard(id);
        //Did the player win?
        checkWin();
        //Change turns
        changeTurn();
        //Disable the space clicked
        disableDiv(id);
    }

}

function hover(id) {
    //Add or removes a class depending on the player's turn for the space to show the color of the player to play
    if (turn === true) {
        document.getElementById(id).classList.toggle("turn2", false);
        document.getElementById(id).classList.toggle("turn1", true);
    } else {
        document.getElementById(id).classList.toggle("turn1", false);
        document.getElementById(id).classList.toggle("turn2", true);
    }
}

function disableDiv(id) {
    //Removes the onClick function from the full spaces
    var element = document.getElementById(id);
    element.onclick = null;
}

function restart() {
    //clean logical board
    array = [
        ["v", "v", "v"],
        ["v", "v", "v"],
        ["v", "v", "v"],
    ];
    //Go around all the positions
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            //Cleans the img
            document.getElementById(i + "" + j + "img").toggleAttribute("src");
            var div = document.getElementById(i + "" + j);
            div.className = 'turn1';
            //Puts back the onClick function
            div.onclick = function () {
                move(i + "" + j);
            }
        }

    }
    //restart moves
    moves = 0;
    document.getElementById('winDiv').className = "dissapear";
}

function loadVisualBoard(id) {
    if (array[id[0]][id[1]] === "x") {
        document.getElementById(id + "img").setAttribute("src", "assets/img/cross.svg");
        //Change color tu blue
        document.getElementById(id).classList.add("blue");
    } else {
        document.getElementById(id + "img").setAttribute("src", "assets/img/circle.svg");
        //Change color to red
        document.getElementById(id).classList.add("red");
    }
}

function loadLogicalBoard(id) {
    switch (id) {
        case "00":
            if (turn === true) {
                array[0][0] = "x";
            } else {
                array[0][0] = "o";
            }
            break;
        case "01":
            if (turn === true) {
                array[0][1] = "x";
            } else {
                array[0][1] = "o";
            }
            break;
        case "02":
            if (turn === true) {
                array[0][2] = "x";
            } else {
                array[0][2] = "o";
            }
            break;
        case "10":
            if (turn === true) {
                array[1][0] = "x";
            } else {
                array[1][0] = "o";
            }
            break;
        case "11":
            if (turn === true) {
                array[1][1] = "x";
            } else {
                array[1][1] = "o";
            }
            break;
        case "12":
            if (turn === true) {
                array[1][2] = "x";
            } else {
                array[1][2] = "o";
            }
            break;
        case "20":
            if (turn === true) {
                array[2][0] = "x";
            } else {
                array[2][0] = "o";
            }
            break;
        case "21":
            if (turn === true) {
                array[2][1] = "x";
            } else {
                array[2][1] = "o";
            }
            break;
        case "22":
            if (turn === true) {
                array[2][2] = "x";
            } else {
                array[2][2] = "o";
            }
            break;
    }
}

function checkWin() {
    if (turn) {
        check = "x";
    } else {
        check = "o";
    }
    if (array[0][0] === check && array[0][1] === check && array[0][2] === check ||
        array[1][0] === check && array[1][1] === check && array[1][2] === check ||
        array[2][0] === check && array[2][1] === check && array[2][2] === check ||
        array[0][0] === check && array[1][0] === check && array[2][0] === check ||
        array[0][1] === check && array[1][1] === check && array[2][1] === check ||
        array[0][2] === check && array[1][2] === check && array[2][2] === check ||
        array[0][0] === check && array[1][1] === check && array[2][2] === check ||
        array[2][0] === check && array[1][1] === check && array[0][2] === check) {
        //WIN
        if (check === "x") {
            playerX++;
            document.getElementById("gamesX").innerText = playerX;
        } else {
            player++;
            document.getElementById("gamesO").innerText = playerO;
        }
        win(check); //Shows message
    } else if (moves === 9) { //Tie
        document.getElementById('winDiv').innerHTML = '<h1>¡Empate!</h1><p>Felicitaciones X y O. Estuvo muy parejo. ¿Van por el desempate?</p><span onclick="restart()">Empezar nueva partida</span>';
        document.getElementById('winDiv').className = "appear";
    }
}

function win(check) {
    if (check == "x" || check == "o") {
        document.getElementById('winDiv').innerHTML = '<h1>¡Ganó el jugador ' + check + '!</h1><span onclick="restart()">Empezar nueva partida</span>';
        document.getElementById('winDiv').className = "appear";
    }
}

function changeTurn() {
    turn = !turn;
}

function totalRestart() {

    playerX = 0;
    playerO = 0;

    document.getElementById("gamesX").innerText = playerX;
    document.getElementById("gamesO").innerText = playerO;

    restart();
}


/*document.getElementById('winDiv').innerHTML = '<h1>¡Empate!</h1> <iframe src="https://giphy.com/embed/xThtajsa65bqiQP32g" width="480" height="391" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>Felicitaciones X y O. Estuvo muy parejo. ¿Van por el desempate?</p><span onclick="reiniciar()">Empezar nueva partida</span>'EMPATE CON EL GIF*/

/*</h1><iframe src="https://giphy.com/embed/hXDrTueJWAscK3xWQ2" width="480" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><span onclick="reiniciar()">Empezar nueva partida</span>';GANA JUGADOR*/