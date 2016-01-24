/// <reference path="board.js"/>
/// <reference path="sounds.js"/>
/**
 * Main Game Class, all the logic like pausing, restarting ... is located here
 * Also Babylon will be initilized here and the world will be created, including things like camera or lights
 */
 
function Game(){
    if ( !(this instanceof Game) )
        throw new Error("Constructor in 'Game' called as a function");

    //Variables
    this.canvas;
    this.engine;
    this.scene;
    this.light;
    this.camera;
    this.roundCounter = 1;
    this.board = new Board(this);
    this.sounds = new Sounds(this);
    this.paused = true;
    this.runningInstance = false;     //This tells the game that all mesh has already been loaded or is currently loading, When restarting the game this will be set to false
    
	var _this = this;
	window.addEventListener('DOMContentLoaded', function(){
        _this.init();   //Init Babylon JS
	});
}

//Initilize Babylon and everything that comes with it (camera, lights, sounds ...)
Game.prototype.init = function(){
    this.canvas = document.getElementById('renderCanvas');
    this.engine = new BABYLON.Engine(this.canvas, true);
	this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color3(0.09, 0.09, 0.09);
     
    this.createCamera();
    this.createLight();
    this.registerEventListener();
    this.sounds.loadSounds();

    var _this = this;
    this.scene.executeWhenReady(function () {
        _this.startRenderLoop();
    });
} 

//All event listeners that babylon js need go here
Game.prototype.registerEventListener = function(){
	var _this = this; 
	window.addEventListener('resize', function(){
		_this.engine.resize();
	}); 
}

//Create a Arc Rotate Camera
Game.prototype.createCamera = function(){
    this.camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), this.scene);
    this.camera.setPosition(new BABYLON.Vector3(0, 235, -150));
    this.camera.attachControl(this.canvas, false); 
} 

//Create Lights, maybe add another lightsource (like a directional light from below)
Game.prototype.createLight = function(){
    this.light = new BABYLON.HemisphericLight('lightHs',new BABYLON.Vector3(0, 1, 0), this.scene); 
	this.light.specular = new BABYLON.Color3(0.1, 0.1, 0.1);
}

//Render Loop, this is called per Frame, 
Game.prototype.startRenderLoop = function(){
	var _this = this;
    var time = 0;
	this.engine.runRenderLoop(function(){
		_this.scene.render();
        var timeInterval = $("#time_inverval").val() / 50;          //Get Time intervall from setting window
        time += 1/_this.engine.getFps();                            //Calculate passed Time per Frame and add it to the passed Time overall
        if(time > timeInterval){                                    //Check if interval time has been reached
            time = 0;
            $("#roundCounter span").html(_this.roundCounter);
            if(!_this.paused){
                _this.board.nextRound();
                _this.roundCounter++; 
                _this.sounds.playRandomSound();              
            }

        }
	});
}


/*****************************************/
/**** Methods triggered vai User GUI ****/
/***************************************/

//Begin the game, this is the initial start call, all mesh is loaded here
Game.prototype.begin = function(shape, dist, callback){
    if(!this.runningInstance){
        this.runningInstance = true;
        
        var sizeX = $("#field_size_x").val();
        var sizeY = $("#field_size_y").val(); 
        this.board.setSize(sizeX, sizeY);
        
        this.board.createBoard(shape, dist, callback);
        
        if(dist == "random"){
            this.paused = false;
            this.sounds.start();
        }
        else{
            this.board.startSelection();
        }
    }
}

//When user is done selecting inital cells, start the game
Game.prototype.selectDone = function(mode){
    this.paused = false;
    this.board.endSelection();
    this.sounds.start();
}

//Resume the game
Game.prototype.resume = function(){
    this.paused = false;
}

//Pause the game
Game.prototype.pause = function(){
    this.paused = true;
}

//Restart the game
Game.prototype.restart = function(){
    this.paused = true;
    this.roundCounter = 1;
    this.board.reset();
    this.sounds.menu();
    this.runningInstance = false;
}
