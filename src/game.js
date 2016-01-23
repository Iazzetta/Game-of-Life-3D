/// <reference path="board.js"/>
/// <reference path="sounds.js"/>

//Constructor 
function Game(){
    if ( !(this instanceof Game) )
        throw new Error("Constructor in 'Game' called as a function");

    //Members
    this.canvas;
    this.engine;
    this.scene;
    this.light;
    this.camera;
    this.roundCounter = 1;
    this.board = new Board(this);
    this.sounds = new Sounds(this);
    this.paused = true;
    
	var _this = this;
	window.addEventListener('DOMContentLoaded', function(){
        _this.init();
	});
}

Game.prototype.init = function(){
    this.canvas = document.getElementById('renderCanvas');
    this.engine = new BABYLON.Engine(this.canvas, true);
    //this.engine.displayLoadingUI();
	this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color3(0.09, 0.09, 0.09);
     
    this.createCamera();
    this.createLight();
    this.registerEventListener();
    this.sounds.loadSounds();
    $("#start_screen").fadeIn();
    
    var _this = this;
    this.scene.executeWhenReady(function () {
        _this.startRenderLoop();
    });
} 
Game.prototype.begin = function(){
    this.loadWorld();
    $("#start_screen").fadeOut();
    this.paused = false;

}
Game.prototype.unPause = function(){
    this.paused = false;
}
Game.prototype.pause = function(){
    this.paused = true;
}
Game.prototype.restart = function(){
    this.paused = true;
    this.roundCounter = 1;
    this.board.reset();
    $("#start_screen").fadeIn();
}


Game.prototype.registerEventListener = function(){
	var _this = this; 
	window.addEventListener('resize', function(){
		_this.engine.resize();
	}); 
}
Game.prototype.createCamera = function(){
    this.camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), this.scene);
    this.camera.setPosition(new BABYLON.Vector3(70, 185, -100));
    this.camera.attachControl(this.canvas, false); 
} 
Game.prototype.loadWorld = function(){
    var sizeX = $("#field_size_x").val();
    var sizeY = $("#field_size_y").val(); 
    this.board.setSize(sizeX, sizeY);
    this.board.createBoard();
}
Game.prototype.createLight = function(){
    this.light = new BABYLON.HemisphericLight('lightHs',new BABYLON.Vector3(0, 1, 0), this.scene); 
	this.light.specular = new BABYLON.Color3(0.1, 0.1, 0.1);
}
Game.prototype.startRenderLoop = function(){
	var _this = this;
    var time = 0;
    //this.engine.hideLoadingUI();
	this.engine.runRenderLoop(function(){
		_this.scene.render();
        var timeInterval = $("#time_inverval").val() / 10;
        //Next round about every second
        time += 1/_this.engine.getFps();
        if(time > timeInterval){
            time = 0;
            $("#roundCounter span").html(_this.roundCounter);
            if(!_this.paused){
                _this.board.nextRound();
                _this.roundCounter++;               
            }

        }
	});
}


