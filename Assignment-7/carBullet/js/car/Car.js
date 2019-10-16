import Bullet from '../bullet/Bullet.js'; 

const randRange = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};
 class Car {
    constructor(elementName,sx,sy,dx,dy,dWidth,dHeight,id,state,carId,randomCar,speed,bulletsArray){
        this.elementName = elementName;
        this.state = state;
        this.dx = dx;
        this.dy = dy;
        this.sx = sx;
        this.sy = sy;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.id = id
        //car
        this.scorePoint = 10;
        this.movement = 90;
        this.isKeyDown = false;
        this.element = document.getElementsByClassName(`${elementName}`)[0];
        this.speed = speed;
        this.spriteSrc = './assets/images/carSprites/Audi.png';

        //bullet
        this.bullets = 10;
        this.bulletId = 0;
        this.bullets = bulletsArray;
      
        //opponent
        this.carId = carId;
        this.counter=0;
        this.counterLimit = 500

        //lane to choose from if 1 in value choose the lane key is the position from 3 [0,1,2]
        this.carIndex = [{0:0,1:0,2:1},{0:0,1:1,2:0},{0:0,1:1,2:1},{0:1,1:0,2:0},{0:1,1:0,2:1},{0:1,1:1,2:0}]
        this.spawnIndex = randRange(0,this.carIndex.length -1);
        this.spawnCount;
        this.carPositions = [402,492,582];
        this.randomCar = randomCar;
        this.oppoSpriteSrc = `./assets/images/carSprites/${this.randomCar}.png`;
        this.isOutOfBound = false;
        this.isCollided = false;

    }

      updateSpeed(speed){
        this.speed = speed;
      }

    
      domDrawSprite = function() {
          this.parentElement = document.getElementsByClassName(
          `game-${this.id}`
          )[0];
          this.element = document.createElement("div");
          this.element.setAttribute("class", this.elementName);
          this.element.setAttribute('id',this.carId);
          this.parentElement.appendChild(this.element);
          this.element.style.width = `${this.dWidth}px`;
          this.element.style.height = `${this.dHeight}px`;
          this.element.style.left = `${this.dx}px`;
          this.element.style.top = `${this.dy}px`;
          this.element.style.position = "absolute";
          this.element.style.backgroundImage = `url(${this.spriteSrc})`;
          this.element.style.backgroundPositionX = `${this.sx}px`;
          this.element.style.backgroundPositionY = `${this.sy}px`;
          this.element.style.backgroundSize = `${100}px`;
          this.element.style.backgroundRepeat = 'no-repeat';
          this.element.style.transition = '.3s ease';
          this.element.style.zIndex = '10';
          
         
      };

    

      domDrawOppoSprite = function() {
          this.parentElement = document.getElementsByClassName(
          `game-${this.id}`
          )[0];
          this.element = document.createElement("div");
          this.element.setAttribute("class", this.elementName);
          this.element.setAttribute('id',this.carId);
          this.parentElement.appendChild(this.element);
          this.element.style.width = `${this.dWidth}px`;
          this.element.style.height = `${this.dHeight}px`;
          this.element.style.left = `${this.dx}px`;
          this.element.style.top = `${this.dy}px`;
          this.element.style.position = "absolute";
          this.element.style.backgroundImage = `url(${this.oppoSpriteSrc})`;
          this.element.style.backgroundPositionX = `${this.sx}px`;
          this.element.style.backgroundPositionY = `${this.sy}px`;
          this.element.style.backgroundSize = `${100}px`;
          this.element.style.backgroundRepeat = 'no-repeat';
          this.element.style.zIndex = '10';
          this.element.style.transform = `rotate(${180}deg)`;      
          
         
      };
      

     

      checkCollision(rect1,rect2){
        if (rect1.dx < rect2.dx + rect2.dWidth &&
          rect1.dx + rect1.dWidth > rect2.dx &&
          rect1.dy < rect2.dy + rect2.dHeight &&
          rect1.dy + rect1.dHeight > rect2.dy) {
            this.isCollided = true;
         }
      }

      oppoSpawnPosition(){
        let dx;
        let key;
        let chosenLane = this.carIndex[this.spawnIndex];
        for(let i = 0; i< 3; i++){
          if(chosenLane[i] === 1){
            key = i;
          }
          if(key === 0 || key === 1 || key === 3){
            this.spawnCount = 1;
          }
          else{
            this.spawnCount = 2;
          }
        }
          
        dx = this.carPositions[key];
        this.oppoSetPosition(dx);
        return this.spawnCount;
      }

      

      oppoCheckPosition(){
        if(this.dy > this.element.parentNode.clientHeight){
         this.isOutOfBound = true;
      }
    }

      oppoSetPosition(dx){
        this.dx = dx;
      }

      animateOppo(){
        this.dy+=this.speed;
      }

    

      domDrawOpponent(){
        this.element.style.left = `${this.dx}px`;
        this.element.style.top = `${this.dy}px`;
      }

      domRemoveOpponent() {
        this.element.parentNode.removeChild(this.element);
      }
    
       //dom
        drawPosition = function() {
            this.element.style.left = `${this.dx}px`;
            this.element.style.top = `${this.dy}px`; 
        }
      //js

      updatePosition(){
        const bullets = [];
        document.addEventListener('keydown', e => this.handleKeyPress(e,bullets));
        document.addEventListener('keyup', e => this.handleKeyUp(e));
      }

      handleKeyPress = function(e,bullets){
          if(!this.isKeyDown){
              this.isKeyDown = true;
              switch(e.keyCode){
                  //left
                  case 65:
                    //check if leftMost
                    if(this.dx - this.movement < 400){
                      break;
                    }else{

                      this.dx-=this.movement ; 
                    }
                  break;
                  // //up
                  // case 87:this.dy-= this.movement;
                  //        break;
    
                   //right 
                  case 68 :
                      if(this.dx - this.movement > 410){
                        break;
                      }else{
                        this.dx+=this.movement;
                       break;
                      }  
                   //down 
                  // case 83:this.dy+= this.movement;
                  //        break;
                  //shoot
                  case 32: //create and shoot bullet
                          
                          let bullet = new Bullet('bullet',0,0,this.dx + 15,this.dy,10,10,this.id,this.bulletId);
                          this.bulletId++;
                          bullet.domDrawBulletSprite();
                          bullet.domDraw();

                          this.bullets.push(bullet);
                          // for(let i = 0; i< bullets.length; i++){
                          //   console.log('draw')
                          //   bullets[i].domDrawBulletSprite(i);
                          // }
                          
                           break;
          }
          }
      }
      handleKeyUp = function(e){
        this.isKeyDown = !this.isKeyDown;   
      }

}
export default Car;