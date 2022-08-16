
const pregunta = document.getElementById("pregunta");
const elecciones = Array.from(document.getElementsByClassName("respuesta__texto"));

let preguntaActual = [];
let score = 0;
let preguntaCounter = 0;
let preguntasDisponibles = [];

let preguntas = [];

fetch(`https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple`)
.then((res) => {
    return res.json();
})
.then((preguntasCargadas) => {
    preguntas = preguntasCargadas.results.map((preguntasCargadas) => {
        const preguntaFormada = {
            question: preguntasCargadas.question,
        };

        const opciones = [...preguntasCargadas.incorrect_answers];
        preguntaFormada.answer = Math.floor(Math.random() * 4) + 1;
        opciones.splice(
            preguntaFormada.answer - 1,
            0,
            preguntasCargadas.correct_answer
        );

        opciones.forEach((eleccion, index) => {
            preguntaFormada['eleccion' + (index + 1)] = eleccion;
        });

        return preguntaFormada;
    });
    startquiz();
})
.catch((err) => {
    console.error(err);
});

const bonus = 1;

startquiz = () => {
    preguntaCounter = 0;
    score = 0;
    preguntasDisponibles = [...preguntas];

    nuevapregunta ();
}

nuevapregunta = () => {
    // Al terminar todas las preguntas se redirecciona
    if(preguntasDisponibles.length == 0){
        localStorage.setItem("ScoreReciente", score)
        return window.location.assign("score.html");
    }

    preguntaCounter ++;
    
    // Genera un pregunta random, se multiplica por la cantidad de preguntas para que me de un numero entre el 1 y el numero maximo de preguntas
    const indexpregunta = Math.floor(Math.random() * preguntasDisponibles.length);
    preguntaActual = preguntasDisponibles[indexpregunta]
    pregunta.innerText = preguntaActual.question;

    elecciones.forEach((eleccion) => {
        const number = eleccion.dataset['number'];
        eleccion.innerHTML = preguntaActual['eleccion' + number];
    });

    preguntasDisponibles.splice(indexpregunta, 1);
};

// Reviso cual es la opcion seleccionada por el usuario

elecciones.forEach((eleccion) => {
    eleccion.addEventListener('click', (e) => {

        const elecciónSeleccionada = e.target;
        const respuestaSeleccionada = elecciónSeleccionada.dataset['number'];

        const clase =
            respuestaSeleccionada == preguntaActual.answer ? 'correcta' : 'incorrecta';

        if (clase === 'correcta') {
            score += bonus
        }

        elecciónSeleccionada.classList.add(clase);

        setTimeout(() => {
            elecciónSeleccionada.classList.remove(clase);
            nuevapregunta();
        }, 1000);
    });
});

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