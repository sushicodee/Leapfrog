var navButtonSlide = document.getElementsByClassName('toggle-container')[1];
navButtonSlide.style.marginRight = `-${200}px`;
document.getElementsByClassName('toggle-container')[0].children[0].style.color = 'white';

function togglehandler() {
    toggle = !toggle;
    toggle? navButtonSlide.classList.add('toggle-container-open') : navButtonSlide.classList.add('toggle-container-close');
    !toggle? navButtonSlide.classList.remove('toggle-container-open'): navButtonSlide.classList.remove('toggle-container-close');

    let navWidth = navButtonSlide.clientWidth;
   
    let slideTime = 1000/60; //ms
    let counter = 0;
    let marginR = -200;
    
    if(toggle){
        //open
        const openNav = setInterval (() => {
            counter = counter + 10;
            marginR =   marginR + counter;
            navButtonSlide.style.marginRight = `${marginR - 10}px`;
            if(marginR > 0){
                counter = 0;
                clearInterval(openNav);
            }   
        }, slideTime)


    }
    else{
        //close
        console.log('closing');
        const closeNav = setInterval (() => {
            counter = counter + 10;
            marginR =   marginR + counter;
            navButtonSlide.style.marginRight = `-${marginR}px`;
            if(marginR > navWidth){
                counter = 0;
                clearInterval(closeNav);
            }   
        }, slideTime)

    }

}
var navButton = document.getElementsByClassName('navbar-toggle');
var toggle = false;
navButton[0].onclick = (e) => {
    // toggle = !toggle;
    // toggle? navButtonSlide.classList.add('toggle-container-open') : navButtonSlide.classList.add('toggle-container-close');
    // !toggle? navButtonSlide.classList.remove('toggle-container-open'): navButtonSlide.classList.remove('toggle-container-close');
    togglehandler();
}




navButtonSlide.children[0].onclick = (e) => {
    // 
    togglehandler();

}


