import Storage from '../../../../utility/Storage.js';
class Player{
    constructor(id,parentElement,width,height,color,instruments){
        this.init(id,parentElement,width,height,color,instruments);
    }
    init(id,parentElement,width,height,color,instruments){

        this.id = id;
        this.parentElement = parentElement;
        this.width = width;
        this.height = height;
        this.backgroundColor = color;
        this.instruments = instruments;
        this.sequenceArray = Storage.getAllSequence();
        
        //localVariables
        this.volume;
        this.tempo;
        this.filter;
        this.delay;

        this.render();
        this.renderChild();
    }
    render(){
        this.element = document.createElement('div');
        this.element.style.width = '100%';
        this.element.style.backgroundColor = this.backgroundColor;
        this.parentElement.appendChild(this.element);
    }

    renderChild(){
        this.createDisplaySequence();
        this.createSequenceTitle();
        this.createcontrols();
        this.createPlayButton();
        this.createStopButton();
        this.createTempoButtons();
        this.createVolumeButtons();
    }
    createSequenceTitle(){
        let sequenceTitle = document.createElement('h2');
        sequenceTitle.innerText = ` Sequence ${this.id}`
        this.displayTonesElement.appendChild(sequenceTitle) 
    }

  
    // this.instruments = [
    //     { id: 0,
    //     value: 'Guitar',
    //     chords:[{id:0,value:'Blank',audioSrc:`${this.AUDIO_SRC}/drums/chords/blank.mp3`},
    //             {id : 1 ,value : 'E',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-E.mp3`},
    //             {id : 2,value : 'A',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-A.mp3`},
    //             {id : 3,value : 'D',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-D.mp3`},
    //             {id : 4,value : 'G',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-G.mp3`},
    //             {id : 5,value : 'B',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-B.mp3`},
    //             {id : 6,value : 'C',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-C.mp3`},
    //             {id : 7,value : 'F',audioSrc:`${this.AUDIO_SRC}/guitar/chords/cleanchord-F.mp3`},
    //             ]
    //     },
    //     { id: 1,
    //      value: 'Drums',
    //      chords:[{id:0,value:'Blank',audioSrc:`${this.AUDIO_SRC}/drums/chords/blank.mp3`},
    //             {id:1,value:'Aco_Snr',audioSrc:`${this.AUDIO_SRC}/drums/chords/Aco_Snr.mp3`},
    //             {id:2,value:'Afr_kick',audioSrc:`${this.AUDIO_SRC}/drums/chords/Afr_kick.mp3`},
    //             {id:3,value:'Aki_H2',audioSrc:`${this.AUDIO_SRC}/drums/chords/Aki_H2.mp3`},
    //             {id:4,value:'Aki_H4',audioSrc:`${this.AUDIO_SRC}/drums/chords/Aki_H4.mp3`},
    //             {id:5,value:'Ban_kick',audioSrc:`${this.AUDIO_SRC}/drums/chords/Ban_kick.mp3`},
    //             {id:6,value:'Bck_Snr',audioSrc:`${this.AUDIO_SRC}/drums/chords/Bck_Snr.mp3`},
    //             {id:7,value:'Ben_kick',audioSrc:`${this.AUDIO_SRC}/drums/chords/Ben_kick.mp3`},
    //             {id:8,value:'Bngo_4',audioSrc:`${this.AUDIO_SRC}/drums/chords/Bngo_4.mp3`},
    //             {id:9,value:'Cel_snr',audioSrc:`${this.AUDIO_SRC}/drums/chords/Cel_snr.mp3`}],
    //     }
    // ];
    createDisplaySequence(){
        this.displayTonesElement = document.createElement('div')
        this.element.appendChild(this.displayTonesElement);
        console.log(this.sequenceArray[this.id]);
        let currentSequenceArray = this.sequenceArray[this.id].track;
        console.log(currentSequenceArray.length,'numberofseq')
        for(let i = 0; i< currentSequenceArray.length; i++){
            let instrumentId = currentSequenceArray[i].instrumentId
            let toneId = currentSequenceArray[i].chordId;
            this.displayTonesElement.innerText+= this.instruments[instrumentId].chords[toneId].value;
            // console.log(this.instruments[instrumentId].chords[toneId].value)
            // console.log(this.instruments[currentSequenceArray[i]])
            // console.log()
        }
      
    }

    createcontrols(){
        this.createcontrolsElement = document.createElement('div');
        this.createcontrolsElement.setAttribute('class', 'Sequence-controls-container');
        this.element.appendChild(this.createcontrolsElement);
    }

    createPlayButton(){
        this.playElement = document.createElement('button');
        this.playElement.innerText = 'Play Sequence';
        this.createcontrolsElement.appendChild(this.playElement);
        this.playElement.addEventListener('clcik', e => this.handlePlaySequence());
    }

    handlePlaySequence(e){

    }

    createStopButton(){
        this.stopElement = document.createElement('button');
        this.stopElement.innerText = 'Stop Sequence';
        this.createcontrolsElement.appendChild(this.stopElement);
        this.stopElement.addEventListener('clcik', e => this.handleStopSequence());


    }

    handleStopSequence(e){

    }



    createTempoButtons(){
        this.tempoButtonsElement = document.createElement('div');
        this.tempoButtonsElement.setAttribute('class','tempo-controls-container');
        this.createcontrolsElement.appendChild(this.tempoButtonsElement);

        let tempoTitleElement = document.createElement('h3');
        tempoTitleElement.innerText = 'Tempo'
        this.tempoButtonsElement.appendChild(tempoTitleElement);

        
        this.decreaseTempoButton = document.createElement('button');
        this.decreaseTempoButton.innerText = '-';
        this.tempoButtonsElement.appendChild(this.decreaseTempoButton);
        this.decreaseTempoButton.addEventListener('click', e=> this.handleDecreaseTempo());
        
        this.increaseTempoButton = document.createElement('button');
        this.increaseTempoButton.innerText = '+';
        this.tempoButtonsElement.appendChild(this.increaseTempoButton);
        this.increaseTempoButton.addEventListener('click', e=> this.handleIncreaseTempo());
        
    }

    createVolumeButtons(){
        this.volumeButtonsElement = document.createElement('div');
        this.volumeButtonsElement.setAttribute('class','volume-controls-container');
        this.createcontrolsElement.appendChild(this.volumeButtonsElement);

        let volumeTitleElement = document.createElement('h3');
        volumeTitleElement.innerText = 'Volume'
        this.volumeButtonsElement.appendChild(volumeTitleElement);

        
        this.decreaseVolumeButton = document.createElement('button');
        this.decreaseVolumeButton.innerText = '-';
        this.volumeButtonsElement.appendChild(this.decreaseVolumeButton);
        this.decreaseVolumeButton.addEventListener('click', e=> this.handleDecreaseVolume());
        
        this.increaseVolumeButton = document.createElement('button');
        this.increaseVolumeButton.innerText = '+';
        this.volumeButtonsElement.appendChild(this.increaseVolumeButton);
        this.increaseVolumeButton.addEventListener('click', e=> this.handleIncreaseVolume());
    }

    


}
export default Player;