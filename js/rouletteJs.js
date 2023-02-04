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

organizarLetras();