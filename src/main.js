var game;
$(document).ready(function(){  
	sidemenu.init();
	game = new Game();
});

$("#resume_btn").click(function(){
    game.unPause();
    $(this).hide();
    $("#pause_btn").show();
    $("#game_paused").fadeOut("fast");
});
$("#pause_btn").click(function(){
    game.pause();
    $(this).hide();
    $("#resume_btn").show(); 
    $("#game_paused").fadeIn("fast");
});
$("#restart_btn").click(function(){
    game.restart();
    sidemenu.closeSideMenu();
    sidemenu.hideToggler();
    $("#game_paused").hide();
    $("#resume_btn").hide(); 
    $("#pause_btn").show();
});
$("#begin_btn").click(function(){
    var shape;
    var dist;
    if($("#box_option").prop("checked"))
        shape = "boxes";
    else
        shape = "spheres";
    
    if($("#random_option").prop("checked"))
        dist = "random"
    else
        dist = "chose"
        
    game.begin(shape, dist); 
});
$("#select_done").click(function(){
    game.selectDone();
    sidemenu.showToggler();
});
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
	//Width of sidemenu
	width : 290,
	
	init:function(){
		$(document).keypress(function(e) {
			var keyCode = e.keyCode || e.which; 
			if (keyCode == 113) { 
				sidemenu.toggleSideMenu();
			} 
		});
		$("#close_sidemenu").click(function(){ sidemenu.closeSideMenu(); });
		$("#open_sidemenu").click(function(){ sidemenu.openSideMenu(); });
	},
	
	closeSideMenu: function(){
        $("#menu_wrapper").css("margin-left", "-" + sidemenu.width + "px");
    },
	
    openSideMenu: function(){
        $("#menu_wrapper").css("margin-left","0px");
    },
	
	toggleSideMenu: function(){
		if($("#menu_wrapper").css("margin-left") == "0px"){
			sidemenu.closeSideMenu();
		}
		else{
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

