/**
 * This Class represents a single cell, it stores state and position aswell as the mesh it is made of.
 * Then the state can be change with the setState() function.
 */

//@game : main game object
//@x : x-position of cell
//@y : y-position of cell (actually the z-position in webGL)
//@state : inital state of the cell (0 or 1)
//@mesh : object of the mesh it is created of
function Cell(game , x , y, state, mesh){
    if ( !(this instanceof Cell) )
        throw new Error("Constructor in 'Cell' called as a function");

    //Members
    this.game = game; 
    this.posX = x;
    this.posY = y;
    this.state = state; 
    this.mesh = mesh;
}

//Init the Cell, move it the the desired position and set the inital state
Cell.prototype.init = function(){
    this.mesh.position = new BABYLON.Vector3(this.posX, 0, this.posY);
    this.setState(this.state);
} 

//Change state of the Cell and set it to being alive or dead. It then changes the color accordingly
//@state : new state of the cell
Cell.prototype.setState = function(state){
    if(state == 1){
        this.mesh.color.g = 0.8;
        this.mesh.color.r = 0.3;
        this.mesh.color.b = 0.3;
        this.mesh.color.a = 1.0;
    } 
    else{
        this.mesh.color.r = 0.3;
        this.mesh.color.g = 0.3;
        this.mesh.color.b = 0.3;
        this.mesh.color.a = 0.6;
    }
    this.state = state;
}

//Check if the Cell is Alive or Dead
Cell.prototype.isAlive = function(){
    return this.state;
}