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

Cell.prototype.draw = function(){
    //this.mesh = BABYLON.Mesh.CreateSphere('sphere1', 3, 5, this.game.scene);
    //this.mesh = BABYLON.Mesh.CreateBox("box", 3, this.game.scene); 
    this.mesh.position = new BABYLON.Vector3(this.posX, 0, this.posY);
    this.mesh.material = new BABYLON.StandardMaterial("box", this.game.scene);
    this.setState(this.state);
} 
Cell.prototype.setState = function(a_state){
    if(a_state == 1){
        this.mesh.color.r = 0.3;
        this.mesh.color.g = 0.8;
        this.mesh.color.b = 0.3;
        //this.mesh.material.emissiveColor = new BABYLON.Color3(0.0, 0.3, 0.1);
        //this.mesh.material.diffuseColor = new BABYLON.Color3(0.3, 0.8, 0.3); 
        //if(this.state != a_state)
            //this.game.sounds.playRandomSound(new BABYLON.Vector3(this.posX, 0, this.posY));
    } 
    else{
        this.mesh.color.r = 0.3;
        this.mesh.color.g = 0.3;
        this.mesh.color.b = 0.3;
        //this.mesh.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
        //this.mesh.material.diffuseColor = new BABYLON.Color3( 0.3 , 0.3, 0.3);
    }
    this.state = a_state;
}
Cell.prototype.isAlive = function(){
    return this.state;
}
