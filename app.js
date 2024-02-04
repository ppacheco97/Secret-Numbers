//Selección de número secreto, mediante fuunción generarNumeroSecreto
let numeroSecreto = 0;
let numerosSorteados = [];

//Establecimiento de nuúmero limite e intentos máximos
let numeroMaximo = 10;
let intentosMax = 3;

//Valor por defecto debe ser uno, ya que es el minimo de intentos requeridos para descubrir el numero secreto
let intentos = 1;

//Valor por defecto debe ser cero, se manipula mediante función CheckAttempt en caso de acierto
let aciertos = 0;

//Funciones
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function checkAttempt() {
    let numeroUsuario = parseInt(document.getElementById('userValue').value);
    
    //Acierta el Número
    if(numeroUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Felicidades, Has acertado en ${intentos} ${(intentos === 1) ? 'oportunidad' : 'oportunidades'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        aciertos++
    } else {
        //Fallo el Juego
        if(numeroUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El numero secreto es Menor');
        } else {
            asignarTextoElemento('p', 'El numero secreto es Mayor');
        }
        //Verifica si se ha alcanzado el máximo de intentos
        if(intentos >= intentosMax) {
            asignarTextoElemento('p', `¡Lo siento, has agotado tus intentos! El número secreto era ${numeroSecreto}.`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
        intentos++
        cleanBox();
    }
    return;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Escoge un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    cleanBox();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

function cleanBox() {
    document.getElementById('userValue').value = ''
}

function generarNumeroSecreto () {
    //Si ya salieron todos los numeros
    if (numerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p',`!Felicidades, has descubierto ${aciertos} de ${numeroMaximo} numeros secretos!`)        
    } else {
        //Si el numero generado ya se encuentra en la lista
        let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
        if (numerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            numerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

condicionesIniciales();
