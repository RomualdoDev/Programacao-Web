var condicao;
var temperatura;
var min;
var max;

function GetClima(nome) {
    return new Promise(function (resolve, reject) {
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + nome + "&APPID=e76640974d8f2f3ed7f25826579ad15c")
            .done(resolve)
            .fail(reject)
    });
}

function retornaClima(info) {
    condicao = info.weather[0].description;
    temperatura = info.main.temp;
    min = info.main.temp_min;
    max = info.main.temp_max;
    $("#condicao").text("A condição atual é: " + condicao.charAt(0).toUpperCase() + condicao.slice(1));
    $("#temperatura").text("A temperatura atual é: " + (temperatura - 273).toFixed(2) + "°C.");
    $("#minMax").text("Para hoje a mínima é " + (min - 273).toFixed(2) + "°C e a máxima " + (max - 273).toFixed(2) + "°C.");
}

function buscarNome() {
    condicao = null;
    temperatura = null;
    min = null;
    max = null;
    $("#condicao").text(condicao);
    $("#temperatura").text(temperatura);
    $("#minMax").text(min);

    var cidade = $("#cidade").val();

    GetClima(cidade)
        .then(retornaClima)
        .catch(function (e) { $("#condicao").text("Falha na requisição:" + JSON.stringify(e)) });
}

$("#consulta").click(buscarNome)