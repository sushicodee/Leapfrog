
var carouselContainer = document.getElementsByClassName('carousel-container')[0];

var carouselWrapper = document.getElementsByClassName('carousel-wrapper')[0];

carouselContainer.classList.add('clearfix');

carouselContainer.style.position = 'relative';
carouselContainer.style.backgroundColor = 'black';
carouselContainer.style.width = '370px';
carouselContainer.style.height = '250px';
carouselContainer.style.overflow = 'hidden';

carouselWrapper.classList.add('clearfix');


carouselWrapper.style.position = 'absolute';
// controls 
var prevElement = document.createElement('div');
var nextElement = document.createElement('div');

prevElement.setAttribute('class', 'controls');
prevElement.classList.add('control-prev');
prevElement.style.position = 'absolute';
prevElement.style.left ='0';
prevElement.style.top=`${240 * .5}px`


nextElement.setAttribute('class','controls');
nextElement.classList.add('control-next');
nextElement.style.position = 'absolute';
nextElement.style.right ='0';
nextElement.style.top=`${240 * .5}px`




// style controls 

prevElement.style.width = '20px';
prevElement.style.height = '100%';

nextElement.style.width = '20px';
nextElement.style.height = '100%';

const buttonLeft = document.createElement('button');
prevElement.appendChild(buttonLeft);
buttonLeft.setAttribute('class', 'fas')
buttonLeft.classList.add('fa-chevron-left');
buttonLeft.style.width ='20px';
buttonLeft.style.height = '20px';

const buttonRight = document.createElement('button');
nextElement.appendChild(buttonRight);
buttonRight.setAttribute('class', 'fas');
buttonRight.classList.add('fa-chevron-right');
buttonRight.style.width ='20px';
buttonRight.style.height = '20px';


// slider indicator 
var indicatorContainer = document.createElement('ul');
indicatorContainer.classList.add('clearfix');
// style indicator 
indicatorContainer.style.position = 'absolute';
indicatorContainer.style.bottom = '0px';
indicatorContainer.setAttribute('class', 'indicator-container');

carouselContainer.appendChild(prevElement);
carouselContainer.appendChild(nextElement);
carouselContainer.appendChild(indicatorContainer);
indicatorContainer.style.left = `${370*.5}px`;

var imageCount = carouselWrapper.childElementCount;

for(var i = 0; i< imageCount; i++)
{
carouselWrapper.children[i].style.float = 'left';
}

// size of container holding images 
carouselWrapper.style.width = `${carouselContainer.clientWidth*imageCount}px`;
// create number of indicators 
for(var i = 0; i < imageCount ;i++){
    var li = document.createElement('li');
    li.setAttribute('class', 'indicator');

    if(i == 0){
        li.classList.add('active');    
    }
    li.style.width = '10px';
    li.style.height = '10px';
    li.style.borderRadius = '50%';
    indicatorContainer.appendChild(li);
    li.style.float = 'left';
}
buttonLeft.disabled = true;
carouselWrapper.style.marginLeft = '0px';
var position = 0;
var FPS = 60;
var FRAME_RATE = 1000/FPS;
var IMAGE_OFFSET = carouselContainer.clientWidth;
var TOTAL_IMAGES = carouselWrapper.children.length-1;
const MAXIMUM_OFFSET = carouselWrapper.clientWidth;

buttonRight.onclick = function() {
   
   
    buttonRight.disabled = true;
    buttonLeft.disabled = false;
    indicatorContainer.children[position].classList.remove('active');
    position = position + 1;
    indicatorContainer.children[position].classList.add('active');
    if (position == TOTAL_IMAGES) {
        buttonRight.disabled = true;
    }else{
       
        buttonRight.disabled = false;
    }



        let counter = 0;
        var margin = carouselWrapper.style.marginLeft;
    
        let limit =`${IMAGE_OFFSET+20}`;
        const slide = setInterval(() => {
        let newMargin = parseInt(margin); 
        newMargin = newMargin - counter;
        counter = counter + 10;
        // console.log('naw Margin is : ',newMargin);
        carouselWrapper.style.marginLeft =`${newMargin}px`;
            
            if (counter + 10 == limit ){
                 clearInterval(slide);
            }    
        },FRAME_RATE);
    }   

    buttonLeft.onclick = function() {  
        // buttonLeft.disabled = true;
        buttonRight.disabled = false;
        indicatorContainer.children[position].classList.remove('active');
        position = position - 1;
        console.log(position);
        indicatorContainer.children[position].classList.add('active');
  
        if (position == 0 ) {            
                buttonLeft.disabled = true;
             }else{
                 buttonLeft.disabled = false;
               
               


             }
            
            
             let counter = 0;
            var margin = carouselWrapper.style.marginLeft;
             

            const slide = setInterval(() => {
            let limit =`${IMAGE_OFFSET + 20}`;
            let newMargin = parseInt(margin); 
            newMargin = newMargin + counter;
            counter = counter + 10;
            // console.log('naw Margin is : ',newMargin);
            carouselWrapper.style.marginLeft =`${newMargin}px`;
                
                if (counter + 10 == limit ){
                     clearInterval(slide);
                }    
            },FRAME_RATE);
        }  
        

      function animateforward () {

        const animationforward = setInterval(() => {
              // slide animation
              
              indicatorContainer.children[position].classList.remove('active');
              position = position + 1;
              indicatorContainer.children[position].classList.add('active');      
        if (position == TOTAL_IMAGES) {
            buttonRight.disabled = true;
        }else{
           
            buttonRight.disabled = false;
        }
           
            
            let counter = 0;
            var margin = carouselWrapper.style.marginLeft;
        
            let limit =`${IMAGE_OFFSET+20}`;
            const slide = setInterval(() => {
            let newMargin = parseInt(margin); 
            newMargin = newMargin - counter;
            counter = counter + 10;
            // console.log('naw Margin is : ',newMargin);
            carouselWrapper.style.marginLeft =`${newMargin}px`;
                
            if (counter + 10 == limit ){
                clearInterval(slide);
           } 
           else{
               if(counter + 20 == MAXIMIUM_OFFSET-limit){
                   clearInterval(animationforward);
                   setTimeout(() =>{
                       animateback();
                   },1000);
               }
           }   
        
        },FRAME_RATE);
        },1000);
   }

        function animateback (){
        const animationbackward = setInterval(()=> {
            buttonLeft.disabled = true;
            buttonRight.disabled = false;
            indicatorContainer.children[position].classList.remove('active');
            position = position - 1;
            indicatorContainer.children[position].classList.add('active');
                if (position == 0 ) {            
                    buttonLeft.disabled = true;
                  
                 }else{
                     buttonLeft.disabled = false;
                 }
                
                
                 let counter = 0;
                var margin = carouselWrapper.style.marginLeft;
                 
                const MAXIMIUM_OFFSET = carouselWrapper.clientWidth;
                const slide = setInterval(() => {
                let limit =`${IMAGE_OFFSET + 20}`;
                let newMargin = parseInt(margin); 
                newMargin = newMargin + counter;
                counter = counter + 10;
                console.log('new Margin is : ',newMargin);
                carouselWrapper.style.marginLeft =`${newMargin}px`;
                    
                    if (counter + 10 == limit ){
                         clearInterval(slide);
                    }   
                    else{
                        if(counter + limit == MAXIMIUM_OFFSET){
                            clearInterval(animationbackward);
                            setTimeout(() =>{
                                animateforward();
                            },1000);
                        }
                    }      
                },FRAME_RATE);
        },1000)
        };
     
        // animateforward();

        document.getElementsByClassName('indicator').onclick = (e) => {
            console.log('hello');
        }

