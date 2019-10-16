var sprite = new Image();
var spriteSrc = "./assets/images/sprite.png";
class Foreground {
    constructor(elementName,sx,sy,dx,dy,width,height, id, state) {
      this.sx = sx;
      this.sy = sy;
      this.dx = dx;
      this.dy = dy;
      this.dWidth = width;
      this.dHeight = height;
      this.id = id;
      this.frameCounter = 0;
      this.speed = 2;
      this.state = state;
      this.elementName = elementName


      this.domDrawSprite(
        this.elementName,
        this.sx,
        this.sy,
        this.dx,
        this.dy,
        this.dWidth,
        this.dHeight
      );
      this.domDrawSprite(
        this.elementName,
        this.sx,
        this.sy,
        this.dx + this.dWidth,
        this.dy,
        this.dWidth,
        this.dHeight
      );
    }

    animateForground = function () {
        if(this.state.currentState === this.state.runningState){
          this.dx = (this.dx - this.speed) % (this.dWidth/2);
        }
    }

  
    drawForeground = function (){
       let element0 = document.getElementsByClassName(this.elementName)[0];
       element0.style.left = `${this.dx}px`;
       let element1 = document.getElementsByClassName(this.elementName)[1];
       element1.style.left = `${this.dx + this.dWidth}px`;
       

    }

    domDrawSprite = function(elementName, sx, sy, dx, dy, dWidth, dHeight) {
      this.parentElement = document.getElementsByClassName(
        `game-${this.id}`
      )[0];
      this.element = document.createElement("div");
      this.element.setAttribute("class", elementName);
      this.parentElement.appendChild(this.element);
      this.element.style.width = `${dWidth}px`;
      this.element.style.height = `${dHeight}px`;
      this.element.style.left = `${dx}px`;
      this.element.style.top = `${dy}px`;
      this.element.style.position = "absolute";
      this.element.style.backgroundImage = `url(${spriteSrc})`;
      this.element.style.backgroundPositionX = `${sx}px`;
      this.element.style.backgroundPositionY = `${sy}px`;
      this.element.style.zIndex = '10';

    };
  }
  export default Foreground;