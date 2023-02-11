// const socket = io("ws://localhost:3000");

// socket.on("hello from server", (...args) => {
//     console.log(...args);
// })

// socket.emit("hello from client", "hello world");

function closeAlert() {
    
}

function createNewRoom() {
    let name = document.getElementById('name').value;

    if (name == "") {
        alert("Por favor ingresa tu nombre");
        return false;
    }



}

function enterInRoom(){
    let room = document.getElementById("roo").value;
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