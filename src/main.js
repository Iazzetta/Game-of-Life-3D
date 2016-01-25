/** 
 * Everything related to click events HTML / CSS GUI is here (all the eventhandlers for GUI clicks)
 * Depending on the click events, diffrent game states are being initiated and diffrent HTML-Elements are hidden or shown
 * The time interval of each rounds is managed by the timeInterval object (because no interaction with html-elements should be outside this file)
 */

var game;
$(document).ready(function(){  
	sidemenu.init();       //Init Sidemenu object
    timeInterval.init();   //Init Time Interval object
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
    //Check if field size values are integers
    var sizeX = parseInt($("#field_size_x").val() , 10); 
    var sizeY = parseInt($("#field_size_y").val(), 10);
    if(!(typeof sizeX ==='number' && (sizeX % 1) === 0) || !(typeof sizeY ==='number' && (sizeY % 1) === 0)) {
        alert("Field Size Values must be Integers!");
        return;
    }
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
    
        game.begin(shape, dist, sizeX, sizeY, function(){
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


//Manages the time interval setting and gives game.js access to the current value in the render loop
var timeInterval = {
    //Interval Time in seconds
    interval : 0.1,                 
    //Register a eventhandler when element is changing and set inital state of interval variable
    init : function(){
        $("#time_inverval").change(function(){
            timeInterval.updateTimeInterval();
            game.setTimeInterval(timeInterval.interval);       
            $("#current_time_interval").html(timeInterval.interval*1000);
        }); 
        timeInterval.updateTimeInterval();
        $("#current_time_interval").html(timeInterval.interval*1000);
    },
    //Return the current time setting of the time interval
    getTimeInterval : function(){
        return timeInterval.interval;
    },
    //Get current value of the interval time
    updateTimeInterval : function(){
        timeInterval.interval = $("#time_inverval").val() / 200;
    }
}


//Everything tha can be done with the sidemenu should be done vai the sidemneu object
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

