/** 
 * Everything related to click events HTML / CSS GUI is here (all the eventhandlers for GUI clicks)
 * Depending on the click events, diffrent game states are being initiated and diffrent HTML-Elements are hidden or shown. Its controlled via a State Machine
 * The time interval of each rounds is managed by the timeInterval object (because no interaction with html-elements should be outside this file)
 */

var game;
$(document).ready(function(){  
	sidemenu.init();       //Init Sidemenu object
    timeInterval.init();   //Init Time Interval object
	game = new Game();     //Init Game
});

var fsm = StateMachine.create({
  initial: 'StartScreen',
  
  events: [
    { name: 'restart',  from: ['Pause', 'Run', 'Chose'],  to: 'StartScreen' },
    { name: 'startRandom', from: 'StartScreen', to: 'Run'    },
    { name: 'startChosing',  from: 'StartScreen',    to: 'Chose' },
    { name: 'doneChosing', from: 'Chose', to: 'Run'  },
    { name: 'pausing', from: 'Run', to: 'Pause'  },
    { name: 'resuming', from: 'Pause', to: 'Run'  }
  ],
  
  callbacks: {
      
    onrestart:      function(event, from, to, msg) { 
        game.restart();
        sidemenu.closeSideMenu();
        sidemenu.hideToggler();
        $("#start_screen").fadeIn();
        $("#game_paused").hide();
        $("#resume_btn").hide(); 
        $("#pause_btn").show();   
        $("#select_info").hide();         
        $("#is_loading").hide();
    },
    
    onstartRandom:  function(event, from, to, msg) {
        $("#is_loading").show();
        $("#start_screen").fadeOut(function(){
            sidemenu.showToggler();
            game.begin(msg.shape, "random", msg.sizeX, msg.sizeY, function(){
                $("#is_loading").hide();
            });
        });
    },
    
    onstartChosing: function(event, from, to, msg) {
        $("#is_loading").show();
        $("#start_screen").fadeOut(function(){
            $("#select_info").show();
            sidemenu.showToggler();
            game.begin(msg.shape, "chosing", msg.sizeX, msg.sizeY, function(){
                $("#is_loading").hide(); 
            });
        });
    },
    
    ondoneChosing:  function(event, from, to, msg) {
        game.selectDone(); 
        $("#select_info").hide();
        $("#is_loading").hide();
    },
    
    onresuming:     function(event, from, to, msg) {
        game.resume(); 
        $("#resume_btn").hide();
        $("#pause_btn").show();
        $("#game_paused").fadeOut("fast"); 
    },
    
    onpausing:      function(event, from, to, msg) {
        game.pause();
        $("#pause_btn").hide();
        $("#resume_btn").show(); 
        $("#game_paused").fadeIn("fast");
    }
  }
});

//Resume the game
$("#resume_btn").click(function(){
    fsm.resuming();
});

//Pause the game
$("#pause_btn").click(function(){
    fsm.pausing();
});

//Restarts the game and shows start screen
$("#restart_btn").click(function(){
    fsm.restart();
});

//Start the game from the start screen
$("#begin_btn").click(function(){
    //Check if field size values are integers
    var sizeX = parseInt($("#field_size_x").val() , 10); 
    var sizeY = parseInt($("#field_size_y").val(), 10);
    if(!(typeof sizeX ==='number' && (sizeX % 1) === 0) || !(typeof sizeY ==='number' && (sizeY % 1) === 0)) {
        alert("Field Size Values must be Integers!");
        return;
    }

    var shape;
    if($("#box_option").prop("checked")) shape = "boxes";
    else shape = "spheres";
    
    if($("#random_option").prop("checked"))
        fsm.startRandom({sizeX, sizeY, shape});
    else
        fsm.startChosing({sizeX, sizeY, shape});
   
});

//Toggle Camera Free / Arc Rotate
$("#free_camera").click(function(){
    $(this).hide();
    $("#arc_camera").show();
    game.useArcCamera();
});

//Toggle Camera Free / Arc Rotate
$("#arc_camera").click(function(){
    $(this).hide();
    $("#free_camera").show();
    game.useFreeCamera();
});

//User is finished with selecting the initial living cells
$("#select_done").click(function(){
    fsm.doneChosing();
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

//Click event for 2D Option
$("#2d_option").click(function(){
    $("#start_condition_wrapper").css("visibility", "visible");
    $(".z_value_hide").css("visibility", "hidden");
});

//Click event for 3D Option
$("#3d_option").click(function(){
    $("#start_condition_wrapper").css("visibility", "hidden");
    $(".z_value_hide").css("visibility", "visible");
});

//Register some key events, they really just trigger the equivalent button to the action
$(document).keypress(function(e) {
    
    var keyCode = e.keyCode || e.which; 
    if (keyCode == 113) {           //When "q" is pressed toggle Sidemenu
        sidemenu.toggleSideMenu();
    }  
    if (keyCode == 99) {            //When "c" is pressed toggle Camera
        if($("#arc_camera").css("display") == "block")
            $("#arc_camera").trigger("click");
        else
            $("#free_camera").trigger("click");
    }
    if(keyCode == 112) {            //When "p" is pressed pause the game     
        if(fsm.current == "Pause")
            $("#resume_btn").trigger("click");
        else if(fsm.current == "Run")
            $("#pause_btn").trigger("click");
    }       
    if(keyCode == 114) {           //When "r" is presed restart the game
        $("#restart_btn").trigger("click");
    } 
    if(keyCode == 13) {           //When "Enter" is presed start the game (if start screen is showing)
        $("#begin_btn").trigger("click");
    } 
    if(keyCode == 109) {           //When "m" is pressed toggle the sound options mute / unmute
        $("#volume_controll").trigger("click");
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

