// Para recordar el jugador
// que crea la sala
// y el número de esta.
let theRoom = 0;
let playerName = "";

// Para recibir todas las respuestas de todos los jugadores
let allAnswers = {};

// Para generar alertas en caso tal de que no se
// agregue el nombre o el número de la sala
let theAlerts = document.getElementsByClassName("alert");
let nameElement = document.getElementById('name');
let roomElement = document.getElementById("room");

// Para ir colocando el id de la sala
// de tal manera que se pueda compartir
// y el nombre de los jugadores en pantalla
let roomH1 = document.getElementById("idRoom");
let containerThePlayers = document.getElementById("thePlayers");

// Para form inicial y 
// form de la sala de espera
let containerForm = document.getElementById("containerForm");
let containerRoom = document.getElementById("containerRoom");

// Para formar la ruleta
let containerRoulette = document.getElementById("rouletteContainer");
let containerTheRoulette = document.getElementById("theRoulette");
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Para mostrar el tablero del jugador
// donde digitará los valores en los textbox
let containerGame = document.getElementById("containerGame");
let pPlayer = document.getElementById("thePlayer");
let pLetter = document.getElementById("theLetter");

// Para mostrar las respuestas
let containerAnswers = document.getElementById("containerAnswers");
let pAnswersPlayer = document.getElementById("answersPlayer");
let pAnswersLetter = document.getElementById("answersLetter");

// Los campos de texto donde se han digitado las respuestas
let iNombreG = document.getElementById("nombreG");
let iApellidoG = document.getElementById("apellidoG");
let iPaisG = document.getElementById("paisG");
let iAnimalG = document.getElementById("animalG");
let iFrutaG = document.getElementById("frutaG");
let iColorG = document.getElementById("colorG");
let iObjetoG = document.getElementById("objetoG");
let iArtistaG = document.getElementById("artistaG");
let iCiudadG = document.getElementById("ciudadG");

// Los campos de texto donde se mostraran las respuestas de los jugadores
let iNombreA = document.getElementById("nombreA");
let iApellidoA = document.getElementById("apellidoA");
let iPaisA = document.getElementById("paisA");
let iAnimalA = document.getElementById("animalA");
let iFrutaA = document.getElementById("frutaA");
let iColorA = document.getElementById("colorA");
let iObjetoA = document.getElementById("objetoA");
let iArtistaA = document.getElementById("artistaA");
let iCiudadA = document.getElementById("ciudadA");

const socket = io("ws://localhost:3000");

socket.on("id-room", (idRoom, thePlayers) => {
    roomH1.classList.add("container-room-show");
    roomH1.innerHTML = `Sala #${idRoom}`;
    theRoom = idRoom;
    playerName = nameElement.value;
    addHtmlPlayer(thePlayers[0]);
})

socket.on("player-joined", (idRoom, thePlayers) => {
    roomH1.classList.add("container-room-show");
    roomH1.innerHTML = `Sala #${idRoom}`;
    theRoom = idRoom;
    playerName = nameElement.value;

    // Primero se remueven los elementos hijos anteriores
    let child = containerThePlayers.lastElementChild;
    while (child) {
        containerThePlayers.removeChild(child);
        child = containerThePlayers.lastElementChild;
    }

    for (let i = 0; i < thePlayers.length; i++) addHtmlPlayer(thePlayers[i]);
})

socket.on("start-letter", async (theLetter) => {
    // Desaparecer el cartel del stop
    containerForm.classList.add("container-form-hidde");
    // Desparecer el cartel de jugadores
    containerRoom.classList.remove("container-room-show");
    
    // Mostrar la animación de la ruleta
    containerRoulette.classList.add("container-roulette-show");
    let indexMultiplier = letters.indexOf(theLetter);
    let totalRotation = 14*(26 - indexMultiplier) + 720;
    containerTheRoulette.style.transform = `rotate(${totalRotation}deg)`;

    // Ocultar la ruleta
    await new Promise(resolve => setTimeout(resolve, 6000));
    containerRoulette.classList.remove("container-roulette-show");

    // Mostrar el panel de jugadores 
    containerGame.classList.add("container-game-show");

    pPlayer.innerHTML = "Nombre: " + playerName;
    pLetter.innerHTML = "Letra: " + theLetter;
})

socket.on("game-has-stopped", () => {
    let theAnswers = {
        "nombre": iNombreG.value,
        "apellido": iApellidoG.value,
        "pais": iPaisG.value,
        "animal": iAnimalG.value,
        "fruta": iFrutaG.value,
        "color": iColorG.value,
        "objeto": iObjetoG.value,
        "artista": iArtistaG.value,
        "ciudad": iCiudadG.value,
    }

    socket.emit("send-answers", theRoom, playerName, theAnswers);
})

socket.on("players-answers", (theAnswers) => {
    allAnswers = theAnswers;
    console.log("allAnswers");
    console.log(allAnswers);
})

function closeAlert(n) {
    theAlerts[n].classList.remove("d-block");
    theAlerts[n].classList.add("d-none");
}

function createNewRoom() {
    if (nameElement.value == "") {
        theAlerts[0].classList.remove("d-none");
        theAlerts[0].classList.add("d-block");
        return false;
    }

    socket.emit("create-room", nameElement.value);
    containerForm.classList.add("container-form-hidde");
    containerRoom.classList.add("container-room-show");
}

function enterInRoom() {
    if (roomElement.value == "") {
        theAlerts[1].classList.remove("d-none");
        theAlerts[1].classList.add("d-block");
        return false;
    }

    if (nameElement.value == "") {
        theAlerts[0].classList.remove("d-none");
        theAlerts[0].classList.add("d-block");
        return false;
    }

    socket.emit("join-room", nameElement.value, roomElement.value);
    containerForm.classList.add("container-form-hidde");
    containerRoom.classList.add("container-room-show");
}

function addHtmlPlayer(playerName) {
    let divElement = document.createElement("div");
    divElement.className = "col-4"
    divElement.innerHTML = playerName;
    containerThePlayers.appendChild(divElement);
}

function startGame() {
    socket.emit("start-game", theRoom);
}

function stopGame() {
    socket.emit("stop-game", theRoom);
}

function organizarLetras() {
    let letras = document.getElementsByClassName("letra");
    let constante = 13.75;

    contador = 0;
    for (let i = 0; i < letras.length; i++) {
        if (i == 0) continue;
        letras[i].style.transform = "rotate(" + constante + "deg)";
        
        constante += 13.75;

        if ((contador+1 > 4)) {
            contador = 0;
        } else {
            contador++;
        }
    }
}