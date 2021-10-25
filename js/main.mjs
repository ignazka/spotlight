"use-strict"; // WHY???? need to study

import Game from "./game.mjs";

function buildDom(html) {
  const main = document.querySelector("main");
  main.innerHTML = html;
}



function buildSplashScreen() {
  buildDom(`
        <section class="splash-screen">
        <h1>Spotlight!</h1>
        <h2>THE GAME</h2>
        
        
       
  <div class="btn btn-start">
    <span>START</span>
  </div>

      
        </section>
        `);
  const btnStart = document.querySelector(".btn-start");
  btnStart.addEventListener("click", buildGameScreen);
}

function buildGameScreen() {
  buildDom(`
        <section class="game-screen">
        <div id="hud">
        <div id="scoreBoard">
        <p>SCORE: </p>
        <div class="score"></div>
        </div>
        <div id="howToPlay">
        <span>STAY IN THE LIGHT!</span><br><span>USE ARROW KEYs TO MOVE</span>
        </div>
        <div class="lives"></div>
        </div>
        <canvas></canvas>
        </section>
    `);

  const canvasElement = document.querySelector("canvas");
  const game = new Game(canvasElement);

  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  game.gameOverCallback(buildGameOver);

  game.startLoop();

  const setPlayerDirection = (event) => {
    if (event.code === "ArrowUp") {
      game.player.setDirectionY(-1);
    } else if (event.code === "ArrowDown") {
      game.player.setDirectionY(1);
    }
    if (event.code === "ArrowLeft") {
      game.player.setDirectionX(-1);
    } else if (event.code === "ArrowRight") {
      game.player.setDirectionX(1);
    }
    if (event.code === "Space") {
      const action = {
        fast() { this.speed === 10; },
        slow() { this.speed === 2; },
      };

      const keyAction = {
        space: { keydown: action.fast, keyup: action.slow },
      };

      const keyHandler = (event) => {
        if (event.repeat) return;
        if (!(event.key in keyAction) || !(event.type in keyAction[event.key])) return;
        keyAction[event.key][event.type]();
      };

      ['keydown', 'keyup'].forEach((eventType) => {
        document.body.addEventListener(eventType, keyHandler);
      });
    }
  };

  const resetPlayerDirection = () => {
    game.player.setDirectionX(0);
    game.player.setDirectionY(0);
  };
  document.addEventListener("keydown", setPlayerDirection);

  // stop player movement after key release
  document.addEventListener("keyup", resetPlayerDirection);
}

function buildGameOver() {
  buildDom(`
        <section class="game-over">
          <h1>GAME OVER</h1>
          <div class="box-3">
          <div class="btn btn-restart">
            <span>TRY AGAIN</span>
          </div>
        </div>
          <div id="final-score">
          <p>FINAL SCORE:</p>
          <div class="score"></div>
          </div>
        
        </section>
      `);
  const btnRestart = document.querySelector(".btn-restart");
  btnRestart.addEventListener("click", buildGameScreen);
}

const main = () => {
  buildSplashScreen();
};
window.addEventListener("load", main);
