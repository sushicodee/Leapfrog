class Storage{
   

    static saveSequence = function(sequenceId,sequence){
        localStorage.setItem(sequenceId,JSON.stringify(sequence));
        // localStorage.setItem(sequenceId,(sequence));
    }

    
    static getAllSequence = function(){ 
        this.sequenceArray = [];  
        for(let i = 0; i < localStorage.length; i++){
           this.sequenceArray.push({trackId: i, track: JSON.parse(localStorage[i])});
        }
        console.log('fromLocalStorage',this.sequenceArray);
            return (this.sequenceArray);
    }
    static updateStorage = function(){
        for(let i =0; i< localStorage.length; i++){
            let seq = localStorage[i+1];
            if(localStorage[i] == undefined){
                localStorage[i] = seq;
            }else{
                localStorage[i] = seq[i];
            }
        }
    }
    
    
    static deleteTrack = function(sequenceId){
        localStorage.removeItem(sequenceId);
        // this.updateStorage()
    }



    static DeleteAllTracks = function () {
        localStorage.clear();
    }

    static getNthIndex = function(){
        return localStorage.length;
    }
}
export default Storage;