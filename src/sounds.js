/**
 * Plays Music and Sounds. Plays a random sound every "Round" in the Game.
 * I am not a musician. I just looked up some chords and put them in chords array
 * It sounds allright, but it could ofc done much better by someone who actually knows music ; )
 */

//@game : object of the main game
var Sounds = function(game){
    this.game = game;
    //Settings 
    this.volumeBase = 0.3;
    this.volumeHigh = 0.05;
    this.volumeMusic = 0.5;
    
    //Sound samples
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

//Loading all Sounds needed for the game
Sounds.prototype.loadSounds = function(){
    this.baseNotes[0] = new BABYLON.Sound("sound0", "assets/sounds/c4s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[1] = new BABYLON.Sound("sound1", "assets/sounds/d4s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[2] = new BABYLON.Sound("sound2", "assets/sounds/e4s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[3] = new BABYLON.Sound("sound3", "assets/sounds/f4s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[4] = new BABYLON.Sound("sound4", "assets/sounds/f#4s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[5] = new BABYLON.Sound("sound5", "assets/sounds/g4s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[6] = new BABYLON.Sound("sound6", "assets/sounds/g#4s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[7] = new BABYLON.Sound("sound7", "assets/sounds/a4s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[8] = new BABYLON.Sound("sound7", "assets/sounds/h4s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[9] = new BABYLON.Sound("sound2", "assets/sounds/c5s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[10] = new BABYLON.Sound("sound3", "assets/sounds/c#5s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[11] = new BABYLON.Sound("sound4", "assets/sounds/d5s.wav", this.game.scene, null, { volume: this.volumeBase});
    this.baseNotes[12] = new BABYLON.Sound("sound5", "assets/sounds/e5s.wav", this.game.scene, null, { volume: this.volumeBase});
    
    this.highNotes[0] = new BABYLON.Sound("sound5", "assets/sounds/c5.wav", this.game.scene, null, { volume: this.volumeHigh});
    this.highNotes[1] = new BABYLON.Sound("sound5", "assets/sounds/d5.wav", this.game.scene, null, { volume: this.volumeHigh});
    this.highNotes[2] = new BABYLON.Sound("sound5", "assets/sounds/e5.wav", this.game.scene, null, { volume: this.volumeHigh});
    this.highNotes[3] = new BABYLON.Sound("sound5", "assets/sounds/f5.wav", this.game.scene, null, { volume: this.volumeHigh});
    this.highNotes[4] = new BABYLON.Sound("sound5", "assets/sounds/g5.wav", this.game.scene, null, { volume: this.volumeHigh});
    this.highNotes[5] = new BABYLON.Sound("sound5", "assets/sounds/a5.wav", this.game.scene, null, { volume: this.volumeHigh});
    this.highNotes[6] = new BABYLON.Sound("sound5", "assets/sounds/h5.wav", this.game.scene, null, { volume: this.volumeHigh});
    this.highNotes[6] = new BABYLON.Sound("sound5", "assets/sounds/c6.wav", this.game.scene, null, { volume: this.volumeHigh});

    //Soundtrack from the TV-Show Mr. Robot which you should defently watch in case you havent!
    this.mainMusic = new BABYLON.Sound("mrRobot", "assets/sounds/mr-robot-i-hate-socity.mp3", this.game.scene, null , {volume: this.volumeMusic, loop: true, autoplay: true });
}  

//Mute sound
Sounds.prototype.mute = function(){
    this.isMuted = true;
    this.mainMusic.setVolume(0);
}

//Unmute sound
Sounds.prototype.unMute = function(){
    this.isMuted = false;
    this.mainMusic.setVolume(this.volumeMusic);
}

//Play a random chord + Note. This is called every frame when the game is running
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

//Start the game
Sounds.prototype.start = function(){
    this.mainMusic.stop(); 
    this.gameRunning = true;
}

//Stop the game (when restart is called)
Sounds.prototype.menu = function(){
    if(!this.mainMusic.isPlaying)
        this.mainMusic.play();
    this.gameRunning = false;
}
