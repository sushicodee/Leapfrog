import Storage from '../../../utility/Storage.js';
import Player from './player/player.js';
class SequencePlayer {
    constructor(id,parentElement,width,height,color,instruments,sequenceArray){
        this.init(id,parentElement,width,height,color,instruments,sequenceArray);
        this.render();
        this.renderChild();
    }
    
    init = function(id,parentElement,width,height,color,instruments,sequenceArray){
        this.id = id;
        this.parentElement = parentElement;
        this.element
        this.width = width;
        this.height = height;
        this.backgroundColor = color;
        this.sequenceArray = sequenceArray;
        this.instruments = instruments;

        //localmembers

        this.Mainvolume;
        this.Maintempo;
        this.Mainfilter;
        this.Maindelay;
       
    }

    render(){
        this.element = document.createElement('div');
        this.element.setAttribute('class', `sequence-player-constainer-${this.id}`);
        this.element.style.width = '100%';
        this.element.style.backgroundColor = this.backgroundColor;
        this.parentElement.appendChild(this.element);

        this.sequencePlayerTitle = document.createElement('h2');
        this.sequencePlayerTitle.innerText = 'Sequence Player';
        this.element.appendChild(this.sequencePlayerTitle);
    }


    renderChild(){

        this.playerElement = document.createElement('div');
        this.element.appendChild(this.playerElement);
        this.renderAllPlayers();
    }

    handleRefresh(){
        console.log('refresh');
        this.playerElement.removeChild(this.ulPlayerElement);
        this.renderAllPlayers();
    }

    renderAllPlayers(){
        console.log('here');
        this.sequenceArray = Storage.getAllSequence();
        console.log(this.sequenceArray);
        this.ulPlayerElement = document.createElement('ul');
        this.playerElement.appendChild(this.ulPlayerElement);
        for(let i = 0; i< this.sequenceArray.length; i++ ){
            let liPlayerElement = document.createElement('li');
            liPlayerElement.setAttribute('id',i);
            liPlayerElement.setAttribute('class','individual-sequence-player')
            this.ulPlayerElement.appendChild(liPlayerElement);
            this.renderPlayer(i);
        }
    }

    renderPlayer(i){
        this.playerInstanceName = 'player' + i;
        this.playerInstanceName = new Player(i,this.ulPlayerElement.children[i],this.width,this.height,'white',this.instruments)
        
    }
}



export default SequencePlayer;