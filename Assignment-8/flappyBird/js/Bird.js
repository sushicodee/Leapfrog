var sprite = new Image();
var spriteSrc = "./assets/images/sprite.png";

class Bird {
    constructor(name, sx, sy, dx, dy, width, height, id, state) {
      this.sx = sx;
      this.sy = sy;
      this.dx = dx;
      this.dy = dy;
      this.width = width;
      this.height = height;
      this.id = id;
      this.frame = 0;
      this.frameCounter = 0;
      this.counterLimit = 0;
      this.elementName = name;
      //bird characteristics
      this.speed = 0;
      this.gravity = 0.25;
      this.jump = 4.6;
      this.DIE_SOUND = new Audio('./assets/audio/sfx_die.wav');
      this.flag = true;
      this.animation;
      this.rotation = 0;


      //bird State
      this.state = state;
      this.isCollided = false;
      this.domDrawSprite(
        "bird",
        this.sx,
        this.sy,
        this.dx,
        this.dy,
        this.width,
        this.height,
        this.id
      );
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
      // this.Element.zIndex = '20';
    };

    //loop
    animateBird = function() {
      const animation = [
        { sx: 330, sy: 314 },
        { sx: 330, sy: 289 },
        { sx: 330, sy: 262 },
        { sx: 330, sy: 289 }
      ];
      this.animation = animation;
      if (!this.isCollided) {
        this.counterLimit = this.state.currentState === this.state.runningState ? 5 : 10;
        this.setSpriteFrame(animation[this.frame]);
        this.frameCounter++;
        this.frameCounter =this.frameCounter % this.counterLimit == 0 ? 0 : this.frameCounter;
        this.frame += this.frameCounter % this.counterLimit == 0 ? 1 : 0;
        this.frame = this.frame % animation.length;
      }
    };

    setSpriteFrame = function(frame) {
      this.sx = frame.sx;
      this.sy = frame.sy;
    };

    drawFrame = function() {
      this.element.style.backgroundPositionX = `${this.sx}px`;
      this.element.style.backgroundPositionY = `${this.sy}px`;
    };

    flap = function() {
      this.speed = -4.6;
      this.flag = true;
    
    };

    //bird Destination
    updateDestination = function(dy) {
      this.dy = dy;
    };

    domDrawDestination = function() {
      this.element.style.top = `${this.dy}px`;
      this.element.style.transform = `rotate(${this.rotation}deg)`;
    };

    update = function(fgh) {
      let {
        currentState,
        getReadyState,
        runningState,
        gameOverState
      } = this.state;
      if (currentState === getReadyState) {
        this.dy = 170;
        this.rotation = 0;
      } else {
        this.speed += this.gravity;
        this.dy += this.speed;
        if (this.dy >= this.element.parentNode.clientHeight - this.element.clientHeight - fgh) {
          this.dy = this.element.parentNode.clientHeight - this.element.clientHeight - fgh;
        //  game.setState(gameOverState);  
        if(this.flag){
            this.DIE_SOUND.play();
            this.flag = false;
        }
        this.state.currentState = this.state.gameOverState;
        this.speed = 0;
        }
        if(this.dy <= 0){
        //   game.setState(gameOverState);

          this.state.currentState = this.state.gameOverState;

          this.updateDestination(0);
         this.speed = 0;          
        } 
      }
      if(this.speed > Math.abs(this.jump)){
        this.rotation = 90;
    }
    else{
        if(this.speed == 0 && this.state.currentState === this.state.getReadyState){
            this.rotation = 0;
        }
        else if(this.speed == 0 && this.state.currentState === this.state.gameOverState){
            this.rotation = 80;
            this.frame = 1;
        }
        else{
            this.rotation = -30;

        }
    }
    };
  }
  export default Bird;