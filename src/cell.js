/**
 * This Class represents a single cell, it stores state and position aswell as the mesh it is made of.
 * Then the state can be change with the setState() function.
 */

function Cell(a_game , a_x , a_y, a_state, a_mesh){
    if ( !(this instanceof Cell) )
        throw new Error("Constructor in 'Cell' called as a function");

    //Members
    this.game = a_game; 
    this.posX = a_x;
    this.posY = a_y;
    this.state = a_state; 
    this.mesh = a_mesh;
}

//Init the Cell, move it the the desired position and set the inital state
Cell.prototype.init = function(){
    this.mesh.position = new BABYLON.Vector3(this.posX, 0, this.posY);
    this.setState(this.state);
} 

//Change state of the Cell and set it to being alive or dead. It then changes the color accordingly
Cell.prototype.setState = function(a_state){
    if(a_state == 1){
        this.mesh.color.r = 0.3;
        this.mesh.color.g = 0.8;
        this.mesh.color.b = 0.3;
    } 
    else{
        this.mesh.color.r = 0.3;
        this.mesh.color.g = 0.3;
        this.mesh.color.b = 0.3;
    }
    this.state = a_state;
}

//Check if the Cell is Alive or Dead
Cell.prototype.isAlive = function(){
    return this.state;
}