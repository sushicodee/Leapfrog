class Ball {
    constructor(parentElem, x, y, radius, color, id) {
      this.parentElem = parentElem;
      this.id = id;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.diameter = 2 * radius;
      this.color = color;
      this.element;
      this.counter = 0.1;
      this.frequency = 1;
      console.log(color);
    }

    domDrawBall = function() {
      this.element = document.createElement("span");
      this.parentElem.appendChild(this.element);
      this.element.setAttribute("class", "Ball");
      this.element.setAttribute("id", this.id);
      this.element.style.position = "absolute";
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      this.element.style.width = `${this.diameter}px`;
      this.element.style.height = `${this.diameter}px`;
      this.element.style.backgroundImage = `url('./assets/images/moving.gif')`;
      this.element.style.backgroundSize = "contain";
      this.element.style.backgroundRepeat = "round";
      this.element.style.borderRadius = "50%";
      this.element.style.backgroundColor = `${this.color}`;
     
    };
    draw = function() {
      this.element.style.top = this.y + "px";
      this.element.style.left = this.x + "px";
    };

    setPosition = function(y) {
        this.y = y;
    };

    drawPositionChange(){
        this.element.style.top = this.y + "px";
    }

    scaleBalls = function(position,i){
        if(position == 'top'){
                this.element.style.transform = `scale(${Math.cos(i+1 * this.counter)})`;
            }else{
                if(position == 'bottom'){
                    this.element.style.transform = `scale(${Math.sin(i+1 * this.counter)})`;
                }

            }
    }

    animateBall(position,height,amplitude,i){
        
        // switch(this.counter){
        //     case 0 : this.counter = this.counter + 0.01;
        //         break;
        //     case 1 : this.counter = this.counter - 0.01;
        //         break;
        //     default :break;    
        // }
        this.counter = this.counter + 0.01;
        // this.counter = this.counter % 1 === 0? this.counter - 0.01: this.counter +0.01;
        if(position == 'top'){           
            let y = height/2 + Math.sin(i + 1 * this.frequency * this.counter) * amplitude;
            this.setPosition(y);
        this.drawPositionChange();
        this.scaleBalls(position,i);
        // this.element.style.transform = `scale(${Math.cos(i+1 *this.counter)})`;
        }
        else{
            if(position == 'bottom'){              
                let y = height/2 + Math.cos(i + 1 * this.frequency * this.counter) * amplitude;
                this.setPosition(y);
                this.drawPositionChange();
                this.scaleBalls(position,i);

                // this.element.style.transform = `scale(${Math.sin(i+1 *this.counter)})`;
            }
            
        }
        
    }
}
export default Ball;
   
