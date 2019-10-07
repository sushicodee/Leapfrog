var carouselContainer1 = document.getElementsByClassName(
  "carousel-container1"
)[0];

var carouselWrapper1 = document.getElementsByClassName("carousel-wrapper1")[0];
var outerContainer1 = carouselContainer1.parentElement;
carouselContainer1.classList.add("clearfix");
carouselContainer1.style.position = "relative";
carouselContainer1.style.width = `${outerContainer1.clientWidth} px`;
carouselContainer1.style.height = `${500}px`;
carouselContainer1.style.margin = "auto";
carouselContainer1.style.overflow = "hidden";

carouselWrapper1.classList.add("clearfix");

carouselWrapper1.style.position = "absolute";
// controls

// slide1r indicator
var indicatorContainer1 = document.createElement("ul");
indicatorContainer1.classList.add("clearfix");
// style indicator
indicatorContainer1.style.left = `${carouselWrapper1.clientWidth * 0.5 - 15}px`;
indicatorContainer1.style.position = "absolute";
indicatorContainer1.style.width = "30px";

indicatorContainer1.style.paddingBottom = "60px";
indicatorContainer1.style.bottom = "0px";

indicatorContainer1.setAttribute("class", "indicator-container");

carouselContainer1.appendChild(indicatorContainer1);
indicatorContainer1.style.left = `${carouselContainer1.clientWidth * 0.5}px`;

var imageCount1 = carouselWrapper1.childElementCount;

for (var i = 0; i < imageCount1; i++) {
  carouselWrapper1.children[i].style.float = "left";
  carouselWrapper1.children[i].style.width = `${outerContainer1.clientWidth}px`;
}

// size of container holding images
carouselWrapper1.style.width = `${carouselContainer1.clientWidth *
  imageCount1}px`;
  for(let j = 0; j< carouselWrapper1.children.length ; j ++){
      
      carouselWrapper1.children[j].style.width = `${carouselWrapper1.children[0].clientWidth/carouselContainer1.clientWidth * 100 / 3}%`;
  }
carouselWrapper1.style.marginLeft = "0px";

var position1 = 0;
var FPS1 = 60;
var FRAME_RATE1 = 1000 / FPS1;
var IMAGE_OFFSET1 = outerContainer1.clientWidth;
var TOTAL_IMAGES1 = carouselWrapper1.children.length - 1;
const MAX_OFFSET1 = carouselWrapper1.clientWidth;
var isMoving1 = false;
var runningAnimation1 = "";
// create number of indicators
for (var i = 0; i < imageCount1; i++) {
  var li1 = document.createElement("li");
  li1.setAttribute("class", "glow");

  if (i == 0) {
    li1.classList.add("active");
  }
  if (i != 0) {
    li1.style.marginLeft = "2.5px";
  }
  //   li1.style.width = "5px";
  //   li1.style.height = "5px";

  li1.style.borderRadius = "50%";
  li1.setAttribute("id", i);
  indicatorContainer1.appendChild(li1);
  li1.style.float = "left";
  li1.onclick = function(e) {
    var margin1 = carouselWrapper1.style.marginLeft;
    var temp1 = e.target.id;
    let counter1 = 0;
    let limit1 = `${IMAGE_OFFSET1}`;
    if ((isMoving1 = false)) {
      //get current animation1 name
      let animation1 = runningAnimation1;
      animation1 == "animateF"
        ? clearInterval(animation1)
        : clearInterval("animateB");
      //execute click animation1
      const slide1 = setInterval(() => {
        let newMargin1 = parseInt(margin1);
        if (temp1 == position1) {
          clearInterval(slide1);
        } else {
          //   left
          if (temp1 < position1) {
            newMargin1 = newMargin1 + counter1;
            counter1 = counter1 + 1;
            carouselWrapper1.style.marginLeft = `${newMargin1}px`;
            console.log(counter1);
            
            if (
              Math.abs(counter1 + 1) ==
              limit1 * Math.abs(temp1 - position1)
            ) {
                console.log(counter1);
              clearInterval(slide1);
              indicatorContainer1.children[position1].classList.remove(
                "active"
              );
              position1 = temp1;
              indicatorContainer1.children[position1].classList.add("active");
            }

            // right
          } else {
            newMargin1 = newMargin1 + counter1;
            counter1 = counter1 - 1;
            carouselWrapper1.style.marginLeft = `${newMargin1}px`;

            if (
              Math.abs(counter1 + 1) == limit1 * Math.abs(temp1 - position1)) {
              clearInterval(slide1);
              indicatorContainer1.children[position1].classList.remove("active");
              position1 = temp1;
              indicatorContainer1.children[position1].classList.add("active");
            }
          }
        }
        // console.log('naw Margin is : ',newMargin1);
        //   carouselWrapper1.style.marginLeft = `${temp1 * 370 * -1}px`;
      }, FRAME_RATE1);

      //replug animation
      animation1 == "animateF" ? animateforward1() : animateback1();
    }
  };
}

function animateforward1() {
  runningAnimation1 = "animateF";
  isMoving1 = false;
  const animateF1 = setInterval(() => {
    for (let i = 0; i < indicatorContainer1.childElementCount; i++) {
      if (indicatorContainer1.children[i].classList.contains("active")) {
        var t1 = i;
      }
    }
    // slide1 animation
    var margin1 = carouselWrapper1.style.marginLeft;
    let temp1 = t1;
    let counter1 = 0;
    // console.log(IMAGE_OFFSET1);
    let limit1 = `${carouselContainer1.clientWidth}`;
    console.log(limit1);
    var MAXIMIUM1 = carouselWrapper1.clientWidth - limit1;
    temp1++;
    const slide1 = setInterval(() => {
      isMoving1 = true;
      let newMargin1 = parseInt(margin1);
      if (position1 === indicatorContainer1.childElementCount - 1) {
        clearInterval(animateF1);
      } else {
        if (temp1 > position1) {
            newMargin1 = newMargin1 + counter1;
          counter1 = counter1 - 1;
          carouselWrapper1.style.marginLeft = `${newMargin1}px`;
         
          if (Math.abs(newMargin1 - 1) > MAXIMIUM1) {

            //max right
            isMoving1 = false;

            clearInterval(slide1);
            clearInterval(animateF1);
            animateback1();
          }

          if (
            Math.abs(counter1 + 1) === limit1 * Math.abs(temp1 - position1)) {
                console.log('here')
                console.log('counter1');
            clearInterval(slide1);
            isMoving1 = false;
            indicatorContainer1.children[position1].classList.remove("active");
            position1 = temp1;
            indicatorContainer1.children[position1].classList.add("active");

          }
        }
      }
    }, FRAME_RATE1);
  }, 1000);
}

function animateback1() {
  runningAnimation1 = "animateB";

  const animateB1 = setInterval(() => {
    isMoving1 = false;
    for (let i = 0; i < indicatorContainer1.childElementCount; i++) {
      if (indicatorContainer1.children[i].classList.contains("active")) {
        var t1 = i;
      }
    }
    let temp1 = t1;
    var margin1 = carouselWrapper1.style.marginLeft;
    let counter1 = 0;
    let limit1 = `${IMAGE_OFFSET1}`;
    console.log(limit1);
    var MINIMUM = 0;
    temp1--;
    const slide1 = setInterval(() => {
      isMoving1 = true;

      let newMargin1 = parseInt(margin1);

      if (temp1 < position1) {
          newMargin1 = newMargin1 + counter1;
          counter1 = counter1 + 1;

        carouselWrapper1.style.marginLeft = `${newMargin1}px`;
        if (newMargin1 + 1 > 0) {
          clearInterval(slide1);
          clearInterval(animateB1);
          isMoving1 = false;
          animateforward1();
        }
        //--
        if (Math.abs(counter1 - 1) === limit1 * Math.abs(temp1 - position1)) {
          clearInterval(slide1);
          indicatorContainer1.children[position1].classList.remove("active");
          position1 = temp1;
          indicatorContainer1.children[position1].classList.add("active");
        }

        // }
      }
    }, FRAME_RATE1 );
  }, 1000);
}

animateforward1();
