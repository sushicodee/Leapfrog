class Lane {
  constructor(elementName, sx, sy, dx, dy, dWidth, dHeight, id,state) {
    this.id = id;
    this.state = state;
    this.sx = sx;
    this.sy = sy;
    this.dx = dx;
    this.dy = dy;
    this.dWidth = dWidth;
    this.dHeight = dHeight;
    this.elementName = elementName;
    this.spriteSrc = './assets/images/roadSprites/lane.png';
    this.laneSpeed = 2;
    this.domDrawSprite(this.dy);
    this.domDrawSprite(this.dy + this.dHeight);
    this.counter = 0;
    this.counterLimit = 500;
      

  }

  domDrawSprite(dy) {
    this.parentElement = document.getElementsByClassName(`game-${this.id}`)[0];
    this.element = document.createElement("div");
    this.element.setAttribute("class", this.elementName);
    this.parentElement.appendChild(this.element);
    this.element.style.width = `${this.dWidth}px`;
    this.element.style.height = `${this.dHeight}px`;
    this.element.style.left = `${this.dx}px`;
    this.element.style.top = `${dy}px`;
    this.element.style.position = "absolute";
    this.element.style.backgroundImage = `url(${this.spriteSrc})`;
    this.element.style.backgroundPositionX = `${this.sx}px`;
    this.element.style.backgroundPositionY = `${this.sy}px`;
    this.element.style.backgroundSize = '100%';
    this.element.style.backgroundRepeat = "no-repeat";
  }

  updateLane = function () {
      this.dy = (this.dy + this.laneSpeed) % (396);
      this.dy = this.dy === 0 ? -396 : this.dy;
      this.counter++;
      this.counter =this.counter % this.counterLimit == 0 ? 0 : this.counter;
      if(this.counter === 0){
        this.laneSpeed = this.laneSpeed === 6? 6:this.laneSpeed + 2;
      }
}


drawLane = function (){
  let lane1 = document.getElementsByClassName('lane')[0];
  lane1.style.top = `${this.dy}px`;
  let lane2 = document.getElementsByClassName('lane')[1];
  lane2.style.top = `${this.dy + this.dHeight}px`;
}
}
export default Lane;
