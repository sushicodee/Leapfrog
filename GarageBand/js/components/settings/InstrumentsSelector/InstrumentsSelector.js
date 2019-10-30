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
    this.durationsArray = [{id:0,name:'full',value:1},
    {id:1,name:'halfrate',value:0.5},
    {id:2,name:'1/3',value:1/3},
    {id:3,name:'1/4',value:1/4},];
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
    let selectedIndex = e.target.parentElement.children[5].selectedIndex
    if(selectedIndex != 0){
      audioElement.play();
      let durationRate = this.durationsArray[e.target.parentElement.children[5].selectedIndex].value;
      setTimeout(()=>{
        audioElement.pause();
      }, (audioElement.duration * durationRate) * 1000)
    }else{
    audioElement.play();
    }
  }

  renderInstruments(){
    this.instrumentsElement = document.createElement('div');
    this.element.appendChild(this.instrumentsElement);
    this.instrumentsElement.style.position = 'relative';
    
    for(let i =0; i< this.instruments.length; i++){

          this.instrument = document.createElement('div');
          this.instrument.width = `${this.width}%`;
          this.instrument.setAttribute('class', `${this.instruments[i].value}-container`);
          this.instrument.setAttribute('id', this.instruments[i].id);
          this.instrument.style.display = 'none';
          this.instrument.style.height = '522px';
          this.instrument.style.overflowY = 'scroll';
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
              playerElement.style.backgroundColor = 'dimgrey';
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
            //  previewButton.style.color = 'white';
            //  previewButton.style.backgroundColor = 'black';
             previewButton.style.padding = '5px 10px 5px 10px';
             previewButton.style.marginLeft = '30px';
             previewButton.style.marginRight = '10px';
             previewButton.setAttribute('id',this.instruments[i].chords[j].id);
             playerElement.appendChild(previewButton);
             previewButton.addEventListener('click', e => this.playAudio(e,audioElement));
            //add to sequence
             let addButton = document.createElement('button');
             addButton.innerText = 'Add To Sequence';   
            //  addButton.style.backgroundColor = 'black';
            //  addButton.style.color = 'white';
             addButton.style.padding = '5px 10px 5px 10px';
             addButton.setAttribute('id',this.instruments[i].chords[j].id);
             playerElement.appendChild(addButton);
             addButton.addEventListener('click', e => this.handleAddToSequence(e,i,j));
             
             let durationTitle = document.createElement('label');
             durationTitle .innerText = 'Duration Rate';
             durationTitle.style.color = 'white';
             durationTitle.style.paddingLeft = '30px';

             playerElement.appendChild(durationTitle);
             this.durationElement = document.createElement('select');
             this.durationElement.setAttribute('id',j);
             this.durationElement.setAttribute('class','select-duration');
             this.durationElement.style.marginLeft = '20px';
             playerElement.appendChild(this.durationElement);

             for(let k =0; k< this.durationsArray.length; k++){
               let optionElement = document.createElement('option');
               optionElement.setAttribute('id', this.durationsArray[k].id);
               optionElement.setAttribute('value', this.durationsArray[k].value);
               optionElement.innerText = this.durationsArray[k].name;
               this.durationElement.appendChild(optionElement);
               this.durationElement.setAttribute('selectedIndex', 0);
             }
             this.durationElement.addEventListener("click", e => this.handleDurationChange(e,this.selectElement)
           );
            }           
          }   
          this.renderInstrument();     
     }

  handleDurationChange(e){
    this.durationElement.setAttribute('selectedIndex', e.target.selectedIndex);
  }

  handleClearSequence = function(){
      this.sequence = [];
      this.sequenceCreator.clearSequence();
      this.instrumentsElement.parentNode.removeChild(this.instrumentsElement);
      this.renderInstruments();
  }


  handleAddToSequence = function(e,i,j) {
      let sequence = {instrumentId: i, chordId : j, durationRate : this.durationsArray[this.durationElement.getAttribute('selectedIndex')]};
      this.sequence.push(sequence);      
      this.sequenceCreator.displaySequence(this.sequence);
      
  }   
  
  renderInstrument = function (){
      //conditional display
      for(let i =0; i< this.instruments.length; i++){
          let instrument = this.instrumentsElement.children[i]; 
          this.selectedInstrument != this.instruments[i].id ? instrument.style.display = 'none':instrument.style.display ='block'; 
      }
      
  }

  renderChild() {
    this.createSelectBox();
  }

  createSequence = function() {
    let sequenceCreator = new SequenceCreator(this.id,this.element,this.width,undefined,'white',this.sequence,this.instruments);
    this.sequenceCreator = sequenceCreator;
  }

  handleSelectChange = function(e, element) {
    let selectedIndex = element.selectedIndex;
    for (let i = 0; i < this.instruments.length; i++) {
      this.selectElement.children[i].removeAttribute("selected");
    }
    element.children[selectedIndex].setAttribute("selected", true);
    this.selectedInstrument = selectedIndex;
    this.renderInstrument();
    this.sequenceCreator.clearSequence();
  };

  createSelectBox = function() {
    //title
    let selectorTitle = document.createElement("h2");
    selectorTitle.innerText = "Select Instrument";

    //select
    this.element.appendChild(selectorTitle);
    this.selectElement = document.createElement("select");
    this.selectElement.setAttribute("class", "select-instrument");
    this.selectElement.style.padding = '10px';
    this.selectElement.style.width = `${this.width}%`;
    this.element.appendChild(this.selectElement);

    let clearButton = document.createElement('button');
    clearButton.setAttribute('class', 'discard-sequence-button')
    clearButton.innerText = 'Discard Sequence';   
    clearButton.style.padding = '5px 10px 5px 10px';
    clearButton.style.display = 'block';
    clearButton.style.margin = ' 10px auto';
    clearButton.style.borderRadius = '4px';

  
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
