var Sounds = function(a_game){
    this.game = a_game;
    //Settings
    this.maxDistance = 300;
    this.volume = 0.02;
    //Init all of the sounds
    this.randomSounds = []; 

}

Sounds.prototype.loadSounds = function(){
    this.randomSounds[0] = new BABYLON.Sound("sound0", "assets/sounds/0.wav", this.game.scene, null, { volume: this.volume ,spatialSound: true, maxDistance : this.maxDistance});
    this.randomSounds[1] = new BABYLON.Sound("sound1", "assets/sounds/1.wav", this.game.scene, null, { volume: this.volume ,spatialSound: true, maxDistance : this.maxDistance});
    this.randomSounds[2] = new BABYLON.Sound("sound2", "assets/sounds/2.wav", this.game.scene, null, { volume: this.volume ,spatialSound: true, maxDistance : this.maxDistance});
    this.randomSounds[3] = new BABYLON.Sound("sound3", "assets/sounds/3.wav", this.game.scene, null, { volume: this.volume ,spatialSound: true, maxDistance : this.maxDistance});
    this.randomSounds[4] = new BABYLON.Sound("sound4", "assets/sounds/4.wav", this.game.scene, null, { volume: this.volume ,spatialSound: true, maxDistance : this.maxDistance});
    this.randomSounds[5] = new BABYLON.Sound("sound5", "assets/sounds/5.wav", this.game.scene, null, { volume: this.volume ,spatialSound: true, maxDistance : this.maxDistance});
    this.randomSounds[6] = new BABYLON.Sound("sound6", "assets/sounds/6.wav", this.game.scene, null, { volume: this.volume ,spatialSound: true, maxDistance : this.maxDistance});
    this.randomSounds[7] = new BABYLON.Sound("sound7", "assets/sounds/7.wav", this.game.scene, null, { volume: this.volume ,spatialSound: true, maxDistance : this.maxDistance});
    this.randomSounds[8] = new BABYLON.Sound("sound9", "assets/sounds/9.wav", this.game.scene, null, { volume: this.volume ,spatialSound: true, maxDistance : this.maxDistance});
} 

Sounds.prototype.playRandomSound = function(a_vec3){
    var rndNr = Math.floor((Math.random() * 9));
    if(this.randomSounds[rndNr] != undefined){
        this.randomSounds[rndNr].setPosition(a_vec3); 
        this.randomSounds[rndNr].play();
    }
}
