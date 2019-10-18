import Ball from "./Ball.js";

class Helix {
  constructor(width, height, backgroundColor, numberOfBalls) {
    this.FPS = 60;
    this.FRAME_RATE = 1000 / this.FPS;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.numberOfBalls = numberOfBalls;
    this.ballsTop = [];
    this.ballsBottom = [];
    this.ballRadius = 5;
    this.ballGap = 10;
    this.element;
    this.amplitude = 40;
    this.waveLength = 0.001;
    this.createDomStart();
    this.mainLoop();
  }

  createDomStart = function() {
    this.parenElement = document.getElementsByClassName("helix-container")[0];
    this.element = document.createElement("div");
    this.parenElement.appendChild(this.element);
    this.element.setAttribute("class", `helix-inner-container`);
    this.element.style.overflow = "hidden";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = this.backgroundColor;
    this.element.style.border = `1px solid black`;
    this.element.style.margin = "0 auto";
    this.element.style.marginTop = "30px";
    this.element.style.position = "relative";
  };

  mainLoop = function() {
    //create balls and draw them
    for (let i = 0; i < this.numberOfBalls; i++) {
      let ball = new Ball(
        this.element,
        i * this.ballGap - 40,
        this.height / 2 + Math.sin(i) * this.amplitude,
        this.ballRadius,
        "red",
        i
      );
      let ball1 = new Ball(
        this.element,
        i * this.ballGap - 40,
        this.height / 2 - this.ballGap + Math.sin(i) * this.amplitude,
        this.ballRadius,
        "red",
        i
      );
      let ball2 = new Ball(
        this.element,
        i * this.ballGap - 40,
        this.height / 2 - this.ballGap * 2 + Math.sin(i) * this.amplitude,
        this.ballRadius,
        "red",
        i
      );
      let ball3 = new Ball(
        this.element,
        i * this.ballGap - 40,
        this.height / 2 - this.ballGap * 3 + Math.sin(i) * this.amplitude,
        this.ballRadius,
        "red",
        i
      );
      ball.domDrawBall();
      ball1.domDrawBall();
      ball2.domDrawBall();
      ball3.domDrawBall();

      this.ballsTop.push(ball);
      this.ballsTop.push(ball1);
      this.ballsTop.push(ball2);
      this.ballsTop.push(ball3);
    }
    for (let i = 0; i < this.numberOfBalls; i++) {
      let ball = new Ball(
        this.element,
        i * this.ballGap,
        this.height / 2 + Math.cos(i) * this.amplitude,
        5,
        "white",
        i
      );
      let ball1 = new Ball(
        this.element,
        i * this.ballGap,
        this.height / 2 - this.ballGap + Math.cos(i) * this.amplitude,
        this.ballRadius,
        "white",
        i
      );
      let ball2 = new Ball(
        this.element,
        i * this.ballGap,
        this.height / 2 - this.ballGap * 2 + Math.cos(i) * this.amplitude,
        this.ballRadius,
        "white",
        i
      );
      let ball3 = new Ball(
        this.element,
        i * this.ballGap,
        this.height / 2 - this.ballGap * 3 + Math.cos(i) * this.amplitude,
        this.ballRadius,
        "white",
        i
      );
      ball.domDrawBall();
      ball1.domDrawBall();
      ball2.domDrawBall();
      ball3.domDrawBall();

      this.ballsBottom.push(ball);
      this.ballsBottom.push(ball1);
      this.ballsBottom.push(ball2);
      this.ballsBottom.push(ball3);
    }
    const loop = setInterval(() => {
      for (let i = 0; i < this.numberOfBalls * 4; i++) {
        for (let j = 1; j <= 4; j++) {
          this.ballsTop[i].animateBall(
            "top",
            this.height,
            this.amplitude,
            i,
            j
          );
          this.ballsBottom[i].animateBall(
            "bottom",
            this.height,
            this.amplitude,
            i,
            j
          );
        }
      }
    }, this.FRAME_RATE);
  };
}
export default Helix;
