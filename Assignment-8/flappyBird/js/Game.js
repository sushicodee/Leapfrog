import Bird from './Bird.js';
import Foreground from './Foreground.js';
import Pipe from './Pipe.js';
var sprite = new Image();
var spriteSrc = "./assets/images/sprite.png";

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

    this.SCORE_SOUND = new Audio('./assets/audio/sfx_point.wav');
    this.FLAP_SOUND = new Audio('./assets/audio/sfx_flap.wav');
    this.HIT_SOUND = new Audio('./assets/audio/sfx_hit.wav');
    this.DIE_SOUND = new Audio('./assets/audio/sfx_die.wav');
    this.SWOOSHING_SOUND = new Audio('./assets/audio/sfx_swooshing.wav');





    //sprite
    this.sprite = sprite;

    //gameState
    this.isPlaying = true;
    this.FPS = 60;
    this.FRAME_RATE = 1000 / this.FPS;

    //
    this.pipes;

    //Initial game State
    this.bird;
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
        this.SWOOSHING_SOUND.play();
        this.setState(runningState);
        break;

      case runningState:
        this.bird.flap();
        this.FLAP_SOUND.play()
        break;

      case gameOverState:
        this.setState(getReadyState);
        this.pipes.resetGame();
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
    const pipes = new Pipe(300,0,53,400,this.id,this.state,this.bird);
    this.pipes= pipes;
    const gameLoop = setInterval(() => {
      this.updateGetReady();
      this.updateGameOver();
      bird.animateBird();
      bird.update(foreGroundheight);

      pipes.update();
      pipes.domUpdateScore();
      pipes.draw();
      bird.drawFrame();
      bird.domDrawDestination();

      foreGround.animateForground();
      foreGround.drawForeground();
    }, this.FRAME_RATE);
  };

  update = function() {};

  draw = function() {};
}
export default Game;