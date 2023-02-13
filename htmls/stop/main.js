let theAlerts = document.getElementsByClassName("alert");
let nameElement = document.getElementById('name');
let roomElement = document.getElementById("room");

let roomH1 = document.getElementById("idRoom");
let containerThePlayers = document.getElementById("thePlayers");

let containerForm = document.getElementById("containerForm");
let containerRoom = document.getElementById("containerRoom");
let containerGame = document.getElementById("containerGame");

const socket = io("ws://localhost:3000");

socket.on("id-room", (idRoom, thePlayers) => {
    roomH1.classList.add("container-room-show");
    roomH1.innerHTML = `Sala #${idRoom}`;
    addHtmlPlayer(thePlayers[0]);
})

socket.on("player-joined", (idRoom, thePlayers) => {
    roomH1.classList.add("container-room-show");
    roomH1.innerHTML = `Sala #${idRoom}`;

    // Primero se remueven los elementos hijos anteriores
    let child = containerThePlayers.lastElementChild;
    while (child) {
        containerThePlayers.removeChild(child);
        child = containerThePlayers.lastElementChild;
    }

    for (let i = 0; i < thePlayers.length; i++) {
        console.log(thePlayers[i]);
        addHtmlPlayer(thePlayers[i])
    };
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
    // Desaparecer el cartel del stop
    containerForm.classList.add("container-form-hidde");
    // Desparecer el cartel de jugadores
    containerRoom.classList.remove("container-room-show");
    // Mostrar el panel de jugadores 
    containerGame.classList.add("container-game-show");



}

function goBack() {

}