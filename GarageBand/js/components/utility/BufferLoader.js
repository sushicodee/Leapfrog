function BufferLoader(context, urlList,sequenceArray,callback) {
	this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.currentSequenceArray = sequenceArray;
    this.bufferList = new Array();
    this.loadCount = 0;

    this.sourceArray = [];
    this.currentIndex = -1;
    this.playingInterval;
    this.playing = false;
    this.loop = false;

    //controls
    this.playbackRate =1;
    this.gain = 0;
    this.qFactor = 1;
    this.frequency = 20;
    this.filterType = 'lowpass';

    //trackElement
    this.displayTonesElement;
}


BufferLoader.prototype.loadBuffer = function(url, index) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {
        loader.context.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
            }    
        );
    }

    request.onerror = function() {
        alert('BufferLoader: XHR error');        
    }

    request.send();
}

BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
}

BufferLoader.prototype.playAudio = function(SourceArray,bufferList,interval){ 
        this.playing = true;
        this.currentIndex++;
        if(this.currentIndex == this.sourceArray.length){
            if(this.loop){
                this.lastSourceRef = this.sourceArray[this.bufferList.length -1];          
                this.sourceArray = [];
                this.bufferList = bufferList; 
            }
            for(let i = 0 ; i< this.bufferList.length; i++){
                this.gainNode = this.context.createGain();
                this.biquadFilter = this.context.createBiquadFilter();
                this.biquadFilter.connect(this.context.destination);
                this.source.connect(this.biquadFilter);
                this.source.connect(this.gainNode);
                this.gainNode.connect(this.context.destination);
                this.biquadFilter.type = this.filterType;   
                this.biquadFilter.frequency.value = this.frequency;
                this.biquadFilter.Q.value = this.qFactor;
                this.biquadFilter.gain.value = -1;

                this.gainNode.gain.value = this.gain;
                this.source = `source${i}`;
                this.source = this.context.createBufferSource();
                this.source.buffer = this.bufferList[i];
                this.source.playbackRate.value = this.playbackRate;
                this.source.connect(this.context.destination);
                this.sourceArray.push(this.source);
            }
           
            if(this.loop){        
                this.currentIndex = 0;
            }
            else{
                this.currentIndex = -1;
                clearInterval(interval);
                return;
            }
        }
        const seqInterval = setTimeout(()=>{
            if(this.playing === true){
               
                if(this.currentIndex > 0){
                    this.displayTonesElement.children[this.currentIndex -1].classList.remove('active');
                }
                    this.displayTonesElement.children[this.bufferList.length -1].classList.remove('active');

                    this.displayTonesElement.children[this.currentIndex].classList.add('active');
                    let index = this.currentIndex;
                    this.duration = this.sourceArray[index].buffer.duration;
                    this.durationRate = this.currentSequenceArray[index].durationRate.value;

                    this.sourceArray[this.currentIndex].start(0);
                   
                    setTimeout(() =>{
                         if(index === this.bufferList.length - 1 && this.loop == false){
                                this.sourceArray[index].stop();
                                return;
                          }
                          else if(index === this.bufferList.length - 1 && this.loop == true){
                            this.lastSourceRef.stop();
                          }
                          else{
                              this.sourceArray[index].stop();
                          }
                        },this.duration * this.durationRate * 1000 * (1 /this.playbackRate))    
                
                // this.sourceArray[this.currentIndex].stop(this.duration * this.sequences[this.currentIndex].durationRate.value);
                this.sourceArray[this.currentIndex].addEventListener('ended' , this.playAudio(this.sourceArray,this.bufferList,seqInterval))
            }
            else{
                this.currentIndex = -1;
                clearInterval(interval);
                return;
            } 
           //inverse playbackrate 
        },this.duration * this.durationRate * 1000 * (1 /this.playbackRate))
    }

BufferLoader.prototype.stopAudio = function(){
    this.playing = false;
    for(let i = 0; i< this.bufferList.length; i++){
        this.displayTonesElement.children[i].classList.remove('active'); 
    }
}
BufferLoader.prototype.setFilter = function(value){
    this.filterType = value;
}    

BufferLoader.prototype.changeTempo = function(playbackRate){
    this.playbackRate = playbackRate;
}

BufferLoader.prototype.changeFrequency = function(frequency){
    this.frequency = frequency;
}

BufferLoader.prototype.changeQFactor = function(qFactor){
    this.qFactor = qFactor;
}

BufferLoader.prototype.changeVolume = function(gain){
    this.gain = gain;
}

BufferLoader.prototype.trackElement = function(element){
    this.displayTonesElement = element;
}

BufferLoader.prototype.loopAudioBuffer = function(loop){
    this.loop = loop;
    this.stopAudio();
}

BufferLoader.prototype.reset = function(){
    this.loop = false;
    this.isPlaying = false;
}
