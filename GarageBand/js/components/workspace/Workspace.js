class Workspace{
    constructor(id,parentElement,width,height,color){
        this.parentElement = parentElement;
        this.width = width;
        this.height = height;
        this.id = id;
        this.backgroundColor = color;
        this.render();
    }

    render(){
        let element = document.createElement('div');
        this.parentElement.appendChild(element);
        element.setAttribute('class', `workspace-container-${this.id}`);
        element.style.width = `${this.width}%`;
        element.style.height = `${this.height}vh`;
        element.style.backgroundColor = this.backgroundColor;
        element.style.float = 'right';
    }
}
export default Workspace;