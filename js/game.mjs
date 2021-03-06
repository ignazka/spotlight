import Player from "./player.mjs";
import Spotlight from "./spotlight.mjs";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.player;
    this.spotlight;
    this.isGameOver = false;
    this.score = 0;
    this.startCounter = false;
  }

  startLoop() {
    this.spotlight = new Spotlight(this.canvas);
    this.player = new Player(this.canvas, 3, this.spotlight);

    const loop = () => {
      this.playerScore();
      if (!this.startCounter) {
        this.spotlight.resetPosition(this.player);
        this.startCounter = true;
      }
      this.spotlight.setDifficulty(this.score);
      this.checkAllCollisions();

      this.clearCanvas();
      this.drawCanvas();
      if (!this.isGameOver) {
        window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame(loop);
  }

  drawCanvas() {
    this.player.draw();
    this.spotlight.draw();
    this.player.drawLives();
  }
  checkAllCollisions() {
    this.spotlight.checkScreen();
    if (this.player.checkCollisions(this.spotlight)) {
      this.spotlight.resetPosition(this.player);
      this.player.loseLive();
      if (this.player.lives === 0) {
        this.isGameOver = true;
        this.onGameOver();
      }
    }
  }
  setHighscore() {
    if (Number(window.localStorage.getItem("score")) < this.score) {
      window.localStorage.setItem("score", this.score.toFixed(0));
    }

    const scoreElement = document.querySelector("#highscore-div");
    scoreElement.innerHTML = `${this.score.toFixed(0)}`;
    document.querySelector(
      "#highscore-div"
    ).innerHTML = `${window.localStorage.getItem("score")}`;
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  gameOverCallback(callback) {
    this.onGameOver = callback;
  }

  playerScore() {
    if (!this.isGameOver) {
      const intervalId = setInterval(() => {
        this.score += 0.01;
        const scoreElement = document.querySelector(".current-score");
        scoreElement.innerHTML = `${this.score.toFixed(0)}`;
        if (this.isGameOver) {
          this.setHighscore();
          clearInterval(intervalId);
        }
      }, 1);
    }
  }
}
export default Game;
