function addHtmlPlayer(container, playerName){
    let divElement = document.createElement("div");
    divElement.className = "col-4"
    divElement.innerHTML = playerName;
    container.appendChild(divElement);
}

const socket = io("ws://localhost:3000");

let idRoom = "";
let thePlayers = [];

socket.on("id-room", (idRoom) => {
    let roomH1 = document.getElementById("idRoom");
    roomH1.classList.add("container-room-show");
    roomH1.innerHTML = `Sala #${idRoom}`
    idRoom = idRoom;
    let containerThePlayers = document.getElementById("thePlayers");
    addHtmlPlayer(containerThePlayers, thePlayers[0]);
})

socket.on("player-joined", (...args) => {
    let { playerName } = args[0];
    playerName = playerName + "" + thePlayers.length; 
    thePlayers.push(playerName);
})

function closeAlert(n) {
    let theAlerts = document.getElementsByClassName("alert");
    theAlerts[n].classList.remove("d-block");
    theAlerts[n].classList.add("d-none");
}

function createNewRoom() {
    let theAlerts = document.getElementsByClassName("alert");
    let name = document.getElementById('name').value;
    name += "" + thePlayers.length;

    if (name == "") {
        theAlerts[0].classList.remove("d-none");
        theAlerts[0].classList.add("d-block");
        return false;
    }

    socket.emit("create-room", name);
    thePlayers.push(name);

    let containerForm = document.getElementById("containerForm");
    containerForm.classList.add("container-form-hidde");
    let containerRoom = document.getElementById("containerRoom");
    containerRoom.classList.add("container-room-show");
}

function enterInRoom(){
    let theAlerts = document.getElementsByClassName("alert");
    let name = document.getElementById('name').value;
    name += "" + thePlayers.length;
    let room = document.getElementById("room").value;
    if (room == "" || name == "") {
        theAlerts[1].classList.remove("d-none");
        theAlerts[1].classList.add("d-block");
        return false;
    }

    socket.emit("join-room", name);
    let containerForm = document.getElementById("containerForm");
    containerForm.classList.add("container-form-hidde");
    let containerRoom = document.getElementById("containerRoom");
    containerRoom.classList.add("container-room-show");
}

function enterInGame() {
    // Desaparecer el cartel del stop
    let containerForm = document.getElementById("containerForm");
    containerForm.classList.add("container-form-hidde");

    // Mostrar el panel de jugadores 

    // Agregar un contenedor flotante
    // donde una vez los jugadores
    // han ingresado al juego,
    // se le pueda dar click
    // a iniciar para poder comenzar el juego
    let divGameColumns = document.getElementById("game-columns");
    divGameColumns
}