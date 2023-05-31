// Seleccion de elementos
const contenido=document.querySelector('#alerta');
const input=document.querySelector('#input');
const output=document.querySelector('#output');
const imagen=document.querySelector('#img');
const btnEncriptor=document.querySelector('#btn-encriptar');
const btnDesencriptar=document.querySelector('#btn-desencriptar');
const btnCopiar=document.querySelector('#btn-copiar');

// UI Interface

class UI{
    imprimirAlerta(estado){
        this.limpiarHTML();        
            const divMensaje=document.createElement('div');
        if (estado){
            divMensaje.classList.add('alerta');
            divMensaje.textContent="Solo son permitidas letras minúsculas y sin acentos";
            alerta.insertAdjacentElement("afterbegin", divMensaje);
        }else {
            divMensaje.remove();
        }
    }

    verOutput(mensaje){
        imagen.remove();
        output.textContent=mensaje;
        btnCopiar.removeAttribute("hidden");
    }

    limpiarInput(){
        input.value=''
        textInput=''
    }

    limpiarHTML(){
        while(alerta.firstChild){
            alerta.removeChild(alerta.firstChild)
        }
    }
}

const ui=new UI();

// Asignar eventos
eventListeners();
function eventListeners(){
    input.addEventListener('input', validarTexto);
    btnEncriptor.addEventListener('click', encriptar);
    btnDesencriptar.addEventListener('click', desencriptar);
    btnCopiar.addEventListener('click',copiar);
}

// Diccionario de cambios
const arrayCambio=[
    {encript:'a',desencript:'ai'},
    {encript:'e',desencript:'enter'},
    {encript:'i',desencript:'imes'},
    {encript:'o',desencript:'ober'},
    {encript:'u',desencript:'ufat'},
]
var validado;
var textInput=''
var textOutput=''

function validarTexto(e){
    textInput=e.target.value;
    let validador = textInput.match(/^[a-z]*$/);
    if(!validador || validador === 0) {
        ui.imprimirAlerta(true);
        btnEncriptor.disabled=true
        validado=true;
        }      
    else{
        ui.imprimirAlerta(false);
        validado=false;
        btnEncriptor.disabled=false
    }
}

function encriptar(){
    textOutput=''
    if(!validado) {
        for(let letra of textInput){
            const objeto=arrayCambio.find(item=>item.encript===letra);        
            textOutput+=objeto ? objeto.desencript : letra
        }
        ui.verOutput(textOutput);
        ui.limpiarInput();        
    }
}

function desencriptar(){
    if(!validado) {
        textOutput=textInput;
        arrayCambio.forEach(item => {
            if(textOutput.includes(item.desencript)){
                textOutput = textOutput.replaceAll(item.desencript, item.encript)
            }
        })
        ui.verOutput(textOutput);
        ui.limpiarInput();
    }
}

function copiar(){
    navigator.clipboard.writeText(textOutput);
}




