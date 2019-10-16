    import Car from './car/Car.js' 
    import Lane from './lane/Lane.js';
    const randRange = (min, max) => {
      return Math.ceil(Math.random() * (max - min) + min);
    };

 
    class Game {
    constructor(width, height, id) {
      this.width = width;
      this.height = height;
      this.score = 0;
      this.id = id;
      this.state = {
        currentState: 1,    
        getReadyState: 0,
        runningState: 1,
        gameOverState: 2
      };

      //sprite oppo speed
      this.speed = 5
      this.counter = 0;
      this.oppoCounterLimit = 500

      //gameState
      this.isPlaying = true;
      this.FPS = 60;
      this.FRAME_RATE = 1000 / this.FPS;
      this.spawnCounter = 0;
      this.counterLimit = 150;

      this.bullets = [];

      this.createDomStart();

      this.mainGameLoop();

    }


    
    setState = function(state) {
      this.state.currentState = state;
    }
    domDrawGetReady(){
      let parentElement = document.getElementsByClassName(
        `game-${this.id}`
      )[0];
      let Element = document.createElement("div");
      Element.setAttribute("class", 'get-ready');
      parentElement.appendChild(Element);
      Element.style.backgroundColor = 'black';

      Element.style.width = `${this.width/4}px`;
      Element.style.height = `${this.height}px`;
      Element.style.left = `${0}px`;
      Element.style.top = `${0}px`;
      Element.style.position = "absolute";
      Element.style.zIndex = 20;
      Element.style.color ='white';
      let getReady = document.createElement('div');
      Element.appendChild(getReady);
      getReady.style.height =  `${this.height/2}px`;
      getReady.style.width = `${this.width}px`;
      getReady.innerHTML = 'Press A to go left and D to go Right';
      getReady.style.color = 'green';
      let start = document.createElement('button');
      Element.appendChild(start);
      start.style.height =  `${30}px`;
      start.style.width = `${50}px`;
      start.innerHTML = 'Restart';
      start.style.color = `black`;
      start.style.backgroundColor = `white`;
      start.addEventListener('click' , (e) => {
        this.state.currentState = this.state.runningState;
        document.location.reload();

      })
    }

    domDrawScore(){
      this.parentElement = document.getElementsByClassName(
        `game-${this.id}`
      )[0];
      this.Element = document.createElement("p");
      this.Element.setAttribute("class", 'score');
      this.parentElement.appendChild(this.Element);
      this.Element.style.width = `${30}px`;
      this.Element.style.height = `${20}px`;
      this.Element.style.left = `${this.width/2 - 15}px`;
      this.Element.style.top = `${0}px`;
      this.Element.style.position = "absolute";
      this.Element.innerHTML= `Score:${this.score}`;
      this.Element.style.zIndex = 20;
      this.Element.style.color ='white';
    }

    drawScore(){
      let element = document.getElementsByClassName('score')[0];
      element.innerHTML= `Score:${this.score}`;

    }
    updateGetReady = function (id){
      let element = document.getElementsByClassName('get-ready')[0];
      if(this.state.currentState === this.state.getReadyState){

        element.style.display = 'block';
      }
      else{
        element.style.display = 'none';
      }
    }

    updateGameOver = function (id){
      let element = document.getElementsByClassName('game-over')[0];
      if(this.state.currentState === this.state.gameOverState){

        element.style.display = 'block';
        element.style.zIndex = '30';

      }
      else{
        element.style.display = 'none';
      }
    }
    increaseSpeed = function(){
        this.counter++;
        this.counter =this.counter % this.oppoCounterLimit == 0 ? 0 : this.counter;
        if(this.counter === 0){
          this.speed = this.speed === 15? 15:this.speed + 5;
        }
      }
    

   mainGameLoop = function(){

     

       let player = new Car('player',-30,-10, this.width/2 - 20,this.height - 100,40,84,this.id,this.state,undefined,undefined,undefined,this.bullets);
       let lane = new Lane('lane', 0,0,this.width/2 - 512/2,-this.height,this.width/2,396,this.id,this.state);
       if(this.state.currentState === this.state.runningState){

         player.domDrawSprite();
         this.domDrawScore();
         player.updatePosition();
       }
    
       this.domDrawGetReady();


       //craete opponents
       
       let opponents = [];
       
       const {
        currentState,
        getReadyState,
        runningState,
        gameOverState
      } = this.state;
      if(currentState === getReadyState){
        // this.updateGetReady();
        
      }
      if(currentState === gameOverState){
        
      }
       const gameLoop = setInterval(() => {
           


            this.increaseSpeed();
            if(currentState === runningState){
              player.drawPosition();
              this.spawnCounter++;
              this.spawnCounter =this.spawnCounter % this.counterLimit == 0 ? 0 : this.spawnCounter;
              if(this.spawnCounter === 0){
  
                for (let i =0; i<2; i++){
                  let randomCar = randRange(0,7);
                  let oppo = new Car('opponent', -30,-10, 300,-84,40,84,this.id,this.state,i,randomCar,this.speed);
                  oppo.domDrawOppoSprite();
                  opponents.push(oppo);
                }
              }
              console.log(this.bullets);
              for(let i =0;i< this.bullets.length; i++){
                this.bullets[i].shootBullet();
                this.bullets[i].domDraw();
              }
             
              for(let i = 0; i< opponents.length; i ++){
                opponents[i].updateSpeed(this.speed);
                opponents[i].oppoSpawnPosition()
                opponents[i].domDrawOpponent();
                opponents[i].animateOppo();
                opponents[i].oppoCheckPosition();
                player.checkCollision(player,opponents[i]);

                if(player.isCollided){
                  this.setState(gameOverState);
                  clearInterval(gameLoop);
                  this.mainGameLoop();
                  
                }
                if (opponents[i].isOutOfBound) {
                  this.score+= opponents[i].scorePoint;
                  this.drawScore();
                  opponents[i].domRemoveOpponent();
                  opponents.splice(i, 1);
                  break;
                }
                
              } 
              //  remove extra spawn
                  //  opponents[0].checkCollision(opponents[0],opponents[1]);
                  //  if(opponents[0].isCollided === true){
                  //    opponents[1].domRemoveOpponent();
                  //   opponents.splice(1,1);
                  //   opponents[0].isCollided = false;
                  //   opponents[1].isCollided = false; 
                  // }
  
             
              //lane
                
                lane.updateLane();
                lane.drawLane();
            }
                     

            
       },this.FRAME_RATE)
       
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
        this.Element.style.backgroundImage = `url(${this.spriteSrc})`;
        this.Element.style.backgroundPositionX = `${sx}px`;
        this.Element.style.backgroundPositionY = `${sy}px`;
      };
  

    createDomStart = function() {
      this.parenElement = document.getElementsByClassName(
        "car-bullet-container"
      )[0];
      this.element = document.createElement("div");
      this.parenElement.appendChild(this.element);
      this.element.setAttribute("class", `game-${this.id}`);
      this.element.setAttribute("id", this.id);
      this.element.style.overflow = "hidden";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.backgroundColor = '#ca8d42';
      this.element.style.border = `1px solid black`;
      this.element.style.margin = "0 auto";
      this.element.style.marginTop = "30px";
      this.element.style.position = "relative";

     
    };
  }



  let numberOfGames = 1
  for (let i = 0; i < numberOfGames; i++) {
    let game = new Game(1024, 396, i);
  }

