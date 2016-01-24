/** 
 * Everything related to click events HTML / CSS GUI is here
 * Depending on the click events, diffrent game states are being 
 * called and diffrent GUI-Elements are hidden or shown
 */

var game;
$(document).ready(function(){  
	sidemenu.init();       //Init Sidemenu
	game = new Game();     //Init Game
});

//Register some key events
$(document).keypress(function(e) {
    var keyCode = e.keyCode || e.which; 
    
    if (keyCode == 113) {           //When "q" is pressed toggle Sidemenu
        sidemenu.toggleSideMenu();
    }  
    if(keyCode == 112) {            //When "p" is pressed pause the game     
        if(game.paused)
            $("#resume_btn").trigger("click");
        else
            $("#pause_btn").trigger("click");
    }       
    if(keyCode == 114) {           //When "r" is presed restart the game
        $("#restart_btn").trigger("click");
    } 
    if(keyCode == 13) {           //When "Enter" is presed start the game (if start screen is showing)
        if($("#start_screen").css("display") != "none")
            $("#begin_btn").trigger("click");
    } 
    if(keyCode == 109) {           //When "m" is pressed toggle the sound options mute / unmute
        $("#volume_controll").trigger("click");
    } 
});

//Resume the game
$("#resume_btn").click(function(){
    if(game.runningInstance && $("#select_info").css("display") == "none"){
        game.resume();
        $(this).hide();
        $("#pause_btn").show();
        $("#game_paused").fadeOut("fast"); 
    }
});

//Pause the game
$("#pause_btn").click(function(){
    if(game.runningInstance && $("#select_info").css("display") == "none"){
        game.pause();
        $(this).hide();
        $("#resume_btn").show(); 
        $("#game_paused").fadeIn("fast");
    }
});

//Restarts the game and shows start screen
$("#restart_btn").click(function(){
    //Game can only be restarted when its actually running
    if(game.runningInstance){
        game.restart();
        sidemenu.closeSideMenu();
        sidemenu.hideToggler();
        $("#start_screen").fadeIn();
        $("#game_paused").hide();
        $("#resume_btn").hide(); 
        $("#pause_btn").show();   
        $("#select_info").hide();
    }
});

//Stat the game from the start screen
$("#begin_btn").click(function(){
    var shape;
    var dist; 
    
    $("#is_loading").show();
    
    $("#start_screen").fadeOut("fast", function(){
        
        if($("#box_option").prop("checked")) shape = "boxes";
        else shape = "spheres";
        
        if($("#random_option").prop("checked")){
            dist = "random";
            sidemenu.showToggler();
        }
        else{
            $("#select_info").show();
            dist = "chose";
        }
    
        game.begin(shape, dist, function(){
            $("#is_loading").hide();
        });
    });
});

//User is finished with selecting the initial living cells
$("#select_done").click(function(){
    game.selectDone(); 
    $("#select_info").hide();
    sidemenu.showToggler();
});

//Toggle the Volume on / off
$("#volume_controll").click(function(){
    if($("#volume_off").css("display") == "inline"){
        $("#volume_off").hide(); 
        $("#volume_up").show();
        game.sounds.unMute();
    } 
    else{
        $("#volume_off").show();
        $("#volume_up").hide();
        game.sounds.mute();
    }
});


var sidemenu = {
    
	width : 290,
	
	init: function(){
		$("#close_sidemenu").click(function(){ sidemenu.closeSideMenu(); });
		$("#open_sidemenu").click(function(){ sidemenu.openSideMenu(); });
	},
	closeSideMenu: function(){
        $("#menu_wrapper").css("margin-left", "-" + sidemenu.width + "px");
    },
    openSideMenu: function(){
        if($("#open_sidemenu").css("display") != "none")
            $("#menu_wrapper").css("margin-left","0px");
    },
	toggleSideMenu: function(){
        if($("#open_sidemenu").css("display") != "none"){
            if($("#menu_wrapper").css("margin-left") == "0px")
                sidemenu.closeSideMenu();
            else
                sidemenu.openSideMenu();
        }
	},
    hideToggler: function(){ 
        $("#open_sidemenu").css("display", "none");
    },
    showToggler: function(){
        $("#open_sidemenu").fadeIn("fast");
    }
};

