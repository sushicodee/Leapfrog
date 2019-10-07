var carouselContainer = document.getElementsByClassName(
  "carousel-container"
)[0];

var carouselWrapper = document.getElementsByClassName("carousel-wrapper")[0];

carouselContainer.classList.add("clearfix");

carouselContainer.style.position = "relative";
if (carouselContainer.parentElement.clientWidth < 375){
    carouselContainer.style.width = "370px";

}else{
    carouselContainer.style.width = "770px";

}
carouselContainer.style.height = "430px";
carouselContainer.style.margin = "auto";
carouselContainer.style.overflow = "hidden";

carouselWrapper.classList.add("clearfix");

carouselWrapper.style.position = "absolute";
// controls

// slider indicator
var indicatorContainer = document.createElement("ul");
indicatorContainer.classList.add("clearfix");
// style indicator
indicatorContainer.style.left = `${carouselWrapper.clientWidth * 0.5 - 15}px`;
indicatorContainer.style.position = "absolute";
indicatorContainer.style.width = "30px";

indicatorContainer.style.paddingBottom = "60px";
indicatorContainer.style.bottom = "0px";

indicatorContainer.setAttribute("class", "indicator-container");

carouselContainer.appendChild(indicatorContainer);
indicatorContainer.style.left = `${carouselContainer.clientWidth * 0.5}px`;

var imageCount = carouselWrapper.childElementCount;

for (var i = 0; i < imageCount; i++) {
  carouselWrapper.children[i].style.float = "left";
  carouselWrapper.children[i].style.width = `${carouselContainer.clientWidth}px`;

}

// size of container holding images
carouselWrapper.style.width = `${carouselContainer.clientWidth * imageCount}px`;
carouselWrapper.style.marginLeft = "0px";

var position = 0;
var FPS = 60;
var FRAME_RATE = 1000 / FPS;
var IMAGE_OFFSET = carouselContainer.clientWidth;
var TOTAL_IMAGES = carouselWrapper.children.length - 1;
const MAXIMUM_OFFSET = carouselWrapper.clientWidth;
var isMoving = false;
var runningAnimation = '';
// create number of indicators
for (var i = 0; i < imageCount; i++) {
  var li = document.createElement("li");
  li.setAttribute("class", "glow");

  if (i == 0) {
    li.classList.add("active");
  }
  if(i!=0){
      li.style.marginLeft = '2.5px';
  }
//   li.style.width = "5px";
//   li.style.height = "5px";

  li.style.borderRadius = "50%";
  li.setAttribute("id", i);
  indicatorContainer.appendChild(li);
  li.style.float = "left";
  li.onclick = function(e) {
    var margin = carouselWrapper.style.marginLeft;
    var temp = e.target.id;
    let counter = 0;
    let limit = `${IMAGE_OFFSET}`;
    if(isMoving = false){
        //get current animation name
        let animation = runningAnimation;
        (animation == 'animateF')? clearInterval(animation) : clearInterval('animateB');
        //execute click animation
        const slide = setInterval(() => {
          let newMargin = parseInt(margin);
          if (temp == position) {
            clearInterval(slide);
          } else {
            //   left
            if (temp < position) {
              newMargin = newMargin + counter;
              counter = counter + 10;
              carouselWrapper.style.marginLeft = `${newMargin}px`;
    
              if (Math.abs(counter - 10) == limit * Math.abs(temp - position)) {
                clearInterval(slide);
                indicatorContainer.children[position].classList.remove("active");
                position = temp;
                indicatorContainer.children[position].classList.add("active");
              }
    
              // right
            } else {
              newMargin = newMargin + counter;
              counter = counter - 10;
              carouselWrapper.style.marginLeft = `${newMargin}px`;
    
              if (Math.abs(counter + 10) == limit * Math.abs(temp - position)) {
                clearInterval(slide);
                indicatorContainer.children[position].classList.remove("active");
                position = temp;
                indicatorContainer.children[position].classList.add("active");
              }
            }
          }
          // console.log('naw Margin is : ',newMargin);
          //   carouselWrapper.style.marginLeft = `${temp * 370 * -1}px`;
        }, FRAME_RATE);



        //replug animation
        (animation == 'animateF') ? animateforward() : animateback();    }
  };
}

function animateforward() {
    runningAnimation = 'animateF';
    isMoving = false;
    const animateF = setInterval(() => {

        for (let i = 0; i < indicatorContainer.childElementCount; i++) {
            if (indicatorContainer.children[i].classList.contains("active")) {
                var t = i;
            }
        }
        // slide animation
    var margin = carouselWrapper.style.marginLeft;
    let temp = t;
    let counter = 0;
    let limit = `${IMAGE_OFFSET}`;
    var MAXIMIUM = carouselWrapper.clientWidth - limit;
    temp++;
    const slide = setInterval(() => {
      isMoving = true;
      let newMargin = parseInt(margin);
      if (position === indicatorContainer.childElementCount - 1) {
        clearInterval(animateF);

      } else {
        if (temp > position) {
          newMargin = newMargin + counter;
          counter = counter - 10;
          carouselWrapper.style.marginLeft = `${newMargin}px`;

          if (Math.abs(newMargin - 10) > MAXIMIUM) {
            //max right
            isMoving = false;

            clearInterval(slide);
            clearInterval(animateF);
            animateback();
         
          }

          if (Math.abs(counter + 10) === limit * Math.abs(temp - position)) {
              clearInterval(slide);
              isMoving = false;
            indicatorContainer.children[position].classList.remove("active");
            position = temp;
            indicatorContainer.children[position].classList.add("active");
          }
    
        }
      }
    }, FRAME_RATE);
  }, 4000);
}

function animateback() {
    runningAnimation = 'animateB';


  const animateB = setInterval(() => {
      isMoving = false;
    for (let i = 0; i < indicatorContainer.childElementCount; i++) {
      if (indicatorContainer.children[i].classList.contains("active")) {
        var t = i;
      }
    }
    let temp = t;
    var margin = carouselWrapper.style.marginLeft;
    let counter = 0;
    let limit = `${IMAGE_OFFSET}`;
    var MINIMUM = 0;
    temp--;
    const slide = setInterval(() => {
      isMoving = true;

      let newMargin = parseInt(margin);
    //   if (position === 0) {
        // carouselWrapper.style.marginLeft = 0
        // clearInterval(slide);
        // clearInterval(animateB);
        // isMoving = false;
        // animateforward();
    //   } else {
        if (temp < position) {
            newMargin = newMargin + counter;
            counter = counter + 10;
            carouselWrapper.style.marginLeft = `${newMargin}px`;
            if ((newMargin + 10) > 0) {
                
              clearInterval(slide);
              clearInterval(animateB);
              isMoving = false;
              animateforward();

 
            }
  
            if (Math.abs(counter - 10) === limit * Math.abs(temp - position)) {
              // console.log('clearing interval');
              clearInterval(slide);
              indicatorContainer.children[position].classList.remove("active");
              position = temp;
              indicatorContainer.children[position].classList.add("active");
            }

        // }
      }
    }, FRAME_RATE);
  }, 4000);
}

animateforward();
