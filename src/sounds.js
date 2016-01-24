var Sounds = function(a_game){
    this.game = a_game;
    //Settings
    this.volume = 0.3;
    this.volume2 = 0.05;
    //Init all of the sounds
    this.baseNotes = []; 
    this.highNotes = [];
    this.chords = [
        [0, 2, 5],
        [1, 4, 7],
        [2, 6, 8],
        [3, 7, 9],
        [5, 8, 11],
        [7, 10, 12]
    ]
    this.gameRunning = false;
    this.isMuted = false;
}

Sounds.prototype.loadSounds = function(){
    this.baseNotes[0] = new BABYLON.Sound("sound0", "assets/sounds/c4s.wav", this.game.scene, null, { volume: this.volume});
    this.baseNotes[1] = new BABYLON.Sound("sound1", "assets/sounds/d4s.wav", this.game.scene, null, { volume: this.volume});
    this.baseNotes[2] = new BABYLON.Sound("sound2", "assets/sounds/e4s.wav", this.game.scene, null, { volume: this.volume});
    this.baseNotes[3] = new BABYLON.Sound("sound3", "assets/sounds/f4s.wav", this.game.scene, null, { volume: this.volume});
    this.baseNotes[4] = new BABYLON.Sound("sound4", "assets/sounds/f#4s.wav", this.game.scene, null, { volume: this.volume});
    this.baseNotes[5] = new BABYLON.Sound("sound5", "assets/sounds/g4s.wav", this.game.scene, null, { volume: this.volume});
    this.baseNotes[6] = new BABYLON.Sound("sound6", "assets/sounds/g#4s.wav", this.game.scene, null, { volume: this.volume});
    this.baseNotes[7] = new BABYLON.Sound("sound7", "assets/sounds/a4s.wav", this.game.scene, null, { volume: this.volume2});
    this.baseNotes[8] = new BABYLON.Sound("sound7", "assets/sounds/h4s.wav", this.game.scene, null, { volume: this.volume2});
    this.baseNotes[9] = new BABYLON.Sound("sound2", "assets/sounds/c5s.wav", this.game.scene, null, { volume: this.volume2});
    this.baseNotes[10] = new BABYLON.Sound("sound3", "assets/sounds/c#5s.wav", this.game.scene, null, { volume: this.volume2});
    this.baseNotes[11] = new BABYLON.Sound("sound4", "assets/sounds/d5s.wav", this.game.scene, null, { volume: this.volume2});
    this.baseNotes[12] = new BABYLON.Sound("sound5", "assets/sounds/e5s.wav", this.game.scene, null, { volume: this.volume2});
    
    this.highNotes[0] = new BABYLON.Sound("sound5", "assets/sounds/c5.wav", this.game.scene, null, { volume: this.volume2});
    this.highNotes[1] = new BABYLON.Sound("sound5", "assets/sounds/d5.wav", this.game.scene, null, { volume: this.volume2});
    this.highNotes[2] = new BABYLON.Sound("sound5", "assets/sounds/e5.wav", this.game.scene, null, { volume: this.volume2});
    this.highNotes[3] = new BABYLON.Sound("sound5", "assets/sounds/f5.wav", this.game.scene, null, { volume: this.volume2});
    this.highNotes[4] = new BABYLON.Sound("sound5", "assets/sounds/g5.wav", this.game.scene, null, { volume: this.volume2});
    this.highNotes[5] = new BABYLON.Sound("sound5", "assets/sounds/a5.wav", this.game.scene, null, { volume: this.volume2});
    this.highNotes[6] = new BABYLON.Sound("sound5", "assets/sounds/h5.wav", this.game.scene, null, { volume: this.volume2});
    this.highNotes[6] = new BABYLON.Sound("sound5", "assets/sounds/c6.wav", this.game.scene, null, { volume: this.volume2});
    
    this.mainMusic = new BABYLON.Sound("mrRobot", "assets/sounds/mr-robot-i-hate-socity.mp3", this.game.scene, null , {volume: 0.5, loop: true, autoplay: true });
}  

Sounds.prototype.mute = function(){
    this.isMuted = true;
    this.mainMusic.setVolume(0);
}

Sounds.prototype.unMute = function(){
    this.isMuted = false;
    this.mainMusic.setVolume(0.5);
}


Sounds.prototype.playRandomSound = function(){
    this.mainMusic.stop();
    if(this.gameRunning && !this.isMuted){
        //play chord
        var rndNr = Math.floor((Math.random() * 5));
        this.baseNotes[this.chords[rndNr][0]].play();
        this.baseNotes[this.chords[rndNr][1]].play();
        this.baseNotes[this.chords[rndNr][2]].play();
        
        //play normal note
        rndNr = Math.floor((Math.random() * 6)); 
        this.highNotes[rndNr].play();
    }
}
Sounds.prototype.start = function(){
    this.mainMusic.stop(); 
    this.gameRunning = true;
}
Sounds.prototype.menu = function(){
    this.mainMusic.play();
    this.gameRunning = false;
}
