let sleepFunction = (miliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, miliseconds);
    })
}

let modifyTextOnLoad = async () => {
    let typeWriterParagraph = document.getElementById('typewriterParagraph')
    let words = ["Crear.", "Innovar.", "Divertirse.", "Explorar."];

    let i = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < words.length; j++) {
            await sleepFunction(3000);
            typeWriterParagraph.innerHTML = words[j];
        }
    }
}

modifyTextOnLoad();

async function navigate(p) {
    let theViewPort = window.innerHeight;
    let amountPixels = theViewPort*p;

    easyScroll({
        'scrollableDomEle': window,
        'direction': 'bottom',
        'duration': 1500,
        'easingPreset': 'easeInOutQuad',
        'scrollAmount': amountPixels
    });
}

function goToPage(page) {
    window.location.href = "./htmls/stop/stop.html";
}


