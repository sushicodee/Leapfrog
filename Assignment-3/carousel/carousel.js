// var carouselContainer = document.getElementsByClassName(
//   'carousel-container'
// )[0];

// var carouselWrapper = document.getElementsByClassName('carousel-wrapper')[0];

// carouselContainer.classList.add('clearfix');

// carouselContainer.style.position = 'relative';
// carouselContainer.style.backgroundColor = 'black';
// carouselContainer.style.width = '370px';
// carouselContainer.style.height = '250px';
// carouselContainer.style.overflow = 'hidden';

// carouselWrapper.classList.add('clearfix');

// carouselWrapper.style.position = 'absolute';
// // controls
// var prevElement = document.createElement('div');
// var nextElement = document.createElement('div');

// prevElement.setAttribute('class', 'controls');
// prevElement.classList.add('control-prev');
// prevElement.style.position = 'absolute';
// prevElement.style.left = '0';
// prevElement.style.top = `${240 * 0.5}px`;

// nextElement.setAttribute('class', 'controls');
// nextElement.classList.add('control-next');
// nextElement.style.position = 'absolute';
// nextElement.style.right = '0';
// nextElement.style.top = `${240 * 0.5}px`;

// // style controls

// prevElement.style.width = '20px';
// prevElement.style.height = '100%';

// nextElement.style.width = '20px';
// nextElement.style.height = '100%';

// const buttonLeft = document.createElement('button');
// prevElement.appendChild(buttonLeft);
// buttonLeft.setAttribute('class', 'fas');
// buttonLeft.classList.add('fa-chevron-left');
// buttonLeft.style.width = '20px';
// buttonLeft.style.height = '20px';

// const buttonRight = document.createElement('button');
// nextElement.appendChild(buttonRight);
// buttonRight.setAttribute('class', 'fas');
// buttonRight.classList.add('fa-chevron-right');
// buttonRight.style.width = '20px';
// buttonRight.style.height = '20px';

// // slider indicator
// var indicatorContainer = document.createElement('ul');
// indicatorContainer.classList.add('clearfix');
// // style indicator
// indicatorContainer.style.position = 'absolute';
// indicatorContainer.style.bottom = '0px';
// indicatorContainer.setAttribute('class', 'indicator-container');

// carouselContainer.appendChild(prevElement);
// carouselContainer.appendChild(nextElement);
// carouselContainer.appendChild(indicatorContainer);
// indicatorContainer.style.left = `${370 * 0.5}px`;

// var imageCount = carouselWrapper.childElementCount;

// for (var i = 0; i < imageCount; i++) {
//   carouselWrapper.children[i].style.float = 'left';
// }

// // size of container holding images
// carouselWrapper.style.width = `${carouselContainer.clientWidth * imageCount}px`;
// carouselWrapper.style.marginLeft = '0px';

// var position = 0;
// var FPS = 60;
// var FRAME_RATE = 1000 / FPS;
// var IMAGE_OFFSET = carouselContainer.clientWidth;
// var TOTAL_IMAGES = carouselWrapper.children.length - 1;
// const MAXIMUM_OFFSET = carouselWrapper.clientWidth;
// // create number of indicators
// for (var i = 0; i < imageCount; i++) {
//   var li = document.createElement('li');
//   li.setAttribute('class', 'indicator');

//   if (i == 0) {
//     li.classList.add('active');
//   }
//   li.style.width = '10px';
//   li.style.height = '10px';
//   li.style.borderRadius = '50%';
//   li.setAttribute('id',i);
//   indicatorContainer.appendChild(li);


//   li.style.float = 'left';
//   li.onclick = function(e) {
//     var margin = carouselWrapper.style.marginLeft;
//     var temp = e.target.id;
//     let counter = 0;
//     let limit = `${IMAGE_OFFSET}`;

//     const slide = setInterval(() => {
//       let newMargin = parseInt(margin);
//       if(temp == position){ 
//           clearInterval(slide); 
//       }  
//       else{  
//     //   left
//        if(temp < position) {
//         newMargin = newMargin + counter;
//         counter = counter + 10;
//         carouselWrapper.style.marginLeft = `${newMargin}px`;

//         if (Math.abs(counter - 10) == limit*Math.abs(temp-position)) {
//           clearInterval(slide);
//           indicatorContainer.children[position].classList.remove('active');
//           position = temp;
//           indicatorContainer.children[position].classList.add('active');
  
//         }

//         // right
//       } else {
//         newMargin = newMargin + counter;
//         counter = counter - 10;
//         carouselWrapper.style.marginLeft = `${newMargin}px`;

//         if (Math.abs(counter + 10) == limit*Math.abs(temp-position)) {
//           clearInterval(slide);
//           indicatorContainer.children[position].classList.remove('active');
//           position = temp;
//           indicatorContainer.children[position].classList.add('active');
  
//         }
//       }
//     }
//       // console.log('naw Margin is : ',newMargin);
//       //   carouselWrapper.style.marginLeft = `${temp * 370 * -1}px`;

//     }, FRAME_RATE);
//   };
// }
// buttonLeft.disabled = true;

// buttonRight.onclick = function() {
//   buttonRight.disabled = true;
//   buttonLeft.disabled = false;
//   indicatorContainer.children[position].classList.remove('active');
//   position = position + 1;
//   indicatorContainer.children[position].classList.add('active');
//   if (position == TOTAL_IMAGES) {
//     buttonRight.disabled = true;
//   } else {
//     buttonRight.disabled = false;
//   }

//   let counter = 0;
//   var margin = carouselWrapper.style.marginLeft;

//   let limit = `${IMAGE_OFFSET + 20}`;
//   const slide = setInterval(() => {
//     let newMargin = parseInt(margin);
//     newMargin = newMargin - counter;

//     counter = counter + 10;
//     // console.log('naw Margin is : ',newMargin);
//     carouselWrapper.style.marginLeft = `${newMargin}px`;

//     if (counter + 10 == limit) {
//       clearInterval(slide);
//     }
//   }, FRAME_RATE);
// };

// buttonLeft.onclick = function() {
//   // buttonLeft.disabled = true;
//   buttonRight.disabled = false;
//   indicatorContainer.children[position].classList.remove('active');
//   position = position - 1;
//   console.log(position);
//   indicatorContainer.children[position].classList.add('active');

//   if (position == 0) {
//     buttonLeft.disabled = true;
//   } else {
//     buttonLeft.disabled = false;
//   }

//   let counter = 0;
//   var margin = carouselWrapper.style.marginLeft;

//   const slide = setInterval(() => {
//     let limit = `${IMAGE_OFFSET + 20}`;
//     let newMargin = parseInt(margin);

//     newMargin = newMargin + counter;
//     counter = counter + 10;
//     // console.log('naw Margin is : ',newMargin);
//     carouselWrapper.style.marginLeft = `${newMargin}px`;

//     if (counter + 10 == limit) {
//       clearInterval(slide);
//     }
//   }, FRAME_RATE);
// };

// function animateforward() {
//   const animationforward = setInterval(() => {
//     // slide animation

//     indicatorContainer.children[position].classList.remove('active');
//     position = position + 1;
//     indicatorContainer.children[position].classList.add('active');
//     if (position == TOTAL_IMAGES) {
//       buttonRight.disabled = true;
//     } else {
//       buttonRight.disabled = false;
//     }

//     let counter = 0;
//     var margin = carouselWrapper.style.marginLeft;

//     let limit = `${IMAGE_OFFSET + 20}`;
//     const slide = setInterval(() => {
//       let newMargin = parseInt(margin);
//       newMargin = newMargin - counter;
//       counter = counter + 10;
//       // console.log('naw Margin is : ',newMargin);
//       carouselWrapper.style.marginLeft = `${newMargin}px`;

//       if (counter + 10 == limit) {
//         clearInterval(slide);
//       } else {
//         if (counter + 20 == MAXIMIUM_OFFSET - limit) {
//           clearInterval(animationforward);
//           setTimeout(() => {
//             animateback();
//           }, 1000);
//         }
//       }
//     }, FRAME_RATE);
//   }, 1000);
// }

// function animateback() {
//   const animationbackward = setInterval(() => {
//     buttonLeft.disabled = true;
//     buttonRight.disabled = false;
//     indicatorContainer.children[position].classList.remove('active');
//     position = position - 1;
//     indicatorContainer.children[position].classList.add('active');
//     if (position == 0) {
//       buttonLeft.disabled = true;
//     } else {
//       buttonLeft.disabled = false;
//     }

//     let counter = 0;
//     var margin = carouselWrapper.style.marginLeft;

//     const MAXIMIUM_OFFSET = carouselWrapper.clientWidth;
//     const slide = setInterval(() => {
//       let limit = `${IMAGE_OFFSET + 20}`;
//       let newMargin = parseInt(margin);
//       newMargin = newMargin + counter;
//       counter = counter + 10;
//       console.log('new Margin is : ', newMargin);
//       carouselWrapper.style.marginLeft = `${newMargin}px`;

//       if (counter + 10 == limit) {
//         clearInterval(slide);
//       } else {
//         if (counter + limit == MAXIMIUM_OFFSET) {
//           clearInterval(animationbackward);
//           setTimeout(() => {
//             animateforward();
//           }, 1000);
//         }
//       }
//     }, FRAME_RATE);
//   }, 1000);
// }

// // animateforward();


class Carousel {
  constructor(){
    this.init();
  }
  init(){
    this.state = {
      currentState:0,
      runningState:1,
      fixedState:0,
    }

    //button props
    this.buttonHeight = 20;
    this.buttonwidth = 20;
    
    this.indicatorCalled = false;
    this.imageWidth = 370;
    this.margin = 0;
    this.position = 0;
    this.temp = 0;
    this.FPS = 60;
    this.FRAME_RATE = 1000 / this.FPS;
    this.haltSlideShow = false;

    this.renderCarousel();
    this.renderButtons();
    this.renderIndicators();
    this.carouselLoop();
  }

  renderCarousel(){
    this.parentElement = document.getElementsByClassName('carousel-container')[0];
    this.parentElement.style.position = 'relative';
    this.parentElement.style.width = `${this.imageWidth}px`;
    this.parentElement.style.height= '250px';
    this.parentElement.style.overflow = 'hidden';
    this.parentElement.style.backgroundColor = 'black';

    this.parentElement.children[0].style.position = 'absolute';
    this.parentElement.children[0].style.left = 0;
    this.parentElement.children[0].style.top = 0;
    this.parentElement.children[0].style.right = 0;

    this.wrapperElement = this.parentElement.children[0];
    this.wrapperElement.style.width = `${this.parentElement.clientWidth * this.wrapperElement.childElementCount}px`;
    this.wrapperElement.classList.add('clearfix');
    this.wrapperElement.style.marginLeft = `${this.margin}px`;

    for(let i = 0; i< this.wrapperElement.childElementCount; i++){
      this.wrapperElement.children[i].style.float = 'left';
    }

  }
  handleButtonClick(e){
    if(this.state.currentState === this.state.fixedState){
      switch(e.target.value){
        case 'left':  this.handleLeftClick();
        break;
        case 'right': this.handleRightClick();
        break;
        default:break;
      }
    }
  }

  handleLeftClick(){
    if(this.position == 0){
      return;
    }
    this.state.currentState = this.state.runningState;
    this.haltSlideShow = true;
    if(!this.indicatorCalled){
      this.temp = this.temp - 1;
    }

    this.counter = 0;
    const left = setInterval(() =>{
      this.margin = this.margin - 10;
      this.counter = this.counter + 10;
      this.setMargin();
      if(this.counter + 10 > this.imageWidth * Math.abs(this.temp - this.position)){
        this.indicatorContainer.children[this.position].classList.remove('active');
        this.position = this.temp;
        this.indicatorContainer.children[this.position].classList.add('active');
        this.state.currentState = this.state.fixedState;
        this.haltSlideShow = false;
        clearInterval(left);
      }
    },this.FRAME_RATE)
  }
  handleRightClick(){
    
    if(this.position == this.wrapperElement.childElementCount -1){
      return;
    }
    this.state.currentState = this.state.runningState;
    this.haltSlideShow = true;

    if(!this.indicatorCalled){
      this.temp++;
    }
    this.counter = 0;
    const right = setInterval(() =>{
      this.margin = this.margin + 10;
      this.counter = this.counter + 10;
      this.setMargin();
      if(this.counter + 10 > this.imageWidth * Math.abs(this.temp - this.position)){
        this.indicatorContainer.children[this.position].classList.remove('active');
        this.position = this.temp;
        this.indicatorContainer.children[this.position].classList.add('active');
        this.state.currentState = this.state.fixedState;
        this.haltSlideShow = false;
        clearInterval(right);

      }
    },this.FRAME_RATE)
  }
  reset(){
    this.counter = 0;
  }

  setMargin(){
    this.wrapperElement.style.marginLeft = `-${this.margin}px`;
  }

  renderButtons(){
  const buttonLeft = document.createElement('button');
  buttonLeft.setAttribute('class', 'fas');
  buttonLeft.classList.add('fa-chevron-left');
  buttonLeft.style.width = '20px';
  buttonLeft.setAttribute('value','left');
  buttonLeft.style.top = `${(this.wrapperElement.clientHeight/2) - this.buttonHeight/2}px`
  buttonLeft.style.height = '20px';
  buttonLeft.style.position = 'absolute';
  buttonLeft.style.left = '0';
  buttonLeft.style.borderRadius = '50%';
  buttonLeft.style.border = 'none';
  buttonLeft.style.outline = 'none';

  buttonLeft.addEventListener('click' , e => this.handleButtonClick(e))

  const buttonRight = document.createElement('button');
  buttonRight.setAttribute('class', 'fas');
  buttonRight.classList.add('fa-chevron-right');
  buttonRight.style.width = '20px';
  buttonRight.style.height = '20px';
  buttonRight.style.top = `${(this.wrapperElement.clientHeight/2) - this.buttonHeight/2}px`

  buttonRight.style.position = 'absolute';
  buttonRight.style.right = '0';
  buttonRight.setAttribute('value','right');
  buttonRight.style.borderRadius = '50%';
  buttonRight.style.border = 'none';
  buttonRight.style.outline = 'none';

  

  buttonRight.addEventListener('click' , e => this.handleButtonClick(e))
  
  this.parentElement.appendChild(buttonLeft);
  this.parentElement.appendChild(buttonRight);
  }



  renderIndicators(){
    this.indicatorContainer = document.createElement('ul');
    this.indicatorContainer.classList.add('clearfix');
    this.indicatorContainer.style.position = 'absolute';
    this.indicatorContainer.style.bottom = '0px';
    this.indicatorContainer.setAttribute('class', 'indicator-container');
    this.parentElement.appendChild(this.indicatorContainer);
    this.indicatorContainer.style.left = `${(370 * 0.5) - (this.wrapperElement.childElementCount * 20)}px`;
    this.indicatorContainer.style.listStyleType = 'none';
    
    for (let i = 0; i < this.wrapperElement.childElementCount; i++) {
        let li = document.createElement('li');
        li.setAttribute('class', 'indicator');

        if (i == 0) {
          li.classList.add('active');
        }
        li.style.width = '10px';
        li.style.height = '10px';
        li.style.borderRadius = '50%';
        li.style.float = 'left';
        li.setAttribute('id',i);
        this.indicatorContainer.appendChild(li);
        li.addEventListener('click', e => this.handleIndicatorClick(e))
  }
}

handleIndicatorClick(e){

 
  if(this.state.currentState === this.state.fixedState){
    this.state.currentState = this.state.runningState;
    this.haltSlideShow = true;
    this.temp = e.target.id;
  
    if(this.position == this.temp){
      this.haltSlideShow = false;
      this.state.currentState = this.state.fixedState;
      return;
    }
    else if(this.position > this.temp){
      //left
      this.indicatorCalled = true;
      this.handleLeftClick();
      this.indicatorCalled = false;
      this.haltSlideShow = false;
    }
    else{
      //right
      this.indicatorCalled = true;
      this.handleRightClick();
      this.indicatorCalled = false;
      this.haltSlideShow = false;
    }

  }
}

  carouselLoop(){
      const slideShow = setInterval(() =>{
      if(this.state.currentState === this.state.runningState){
        clearInterval(slideShow);
        this.carouselLoop();
      }
      else{
        if(this.position <= 0){
          this.slideRight = true;
        }
        else if(this.position >= this.wrapperElement.childElementCount-1){
          this.slideRight = false;
        }
          if(this.slideRight){
            //slideRight
            this.temp++;
            this.indicatorCalled = true;
            this.handleRightClick();
            this.indicatorCalled = false;  
          }
          else {
            //slideleft
              this.temp--;
              this.indicatorCalled = true;
              this.handleLeftClick();
              this.indicatorCalled = false;
            
          }
      }
      },3000)
     
    }
  }
 

Carousel = new Carousel();