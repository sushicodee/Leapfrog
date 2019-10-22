import Storage from '../../../../../../GarageBand/js/components/utility/Storage.js';
import Workspace from '../../../../../../GarageBand/js/components/workspace/Workspace.js';
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
    playElement.addEventListener('click', e => this.playSequence());

  }

  createStopSequence = function (){
    let playElement = document.createElement('button');
    this.element.appendChild(playElement);
    playElement.innerText = 'Stop';
    playElement.addEventListener('click', e => this.stopSequence());

  }

  createSequence = function(){
    this.sequenceElement = document.createElement('span'); 
    this.SequencesElement.appendChild(this.sequenceElement);
  }

  createSaveSequence = function () {
    let saveSequenceElement = document.createElement('button');
    this.element.appendChild(saveSequenceElement);
    saveSequenceElement.innerText = 'Save Sequence';
    saveSequenceElement.addEventListener('click', e => this.saveSequence());
  }

  saveSequence = function (){
    if(this.sequence.length === 0) return;
    this.sequenceId = Storage.getNthIndex();
    Storage.saveSequence(this.sequenceId,this.sequence);
    this.sequenceId ++;
    console.log(this.sequenceList);
    // if(this.sequenceList ! = null){

    // }
  }

 clearSequence = function(){
   this.sequence = [];
   this.chordsSequence = [];
   this.sequenceIndex = 0;
   this.sequenceElement.innerText = this.chordsSequence ;
 }

  displaySequence = function(sequence){
    this.sequence = sequence;
    console.log(this.sequence);
    this.chordsSequence.push(this.instruments[this.sequence[this.sequenceIndex].instrumentId].chords[this.sequence[this.sequenceIndex].chordId].value);   
    this.sequenceIndex++;
    this.sequenceElement.innerText = (this.chordsSequence);
  } 

  playSequence = function (sequenceInterval){    
      if(this.playingIndex === this.sequence.length){
        this.playingIndex = 0;
        clearTimeout(sequenceInterval);
        return;
      }
      else{ 
        let audio = new Audio();
        audio.src = this.instruments[this.sequence[this.playingIndex].instrumentId].chords[this.sequence[this.playingIndex].chordId].audioSrc;
        setTimeout(()=>{
          this.playingIndex ++;
            audio.play();
            const sequenceInterval = setTimeout(()=>{
              audio.addEventListener('ended', this.playSequence(sequenceInterval));
            },Math.floor(audio.duration) * 1000)
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
