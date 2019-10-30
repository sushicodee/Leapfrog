import SequenceList from './sequenceList/SequenceList.js'

class Workspace{
    constructor(id,parentElement,width,height,color){
        this.parentElement = parentElement;
        this.width = width;
        this.element;
        this.height = height;
        this.backgroundColor = color;
        this.sequenceList;
        this.render();
        this.renderChild();
        this.id = id;
    }
 
    render(){
        this.element = document.createElement('div');
        this.parentElement.appendChild(this.element);
        this.element.setAttribute('class', `workspace-container-${this.id}`);
        this.element.style.width = `${this.width}%`;
        this.element.style.height = `${this.height}px`;
        this.element.style.backgroundColor = this.backgroundColor;
        this.element.style.float = 'right';
    }

    renderChild(){
        //renderList    
        this.renderList();
    }

    renderList = function () {
        this.sequenceList = new SequenceList(this.id,this.element,this.width,this.height,'white');
        
    }

    sequenceListProp = function(){
        return this;
    }



}
export default Workspace;