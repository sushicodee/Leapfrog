
import Ball from './Ball.js';

class Helix {
    constructor(width,height,backgroundColor,numberOfBalls){
        this.FPS = 60;
        this.FRAME_RATE = 1000 / this.FPS;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.numberOfBalls = numberOfBalls;
        this.ballsTop = [];
        this.ballsBottom = [];

        this.ballGap = 10;
        this.element;
        this.amplitude = 20;
        this.waveLength = 0.001;
        this.createDomStart();
        this.mainLoop();
    }

    createDomStart = function() {
        this.parenElement = document.getElementsByClassName(
          "helix-container"
        )[0];
        this.element = document.createElement("div");
        this.parenElement.appendChild(this.element);
        this.element.setAttribute("class", `helix-inner-container`);
        this.element.style.overflow = 'hidden';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.backgroundColor = this.backgroundColor;
        this.element.style.border = `1px solid black`;
        this.element.style.margin = "0 auto";
        this.element.style.marginTop = "30px";
        this.element.style.position = "relative";
    }

    mainLoop = function(){

        //create balls and draw them
        for(let i = 0; i<this.numberOfBalls;i++){
            let ball = new Ball(this.element, i * this.ballGap - 50, this.height/2 + Math.sin(i) * this.amplitude , 5, 'white',i);
            ball.domDrawBall();
            this.ballsTop.push(ball);
        }
        for(let i = 0; i<this.numberOfBalls;i++){
            let ball = new Ball(this.element, i * this.ballGap ,this.height/2 + Math.cos(i) * this.amplitude , 5, 'red',i);
            ball.domDrawBall();
            this.ballsBottom.push(ball);
        }
        const loop = setInterval(() => {
            for(let i = 0; i< this.numberOfBalls; i++){
                this.ballsTop[i].animateBall('top',this.height,this.amplitude,i);
                this.ballsBottom[i].animateBall('bottom',this.height,this.amplitude,i);
            }

            
        },this.FRAME_RATE)

    }

}
export default Helix;