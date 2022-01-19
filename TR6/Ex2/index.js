function preencheLista() {
    console.log('oi')
    var lista = document.getElementById("lista");
    for (i = 0; i < campos.length; i++) {
        var novoDado = document.createElement("li");
        novoDado.innerHTML = campos[i].value;
        lista.appendChild(novoDado);
        campos[i].value = '';
    }
}

const campos = document.getElementsByTagName('input');
const botao = document.getElementById('but')
botao.addEventListener('click', preencheLista);