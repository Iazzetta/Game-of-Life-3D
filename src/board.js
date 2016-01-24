/// <reference path="cell.js"/>
//Constructor 
function Board(a_game){
    if ( !(this instanceof Board) )
        throw new Error("Constructor in 'Board' called as a function");

    //Members
    this.sizeX;
    this.sizeY;
    this.totalSize;
    this.game = a_game; 
    this.cells = [];
    this.allMesh;
    this.sps;
}

Board.prototype.setSize = function(a_sizeX, a_sizeY){
    this.sizeX = a_sizeX;
    this.sizeY = a_sizeY;
    this.totalSize = this.sizeX * this.sizeY;
}
Board.prototype.createBoard = function(shape, dist){
    
    this.sps = new BABYLON.SolidParticleSystem("SPS", this.game.scene, {isPickable: true});
    
    var cellObj;
    if(shape == "spheres")
        cellObj = BABYLON.MeshBuilder.CreateSphere("SPS", { segments: 3 ,diameterX: 4,diameterY: 4, diameterZ: 4}, this.game.scene, {isPickable: true});
    else
        cellObj =  BABYLON.MeshBuilder.CreateBox("SPS", {size: 3}, this.game.scene, {isPickable: true});   
        
    this.sps.addShape(cellObj, this.totalSize);
    this.allMesh = this.sps.buildMesh();
    cellObj.dispose(); 
    
    var spsCounter = 0;
    for(var x = 0; x < this.sizeX; x++){  
        this.cells[x] = []; 
        for(var y = 0; y < this.sizeY; y++){
            var state;
            if(dist == "random")
                state = Math.random() > 0.9 ? 1 : 0;
            else    
                state = 0;
            this.cells[x][y] = new Cell(this.game, (x-this.sizeX/2 + 0.5)*5 , (y-this.sizeY/2 + 0.5)*5, state, this.sps.particles[spsCounter]);
            this.cells[x][y].init(); 
            spsCounter++; 
        } 
    }
    this.sps.setParticles();
}  
Board.prototype.reset = function(){
    for(var x = 0; x < this.cells.length; x++){  
        var cellsY = this.cells[x];
        for(var y = 0; y < cellsY.length; y++){
            this.cells[x][y] = null;
        } 
    }
    this.sps.dispose();
    this.sps = null;
}
Board.prototype.startSelection = function(){
    this.sps.refreshVisibleSize();
    var _this = this;
    var activeIdx = -1;    
    this.game.scene.onPointerDown = function(evt, pickResult) {      
        var meshFaceId = pickResult.faceId; 
        if (meshFaceId == -1) {
            activeIdx = -1;
            return;
        }        
        activeIdx = _this.sps.pickedParticles[meshFaceId].idx;
        return;
    }
    this.game.scene.onPointerUp = function(evt, pickResult) {
        var meshFaceId = pickResult.faceId;            
        if (meshFaceId == -1) {return;}                    
        var idx = _this.sps.pickedParticles[meshFaceId].idx; 
        if(activeIdx == idx){
            var x = Math.floor(idx / _this.sizeX);
            var y = idx - (x * _this.sizeX); 
    
            if(_this.cells[x][y].isAlive())
                _this.cells[x][y].setState(0);
            else
                _this.cells[x][y].setState(1);
            _this.sps.setParticles();
        }
        else{
            activeIdx = -1;
            return;
        }
    };
}
Board.prototype.endSelection = function(){
    this.game.scene.onPointerDown = function(evt, pickResult) {      
        return;
    }
    this.game.scene.onPointerUp = function(evt, pickResult) {
        return;
    };
}

/**************************/
/*** Conway Algorithm ****/
/************************/
Board.prototype.nextRound = function(){
    var tmpCells = [];
    for(var x = 0; x < this.sizeX; x++){  
        tmpCells[x] = [];
        for(var y = 0; y < this.sizeY; y++){
            var living = this.cells[x][y].isAlive();
            var counter = this.countLivingNeighbours(x , y);
            var result = 0;
            //Apply rules  
            if(living && counter < 2 || counter > 3)
                result = 0;
            else if(living)
                result = 1;
            else if(!living && counter == 3)
                result = 1; 
            
            tmpCells[x][y] = result;
        } 
    }
    //Update real Cells
    for(var x = 0; x < this.sizeX; x++){  
        for(var y = 0; y < this.sizeY; y++){
            this.cells[x][y].setState(tmpCells[x][y]);
        } 
    }
    this.sps.setParticles();
}
Board.prototype.countLivingNeighbours = function(x , y){
    var count = 0;
    
    if(this.cells[this.lookUpX(x+1)][y].isAlive()) count++;
    if(this.cells[this.lookUpX(x-1)][y].isAlive()) count++;
    if(this.cells[x][this.lookUpY(y+1)].isAlive()) count++;
    if(this.cells[x][this.lookUpY(y-1)].isAlive()) count++;
    if(this.cells[this.lookUpX(x+1)][this.lookUpY(y+1)].isAlive()) count++;
    if(this.cells[this.lookUpX(x+1)][this.lookUpY(y-1)].isAlive()) count++;
    if(this.cells[this.lookUpX(x-1)][this.lookUpY(y+1)].isAlive()) count++;
    if(this.cells[this.lookUpX(x-1)][this.lookUpY(y-1)].isAlive()) count++;

    return count;
}

Board.prototype.lookUpX = function(x){
    if(x >= (this.sizeX))
        return 0;
    else if(x < 0)
        return (this.sizeX - 1);
    return x;
}
Board.prototype.lookUpY = function(y){
    if(y >= (this.sizeY)) 
        return 0;
    else if(y < 0)
        return (this.sizeY - 1);
    return y;
}