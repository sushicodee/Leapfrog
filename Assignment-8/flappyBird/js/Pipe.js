var sprite = new Image();
var spriteSrc = "./assets/images/sprite.png";
class Pipe {
  constructor(dx, dy, dWidth, dHeight, id, state, bird) {
    this.state = state;
    this.dx = dx;
    this.dy = dy;
    this.dHeight = dHeight;
    this.dWIdth = dWidth;
    this.id = id;
    this.elementName = name;
    this.speed = 4;
    this.position = [];
    this.top = {
      sx: 53,
      sy: 0
    };
    this.bottom = {
      sx: 104,
      sy: 0
    };
    this.maxY = -200;
    this.bird = bird;
    this.gap = 90;
    this.frame = 0;
    this.parentElement;
    this.element;
    this.HIT_SOUND = new Audio("./assets/audio/sfx_hit.wav");

    //
    this.SCORE_SOUND = new Audio("./assets/audio/sfx_point.wav");
    this.score = 0;
    this.bestScore = parseInt(localStorage.getItem("best")) || 0;

    // this.domDraw('top-pipe',this.top.sx,this.top.sy,200,-150,this.dWIdth,this.dHeight);
    // this.domDraw('bottom-pipe',this.bottom.sx,this.top.sy,200,-150 + this.dHeight+ this.gap,this.dWIdth,this.dHeight);
    this.domDraw(
      "top-pipe",
      this.top.sx,
      this.top.sy,
      400,
      -150,
      this.dWIdth,
      this.dHeight
    );
    this.domDraw(
      "bottom-pipe",
      this.bottom.sx,
      this.top.sy,
      400,
      -150 + this.dHeight + this.gap,
      this.dWIdth,
      this.dHeight
    );
    this.domDrawScore();
    this.domDrawGameOverScore();
  }

  resetGame = function() {
    this.position = [{ dx: -54, dy: -1000 }];
    this.score = 0;
  };

  domDrawScore() {
    let scoreElement = document.createElement("div");
    this.parentElement.appendChild(scoreElement);
    scoreElement.setAttribute("class", "score");
    scoreElement.style.width = "20px";
    scoreElement.style.height = "20px";
    scoreElement.style.color = "white";
    scoreElement.style.zIndex = 50;
    scoreElement.style.textShadow =
      "-1px -1px 0 #000,  1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000";
    scoreElement.innerText = this.score;
    scoreElement.style.margin = "auto";
  }

  domDrawGameOverScore() {
    let scoreElement = document.createElement("div");
    this.parentElement.appendChild(scoreElement);
    scoreElement.setAttribute("class", "score");
    scoreElement.style.width = "20px";
    scoreElement.style.height = "80px";
    scoreElement.style.color = "white";
    scoreElement.style.zIndex = 50;
    scoreElement.style.position = "absolute";
    scoreElement.style.top = "178px";
    scoreElement.style.left = "228px";
    scoreElement.style.display = "none";

    let freshScore = document.createElement("p");
    let bestScore = document.createElement("p");

    scoreElement.appendChild(freshScore);
    scoreElement.appendChild(bestScore);

    bestScore.setAttribute("class", "best-score");
    bestScore.style.width = "20px";
    bestScore.style.height = "20px";
    bestScore.style.color = "white";
    bestScore.style.paddingTop = "20px";
    bestScore.innerText = this.bestScore;
    bestScore.style.textShadow =
      "-1px -1px 0 #000,  1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000";
    freshScore.setAttribute("class", "fresh-score");
    freshScore.style.width = "20px";
    freshScore.style.height = "20px";
    freshScore.innerText = this.score;
    freshScore.style.color = "white";
    freshScore.style.textShadow =
      "-1px -1px 0 #000,  1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000";
  }

  domUpdateScore() {
    let scoreElement = document.getElementsByClassName("score")[0];
    scoreElement.innerText = this.score;
    let freshScore = document.getElementsByClassName("fresh-score")[0];
    freshScore.innerText = this.score;
    let bestScore = document.getElementsByClassName("best-score")[0];
    bestScore.innerText = this.bestScore;
  }
  domDraw(name, sx, sy, dx, dy, width, height) {
    this.parentElement = document.getElementsByClassName(`game-${this.id}`)[0];
    this.element = document.createElement("div");
    this.element.setAttribute("class", name);
    this.parentElement.appendChild(this.element);
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${dx}px`;
    this.element.style.top = `${dy}px`;
    this.element.style.position = "absolute";
    this.element.style.backgroundImage = `url(${spriteSrc})`;
    this.element.style.backgroundPositionX = `${sx}px`;
    this.element.style.backgroundPositionY = `${sy}px`;
  }
  domDrawChanges(name, dy) {
    // element.style.left = `${dx}px`;
    let element = document.getElementsByClassName(name)[0];
    element.style.top = `${dy}px`;
  }

  domAnimate(name, dx) {
    let element = document.getElementsByClassName(name)[0];
    element.style.left = `${dx}px`;
  }

  draw() {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      let topYPos = p.dy;
      let bottomYPos = p.dy + this.dHeight + this.gap;
      this.domDrawChanges("top-pipe", topYPos);
      this.domDrawChanges("bottom-pipe", bottomYPos);
      if (
        this.state.currentState === this.state.runningState ||
        this.state.currentState === this.state.getReadyState
      ) {
        let element = document.getElementsByClassName("score")[1];
        element.style.display = "none";
      }

      if (this.state.currentState === this.state.gameOverState) {
        let element = document.getElementsByClassName("score")[1];
        element.style.display = "block";
      }
    }
  }

  update() {
    this.frame++;
    this.frame = this.frame % 100;
    if (this.state.currentState !== this.state.runningState) {
      return;
    }

    if (this.frame === 0) {
      this.position.push({ dx: 324, dy: this.maxY * (Math.random() + 1) });
    }
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      p.dx = p.dx - this.speed;
      this.domAnimate("top-pipe", p.dx);
      this.domAnimate("bottom-pipe", p.dx);
      // console.log(p.dy,this.dHeight,this.gap);
      let BottomYPos = p.dy + this.dHeight + this.gap;
      //check Collision
      // for top
      if (
        this.bird.dx + this.bird.width > p.dx &&
        this.bird.dx < p.dx + this.dWIdth &&
        this.bird.dy < p.dy + this.dHeight
      ) {
        this.HIT_SOUND.play();
        this.state.currentState = this.state.gameOverState;
      }
      //for bottom
      if (
        this.bird.dx + this.bird.width > p.dx &&
        this.bird.dx < p.dx + this.dWIdth &&
        this.bird.dy + this.bird.height > BottomYPos
      ) {
        this.HIT_SOUND.play();
        this.state.currentState = this.state.gameOverState;
      }

      //score
      if (
        this.bird.dx > p.dx + this.dWIdth &&
        this.bird.dx <= p.dx + this.dWIdth + 2
      ) {
        this.score++;
        this.SCORE_SOUND.play();
        this.bestScore = Math.max(this.score, this.bestScore);
        localStorage.setItem("best", this.bestScore);
      }
      //display score

      if (p.dx + this.dWIdth < 0) {
        this.position.splice(i, 1);
        break;
      }
    }
  }
}
export default Pipe;
