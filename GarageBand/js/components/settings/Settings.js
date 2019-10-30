import InstrumentSelector from './InstrumentsSelector/InstrumentsSelector.js';

class Settings{
    constructor(id,parentElement,width,height,color){
        this.parentElement = parentElement;
        this.element;
        this.width = width;
        this.height = height;
        this.id = id;
        this.backgroundColor = color;
        this.render();
        this.renderChild();
    }

    render(){
        this.element = document.createElement('div');
        this.parentElement.appendChild(this.element);
        this.element.setAttribute('class', `settings-container-${this.id}`);
        this.element.style.width = `${this.width}%`;
        this.element.style.height = `${this.height}px`;
        this.element.style.backgroundColor = this.backgroundColor;
        this.element.style.float = 'left';
    }
    renderChild(){
        const instrumentSelector = new InstrumentSelector(this.id,this.element,100,undefined,'black')    
    }



}
export default Settings;