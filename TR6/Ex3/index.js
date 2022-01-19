const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
zoomIn.addEventListener('click', aumentaTamanho);
zoomOut.addEventListener('click', diminuiTamanho);

var cont = 0;
const tamVet = ['padrao', 'zoom1', 'zoom2'];

function aumentaTamanho() {
    var images = document.querySelectorAll('.' + tamVet[cont]);
    if (cont >= 0 && cont < 2) {
        cont++;
    }
    for (i = 0; i < images.length; i++) {
        images[i].className = tamVet[cont];
    }
}

function diminuiTamanho() {
    var images = document.querySelectorAll('.' + tamVet[cont]);
    if (cont > 0 && cont <= 2) {
        cont--;
    }
    for (i = 0; i < images.length; i++) {
        images[i].className = tamVet[cont];
    }
}



