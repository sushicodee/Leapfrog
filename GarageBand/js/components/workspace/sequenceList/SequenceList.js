// import Workspace from '../Workspace';
import Storage from '../../utility/Storage.js';
import SequencePlayer from './sequencePlayer/sequencePlayer.js';

class SequenceList {
    constructor(id,parentElement,width,height,color){
        this.parentElement = parentElement;
        this.element;
        this.width = width;
        this.height = height;
        this.id = id;
        this.backgroundColor = color;

//instruments mapping 
this.sequenceArray;
this.instruments = [
    { id: 0,
    value: 'Guitar',
    chords:[{id:0,value:'Blank',audioSrc:`${this.AUDIO_SRC}/drums/chords/blank.mp3`},
            {id : 1 ,value : 'E',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-E.mp3`},
            {id : 2,value : 'A',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-A.mp3`},
            {id : 3,value : 'D',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-D.mp3`},
            {id : 4,value : 'G',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-G.mp3`},
            {id : 5,value : 'B',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-B.mp3`},
            {id : 6,value : 'C',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-C.mp3`},
            {id : 7,value : 'F',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-F.mp3`},
            ]
    },
    { id: 1,
     value: 'Drums',
     chords:[{id:0,value:'Blank',audioSrc:`${this.AUDIO_SRC}/drums/chords/blank.mp3`},
            {id:1,value:'Aco_Snr',audioSrc:`${this.AUDIO_SRC}/drums/chords/Aco_Snr.mp3`},
            {id:2,value:'Afr_kick',audioSrc:`${this.AUDIO_SRC}/drums/chords/Afr_kick.mp3`},
            {id:3,value:'Aki_H2',audioSrc:`${this.AUDIO_SRC}/drums/chords/Aki_H2.mp3`},
            {id:4,value:'Aki_H4',audioSrc:`${this.AUDIO_SRC}/drums/chords/Aki_H4.mp3`},
            {id:5,value:'Ban_kick',audioSrc:`${this.AUDIO_SRC}/drums/chords/Ban_kick.mp3`},
            {id:6,value:'Bck_Snr',audioSrc:`${this.AUDIO_SRC}/drums/chords/Bck_Snr.mp3`},
            {id:7,value:'Ben_kick',audioSrc:`${this.AUDIO_SRC}/drums/chords/Ben_kick.mp3`},
            {id:8,value:'Bngo_4',audioSrc:`${this.AUDIO_SRC}/drums/chords/Bngo_4.mp3`},
            {id:9,value:'Cel_snr',audioSrc:`${this.AUDIO_SRC}/drums/chords/Cel_snr.mp3`}],
    }
];

        this.render();
        this.renderChild();

       
    }

    render = function () {
        this.element = document.createElement('div');
        this.parentElement.appendChild(this.element);
        this.element.setAttribute('class','sequence-list-container');
        this.element.style.width = `${100}%`;
        this.element.style.backgroundColor = this.backgroundColor;

        //render Title
        let titleElement = document.createElement('h2');
        titleElement.innerText = 'Avaliable Sequences';
        this.element.appendChild(titleElement);

        let refreshElement = document.createElement('button');
        refreshElement.innerText = 'Refresh';
        this.element.appendChild(refreshElement);
        refreshElement.addEventListener('click' , e => this.handleRefresh())

        let clearTracksElement = document.createElement('button');
        clearTracksElement.innerText = 'Clear All Tracks';
        this.element.appendChild(clearTracksElement);
        clearTracksElement.addEventListener('click' , e => this.handleClearTracks())



    }
    handleRefresh = function(){
        if(this.renderListUl.childrenCount != Storage.getNthIndex){
            this.listUlElement.parentNode.removeChild(this.listUlElement);
            this.renderListUl();
            this.sequencePlayerInstance.handleRefresh();
        }
        
    }

    handleClearTracks = function(){
            Storage.DeleteAllTracks();
            this.handleRefresh();
            this.sequencePlayerInstance.handleRefresh();

            // this.renderListUl();
        
    }


    renderChild = function(){
        //render ul li
        this.renderList();
        this.renderSequencePlayer();
    

    }

    renderList(){
        this.renderList = document.createElement('div');
        this.renderList.setAttribute('class','all-sequence-list');
        this.element.appendChild(this.renderList);
        this.renderListUl();

        
    }

    renderSequencePlayer = function(){
        this.sequencePlayerInstance = new SequencePlayer(this.id,this.element,this.width,this.height,'purple',this.instruments,this.sequenceArray);
    }

    renderListUl(){
         this.listUlElement = document.createElement('ul');
        this.renderList.appendChild(this.listUlElement);
        this.renderListLi(this.listUlElement);

    }

    renderListLi(){
        this.sequenceArray = Storage.getAllSequence();
        console.log('sequenceArray',this.sequenceArray);
        for(let i = 0; i < this.sequenceArray.length; i++){
            this.liElement = document.createElement('li');
            this.listUlElement.appendChild(this.liElement);
            this.liElement.setAttribute('id',i);  
            this.liElement.setAttribute('class','tracks')
            let indexElement = document.createElement('span');
            indexElement.innerText = i;
            this.liElement.appendChild(indexElement);
            let numberofSequences = this.sequenceArray[i].track.length;

            console.log(numberofSequences)
            for(let j = 0; j < numberofSequences;j++){
                //    console.log(this.instruments[this.sequenceArray[j].track[j].instrumentId].chords[this.sequenceArray[j].track[j].chordId].value);
               let instrumentCordsElement = document.createElement('span');
               instrumentCordsElement.innerText = (this.instruments[this.sequenceArray[i].track[j].instrumentId].chords[this.sequenceArray[i].track[j].chordId].value);
               instrumentCordsElement.setAttribute('id', j);
               this.liElement.appendChild(instrumentCordsElement)

            }
            this.deleteTrackButton(i);
        
            }
    }
    
    deleteTrackButton = function(index){
        let deleteElement = document.createElement('button');
        deleteElement.setAttribute('id',index);
        deleteElement.innerHTML = 'Delete Track';
        this.liElement.appendChild(deleteElement);
        deleteElement.addEventListener('click', e => this.handleDeleteTrack(index))

    }

    handleDeleteTrack = function(index){
        console.log(this.liElement.parentNode.children[index]);
        Storage.deleteTrack(index);
        // setTimeout(()=>{
        //     this.renderListUl();
        // },10)
        //     this.listUlElement.parentNode.removeChild(this.listUlElement)
        this.handleRefresh();
        this.sequencePlayerInstance.handleRefresh();


        


    }
    
}
export default SequenceList;