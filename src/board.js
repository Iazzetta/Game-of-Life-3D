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
}

Board.prototype.setSize = function(a_sizeX, a_sizeY){
    this.sizeX = a_sizeX;
    this.sizeY = a_sizeY;
    this.totalSize = this.sizeX * this.sizeY;
}
Board.prototype.createBoard = function(){
    for(var x = 0; x < this.sizeX; x++){  
        this.cells[x] = []; 
        for(var y = 0; y < this.sizeY; y++){
            var state = Math.random() > 0.9 ? 1 : 0;
            this.cells[x][y] = new Cell(this.game, (x-this.sizeX/2 + 0.5)*5 , (y-this.sizeY/2 + 0.5)*5, state);
            this.cells[x][y].draw(); 
        } 
    }
} 
Board.prototype.reset = function(){
    for(var x = 0; x < this.cells.length; x++){  
        var cellsY = this.cells[x];
        for(var y = 0; y < cellsY.length; y++){
            this.cells[x][y].remove();
        } 
    }
}
Board.prototype.nextRound = function(){
     for(var x = 0; x < this.sizeX; x++){  
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
                
            this.cells[x][y].setState(result);
        } 
    }
}
Board.prototype.countLivingNeighbours = function(x , y){
    if(x >= (this.sizeX - 1)) x = 0;
    if(y >= (this.sizeY - 1)) y = 0;
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