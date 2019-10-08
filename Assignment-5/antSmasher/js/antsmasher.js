(function() {
  const randRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const randRangeforAnts = (min, max, radius) => {
    //2px border
    return Math.floor(
      Math.random() * (max - (radius + radius + 2) - min + 1 + min)
    );
  };

  const randomDirection = dirArr => {
    return dirArr[Math.floor(Math.random() * dirArr.length)];
  };
  // Game main
  class Game {
    constructor(width, height, backgroundColor, numberofAnts, antSize) {
      //Game Settings
      this.windowWidth = width;
      this.windowHeight = height;
      this.backgroundColor = backgroundColor;
      this.FPS = 1000;
      this.FRAME_RATE = 1000 / this.FPS;
      this.numberofAnts = numberofAnts;
      this.score = 0;
      this.clicks = 0;

      //ant settings
      this.ANT_SIZE = antSize;
      this.antColor = "red";

      //gameloop
      this.isplaying = true;
      this.DomCreateWindow(
        this.windowWidth,
        this.windowHeight,
        this.backgroundColor
      );
      this.createAnts(this.numberofAnts);
    }

    DomCreateWindow = function(width, height, color) {
      this.parentElem = document.getElementsByClassName(
        "antsmasher-container"
      )[0];
      this.element = document.createElement("div");
      this.parentElem.appendChild(this.element);
      this.element.setAttribute("class", "antsmasher-wrapper");
      this.element.style.width = `${width}px`;
      this.element.style.height = `${height}px`;
      this.element.style.backgroundColor = `${color}`;
      this.element.style.border = "2px solid black";
      this.element.style.position = "relative";
      this.element.addEventListener("click", e => this.handleGameScore(e));
    };

    handleGameScore = e => {
      this.clicks++;
      console.log(e);
    };

    domSmashAnt(e) {
      this.parentElem = document.getElementsByClassName(
        "antsmasher-container"
      )[0];
      this.element = document.getElementById(`${e.target.id}`);
      this.parentElem.removeChild(this.element);
    }

    resetScore = () => {
      this.score = 0;
      this.clicks = 0;
    };

    distance = (x1, y1, x2, y2) => {
      const a = x1 - x2;
      const b = y1 - y2;

      const c = Math.sqrt(a * a + b * b);
      return c;
    };
  
    maingameloop = function (antsArray) {
      
        //inititialization

        // antsArray[i].draw();
        // antsArray[i].checkifSmashed();

        //gameloop
        if (this.isplaying) {
          for (let i = 0; i< antsArray.length;  i++) {
       
          let gameloop = setInterval(() => {
            antsArray[i].move();
            antsArray[i].update(antsArray);

              if (antsArray[i].isSquashed) {
                this.score++;                             
                clearInterval(gameloop);           
              }
              
            }  
        , this.FRAME_RATE);

        if(antsArray[i].isSquashed ){
          antsArray.splice(i, 1);
          this.domSmashAnt(i);
         break;
        }  
        }
      }else {
          //gameover
          // this.maingameloop(antsArray);
        }
      }
    

    // create instances of Ants
    createAnts = function() {
      let antsArray = [];

      let hangloop = 0;
      while (antsArray.length < this.numberofAnts) {
        let randomX = randRangeforAnts(
          this.ANT_SIZE,
          this.windowWidth,
          this.ANT_SIZE
        );
        let randomY = randRangeforAnts(
          this.ANT_SIZE,
          this.windowHeight,
          this.ANT_SIZE
        );

        let ant = new Ant(this.element, randomX, randomY, this.ANT_SIZE);
        let isOverlapping = false;
        //check if overlapping else find another position
        for (let j = 0; j < antsArray.length; j++) {
          let others = antsArray[j];
          let d = this.distance(
            ant.x + ant.radius,
            ant.y + ant.radius,
            others.x + others.radius,
            others.y + others.radius
          );
          if (d < ant.radius + others.radius) {
            isOverlapping = true;
          }
        }

        if (!isOverlapping) {
          antsArray.push(ant);
        }
        hangloop++;
        if (hangloop > 10000) {
          break;
        }
      }
      for (let i = 0; i < antsArray.length; i++) {
        //set a unique id for the dom reference
        // antsArray[i].document.setAttribute('id', i);

        antsArray[i].setPosition(antsArray[i].x, antsArray[i].y);
        antsArray[i].domDrawant(this.ANT_SIZE, this.antColor, i);
        antsArray[i].setrandomdirection();
      }

      this.maingameloop(antsArray);

    
      }
  }
  // Ant childrens
  class Ant {
    constructor(parentElem, x, y, radius, color) {
      this.parentELem = parentElem;
      this.x = x;
      this.y = y;
      this.radius = radius * 0.5;
      this.diameter = 2 * this.radius;
      this.color = color;
      this.dx = 2;
      this.dy = 2;
      this.directions = ["n", "e", "s", "w", "ne", "se", "nw", "sw"];

      //ant properties
      this.antDirection = "";
      // this.antDirection = Math.random() * Math.PI * 2;
      this.isSquashed = false;
      this.squashedId = "";
      this.isColliding = false;
    }
    //dom
    domDrawant = function(diameter, antColor = "red", id) {
      this.parentElem = document.getElementsByClassName(
        "antsmasher-wrapper"
      )[0];
      this.element = document.createElement("span");
      this.parentElem.appendChild(this.element);
      this.element.setAttribute("class", "ant");
      this.element.setAttribute("id", id);
      this.element.style.position = "absolute";
      this.element.style.width = `${diameter}px`;
      this.element.style.height = `${diameter}px`;
      this.element.style.borderRadius = "50%";
      this.element.style.backgroundColor = `${antColor}`;
      this.element.addEventListener("click", e => this.smashBug(e, this.parentElem , this.element));
    };
    //dom
    draw = function() {
      this.element.style.top = this.y + "px";
      this.element.style.left = this.x + "px";
    };

    domSmashAnt = function (id, parentELem, element){
      // let parentElem = document.getElementsByClassName('antsmasher-wrapper');
      // let childtoRemove = parentElem.children[id];
      // console.log(parentELem,element)      
      // parentElem.removeChild(childtoRemove);

      // this.parentELem.removeChild(this.parentELem.children[id]);
      // this.parentELem.children[id].remove();
      // this.parentELem.removeChild(this.element);
      let elementToRemove = document.getElementById(`${id}`)
      element.parentNode.removeChild(element);  
     
      

    }

    //update position
    setPosition = function(x, y) {
      this.x = x;
      this.y = y;
    };

    // if ants cross boundary of parent div
    checkPosition = (x, y) => {
      this.x = x;
      this.y = y;
      // this.x += Math.cos(this.Antdirection) * this.dx;
      // this.y += Math.sin(this.Antdirection) * this.dy;

      let parentWidth = this.parentELem.clientWidth;
      let parentHeight = this.parentELem.clientHeight;
      if (this.x + this.radius * 2 > parentWidth) {
        switch (this.antDirection) {
          case "ne":
            this.antDirection = "nw";
            break;
          case "se":
            this.antDirection = "sw";
            break;

          default:
            this.antDirection = "w";
            break;
        }
        // this.move();
      } else if (this.x < 0) {
        switch (this.antDirection) {
          case "nw":
            this.antDirection = "ne";
            break;
          case "sw":
            this.antDirection = "se";
            break;

          default:
            this.antDirection = "e";
            break;
        }
        // this.move();
        // this.direction = Math.atan2(Math.sin(this.antDirection),Math.cos(this.antDirection) * -1)
      }
      if (this.y + this.radius * 2 > parentHeight) {
        switch (this.antDirection) {
          case "sw":
            this.antDirection = "nw";
            break;
          case "se":
            this.antDirection = "ne";
            break;

          default:
            this.antDirection = "n";
            break;
        }
        // this.move();
      } else if (this.y < 0) {
        switch (this.antDirection) {
          case "nw":
            this.antDirection = "sw";
            break;
          case "ne":
            this.antDirection = "se";
            break;

          default:
            this.antDirection = "s";
            break;
        }
        // this.move();
        // this.setPosition(this.x, parentHeight);
      }
    };

    checkCollision = (x1, y1, x2, y2) => {
      let a;
      let x;
      let y;
      let r1 = r1;
      let r2 = r2;

      a = r1 + r2;
      x = x1 - x2;
      y = y1 - y2;

      if (a > Math.sqrt(x * x + y * y)) {
        console.log("collision");
        return true;
      } else {
        return false;
      }
    };

    smashBug =( e , parentELem,element) => {
      this.isSquashed = true;
      this.squashedId = e.target.value;
      this.domSmashAnt(this.squashedId, parentELem,element);
    };

    //sets the direction of the ant
    setrandomdirection = () => {
      this.antDirection = randomDirection(this.directions);
    };

    distance = (x1, y1, x2, y2) => {
      const a = x1 - x2;
      const b = y1 - y2;

      const c = Math.sqrt(a * a + b * b);
      return c;
    };

    move = () => {
      switch (this.antDirection) {
        case "n":
          this.y = this.y - this.dy;
          this.checkPosition(this.x, this.y);
          this.draw();
          break;
        case "e":
          this.x = this.x + this.dx;
          this.checkPosition(this.x, this.y);
          this.draw();
          break;
        case "s":
          this.y = this.y + this.dy;
          this.checkPosition(this.x, this.y);
          this.draw();
          break;
        case "w":
          this.x = this.x - this.dx;
          this.checkPosition(this.x, this.y);
          this.draw();
          break;
        case "ne":
          this.x = this.x + this.dx;
          this.y = this.y - this.dy;
          this.checkPosition(this.x, this.y);
          this.draw();
          break;
        case "se":
          this.x = this.x + this.dx;
          this.y = this.y + this.dy;
          this.checkPosition(this.x, this.y);
          this.draw();
          break;
        case "sw":
          this.x = this.x - this.dx;
          this.y = this.y + this.dy;
          this.checkPosition(this.x, this.y);
          this.draw();
          break;
        case "nw":
          this.x = this.x - this.dx;
          this.y = this.y - this.dy;
          this.checkPosition(this.x, this.y);
          this.draw();
          break;
        default:
          break;
      }
    };

    update = antsArray => {
      this.antsArray = antsArray;

      for (let i = 0; i < this.antsArray.length; i++) {
        //check if colliding if true change direction respectively
        for (let j = 0; j < this.antsArray.length; j++) {
          let others = this.antsArray[j];
          this.isColliding = false;
          others.isColliding = false;

          let d = this.distance(
            this.x + this.radius,
            this.y + this.radius,
            others.x + others.radius,
            others.y + others.radius
          );
          if (d < this.radius + others.radius) {
            this.isColliding = true;
            others.isColliding = true;
            if (this.isColliding && others.isColliding && i != j && !this.isSquashed && !others.isSquashed) {
              switch (this.antDirection) {
                case "n":
                    if (others.antDirection === "n") {
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                  else if (others.antDirection === "se") {
                    this.antDirection = "ne";
                    others.antDirection = "sw";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "s") {
                    this.antDirection = "s";
                    others.antDirection = "n";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "sw") {
                    this.antDirection = 's';
                    others.antDirection = "nw";
                    this.isColliding = false;
                    others.isColliding = false;
                  }

                  else if (others.antDirection === "e") {
                    this.antDirection = 'ne';
                    others.antDirection = "w";
                    this.isColliding = false;
                    others.isColliding = false;
                  }

                  else if (others.antDirection === "w") {
                    this.antDirection = 'ne';
                    others.antDirection = "e";
                    this.isColliding = false;
                    others.isColliding = false;
                  }

                  else if (others.antDirection === "ne") {
                    this.antDirection = 'ne';
                    others.antDirection = "nw";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  //  (others.antDirection === "nw")
                  else
                  {
                    this.antDirection = 'nw';
                    others.antDirection = "n";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  break;

                  case 'ne' : 
                  if (others.antDirection === "ne") {
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "s") {
                    this.antDirection = "se";
                    others.antDirection = "e";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "sw") {
                    this.antDirection = "sw";
                    others.antDirection = "ne";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "w") {
                    this.antDirection = 'nw';
                    others.antDirection = "e";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "e") {
                    this.antDirection = 'e';
                    others.antDirection = "ne";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "w") {
                    this.antDirection = 'nw';
                    others.antDirection = "e";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "nw") {
                    this.antDirection = 'nw';
                    others.antDirection = "ne";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if(others.antDirection === "se") {
                    this.antDirection = 'se';
                    others.antDirection = "ne";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  break;


                case "s":
                    if (others.antDirection === "s") {
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                  else if (others.antDirection === "ne") {
                    this.antDirection = "se";
                    others.antDirection = "sw";
                    this.isColliding = false;
                    others.isColliding = false;

                  }
                  else if (others.antDirection === "nw") {
                        this.antDirection = "w";
                        others.antDirection = "sw";
                        this.isColliding = false;
                        others.isColliding = false;
                  }
                  else if (others.antDirection === "n") {
                    this.antDirection = "n";
                    others.antDirection = "s";
                    this.isColliding = false;
                    others.isColliding = false;

                  }
                  else if (others.antDirection === "w") {
                    this.antDirection = "sw";
                    //exp
                    others.antDirection = "s";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "e") {
                    this.antDirection = "se";
                    others.antDirection = "w";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "se") {
                    this.antDirection = "sw";
                    others.antDirection = "sw";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  
                  else if (others.antDirection === "sw") {
                    this.antDirection = "sw";
                    others.antDirection = "nw";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  break;

                  case 'sw' : 
                  if (others.antDirection === "sw") {
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "se") {
                    this.antDirection = 'se';
                    others.antDirection = 'sw';
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "s") {
                    this.antDirection = 's';
                    others.antDirection = "sw";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "e") {
                    this.antDirection = "se";
                    others.antDirection = "s";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "ne") {
                    this.antDirection = "ne";
                    others.antDirection = "sw";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "n") {
                    this.antDirection = 'nw';
                    others.antDirection = "w";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "e") {
                    this.antDirection = 'ne';
                    others.antDirection = "w";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "w") {
                    this.antDirection = 'w';
                    others.antDirection = "nw";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  
                  else if (others.antDirection === "nw") {
                    this.antDirection = 'nw';
                    others.antDirection = "sw";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  break;

                  case 'se' : 
                  if (others.antDirection === "se") {
                    this.isColliding = false;
                    others.isColliding = false;
                  }

                  else if (others.antDirection === "e") {
                    this.antDirection = 'e';
                    others.antDirection = "se";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "sw") {
                    this.antDirection = "sw";
                    others.antDirection = "se";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "w") {
                    this.antDirection = "sw";
                    others.antDirection = "e";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "nw") {
                    this.antDirection = 'nw';
                    others.antDirection = "se";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "n") {
                    this.antDirection = "ne";
                    others.antDirection = "s";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "s") {
                    this.antDirection = 's';
                    others.antDirection = "se";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                    else if (others.antDirection === "ne") {
                    this.antDirection = 'ne';
                    others.antDirection = "se";
                    this.isColliding = false;
                    others.isColliding = false;
                  }

                  break;


                case "e":
                    if (others.antDirection === "e") {
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                  else if (others.antDirection === "sw") {
                    this.antDirection = "s";
                    others.antDirection = "se";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "se") {
                    this.antDirection = 'se';
                    others.antDirection = "e";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "w") {
                    this.antDirection = "w";
                    others.antDirection = "e";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "nw") {
                    this.antDirection = "n";
                    others.antDirection = "ne";
                    this.isColliding = false;
                    others.isColliding = false;
                  }

                  else if (others.antDirection === "ne") {
                    this.antDirection = "ne";
                    others.antDirection = "e";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if (others.antDirection === "n") {
                    this.antDirection = "ne";
                    others.antDirection = "s";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  else if(others.antDirection === "s") {
                    this.antDirection = "se";
                    others.antDirection = "n";
                    this.isColliding = false;
                    others.isColliding = false;
                  }
                  break;
                  
                case "w":
                    if (others.antDirection === "w") {
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "se") {
                      this.antDirection = "s";
                      others.antDirection = "sw";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "sw") {
                      this.antDirection = "sw";
                      others.antDirection = "w";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "e") {
                      this.antDirection = "e";
                      others.antDirection = "w";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "ne") {
                      this.antDirection = "n";
                      others.antDirection = "nw";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "nw") {
                      this.antDirection = "nw";
                      others.antDirection = "w";
                      this.isColliding = false;
                      others.isColliding = false;
                    }

                      else if (others.antDirection === "n") {
                      this.antDirection = "nw";
                      others.antDirection = "s";
                      this.isColliding = false;
                      others.isColliding = false;
                    }

                    else if (others.antDirection === "s") {
                      this.antDirection = "sw";
                      others.antDirection = "n";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    break;

                    case 'nw' : 
                    if (others.antDirection === "nw") {
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "s") {
                      this.antDirection = "sw";
                      others.antDirection = "w";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "se") {
                      this.antDirection = "se";
                      others.antDirection = "nw";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "sw") {
                      this.antDirection = "sw";
                      others.antDirection = "nw";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "e") {
                      this.antDirection = 'ne';
                      others.antDirection = "n";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "n") {
                      this.antDirection = 'n';
                      others.antDirection = "nw";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    else if (others.antDirection === "ne") {
                      this.antDirection = "ne";
                      others.antDirection = "nw";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                   else if (others.antDirection === "w") {
                      this.antDirection = 'w';
                      others.antDirection = "e";
                      this.isColliding = false;
                      others.isColliding = false;
                    }
                    break;
                

                default:
                  break;
                

             
              }
            }
          }
        }
      }
    };
  }

  //height,width,color,noOfAnts,antSize
  game1 = new Game(1024, 768, "lightblue", 20,50);
  // game2 = new Game(300,300,'green',10,20);
})();
