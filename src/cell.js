//Constructor 
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

Cell.prototype.init = function(){
    this.mesh.position = new BABYLON.Vector3(this.posX, 0, this.posY);
    this.mesh.material = new BABYLON.StandardMaterial("box", this.game.scene);
    this.setState(this.state);
} 
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
Cell.prototype.isAlive = function(){
    return this.state;
}