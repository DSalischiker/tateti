//FLAG --> Turno jugador: 1(x) || 2(o)
let turn = true;
let moves = 0;
let check;
let playerX = 0;
let playerO = 0;
var array = [ //matriz bidimensional
    ["v", "v", "v"],
    ["v", "v", "v"],
    ["v", "v", "v"],
];
myStorage = window.localStorage;
if (typeof myStorage !== 'undefined') {
    if (myStorage.getItem('Turn') === null) {

<<<<<<< HEAD
//FUNCIÓN CUANDO SE HACE UN MOVIMIENTO
=======
    } else {
        turn = JSON.parse(myStorage.getItem('Turn'));
        console.log("turn: " + turn);
        moves = JSON.parse(myStorage.getItem('Moves'));
        console.log("moves: " + moves);
        playerX = JSON.parse(myStorage.getItem('GamesX'));
        console.log("gamesX: " + playerX);
        playerO = JSON.parse(myStorage.getItem('GamesO'));
        console.log("gamesO: " + playerO);
        array = JSON.parse(myStorage.getItem('Board'));
        console.log("array: " + array);
        //Update visual board according to logical board from localStorage
        loadVisualBoardFromStorage(array);
        document.getElementById("gamesX").innerText = playerX;
        document.getElementById("gamesO").innerText = playerO;
    }
} else {
    // localStorage not defined
}
/* if (myStorage.getItem('Turn') === null) {
    //LocalStorage is empty
} else {
    turn = JSON.parse(myStorage.GetItem('Turn'));
    moves = JSON.parse(myStorage.GetItem('Moves'));
    gamesX = JSON.parse(myStorage.GetItem('GamesX'));
    gamesO = JSON.parse(myStorage.GetItem('GamesO'));
    array = JSON.parse(myStorage.GetItem('Board'));
} */
//FUNCTION FOR A GAME MOVE
>>>>>>> bf8d45832a5d4f8d2e42d420b229e026e89a3448
function move(id) {
    moves += 1;
    //Si el casillero clickeado está vacío
    if (array[id[0]][id[1]] === "v") {
        //Actualizo tablero "lógico"
        loadLogicalBoard(id);
        //Actualizo tablero visual según tablero lógico
        loadVisualBoard(id);
        //Ganó el jugador?
        checkWin();
        //Cambiá de turno
        changeTurn();
        //deshabilita el casillero seleccionado
        disableDiv(id);
    }
    myStorage.setItem('Turn', JSON.stringify(turn));
    myStorage.setItem('Moves', JSON.stringify(moves));
    myStorage.setItem('GamesX', JSON.stringify(playerX));
    myStorage.setItem('GamesO', JSON.stringify(playerO));
    myStorage.setItem('Board', JSON.stringify(array));
}

function hover(id) {
    //Agrega o quita una clase dependiendo el turno del jugador para que el casillero muestre el color del jugador al pasar el puntero por arriba
    if (turn === true) {
        document.getElementById(id).classList.toggle("turn2", false);
        document.getElementById(id).classList.toggle("turn1", true);
    } else {
        document.getElementById(id).classList.toggle("turn1", false);
        document.getElementById(id).classList.toggle("turn2", true);
    }
}

function disableDiv(id) {
    //quita la función onclick de los casilleros ya ocupados
    var element = document.getElementById(id);
    element.onclick = null;
}

function restart() {
    //vacía tablero lógico
    array = [
        ["v", "v", "v"],
        ["v", "v", "v"],
        ["v", "v", "v"],
    ];
    //recorre todas las posiciones
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            //Limpia la imágen
            document.getElementById(i + "" + j + "img").toggleAttribute("src");
            var div = document.getElementById(i + "" + j);
            div.className = 'turn1';
            //vuelve a otorgar función onclick
            div.onclick = function () {
                move(i + "" + j);
            }
        }

    }
    //reinicia movimientos
    moves = 0;
    document.getElementById('winDiv').className = "dissapear";
}

function loadVisualBoardFromStorage(array) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (array[i][j] === "x") {
                document.getElementById(i.toString() + j.toString() + "img").setAttribute("src", "assets/img/cross.svg");
                //Change color tu blue
                document.getElementById(i.toString() + j.toString()).classList.add("blue");
            } else {
                if (array[i][j] === "o") {
                    document.getElementById(i.toString() + j.toString() + "img").setAttribute("src", "assets/img/circle.svg");
                    //Change color to red
                    document.getElementById(i.toString() + j.toString()).classList.add("red");
                }
            }

        }

    }
}

function loadVisualBoard(id) {
    if (array[id[0]][id[1]] === "x") {
        document.getElementById(id + "img").setAttribute("src", "assets/img/cross.svg");
        //Cambió color a azul
        document.getElementById(id).classList.add("blue");
    } else {
        document.getElementById(id + "img").setAttribute("src", "assets/img/circle.svg");
        //Cambió color a rojo
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
        //GANÓ
        if (check === "x") {
            playerX++;
            document.getElementById("gamesX").innerText = playerX;
        } else {
            playerO++;
            document.getElementById("gamesO").innerText = playerO;
        }
        win(check); //muestra mensaje
    } else if (moves === 9) { //Empate
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

<<<<<<< HEAD
// functions to save data with localStorage;

function saveData () {

    savedTurn = localStorage.setItem (turn);
    savedMoves = localStorage.setItem (moves);
    savedCheck = localStorage.setItem (check);
    savedX = localStorage.setItem (playerX);
    savedO = localStorage.setItem (playerO);
    savedArray = localStorage.setItem (array);
}
=======
>>>>>>> bf8d45832a5d4f8d2e42d420b229e026e89a3448

