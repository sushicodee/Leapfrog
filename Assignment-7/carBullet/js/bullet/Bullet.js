class Bullet {
    constructor(elementName,sx,sy,dx,dy,dWidth,dHeight,id){
        this.elementName = elementName;
        this.dx = dx;
        this.dy = dy;
        this.sx = sx;
        this.sy = sy;
        this.dWidth = dWidth;
        this.dHeight = dHeight;
        this.id = id;

        this.bulletSpeed = 4;
        this.bulletId;
        this.bulletSpriteSrc = `./assets/images/weapons/bullet.png`;
    }

    domDrawBulletSprite = function(bulletId){
        this.bulletId = bulletId;
        this.parentElement = document.getElementsByClassName(
          `game-${this.id}`
          )[0];
          this.element = document.createElement("div");
          this.element.setAttribute("class", 'bullet');
          this.element.setAttribute('id',bulletId);
          this.element.style.width = `${this.dWidth}px`;
          this.element.style.height = `${this.dHeight}px`;
          this.element.style.left = `${this.dx}px`;
          this.element.style.top = `${this.dy}px`;
          this.element.style.position = "absolute";
          this.element.style.backgroundImage = `url(${this.bulletSpriteSrc})`;
          this.element.style.backgroundPositionX = `${this.sx}px`;
          this.element.style.backgroundPositionY = `${this.sy}px`;
          this.element.style.backgroundSize = `${10}px`;
          this.element.style.backgroundRepeat = 'no-repeat';
          this.element.style.zIndex = '10';
      }

}
export default Bullet;