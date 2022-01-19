function mudaCor(event) {
    const celLivro = document.getElementsByName('col1');
    const celPag = document.getElementsByName('col2');
    const celula = event.currentTarget;
    if (celula.textContent === 'Livro') {
        for (i = 0; i < celPag.length; i++) {
            celPag[i].classList.remove('verde');
        }
        for (i = 0; i < celLivro.length; i++) {
            celLivro[i].classList.add('azul');
        }
    } else {
        if (celula.textContent === 'Páginas') {
            for (i = 0; i < celLivro.length; i++) {
                celLivro[i].classList.remove('azul');
            }
            for (i = 0; i < celPag.length; i++) {
                celPag[i].classList.add('verde');
            }
        }
    }

}
const titulos = document.getElementsByTagName('th');
for (i = 0; i < titulos.length; i++) {
    titulos[i].addEventListener('click', mudaCor);
}