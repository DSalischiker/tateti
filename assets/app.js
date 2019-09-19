//FLAG --> Turno jugador: 1(x) || 2(o)
let turno = true;
let movimientos = 0;
let chequeo;
let jugadorX = 0;
let jugadorO = 0;
var array = [//matriz bidimensional
    ["v", "v", "v"],
    ["v", "v", "v"],
    ["v", "v", "v"],
];

//FUNCIÓN CUANDO SE HACE UN MOVIMIENTO
function movimiento(id) {
    movimientos += 1;
    //Si el casillero clickeado está vacío
    if (array[id[0]][id[1]] === "v") {
        //Actualizo tablero "lógico"
        cargarTableroLogico(id);
        //Actualizo tablero visual según tablero lógico
        cargarTableroVisual(id);
        //Ganó el jugador?
        chequearGano();
        //Cambiá de turno
        cambiarTurno();
        //deshabilita el casillero seleccionado
        deshabilitarDiv(id);
    }

}

function hover(id) {
    //Agrega o quita una clase dependiendo el turno del jugador para que el casillero muestre el color del jugador al pasar el puntero por arriba
    if (turno === true) {
        document.getElementById(id).classList.toggle("turno2", false);
        document.getElementById(id).classList.toggle("turno1", true);
    } else {
        document.getElementById(id).classList.toggle("turno1", false);
        document.getElementById(id).classList.toggle("turno2", true);
    }
}

function deshabilitarDiv(id) {
    //quita la función onclick de los casilleros ya ocupados
    var element = document.getElementById(id);
    element.onclick = null;
}

function reiniciar() {
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
            div.className = 'turno1';
            //vuelve a otorgar función onclick
            div.onclick = function () {
                movimiento(i + "" + j);
            }
        }

    }
    //reinicia movimientos
    movimientos = 0;
    document.getElementById('winDiv').className = "desaparecer";
}

function cargarTableroVisual(id) {
    if (array[id[0]][id[1]] === "x") {
        document.getElementById(id + "img").setAttribute("src", "assets/img/cross.svg");
        //Cambió color a azul
        document.getElementById(id).classList.add("azul");
    } else {
        document.getElementById(id + "img").setAttribute("src", "assets/img/circle.svg");
        //Cambió color a rojo
        document.getElementById(id).classList.add("rojo");
    }
}

function cargarTableroLogico(id) {
    switch (id) {
        case "00":
            if (turno === true) {
                array[0][0] = "x";
            } else {
                array[0][0] = "o";
            }
            break;
        case "01":
            if (turno === true) {
                array[0][1] = "x";
            } else {
                array[0][1] = "o";
            }
            break;
        case "02":
            if (turno === true) {
                array[0][2] = "x";
            } else {
                array[0][2] = "o";
            }
            break;
        case "10":
            if (turno === true) {
                array[1][0] = "x";
            } else {
                array[1][0] = "o";
            }
            break;
        case "11":
            if (turno === true) {
                array[1][1] = "x";
            } else {
                array[1][1] = "o";
            }
            break;
        case "12":
            if (turno === true) {
                array[1][2] = "x";
            } else {
                array[1][2] = "o";
            }
            break;
        case "20":
            if (turno === true) {
                array[2][0] = "x";
            } else {
                array[2][0] = "o";
            }
            break;
        case "21":
            if (turno === true) {
                array[2][1] = "x";
            } else {
                array[2][1] = "o";
            }
            break;
        case "22":
            if (turno === true) {
                array[2][2] = "x";
            } else {
                array[2][2] = "o";
            }
            break;
    }
}

function chequearGano() {
    if (turno) {
        chequeo = "x";
    } else {
        chequeo = "o";
    }
    if (array[0][0] === chequeo && array[0][1] === chequeo && array[0][2] === chequeo ||
        array[1][0] === chequeo && array[1][1] === chequeo && array[1][2] === chequeo ||
        array[2][0] === chequeo && array[2][1] === chequeo && array[2][2] === chequeo ||
        array[0][0] === chequeo && array[1][0] === chequeo && array[2][0] === chequeo ||
        array[0][1] === chequeo && array[1][1] === chequeo && array[2][1] === chequeo ||
        array[0][2] === chequeo && array[1][2] === chequeo && array[2][2] === chequeo ||
        array[0][0] === chequeo && array[1][1] === chequeo && array[2][2] === chequeo ||
        array[2][0] === chequeo && array[1][1] === chequeo && array[0][2] === chequeo) {
        //GANÓ
        if (chequeo === "x") {
            jugadorX++;
            document.getElementById("partidasX").innerText = jugadorX;
        } else {
            jugadorO++;
            document.getElementById("partidasO").innerText = jugadorO;
        }
        win(chequeo); //muestra mensaje
    } else if (movimientos === 9) { //Empate
        document.getElementById('winDiv').innerHTML = '<h1>¡Empate!</h1><p>Felicitaciones X y O. Estuvo muy parejo. ¿Van por el desempate?</p><span onclick="reiniciar()">Empezar nueva partida</span>';
        document.getElementById('winDiv').className = "aparecer";
    }
}

function win(chequeo) {
    if (chequeo == "x" || chequeo == "o") {
        document.getElementById('winDiv').innerHTML = '<h1>¡Ganó el jugador ' + chequeo + '!</h1><span onclick="reiniciar()">Empezar nueva partida</span>';
        document.getElementById('winDiv').className = "aparecer";
    }
}

function cambiarTurno() {
    turno = !turno;
}

function reinicioTotal() {

    jugadorX = 0;
    jugadorO = 0;

    document.getElementById("partidasX").innerText = jugadorX;
    document.getElementById("partidasO").innerText = jugadorO;

    reiniciar ();
}



/*document.getElementById('winDiv').innerHTML = '<h1>¡Empate!</h1> <iframe src="https://giphy.com/embed/xThtajsa65bqiQP32g" width="480" height="391" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>Felicitaciones X y O. Estuvo muy parejo. ¿Van por el desempate?</p><span onclick="reiniciar()">Empezar nueva partida</span>'EMPATE CON EL GIF*/

/*</h1><iframe src="https://giphy.com/embed/hXDrTueJWAscK3xWQ2" width="480" height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><span onclick="reiniciar()">Empezar nueva partida</span>';GANA JUGADOR*/