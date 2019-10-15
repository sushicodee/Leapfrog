(function() {
  var highScore = 9999999;
  var sprite = new Image();
  spriteSrc = "./assets/images/sprite.png";
  class Game {
    constructor(width, height, id) {
      this.width = width;
      this.height = height;
      this.score = 0;
      this.id = id;
      this.state = {
        currentState: 0,
        getReadyState: 0,
        runningState: 1,
        gameOverState: 2
      };

      //sprite
      this.sprite = sprite;

      //gameState
      this.isPlaying = true;
      this.FPS = 60;
      this.FRAME_RATE = 1000 / this.FPS;

      //Initial game State

      this.createDomStart(this.width, this.height, this.id);
    }

    setState = function(state) {
      this.state.currentState = state;
    }

    domDrawSprite = function(elementName, sx, sy, dx, dy, dWidth, dHeight) {
      this.parentElement = document.getElementsByClassName(
        `game-${this.id}`
      )[0];
      this.Element = document.createElement("div");
      this.Element.setAttribute("class", elementName);
      this.parentElement.appendChild(this.Element);
      this.Element.style.width = `${dWidth}px`;
      this.Element.style.height = `${dHeight}px`;
      this.Element.style.left = `${dx}px`;
      this.Element.style.top = `${dy}px`;
      this.Element.style.position = "absolute";
      this.Element.style.backgroundImage = `url(${spriteSrc})`;
      this.Element.style.backgroundPositionX = `${sx}px`;
      this.Element.style.backgroundPositionY = `${sy}px`;
    };

    createDomStart = function(id) {
      this.parenElement = document.getElementsByClassName(
        "flappy-bird-container"
      )[0];
      this.element = document.createElement("div");
      this.parenElement.appendChild(this.element);
      this.element.setAttribute("class", `game-${this.id}`);
      this.element.setAttribute("id", id);
      this.element.style.overflow = 'hidden';
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.backgroundColor = "lightblue";
      this.element.style.border = `1px solid black`;
      this.element.style.margin = "0 auto";
      this.element.style.marginTop = "30px";
      this.element.style.position = "relative";
      this.element.addEventListener("click", e => this.handleClick(e));
      this.domDrawSprite("background-1", 0, -24, 0, 224, 276, 204);
      this.domDrawSprite("background-2", 0, -24, 276, 224, 276, 204);

      const {
        currentState,
        getReadyState,
        runningState,
        gameOverState
      } = this.state;

      this.domDrawSprite("get-ready-container", 0, 200, 76, 120, 174, 154);
      this.domDrawSprite("game-over-container", 432, 200, 50, 100, 226, 200);
      
      
      this.mainGameLoop(this.state,this.element);
    };
    handleClick = function(e) {
      let {
        currentState,
        getReadyState,
        runningState,
        gameOverState
      } = this.state;
      switch (currentState) {
        case getReadyState:
          this.setState(runningState);
          break;

        case runningState:
          this.bird.flap();
          break;

        case gameOverState:
          this.setState(getReadyState);
          break;
        default:
          break;
      }
    };

    createDomGameOver = function(id) {};

    domUpdateScore = function(element) {};

    updateGetReady = function (id){
      let element = document.getElementsByClassName('get-ready-container')[0];
      if(this.state.currentState === this.state.getReadyState){

        element.style.display = 'block';
      }
      else{
        element.style.display = 'none';
      }
    }

    updateGameOver = function (id){
      let element = document.getElementsByClassName('game-over-container')[0];
      if(this.state.currentState === this.state.gameOverState){

        element.style.display = 'block';
        element.style.zIndex = '30';

      }
      else{
        element.style.display = 'none';
      }
    }
    mainGameLoop = function(state,gameElement) {
      let foreGroundheight = 110;
      const bird = new Bird(
        "bird",
        330,
        289,
        50,
        170,
        34,
        26,
        this.id,
        this.state
      );
      this.bird = bird;
      const foreGround = new Foreground(
        "fore-ground-container",
        330,
        0,
        0,
        316,
        224,
        foreGroundheight,
        this.id,
        this.state
      );

      const gameLoop = setInterval(() => {
        this.updateGetReady();
        this.updateGameOver();
        bird.animateBird();
        bird.update(foreGroundheight);

        bird.drawFrame();
        bird.domDrawDestination();

        foreGround.animateForground();
        foreGround.drawForeground();
      }, this.FRAME_RATE);
    };

    update = function() {};

    draw = function() {};
  }

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
    };

    //bird Destination
    updateDestination = function(dy) {
      this.dy = dy;
    };

    domDrawDestination = function() {
      this.element.style.top = `${this.dy}px`;
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
      } else {
        this.speed += this.gravity;
        this.dy += this.speed;
        if (this.dy >= this.element.parentNode.clientHeight - this.element.clientHeight - fgh) {
          this.dy = this.element.parentNode.clientHeight - this.element.clientHeight - fgh;
         game.setState(gameOverState);  
         this.speed = 0;
        }
        if(this.dy <= 0){
          game.setState(gameOverState);
          this.updateDestination(0);
         this.speed = 0;

         
            
          } 
      }
    };
  }

  class Foreground {
    constructor(name, sx, sy, dx, dy, width, height, id) {
      this.sx = sx;
      this.sy = sy;
      this.dx = dx;
      this.dy = dy;
      this.dWidth = width;
      this.dHeight = height;
      this.id = id;
      this.elementName = name;
      this.frameCounter = 0;
      this.speed = 2;


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
        if(game.state.currentState === game.state.runningState){
          this.dx = (this.dx - this.speed) % (this.dWidth/2);
        }
    }

  
    drawForeground = function (){
       
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
    };
  }

  class Pipe {
    constructor(name,sx,sy,dx,dy,dWidth,dHeight,id) {
      this.sx = sx;
      this.sy = sy;
      this.dx = dx;
      this.dy = dy;
      this.dHeight = dHeight;
      this.dWIdth = dWidth;
      this.id = id;
      this.elementName = name;
      this.speed = 2;

      // Game.prototype.domDrawSprite.(this.elementName,this.sx,this.sy,this.dx,this.dy,this.dWidth,this.dHeight)



           
    }


  }

  let numberOfGames = prompt(
    "Enter the Number of concurrent games you want to play"
  );
  // let numberOfGames = 2;
  for (let i = 0; i < numberOfGames; i++) {
    // let game = `flappy-bird${i}`;
    game = new Game(324, 428, i);
  }
})();
