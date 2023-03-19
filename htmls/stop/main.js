// Para recordar el jugador
// que crea la sala, el número de esta
// y la letra de juego.
let theRoom = 0;
let playerName = "";
let globalLetter = "";

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

// Para mostrar el h2 inicial
let stopH2 = document.getElementById("stop-h2");

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

// Contenedor para esperar las respuestas de los otros jugadores
let containerWait = document.getElementById("containerWait");

// Para enviar las respuestas validadas por los demás jugadores
// una vez han sido revisadas.
let finalAnswers = {};

// Para ir mostrando los resultados de los jugadores.
let finalArrayPlayers = [];
let indexPlayer = 0;

// Contenedor para mostrar el/los ganador/ganadores final/es.
let containerDecision = document.getElementById("containerDecision");

// Para almacenar los scores de cada jugador
let allScores = {};

// Para colocar jugador, respuestas y puntuación final.
let uAnswer = document.getElementById("uAnswer");
let liNombre = document.getElementById("liNombre");
let liApellido = document.getElementById("liApellido");
let liPais = document.getElementById("liPais");
let liAnimal = document.getElementById("liAnimal");
let liFruta = document.getElementById("liFruta");
let liColor = document.getElementById("liColor");
let liObjeto = document.getElementById("liObjeto");
let liArtista = document.getElementById("liArtista");
let liCiudad = document.getElementById("liCiudad");
let pFinalScore = document.getElementById("pFinalScore");

const socket = io("ws://localhost:3000");

socket.on("id-room", (idRoom, thePlayers) => {
    roomH1.classList.add("container-room-show");
    roomH1.innerHTML = `Sala #${idRoom}`;
    theRoom = idRoom;
    playerName = thePlayers[0];
    addHtmlPlayer(thePlayers[0]);
})

socket.on("you-joined", (idRoom, thePlayers) => {
    playerName = nameElement.value + "" + (thePlayers.length - 1);
    roomH1.classList.add("container-room-show");
    roomH1.innerHTML = `Sala #${idRoom}`;
    theRoom = idRoom;

    // Primero se remueven los elementos hijos anteriores
    let child = containerThePlayers.lastElementChild;
    while (child) {
        containerThePlayers.removeChild(child);
        child = containerThePlayers.lastElementChild;
    }

    for (let i = 0; i < thePlayers.length; i++) addHtmlPlayer(thePlayers[i]);
})

socket.on("player-joined", (idRoom, thePlayers) => {
    roomH1.classList.add("container-room-show");
    roomH1.innerHTML = `Sala #${idRoom}`;
    theRoom = idRoom;

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
    containerForm.classList.add("container-form-hide");
    // Desparecer el cartel de jugadores
    containerRoom.classList.remove("container-room-show");
    
    // Mostrar la animación de la ruleta
    containerRoulette.classList.add("container-roulette-show");
    let indexMultiplier = letters.indexOf(theLetter);
    let totalRotation = 14*(26 - indexMultiplier) + 720;
    containerTheRoulette.style.transform = `rotate(${totalRotation}deg)`;

    // Ocultar la ruleta
    await new Promise(resolve => setTimeout(resolve, 6000));
    containerTheRoulette.style.removeProperty("transform");
    containerRoulette.classList.remove("container-roulette-show");

    // Mostrar el panel de jugadores 
    containerGame.classList.add("container-game-show");

    pPlayer.innerHTML = "Nombre: " + playerName;
    pLetter.innerHTML = "Letra: " + theLetter;

    globalLetter = theLetter;

    // Mostrar el primer h2
    stopH2.classList.remove("stop-h2-hide");
    stopH2.classList.add("stop-h2-show");
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
    // Primero se remueven los elementos hijos anteriores
    let child = containerAnswers.lastElementChild;
    while (child) {
        containerAnswers.removeChild(child);
        child = containerAnswers.lastElementChild;
    }

    allAnswers = theAnswers;
    let playersAnswers = Object.keys(allAnswers);

    playersAnswers.forEach((e, i) => {
        if (e != playerName) {
            finalAnswers[e] = {
                "nombre": 0,
                "apellido": 0,
                "pais": 0,
                "animal": 0,
                "fruta": 0,
                "color": 0,
                "objeto": 0,
                "artista": 0,
                "ciudad": 0
            };

            addPlayerAnswers(e, allAnswers[e]);
        }
    })

})

socket.on("wait-players", () => {
    stopH2.classList.remove("stop-h2-show");
    stopH2.classList.add("stop-h2-hide");
    containerAnswers.classList.remove("container-answers-show");
    containerWait.classList.add("container-wait-show");
})

socket.on("final-score", (theAnswers, scorePlayers, playersMaxScore) => {
    showFinalScore(theAnswers, scorePlayers, playersMaxScore);
})

socket.on("wait-back-players", () => {
    containerDecision.classList.remove("container-decision-show");
    containerWait.classList.add("container-wait-show");
})

socket.on("start-again", () => {
    // Se modifican las entradas de texto.
    iNombreG.value = "";
    iApellidoG.value = "";
    iPaisG.value = "";
    iAnimalG.value = "";
    iFrutaG.value = "";
    iColorG.value = "";
    iObjetoG.value = "";
    iArtistaG.value = "";
    iCiudadG.value = "";

    // Se reinician valores relacionados con las respuestas
    allAnswers = {};
    finalAnswers = {};
    finalArrayPlayers = [];
    indexPlayer = 0;
    allScores = {};

    containerDecision.classList.remove("container-decision-show");
    containerWait.classList.remove("container-wait-show");
    containerRoom.classList.add("container-room-show");
});

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
    containerForm.classList.add("container-form-hide");
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
    containerForm.classList.add("container-form-hide");
    containerRoom.classList.add("container-room-show");
}

function addHtmlPlayer(thePlayer) {
    let divElement = document.createElement("div");
    divElement.className = "col-4"
    divElement.innerHTML = thePlayer;
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

function setValidAnswer(thePlayer, question, answer, theSpan) {
    finalAnswers[thePlayer][question] = answer;

    // Si la respuesta es igual a 1, 
    // agreguese el indicador de que la respuesta es correcta
    if (answer == 1) {
        theSpan.classList.remove("text-light");
        theSpan.classList.add( "text-success");
    } else {
        theSpan.classList.remove("text-success");
        theSpan.classList.add( "text-light");
    }

}

function sendFinalAnswers(thePlayer) {
    socket.emit("final-answers", theRoom, finalAnswers, thePlayer);
}

let tagsLabels = ["Nombre", "Apellido", "País", "Animal", "Fruta", "Color", "Objeto", "Artista", "Ciudad"];
let keysAnswers = ["nombre", "apellido", "pais", "animal", "fruta", "color", "objeto", "artista", "ciudad"];

function addPlayerAnswers(thePlayer, playerAnswers){
    console.log("addPlayerAnswers");
    console.log({thePlayer, playerAnswers});

    // *******************************************
    // Creación del h2 para organizar el contenido
    let h2OrganizeContent = document.createElement("h2");
    h2OrganizeContent.className = "text-light text-center py-5";
    // *******************************************

    // ************************************************************************************
    // Creación del contenedor que contiene  el nombre de cada jugador y  la letra de juego
    let divNameLetter = document.createElement('div');
    divNameLetter.className = "container-fluid row m-0 mb-3 p-0 px-5 g-0";

    let divDivName = document.createElement('div');
    divDivName.className = "col d-flex justify-content-start align-items-center";

    let divDivPName = document.createElement('p');
    divDivPName.className = "form-label-styled text-light m-0 p-0";
    divDivPName.innerHTML = "Nombre: " + thePlayer;

    let divDivLetter = document.createElement('div');
    divDivLetter.className = "col d-flex justify-content-end align-items-center";

    let divDivPLetter = document.createElement('p');
    divDivPLetter.className = "text-light m-0 p-0";
    divDivPLetter.innerHTML = "Letra: " + globalLetter;

    divDivName.appendChild(divDivPName);
    divDivLetter.appendChild(divDivPLetter);

    divNameLetter.appendChild(divDivName);
    divNameLetter.appendChild(divDivLetter);
    // ************************************************************************************

    // ****************************************************************************
    // Creación del contenedor que contiene  cada una de las respuestas del jugador
    let divAnswers = document.createElement("div");
    divAnswers.className = "row g-3 justify-content-center text-center";
    
    for (let i = 0; i < tagsLabels.length; i++) {
        let divDivAnswers = document.createElement("div");
        divDivAnswers.className = "col-sm-4 px-5";
        
        let divDivLabelAnswers = document.createElement("label");
        divDivLabelAnswers.className = "form-label-styled text-light p-2";
        divDivLabelAnswers.innerHTML = tagsLabels[i];

        let theKey = keysAnswers[i];
        let divDivSpanAnswers = document.createElement("span");
        divDivSpanAnswers.className = "fw-bold text-light d-block";
        divDivSpanAnswers.id = thePlayer + "" + theKey; // Prueba
        divDivSpanAnswers.innerHTML = playerAnswers[theKey];

        let divDivDivAnswers = document.createElement("div");
        divDivDivAnswers.className = "mt-2";

        let divDivDivButton1Answers = document.createElement("button");
        let divDivDivButton2Answers = document.createElement("button");
        
        divDivDivButton1Answers.className = "btn btn-success text-light mark me-2";
        divDivDivButton2Answers.className = "btn btn-danger fw-bold text-light xmark";
        divDivDivButton2Answers.innerHTML = "X";

        /*
            1 -> Considero que la respuesta es correcta.
            0 -> Considero que la respuesta es incorrecta.
        */
        divDivDivButton1Answers.onclick = () => setValidAnswer(thePlayer, theKey, 1, divDivSpanAnswers);
        divDivDivButton2Answers.onclick = () => setValidAnswer(thePlayer, theKey, 0, divDivSpanAnswers);
        
        divDivDivAnswers.appendChild(divDivDivButton1Answers);
        divDivDivAnswers.appendChild(divDivDivButton2Answers);
        
        divDivAnswers.appendChild(divDivLabelAnswers);
        divDivAnswers.appendChild(divDivSpanAnswers);
        divDivAnswers.appendChild(divDivDivAnswers);
        divAnswers.appendChild(divDivAnswers);
    }
    // ****************************************************************************

    // ********************************************
    // Se crea como un h4, pero en sí es un botón.
    // Se crea como h4 para los estilos de bootstrap.
    let buttonSendFinalAnswers = document.createElement("h5");
    buttonSendFinalAnswers.className = "make-hover text-light text-center py-5 w-100";
    buttonSendFinalAnswers.innerHTML = "E N V I A R";

    buttonSendFinalAnswers.onclick = () => sendFinalAnswers(thePlayer);
    // ********************************************
    
    containerAnswers.appendChild(h2OrganizeContent);
    containerAnswers.appendChild(divNameLetter);
    containerAnswers.appendChild(divAnswers);
    containerAnswers.appendChild(buttonSendFinalAnswers);

    containerGame.classList.remove("container-game-show");
    containerAnswers.classList.add("container-answers-show");
}

function showInitialAnswers(thePlayer, answersFromPlayer, scorePlayer) {
    uAnswer.innerHTML = thePlayer + ":";

    liNombre.innerHTML = "Nombre: " + answersFromPlayer["nombre"];
    liApellido.innerHTML = "Apellido: " + answersFromPlayer["apellido"];
    liPais.innerHTML = "País: " + answersFromPlayer["pais"];
    liAnimal.innerHTML = "Animal: " + answersFromPlayer["animal"];
    liFruta.innerHTML = "Fruta: " + answersFromPlayer["fruta"];
    liColor.innerHTML = "Color: " + answersFromPlayer["color"];
    liObjeto.innerHTML = "Objeto: " + answersFromPlayer["objeto"];
    liArtista.innerHTML = "Artista: " + answersFromPlayer["artista"];
    liCiudad.innerHTML = "Ciudad: " + answersFromPlayer["ciudad"];

    pFinalScore.innerHTML = "Puntuación final: " + scorePlayer;

    // Finalmente se oculta el contenedor de respuestas,
    // el cartel de S T O P ! y el contenedor de espera
    // y se muestra el contenedor de decisión final.
    stopH2.classList.remove("stop-h2-show");
    stopH2.classList.add("stop-h2-hide");
    containerAnswers.classList.remove("container-answers-show");
    containerWait.classList.remove("container-wait-show");
    containerDecision.classList.add("container-decision-show");
}

function showFinalScore(theAnswers, scorePlayers, playersMaxScore) {
    let countWinnerPlayers = playersMaxScore.length;
    console.log({countWinnerPlayers});

    let pLetter = document.getElementById("pLetter");
    pLetter.innerHTML = `Letra: ${globalLetter}`;

    let h3Winner = document.getElementById("h3Winner");
    let thePlayers = Object.keys(scorePlayers);

    allScores = scorePlayers;

    if (countWinnerPlayers > 1) {
        let messageH3 = "¡Ha habido un empate entre: <u>";

        let playersMessage = "";
        for (let i = 0; i < countWinnerPlayers; i++) {
            let everyPlayer = playersMaxScore[i]
            if (i + 1 == countWinnerPlayers) playersMessage += " y " + everyPlayer + ".";
            else if (i + 2 == countWinnerPlayers) playersMessage += everyPlayer;
            else playersMessage += everyPlayer + ", ";
            thePlayers.pop(thePlayers.indexOf(everyPlayer));
        }

        finalArrayPlayers = playersMaxScore.concat(thePlayers);;

        messageH3 += playersMessage + "</u>";

        h3Winner.innerHTML = messageH3;

        console.log({finalArrayPlayers});

        let firstPlayer = finalArrayPlayers[0];
        showInitialAnswers(firstPlayer, theAnswers[firstPlayer], scorePlayers[firstPlayer]);
    } else {
        let firstPlayer = playersMaxScore[0];
        h3Winner.innerHTML = `¡El ganador es <u>${firstPlayer}!</u>`;

        thePlayers.pop(thePlayers.indexOf(firstPlayer));
        finalArrayPlayers = playersMaxScore.concat(thePlayers);

        console.log({finalArrayPlayers});

        showInitialAnswers(firstPlayer, theAnswers[firstPlayer], scorePlayers[firstPlayer]);
    }
}

function nextScore() {
    indexPlayer += 1;
    console.log({indexPlayer});

    if (indexPlayer == finalArrayPlayers.length) {
        indexPlayer = 0;
    }

    let thePlayer = finalArrayPlayers[indexPlayer];
    uAnswer.innerHTML = thePlayer + ":";

    let answersFromPlayer = allAnswers[thePlayer];

    liNombre.innerHTML = "Nombre: " + answersFromPlayer["nombre"];
    liApellido.innerHTML = "Apellido: " + answersFromPlayer["apellido"];
    liPais.innerHTML = "País: " + answersFromPlayer["pais"];
    liAnimal.innerHTML = "Animal: " + answersFromPlayer["animal"];
    liFruta.innerHTML = "Fruta: " + answersFromPlayer["fruta"];
    liColor.innerHTML = "Color: " + answersFromPlayer["color"];
    liObjeto.innerHTML = "Objeto: " + answersFromPlayer["objeto"];
    liArtista.innerHTML = "Artista: " + answersFromPlayer["artista"];
    liCiudad.innerHTML = "Ciudad: " + answersFromPlayer["ciudad"];

    let scorePlayer = allScores[thePlayer];
    pFinalScore.innerHTML = "Puntuación final: " + scorePlayer;
}

function prevScore() {
    indexPlayer -= 1;
    console.log({indexPlayer});

    if (indexPlayer == -1) {
        indexPlayer = finalArrayPlayers.length - 1;
    }

    let thePlayer = finalArrayPlayers[indexPlayer];
    uAnswer.innerHTML = thePlayer + ":";

    let answersFromPlayer = allAnswers[thePlayer];

    liNombre.innerHTML = "Nombre: " + answersFromPlayer["nombre"];
    liApellido.innerHTML = "Apellido: " + answersFromPlayer["apellido"];
    liPais.innerHTML = "País: " + answersFromPlayer["pais"];
    liAnimal.innerHTML = "Animal: " + answersFromPlayer["animal"];
    liFruta.innerHTML = "Fruta: " + answersFromPlayer["fruta"];
    liColor.innerHTML = "Color: " + answersFromPlayer["color"];
    liObjeto.innerHTML = "Objeto: " + answersFromPlayer["objeto"];
    liArtista.innerHTML = "Artista: " + answersFromPlayer["artista"];
    liCiudad.innerHTML = "Ciudad: " + answersFromPlayer["ciudad"];

    let scorePlayer = allScores[thePlayer];
    pFinalScore.innerHTML = "Puntuación final: " + scorePlayer;
}

// Para finalizar la partida
function finishGame() {
    socket.emit("finish-game", theRoom, playerName);
}