/// <reference path="game.js"/>
/**
 * This Class represents a single cell, it stores state and position aswell as the mesh it is made of.
 * Then the state can be change with the setState() function.
 */

//@game : main game object
//@x : x-position of cell
//@y : y-position of cell (actually the z-position in webGL)
//@z : z-position of cell (actually the y-position in webGL)
//@state : inital state of the cell (0 or 1)
//@mesh : object of the mesh it is created of
function Cell(game , x , y, z, state, mesh){
    if ( !(this instanceof Cell) )
        throw new Error("Constructor in 'Cell' called as a function");

    //Members
    this.game = game; 
    this.posX = x;
    this.posY = y;
    this.posZ = z;
    this.state = state; 
    this.mesh = mesh;
}

//Init the Cell, move it the the desired position and set the inital state
Cell.prototype.init = function(){
    this.mesh.position = new BABYLON.Vector3(this.posX, this.posZ, this.posY);
    this.updateColor(); 
} 

//Update the color of the Cell acording to its state
Cell.prototype.updateColor = function(){
    if(this.state == 1 && this.mesh != null){
        this.mesh.color.r = 0.3; 
        this.mesh.color.g = 0.89; 
        this.mesh.color.b = 0.3;
    } 
    else if(this.mesh != null){
        this.mesh.color.r = 0.3;
        this.mesh.color.g = 0.3;
        this.mesh.color.b = 0.3;
    }
}

//Change state of the Cell and set it to being alive or dead. It then changes the color accordingly
//@state : new state of the cell
Cell.prototype.setState = function(state){
    this.state = state;
}

//Check if the Cell is Alive or Dead
Cell.prototype.isAlive = function(){
    return this.state;
}