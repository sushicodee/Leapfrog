import SequenceCreator from "./sequenceCreator/SequenceCreator.js";

class InstrumentSelector {
  constructor(id, parentElement, width, height, color) {
    this.parentElement = parentElement;
    this.element;
    this.width = width;
    this.height = height;
    this.id = id;
    this.backgroundColor = color;
    this.AUDIO_SRC = '../../../../../../../Bio/Leapfrog/GarageBand/assets/audio/instruments';
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
  
    this.selectedInstrument = 0;
    //select instruments
    this.selectElement;

    this.sequence = [];

    this.render();
    this.renderChild();
    this.createSequence();
    this.renderInstruments();
  }

  render() {
    this.element = document.createElement("div");
    this.parentElement.appendChild(this.element);
    this.element.setAttribute(
      "class",
      `instrument-selector-container-${this.id}`
    );
    this.element.style.width = `${this.width}%`;
    this.element.style.height = `${this.width}`;
    this.element.style.backgroundColor = this.backgroundColor;
  }

  playAudio = function (e,audioElement) {
    audioElement.currentTime = 0;  
    audioElement.play();
  }

  renderInstruments(){
    this.instrumentsElement = document.createElement('div');
    this.element.appendChild(this.instrumentsElement);
    this.instrumentsElement.style.position = 'relative';
    console.log('here');
    
    for(let i =0; i< this.instruments.length; i++){

          this.instrument = document.createElement('div');
          this.instrument.width = `${this.width}%`;
          this.instrument.setAttribute('class', `${this.instruments[i].value}-container`);
          this.instrument.setAttribute('id', this.instruments[i].id);
          this.instrument.style.display = 'none';
          this.instrumentsElement.appendChild(this.instrument);
          //title
          let titleElement = document.createElement('h3');
          titleElement.innerText = this.instruments[i].value;
          this.instrument.appendChild(titleElement);
         
          
          //create chords buttons
          let numberOfChords = this.instruments[i].chords.length;
          for(let j = 0; j< numberOfChords; j++){
              let playerElement = document.createElement('div');
              this.instrument.appendChild(playerElement);          
            //   playerElement.style.width = `${100/numberOfChords}%`
              playerElement.style.padding ='10px 20px 10px 20px'; 

              playerElement.style.border = '1px solid white';
              playerElement.style.color = 'white';
              playerElement.style.backgroundColor = 'black';
              let toneHeading = document.createElement('h3');
              toneHeading.innerText = this.instruments[i].chords[j].value;
              playerElement.appendChild(toneHeading);

             //audio
             let audioElement = document.createElement('audio');
             audioElement.setAttribute('class','sound');
             audioElement.setAttribute('id',this.instruments[i].chords[j].id);
             audioElement.setAttribute('src',`${this.instruments[i].chords[j].audioSrc}`); 

             playerElement.appendChild(audioElement);
             //preview
             let previewButton = document.createElement('button');
             previewButton.innerText = 'play';
             previewButton.style.color = 'white';
             previewButton.style.backgroundColor = 'black';
             previewButton.setAttribute('id',this.instruments[i].chords[j].id);
             playerElement.appendChild(previewButton);
             previewButton.addEventListener('click', e => this.playAudio(e,audioElement))
            //add to sequence
             let addButton = document.createElement('button');
             addButton.innerText = 'Add To Sequence';   
             addButton.style.backgroundColor = 'black';
             addButton.style.color = 'white';
             addButton.setAttribute('id',this.instruments[i].chords[j].id);
             playerElement.appendChild(addButton);
             addButton.addEventListener('click', e => this.handleAddToSequence(e,i,j))

             
            }           
          }   
          this.renderInstrument();     
     }
  handleClearSequence = function(){
      this.sequence = [];
      this.sequenceCreator.clearSequence();
      setTimeout(() => { 
        console.log('here');
        this.renderInstruments();
      },100)
      this.instrumentsElement.parentNode.removeChild(this.instrumentsElement);
  }


  handleAddToSequence = function(e,i,j) {
      let sequence = {instrumentId: i, chordId : j };
      this.sequence.push(sequence);      
      console.log(this.sequence)
      this.sequenceCreator.displaySequence(this.sequence);
      
  }   
  
  renderInstrument = function (){
      //conditional display
      for(let i =0; i< this.instruments.length; i++){
          let instrument = this.instrumentsElement.children[i]; 
          console.log('inst',instrument);
          console.log('seleted',this.selectedInstrument); 
          this.selectedInstrument != this.instruments[i].id ? instrument.style.display = 'none':instrument.style.display ='block'; 
      }
      
  }

  renderChild() {
    this.createSelectBox();
  }

  createSequence = function() {
    let sequenceCreator = new SequenceCreator(this.id,this.element,this.width,undefined,'blue',this.sequence,this.instruments);
    this.sequenceCreator = sequenceCreator;
  }

  handleSelectChange = function(e, element) {
    let selectedIndex = element.selectedIndex;
    for (let i = 0; i < this.instruments.length; i++) {
      this.selectElement.children[i].removeAttribute("selected");
    }
    console.log('instrument selected ',selectedIndex);
    element.children[selectedIndex].setAttribute("selected", true);
    this.selectedInstrument = selectedIndex;
    this.renderInstrument();
  };

  createSelectBox = function() {
    //title
    let selectorTitle = document.createElement("h2");
    selectorTitle.innerText = "Select Instrument";

    //select
    this.element.appendChild(selectorTitle);
    this.selectElement = document.createElement("select");
    this.selectElement.setAttribute("class", "select-instrument");

    this.selectElement.style.width = `${this.width}%`;
    this.element.appendChild(this.selectElement);

    let clearButton = document.createElement('button');
    clearButton.innerText = 'Discard Sequence';   
    clearButton.style.backgroundColor = 'black';
    clearButton.style.color = 'white';
    this.element.appendChild(clearButton);
    clearButton.addEventListener('click', e => this.handleClearSequence(e))

    //options
    for (let i = 0; i < this.instruments.length; i++) {
      let optionElement = document.createElement("option");
      optionElement.setAttribute("class", `option-${i}`);
      optionElement.setAttribute("id", i);
      optionElement.setAttribute("value", `${this.instruments[i].value}`);
      optionElement.innerText = this.instruments[i].value;
      this.selectElement.appendChild(optionElement);

      this.selectElement.addEventListener("click", e =>
        this.handleSelectChange(e, this.selectElement)
      );
      //default selection
      this.selectElement.firstChild.setAttribute("selected", true);
    }
    
  };
}
export default InstrumentSelector;
