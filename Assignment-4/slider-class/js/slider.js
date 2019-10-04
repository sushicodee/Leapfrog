;(function(){
    function Carousel(numberofCarousel,width,height,slideAnimationduration){
        this.numberofCarousel = numberofCarousel;
        this.element = null;
        this.slideAnimationduration = slideAnimationduration;
        this.width = width;
        this.height = height;
        this.position = 0;
        this.parentElem = document.getElementsByClassName('carousel-container')[0];
        this.parentElem.style.width = this.width;
        this.parentElem.style.height = this.height;
        this.parentElem.style.overFlow = 'hidden';
        this.parentElem.style.position = 'relative';
        
          this.init = function() {
                // carouselwrapper
                this.carousels = document.getElementsByClassName('carousel-wrapper');
                for (let i = 0 ; i< this.carousels.length; i++){

                    this.carousels[i].classList.add(`carousel-wrapper-${i}`);
                    this.carousels[i].setAttribute('id', i);
                    this.carousels[i].setAttribute('value', 0);
                    this.numberofImages = this.carousels[i].children.length;
                    this.carousels[i].style.width = `${this.width * this.numberofImages}px`;
                    this.carousels[i].style.height = `${this.height}px`;
                    this.carousels[i].style.position = 'absolute';
                    this.carousels[i].style.float = 'left';
                    this.carousels[i].style.background = 'black';
                    this.carousels[i].style.overFlow = 'hidden';
                    this.carousels[i].style.marginLeft ='0px';

                     //floatImages
                     for(let j = 0; j< this.numberofImages; j++ ){
                        this.carousels[i].children[j].style.float ='left';
                    }

                    //crateindicators
                    this.indicatorContainer = document.createElement('ul');
                    this.carousels[i].appendChild(this.indicatorContainer);
                    this.imageCount = this.carousels[i].children.length;
                    this.createIndicators(this.imageCount,this.indicatorContainer);
                     //create Buttons
                     this.carousels[i].appendChild(this.createButtonPrev());
                     
                     this.carousels[i].appendChild(this.createButtonNext());
                }
               
                console.log(this.parentElem);
                // this.parentElem.appendChild(this.element);
                
            
            }

            this.createButtonNext = function () {
                     
                this.buttonNext = document.createElement('button');
                this.buttonNext.setAttribute('class', 'controls');
                this.buttonNext.setAttribute('class', 'fas');
                this.buttonNext.classList.add('fa-chevron-right');
                this.buttonNext.style.width = '20px';
                this.buttonNext.style.height = '20px';
                this.buttonNext.classList.add('control-next');
                this.buttonNext.style.position = 'absolute';
                this.buttonNext.style.left = `${this.width-20}px`;
                this.buttonNext.style.top = `${this.height * 0.5}px`;
                return this.buttonNext;
                
            }

            this.createButtonPrev = function () {
                this.buttonPrev = document.createElement('button');
                this.buttonPrev.setAttribute('class', 'controls');
                this.buttonPrev.setAttribute('class', 'fas');
                this.buttonPrev.classList.add('fa-chevron-left');
                this.buttonPrev.style.width = '20px';
                this.buttonPrev.style.height = '20px';
                this.buttonPrev.classList.add('control-prev');
                this.buttonPrev.style.position = 'absolute';
                this.buttonPrev.style.left = '0';
                this.buttonPrev.style.top = `${this.height * 0.5}px`;
                return this.buttonPrev;
            }

            this.createIndicators = function (imageCount,ulContainer) {
                this.imageCount = imageCount;
                this.ulContainer = ulContainer;
                for (var i = 0; i < imageCount-1; i++) {
                    this.li = document.createElement('li');
                    this.li.setAttribute('class', 'indicator');                 
                    if (i == 0) {
                      this.li.classList.add('active');
                    }
                    this.li.style.width = '10px';
                    this.li.style.height = '10px';
                    this.li.style.borderRadius = '50%';
                    this.li.setAttribute('id',i);
                    this.ulContainer.appendChild(this.li);
                    this.li.addEventListener('click', event => {
                            console.log(event.target,'clicked');
                            // this.handleIndicator(event);
                            let carouselWrapper = event.target.parentElement.parentElement;
                            let margin = event.target.parentElement.parentElement.style.marginLeft;
                            let position =this.getPositon(carouselWrapper);

                            console.log(event.target.parentElement.parentElement);
                            console.log('position',position);
                            let counter = 0;
                            let temp = event.target.id;
                            
                            position = this.getPositon(carouselWrapper);
                            console.log('position',position);

                            // console.log(event.target.classList.contains('active'));
                            this.startAnimation(event,margin,temp,position,counter);
                            this.setPosition(carouselWrapper,temp);
                      })
                 }
            }

            this.getPositon = function (wrapper) {
                return this.position = wrapper.getAttribute('value');
            }
            this.setPosition = function(wrapper,value){
                console.log(wrapper);
                wrapper.setAttribute('value', value);
            }
            this.clearAnimation = function () {
                clearInterval(this.slide); 
            }

            this.startAnimation = function (event,margin ,temp,position,counter) {
                
                this.counter = counter;
                this.event = event;
                this.slide = setInterval(() => {
                console.log(counter);

                    let newMargin = parseInt(margin);
                    if(temp == position){ 
                      this.clearAnimation();
                    }
                    else{
                        if(temp < position){
                        this.handleLeft(event,newMargin,position,temp,margin,counter);
                        }
                        else{
                        this.handleRight(event,newMargin,position,temp,margin,counter);
                        }
                    }


                 },this.FRAME_RATE)
            }


            this.handleLeft = function(event,newMargin,position,temp,margin,counter){
                this.limit = document.getElementsByClassName('carousel-container').clientWidth;
                this.margin = margin;
                this.position = position;
                this.temp = temp;
                this.newMargin = newMargin;
                this.counter = counter
                this.newMargin = this.newMargin + this.counter;
                this.counter = this.counter + 10;
                this.margin = `${newMargin}px`;
    
            
        
                if (Math.abs(this.counter - 10) == limit*Math.abs(this.temp-this.position)) {
                  clearInterval(slide);
                //   indicatorContainer.children[position].classList.remove('active');
                  event.target.classList.remove('active');
                  this.setPosition(event.parentElement.parentElement,temp);
                // position = temp;
                  event.target.classList.add('active');
                }
                
                  
          
            }

            this.handleRight = function(event,newMargin,position,temp,margin,counter) {
                this.margin = margin;
                this.position = position;
                this.temp = temp;
                this.newMargin = newMargin;
                this.counter = counter
                this.newMargin = this.newMargin + this.counter;
                this.counter = this.counter - 10;
                // carouselWrapper.style.marginLeft = `${newMargin}px`;
                this.margin = `${newMargin}px`;
        
                if (Math.abs(counter + 10) == this.limit*Math.abs(this.temp- this.position)) {
                  clearInterval(slide);
                //   indicatorContainer.children[position].classList.remove('active');
                    event.target.classList.remove('active');

                  this.setPosition(event.parentElement.parentElement,temp);
                //   position = temp;
                //   indicatorContainer.children[position].classList.add('active');
                  event.target.classList.add('active');
          
                }
            }


            this.handleAnimationForward= function (){

            }

            this.handleAnimationBackward= function () {

            }
            this.handleAnimationLoop = function() {

        }
    }

new Carousel(3,370,250,5000).init();
})();