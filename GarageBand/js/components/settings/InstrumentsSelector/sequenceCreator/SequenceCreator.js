import Storage from '../../../../../../GarageBand/js/components/utility/Storage.js';
class SequenceCreator {
  constructor(id, parentElement, width, height, color, sequence ,instruments) {
    this.parentElement = parentElement;
    this.element;
    this.width = width;
    this.height = height;
    this.id = id;
    this.backgroundColor = color;
    this.AUDIO_SRC = '../../../../../../../../Bio/Leapfrog/GarageBand/assets/audio/instruments';
    this.playingIndex = 0;
    this.sequenceIndex = 0;
    this.sequence = sequence;
    this.chordsSequence = [];
    this.sequenceListInstance;
    this.instruments = instruments;

  //for localstorage
    
  this.sequenceId;

  this.render()
  }
  render = function () {
    this.sequenceId = Storage.getNthIndex();
    this.element = document.createElement("div");
    this.parentElement.appendChild(this.element);
    this.element.setAttribute(
      "class",
      `sequence-creator-container-${this.id}`
    );
    this.element.style.width = `${this.width}%`;
    this.element.style.height = `${this.width}`;
    this.element.style.backgroundColor = this.backgroundColor;

    let HeadingElement = document.createElement('h2');
    HeadingElement.innerText = 'Sequence'
    this.element.appendChild(HeadingElement);  
    this.SequencesElement = document.createElement('div');
    this.SequencesElement.setAttribute('class','all-sequences-container');
    this.SequencesElement.style.height = '60px';
    this.SequencesElement.style.overflowX = 'scroll';
    this.SequencesElement.style.backgroundColor = 'grey';

    this.element.appendChild(this.SequencesElement);
    this.createSequence();
    this.createPlaySequence();
    this.createStopSequence();
    this.createSaveSequence();
  }

  //button
  createPlaySequence = function (){
    let playElement = document.createElement('button');
    this.element.appendChild(playElement);
    playElement.innerText = 'Play';
    playElement.style.padding = '5px 10px 5px 10px';
    playElement.style.marginLeft = '40px';
    playElement.addEventListener('click', e => this.playSequence());
    let playLogo = document.createElement('i');
    playLogo.setAttribute('class','fa');
    playLogo.classList.add('fa-play');
    playLogo.setAttribute('aria-hidden','true');
    playLogo.style.fontSize = '10px';
    playLogo.style.paddingLeft = '2px';

    playElement.appendChild(playLogo);


  }
  createStopSequence = function (){
    let stopElement = document.createElement('button');

    this.element.appendChild(stopElement);
    stopElement.innerText = 'Stop';
    stopElement.style.padding = '5px 10px 5px 10px';
    stopElement.addEventListener('click', e => this.stopSequence());

    let stopLogo = document.createElement('i');
    stopLogo.setAttribute('class','fa');
    stopLogo.classList.add('fa-stop');
    stopLogo.setAttribute('aria-hidden','true');
    stopLogo.style.fontSize = '10px';
    stopLogo.style.paddingLeft = '2px';
    stopElement.appendChild(stopLogo);

  }

  createSequence = function(){
    this.sequenceElement = document.createElement('span'); 
    this.sequenceElement.style.lineHeight = '35px';
    this.sequenceElement.style.marginLeft = '20px';

    this.SequencesElement.appendChild(this.sequenceElement);
  }

  createSaveSequence = function () {
    let saveSequenceElement = document.createElement('button');
    this.element.appendChild(saveSequenceElement);
    saveSequenceElement.innerText = 'Save Sequence';
    saveSequenceElement.style.padding = '5px 10px 5px 10px';
    saveSequenceElement.addEventListener('click', e => this.saveSequence());
  }

  saveSequence = function (){
    if(this.sequence.length === 0) return;
    this.sequenceId = Storage.getNthIndex();
    Storage.saveSequence(this.sequenceId,this.sequence);
    this.sequenceId ++;
  }

 clearSequence = function(){
   if(this.sequence.length != 0){
     this.SequencesElement.style.backgroundColor = 'red';
     setTimeout(()=>{
       this.SequencesElement.style.backgroundColor = 'grey'
     },500);
   }
   this.sequence = [];
   this.chordsSequence = [];
   this.sequenceIndex = 0;
   this.sequenceElement.innerText = this.chordsSequence ;
 }

  displaySequence = function(sequence){
    this.sequence = sequence;
    this.chordsSequence.push(this.instruments[this.sequence[this.sequenceIndex].instrumentId].chords[this.sequence[this.sequenceIndex].chordId].value);   
    this.sequenceIndex++;
    this.sequenceElement.innerText = (this.chordsSequence);
    this.SequencesElement.style.backgroundColor = 'green';
    setTimeout(()=>{
      this.SequencesElement.style.backgroundColor = 'grey'
    },500);
  } 

  playSequence = function (SEQUENCE_INTERVAL){    
      if(this.playingIndex === this.sequence.length){
        this.playingIndex = 0;
        clearTimeout(SEQUENCE_INTERVAL);
        return;
      }
      else{ 
        let audio = new Audio();
        let durationRate = this.sequence[this.playingIndex].durationRate.value;
        audio.src = this.instruments[this.sequence[this.playingIndex].instrumentId].chords[this.sequence[this.playingIndex].chordId].audioSrc;
        //delay to get audio attributes
        setTimeout(()=>{
          this.playingIndex ++;
            audio.play();
            if(durationRate != 1){
              setTimeout(()=>{
                  audio.currentTime = audio.duration;
              },(audio.duration * durationRate) * 1000)
            }
            const SEQUENCE_INTERVAL = setTimeout(()=>{
              audio.addEventListener('ended', this.playSequence(SEQUENCE_INTERVAL));
            },(audio.duration * durationRate) * 1000)
        },100)
      }  
  }

  stopSequence = function(){
    if(this.playingIndex != this.sequence.length){
      this.playingIndex = this.sequence.length;
    }
  }

}
export default SequenceCreator;
