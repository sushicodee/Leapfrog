import Storage from '../../../../utility/Storage.js';
// import BufferLoader from '../../../../utility/BufferLoader.js';
class Player {
  constructor(id, parentElement, width, height, color, instruments) {
    this.init(id, parentElement, width, height, color, instruments);
  }
  init(id, parentElement, width, height, color, instruments) {
    this.id = id;
    this.parentElement = parentElement;
    this.width = width;
    this.height = height;
    this.backgroundColor = color;
    this.loop = false;
    this.AUDIO_SRC = '../../../../../../../../Leapfrog/GarageBand/assets/audio/instruments';

    // this.AUDIO_SRC = '../../../../../../../../../Bio/Leapfrog/GarageBand/assets/audio/instruments';
    // this.instruments = instruments;
    this.instruments = [
      {
        id: 0,
        value: 'Guitar',
        chords: [
          {
            id: 0,
            value: 'Blank',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/blank.mp3`
          },
          {
            id: 1,
            value: 'E',
            audioSrc: `${this.AUDIO_SRC}/guitar/chords/cleanchord-E.mp3`
          },
          {
            id: 2,
            value: 'A',
            audioSrc: `${this.AUDIO_SRC}/guitar/chords/cleanchord-A.mp3`
          },
          {
            id: 3,
            value: 'D',
            audioSrc: `${this.AUDIO_SRC}/guitar/chords/cleanchord-D.mp3`
          },
          {
            id: 4,
            value: 'G',
            audioSrc: `${this.AUDIO_SRC}/guitar/chords/cleanchord-G.mp3`
          },
          {
            id: 5,
            value: 'B',
            audioSrc: `${this.AUDIO_SRC}/guitar/chords/cleanchord-B.mp3`
          },
          {
            id: 6,
            value: 'C',
            audioSrc: `${this.AUDIO_SRC}/guitar/chords/cleanchord-C.mp3`
          },
          {
            id: 7,
            value: 'F',
            audioSrc: `${this.AUDIO_SRC}/guitar/chords/cleanchord-F.mp3`
          }
        ]
      },
      {
        id: 1,
        value: 'Drums',
        chords: [
          {
            id: 0,
            value: 'Blank',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/blank.mp3`
          },
          {
            id: 1,
            value: 'Aco_Snr',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/Aco_Snr.mp3`
          },
          {
            id: 2,
            value: 'Afr_kick',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/Afr_kick.mp3`
          },
          {
            id: 3,
            value: 'Aki_H2',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/Aki_H2.mp3`
          },
          {
            id: 4,
            value: 'Aki_H4',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/Aki_H4.mp3`
          },
          {
            id: 5,
            value: 'Ban_kick',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/Ban_kick.mp3`
          },
          {
            id: 6,
            value: 'Bck_Snr',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/Bck_Snr.mp3`
          },
          {
            id: 7,
            value: 'Ben_kick',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/Ben_kick.mp3`
          },
          {
            id: 8,
            value: 'Bngo_4',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/Bngo_4.mp3`
          },
          {
            id: 9,
            value: 'Cel_snr',
            audioSrc: `${this.AUDIO_SRC}/drums/chords/Cel_snr.mp3`
          }
        ]
      }
    ];
    this.displayTonesElement;

    this.sequenceArray = Storage.getAllSequence();
    this.ctx = {};
    this.source = null;
    this.bufferList = [];
    this.bufferLoader = {};
    //localVariables
    this.gain = 0;
    this.playbackRate = 1;
    this.frequency = 20;
    this.qFactor = 0;
    this.FILTERS = [
      { id: 0, value: 'Lowpass' },
      { id: 1, value: 'Highpass' },
      { id: 2, value: 'Bandpass' },
      { id: 3, value: 'Lowshelf' },
      { id: 4, value: 'Highshelf' },
      { id: 5, value: 'Peaking' },
      { id: 6, value: 'Notch' },
      { id: 7, value: 'Allpass' }
    ];
    this.delay;
    this.distortion;
    this.mute = false;

    this.render();
    this.renderChild();
    this.renderAudio();
  }

  render() {
    this.element = document.createElement('div');
    this.element.style.width = '100%';
    this.element.style.backgroundColor = this.backgroundColor;
    this.parentElement.appendChild(this.element);
  }

  renderChild() {
    this.createSequenceTitle();
    this.createDisplaySequence();
    this.renderAudio();
    this.createcontrols();
    this.createPlayButton();
    this.createStopButton();
    this.createLoopRadio();
    this.createTempoButtons();
    this.createVolumeButtons();
    this.createFilterSelect();
  }

  renderAudio() {
    this.createContextAndSource();
  }

  createSequenceTitle() {
    let sequenceTitle = document.createElement('h2');
    sequenceTitle.innerText = ` Sequence ${this.id}`;
    this.element.appendChild(sequenceTitle);
  }

  createDisplaySequence() {

    let currentSequenceArray = this.sequenceArray[this.id].track;
    this.displayInstrumentImg = document.createElement('div');
    this.element.appendChild(this.displayInstrumentImg);
    let imgElement = document.createElement('img');
    imgElement.setAttribute('src',`../../../../../../../../../Bio/Leapfrog/GarageBand/assets/images/${currentSequenceArray[0].instrumentId}.png`);
    imgElement.style.width = '300px';
    imgElement.style.margin = 'auto';
    imgElement.style.display = 'block';

    this.displayInstrumentImg.appendChild(imgElement);
    this.displayTonesElement = document.createElement('div');
    this.displayTonesElement.setAttribute('class', `track-${this.id}`);
    this.displayTonesElement.style.height = '20px';
    this.displayTonesElement.style.margin = '10px 0 10px 0';
  
    this.element.appendChild(this.displayTonesElement);
    for (let i = 0; i < currentSequenceArray.length; i++) {
      let instrumentId = currentSequenceArray[i].instrumentId;
      let toneId = currentSequenceArray[i].chordId;
      let toneElement = document.createElement('span');
      toneElement.setAttribute('class', 'tone');
      toneElement.setAttribute('id', i);
      toneElement.style.padding = '10px';
      toneElement.style.color = 'black';
      toneElement.innerText = this.instruments[instrumentId].chords[
        toneId
      ].value;
      this.displayTonesElement.appendChild(toneElement);
    }
  }

  createContextAndSource() {
    let sequences = Storage.getAllSequence();
    this.ctx = new AudioContext();
    this.source = null;
    this.bufferList = [];
    this.bufferLoader = {};
    let currentSequenceArray = sequences[this.id].track;
    for (let j = 0; j < currentSequenceArray.length; j++) {
      let instrumentId = currentSequenceArray[j].instrumentId;
      let toneId = currentSequenceArray[j].chordId;
      let audioSrc = this.instruments[instrumentId].chords[toneId].audioSrc;
      this.bufferList.push(audioSrc);
    }
  }

  stopBufferAudio() {
    if (Object.keys(this.bufferLoader).length == 0) {
      return;
    }
    else{
      this.bufferLoader.stopAudio();
    }
  }

  stopAndRefresh(){
    if (Object.keys(this.bufferLoader).length == 0) {
      return;
    }
    else{
      this.bufferLoader.stopAudio();
      this.bufferLoader.reset();
    }
  }

  bufferAudio() {
    let sequences = Storage.getAllSequence();
    this.currentSequenceArray = sequences[this.id].track;
    this.bufferLoader = new BufferLoader(
      this.ctx,
      this.bufferList,
      this.currentSequenceArray,
      this.loadedAudio
    );
    this.bufferLoader.trackElement(this.displayTonesElement);
    this.bufferLoader.load();
    this.bufferLoader.loopAudioBuffer(this.loop);
  }

  loadedAudio(bufferList) {
    this.sourceArray = [];
    for (let i = 0; i < bufferList.length; i++) {
      this.source = `source${i}`;
      this.source = this.context.createBufferSource();
      this.source.buffer = bufferList[i];
      this.source.connect(this.context.destination);
      this.sourceArray.push(this.source);
    }
    this.playAudio(this.sourceArray, bufferList);
  }

  createcontrols() {
    this.createcontrolsElement = document.createElement('div');
    this.createcontrolsElement.setAttribute(
      'class',
      'Sequence-controls-container'
    );
    this.createcontrolsElement.style.backgroundColor = 'rgba(0, 0, 0, 0.822)';
    this.playElement = document.createElement('button');
    this.playElement.setAttribute('class', 'player-play-btn');
    this.element.appendChild(this.createcontrolsElement);
  }
  createPlayButton() {
    this.playElement.innerText = 'Play Sequence';
    this.playElement.style.padding = '5px 10px 5px 10px';
    this.playElement.style.marginLeft = '202px';
    this.playElement.style.marginRight = '10px';


    this.createcontrolsElement.appendChild(this.playElement);
    this.playElement.addEventListener('click', e => this.handlePlaySequence());
  }

  handlePlaySequence(e) {
    if (Object.keys(this.bufferLoader).length == 0) {
      this.bufferAudio();
    } else {
      this.stopBufferAudio();
      this.bufferAudio();
    }
  }

  createStopButton() {
    this.stopElement = document.createElement('button');
    this.stopElement.innerText = 'Stop Sequence';
    this.createcontrolsElement.appendChild(this.stopElement);
    this.stopElement.style.padding = '5px 10px 5px 10px';
    this.stopElement.setAttribute('class', 'player-stop-btn');


    this.stopElement.addEventListener('click', e => this.handleStopSequence());
  }

  handleStopSequence(e) {
    this.stopBufferAudio();
  }

  createLoopRadio() {
    let loopLabel = document.createElement('label');
    this.createcontrolsElement.appendChild(loopLabel);
    loopLabel.style.marginLeft = '10px';
    loopLabel.style.marginRight = '10px';

    loopLabel.innerText = 'Loop';
    this.loopElement = document.createElement('input');
    this.createcontrolsElement.appendChild(this.loopElement);
    this.loopElement.setAttribute('type', 'checkbox');
    this.loopElement.setAttribute('id', this.id);
    this.loopElement.setAttribute('name', 'loop');

    this.loopElement.setAttribute('defaultChecked', false);
    this.loopElement.addEventListener('click', e => this.handleLoop(e));
  }

  handleLoop(e) {
    this.loopElement.setAttribute('checked', `${e.target.checked}`);
    this.loop = e.target.checked;
    this.stopBufferAudio();
  }

  createTempoButtons() {
    this.tempoButtonsElement = document.createElement('div');
    this.tempoButtonsElement.setAttribute('class', 'tempo-controls-container');
    this.createcontrolsElement.appendChild(this.tempoButtonsElement);

    let tempoTitleElement = document.createElement('h3');
    tempoTitleElement.innerText = 'Tempo';
    tempoTitleElement.style.margin = '10px 0';
    
    this.tempoButtonsElement.appendChild(tempoTitleElement);

    this.tempoElement = document.createElement('input');
    this.tempoElement.style.marginLeft = '202px'
    this.tempoElement.style.width = '300px'

    this.tempoElement.setAttribute('type', 'range');
    this.tempoElement.setAttribute('min', '0.25');
    this.tempoElement.setAttribute('max', '3');
    this.tempoElement.setAttribute('step', '0.05');
    this.tempoElement.setAttribute('value', '1');
    this.tempoButtonsElement.appendChild(this.tempoElement);
    this.tempoElement.addEventListener('change', e =>
      this.handleTempoChange(e)
    );

    this.tempoInfo = document.createElement('span');
    this.tempoInfo.innerText = this.playbackRate;
    this.tempoButtonsElement.appendChild(this.tempoInfo);
  }

  handleTempoChange(e) {
    this.playbackRate = e.target.value;
    this.tempoInfo.innerText = this.playbackRate;
    if (Object.keys(this.bufferLoader).length == 0) {
      return;
    } else {
      this.bufferLoader.changeTempo(this.playbackRate);
    }
  }

  createFilterSelect() {
    this.selectFilterElement = document.createElement('div');
    this.selectFilterElement.setAttribute('class', 'filter-select-container');
    this.createcontrolsElement.appendChild(this.selectFilterElement);
    let filterHeading = document.createElement('h3');
    filterHeading.style.margin = '10px 0';
    filterHeading.innerText = 'Filter';
    this.selectFilterElement.appendChild(filterHeading);


    this.typeLabel = document.createElement('label');
    this.typeLabel.innerText = 'Type';
    this.typeLabel.style.marginLeft = '202px';
    this.selectFilterElement.appendChild(this.typeLabel);
    this.selectFilterBox = document.createElement('select');
    this.selectFilterBox.style.marginLeft = '10px';

    this.selectFilterElement.appendChild(this.selectFilterBox);
    for (let i = 0; i < this.FILTERS.length; i++) {
      let option = document.createElement('option');
      option.setAttribute('id', this.FILTERS[i].id);
      option.setAttribute('value', this.FILTERS[i].value);
      option.innerText = this.FILTERS[i].value;
      this.selectFilterBox.appendChild(option);
    }

    this.selectFilterBox.addEventListener('click', e => this.handleFilterChange(e));
    this.filterControls = document.createElement('div');
    this.selectFilterElement.appendChild(this.filterControls);
    this.filterControls.style.display = 'flex';
    this.filterControls.style.flexDirection = 'column';
    this.filterControls.style.width = '300px';
    this.filterControls.style.margin = 'auto';



    this.frequencyLabel = document.createElement('label');
    this.frequencyLabel.innerText = 'Frequency';
    this.filterControls.appendChild(this.frequencyLabel);
    this.frequencyLabel.style.marginTop = '20px';

    


    this.frequencyElement = document.createElement('input');
    this.frequencyElement.setAttribute('type', 'range');
    this.frequencyElement.setAttribute('min', '20');
    this.frequencyElement.setAttribute('max', '20000');
    this.frequencyElement.setAttribute('step', '1');
    this.frequencyElement.setAttribute('value', '20');
    this.filterControls.appendChild(this.frequencyElement);
    this.frequencyElement.addEventListener('change', e => this.handleFrequencyChange(e));

    this.frequencyInfo = document.createElement('div')
    this.frequencyInfo.setAttribute('class', 'filter-frequency-container');
    this.filterControls.appendChild(this.frequencyInfo);
    this.frequencyInfo.style.display = 'flex';
    this.frequencyInfo.style.justifyContent = 'space-between';

    let minVal = document.createElement('span');
    minVal.innerText = this.frequencyElement.getAttribute('min')  + 'Hz';

    this.currentFreqVal = document.createElement('span');
    // this.currentFreqVal.setAttribute('value', this.frequency);
    this.currentFreqVal.innerText = `${this.frequency}Hz`;
    
    let maxVal = document.createElement('span');
    maxVal.innerText = this.frequencyElement.getAttribute('max') + 'Hz';

    this.frequencyInfo.appendChild(minVal);
    this.frequencyInfo.appendChild(this.currentFreqVal);
    this.frequencyInfo.appendChild(maxVal);

    this.qFactorLabel = document.createElement('label');
    this.qFactorLabel.innerText = 'Q Factor';
    this.filterControls.appendChild(this.qFactorLabel);
    this.qFactorLabel.style.marginTop = '20px';

    this.QFactorElement = document.createElement('input');
    this.QFactorElement.setAttribute('type', 'range');
    this.QFactorElement.setAttribute('min', '0');
    this.QFactorElement.setAttribute('max', '100');
    this.QFactorElement.setAttribute('step', '1');
    this.QFactorElement.setAttribute('value', '0');
    this.filterControls.appendChild(this.QFactorElement);
    this.QFactorElement.addEventListener('change', e => this.handleQFactorChange(e));


    this.QFactorInfo = document.createElement('div')
    this.QFactorInfo.setAttribute('class', 'filter-QFactor-container');
    this.filterControls.appendChild(this.QFactorInfo);
    this.QFactorInfo.style.display = 'flex';
    this.QFactorInfo.style.justifyContent = 'space-between';

    let minQVal = document.createElement('span');
    minQVal.innerText = this.QFactorElement.getAttribute('min'); 

    this.currentQVal = document.createElement('span');
    this.currentQVal.innerText = this.qFactor; 
    
    let maxQVal = document.createElement('span');
    maxQVal.innerText = this.QFactorElement.getAttribute('max');

    this.QFactorInfo.appendChild(minQVal);
    this.QFactorInfo.appendChild(this.currentQVal);
    this.QFactorInfo.appendChild(maxQVal);

  }

  handleFrequencyChange(e) {
    this.frequency = e.target.value;
    if (Object.keys(this.bufferLoader).length == 0) {
      return;
    } else {
      this.currentFreqVal.innerText =` ${this.frequency}Hz`;
      this.bufferLoader.changeFrequency(this.frequency);
    }
  }

  handleQFactorChange(e) {
    this.qFactor = e.target.value;
    if (Object.keys(this.bufferLoader).length == 0) {
      return;
    } else {
      this.currentQVal.innerText = this.qFactor;
      this.bufferLoader.changeQFactor(this.qFactor);
    }
  }

  handleFilterChange(e) {
    this.filterType = e.target.value;
    if (Object.keys(this.bufferLoader).length == 0) {
      return;
    } else {
      this.bufferLoader.setFilter(this.filterType.toLowerCase());
    }
  }

  createVolumeButtons() {
    this.volumeButtonsElement = document.createElement('div');
    this.volumeButtonsElement.setAttribute(
      'class',
      'volume-controls-container'
    );
    this.createcontrolsElement.appendChild(this.volumeButtonsElement);

    let volumeTitleElement = document.createElement('h3');
    volumeTitleElement.innerText = 'Volume';
    volumeTitleElement.style.margin = '10px 0';

    this.volumeButtonsElement.appendChild(volumeTitleElement);

    this.volumeElement = document.createElement('input');
    this.volumeElement.style.marginLeft = '202px'
    this.volumeElement.style.width = '300px'
    this.volumeElement.setAttribute('type', 'range');
    this.volumeElement.setAttribute('min', '-1');
    this.volumeElement.setAttribute('max', '1');
    this.volumeElement.setAttribute('step', '0.02');
    this.volumeElement.setAttribute('value', '0');
    this.volumeButtonsElement.appendChild(this.volumeElement);
    this.volumeElement.addEventListener('change', e =>
    this.handleVolumeChange(e)
    );
  }

  handleVolumeChange(e) {
    this.gain = e.target.value;
    this.bufferLoader.changeVolume(this.gain);
  }
}
export default Player;
