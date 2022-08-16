const scoreReciente = localStorage.getItem("ScoreReciente");
const scorefinal = document.getElementById("scorefinal");
const usuario = document.getElementById("username");
scorefinal.innerText = scoreReciente;

const highscore = JSON.parse(localStorage.getItem("highscore")) || [];

const maxhighscore = 5;

savescore = e => {
    e.preventDefault();

    const score = {
        score: scoreReciente,
        nombre: usuario.value
    }

    highscore.push(score);
    highscore.sort((a,b) => b.score - a.score)
    highscore.splice(5);

    localStorage.setItem("highscore", JSON.stringify(highscore));
    window.location.assign("index.html")
}

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