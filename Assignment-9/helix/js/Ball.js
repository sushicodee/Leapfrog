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
  
  setPosition = function(y) {
    this.y = y;
  };

  drawPositionChange() {
    this.element.style.top = this.y + "px";
  }

  scaleBalls = function(position, i,j) {
    if(position == 'bottom'){
    let change = Math.cos(i + 1 * this.counter - j / 4);
    let change1 = Math.sin(i + 1 * this.counter- j / 4);
    change = (change > 0) ? change : change1/4;    
    this.element.style.zIndex = (change > 0) ? 10:0; 
    this.element.style.transform = `scale(${change})`;
    }
    let change = Math.sin(i + 1 * this.counter - j / 4);
    let change1 = Math.cos(i + 1 * this.counter- j / 4);
    if(position == 'top'){
    change = (change > 0) ? change : change1/4;    
    this.element.style.zIndex = (change > 0) ? 10:0; 
    this.element.style.transform = `scale(${change})`;

    }
   
  };

  animateBall(position, height, amplitude, i,j) {
  
    this.counter = this.counter + 0.01;
    if(this.counter == 1){
        this.counter = 0;
    }
    if (position == "top") {
    //   let y =  height / 2 + Math.sin(this.y * this.counter) * amplitude  ;
    let y =  
        height / 2 -this.diameter * j  +
        Math.sin(i + 1 * this.frequency * this.counter) * amplitude;

        
      this.setPosition(y);
      this.drawPositionChange();
      this.scaleBalls(position, i,j);
      // this.element.style.transform = `scale(${Math.cos(i+1 *this.counter - j/4)})`;
    } else {
      if (position == "bottom") {
        // let y = this.y + Math.cos( i + 1  * this.counter ) 
        let y =
          height / 2  -this.diameter * j+
          Math.cos(i + 1 * this.frequency * this.counter) * amplitude;
        this.setPosition(y);
        this.drawPositionChange();
        this.scaleBalls(position, i,j);

        // this.element.style.transform = `scale(${Math.sin(i+1 *this.counter - j/4)})`;
      }
    }
  }
}
export default Ball;
