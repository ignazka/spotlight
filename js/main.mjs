"use-strict"; // WHY???? need to study

import Game from "./game.mjs";

function buildDom(html) {
  const main = document.querySelector("main");
  main.innerHTML = html;
}

function buildSplashScreen() {
  buildDom(`
        <section class="splash-screen">
        <img id='img-title' src="https://ignazka.github.io/spotlight/images/title.png" />
        <img id='img-subtitle' src="https://ignazka.github.io/spotlight/images/subtitle.png" />
        
        
       
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
        <div class="score current-score"></div>
        </div>
        <div id="how-to-play">
        <span>STAY IN THE LIGHT!</span><br><span id="big-screen">USE MOUSE TO MOVE!</span>
        <span id="small-screen">TOUCH TO MOVE!</span>
        </div>
        <div class="lives"></div>
        </div>
     
        <canvas></canvas>
       
        </section>
    `);

  const canvasElement = document.querySelector("canvas");
  const game = new Game(canvasElement);

  const ctx = canvasElement.getContext("2d");

  game.gameOverCallback(buildGameOver);

  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  let countDown = 3;

  const count = setInterval(() => {
    ctx.textAlign = "center";

    if (canvasElement.width > 500) {
      ctx.font = "150px serif";
    } else {
      ctx.font = "50px serif";
    }

    ctx.fillStyle = "#c6ac8f";
    if (countDown === 0) {
      // do not display text
      // ctx.fillText(
      //   `GET READY!`,
      //   canvasElement.width / 2,
      //   canvasElement.height / 2
      // );

      clearInterval(count);
    }
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.fillText(
      `Get Ready! ${countDown}`,
      canvasElement.width / 2,
      canvasElement.height / 2
    );
    countDown--;
  }, 500);

  setTimeout(function () {
    console.log("Hello");
    document.addEventListener("mousemove", (event) => {
      game.player.setPosition(event.clientX, event.clientY);
    });
    game.startLoop();
  }, 2000);
}

// const setPlayerDirection = (event) => {
//   if (event.code === "ArrowUp") {
//     game.player.setDirectionY(-1);
//   } else if (event.code === "ArrowDown") {
//     game.player.setDirectionY(1);
//   }
//   if (event.code === "ArrowLeft") {
//     game.player.setDirectionX(-1);
//   } else if (event.code === "ArrowRight") {
//     game.player.setDirectionX(1);
//   }

// };

// const resetPlayerDirection = () => {
//   game.player.setDirectionX(0);
//   game.player.setDirectionY(0);
// };
// document.addEventListener("keydown", setPlayerDirection);

// // stop player movement after key release
//   // document.addEventListener("keyup", resetPlayerDirection);
// }

function buildGameOver() {
  buildDom(`
        <section class="game-over">
          <img id="game-over" src="https://ignazka.github.io/spotlight/images/game-over.png" />
          <div class="box-3">
          <div class="btn btn-restart">
            <span>TRY AGAIN</span>
          </div>
        </div>
        <div class="ctn-final-score">
          <div class="ctn-score">
          <p>YOUR SCORE:</p>
          <div class="score current-score"></div>
          </div>
          <div class="ctn-score">
          <p>HIGHSCORE:</p>
          <div id="highscore-div" class="score"></div>
          </div>
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
