// Creo la clase preguntas
class Pregunta {
    constructor(pregunt, respa, respb,respc, respd, correcta){
        this.pregunt = pregunt;
        this.respa = respa;
        this.respb = respb;
        this.respc = respc;
        this.respd = respd;
        this.correcta = correcta;
    }
}

// Creo clase usuario para el local storage

class Usuario {
    constructor(nombre, email, score) {
        this.nombre = nombre;
        this.email = email;
        this.score = score;
    }
}

// funcion para saber cual es la respuesta seleccionada

function seleccionado() {

    let respuesta = undefined;

    respuestasEl.forEach(respuestasEl => {
        if(respuestasEl.checked) {
            respuesta = respuestasEl.id;
        }
    })

    return respuesta;
}

// Carga las preguntas y respuestas de la clase en el html

function cargartrivial() {

    respuestasEl.forEach(respuestasEl => {
        respuestasEl.checked = false;
    })

    const quizactual = preguntas [actualpreg];

    preg.innerHTML = quizactual.pregunt;
    preguntaA.innerHTML = quizactual.respa;
    preguntaB.innerHTML = quizactual.respb;
    preguntaC.innerHTML = quizactual.respc;
    preguntaD.innerHTML = quizactual.respd;

}

const pregunta1 = new Pregunta ("Kuala Lumpur es la capita de", "Vietnam", "Malasia", "Suecia", "Austria", "b");
const pregunta2 = new Pregunta ("De arriba a abajo soy negro, rojo y amarillo quien soy", "Belgica", "Rumania", "Alemania", "Dinamarca", "c");
const pregunta3 = new Pregunta ("Cual es la capital de Canadá", "Toronto", "Ottawa", "Quebec", "Montreal", "b");
const pregunta4 = new Pregunta ("Qué país es el más plano de la tierra", "Chad", "Polonia", "China", "Bolivia", "d");

const preguntas = [pregunta1, pregunta2, pregunta3, pregunta4];
const usuarios = [];

const preg = document.getElementById("preg");
const preguntaA = document.getElementById("preguntaA");
const preguntaB = document.getElementById("preguntaB");
const preguntaC = document.getElementById("preguntaC");
const preguntaD = document.getElementById("preguntaD");

const respuestasEl = document.querySelectorAll(".respues");
const trivialcont = document.getElementById("trivialcont");
const reinciarbtn = document.getElementById("reinciar");
const siguientebtn = document.getElementById("siguiente");

// form dom

const divform = document.getElementById("divform");
const mostrarbtn = document.getElementById("mostrar");
const formid = document.getElementById("formulario");
const divinfo = document.getElementById("infousuario");

// Cargo las preguntas al index

let actualpreg = 0;
let resultado = 0;

cargartrivial();

siguientebtn.addEventListener("click", () => {
    
    const respuesta = seleccionado();

    console.log(respuesta);

    if (respuesta) {
        if (respuesta === preguntas [actualpreg].correcta) {
            resultado ++;
        }

        actualpreg ++;
        if (actualpreg < preguntas.length) {
            cargartrivial();
        } else {
            trivialcont.innerHTML = `<h1>Quiz Terminado </h1> <br>
            <h2>Respondiste bien ${resultado}/${preguntas.length}</h2> <br> `
            divform.style.display = "block";
        }
    }
})

//form para guardar los datos del usuario con sus resultados

formid.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    const usuario = new Usuario (nombre, email, resultado);

    usuarios.push(usuario);

    localStorage.setItem("Usuario", JSON.stringify(usuarios));

    formid.reset();
})

mostrarbtn.addEventListener("click", () => {
    const usuarios = JSON.parse(localStorage.getItem("Usuario"));

    let aux = ``
    usuarios.forEach(usuario => {
        aux += `<p> Nombre: ${usuario.nombre} </p> <br>
        <p> Score: ${resultado} </p> <br>       ` 
    })

    divinfo.innerHTML = aux;
})


// Libreria Bideo.js

(function () {

    var bv = new Bideo();
    bv.init({
      // Video element
      videoEl: document.querySelector('#background_video'),
  
      // Container element
      container: document.querySelector('body'),
  
      // Resize
      resize: true,
  
      // autoplay: false,
  
      isMobile: window.matchMedia('(max-width: 768px)').matches,
  
      playButton: document.querySelector('#play'),
      pauseButton: document.querySelector('#pause'),
  
      // Array of objects containing the src and type
      // of different video formats to add
      src: [
        {
          src: 'videocompr.mp4',
          type: 'video/mp4'
        }
      ],
  
      // What to do once video loads (initial frame)
      onLoad: function () {
        document.querySelector('#video_cover').style.display = 'none';
      }
    });
  }());