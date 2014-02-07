/* MarketJS SizeHandler Library
 -----------------------------------------------------------------------
 Copyright (c) 2012 MarketJS Limited. Certain portions may come from 3rd parties and
 carry their own licensing terms and are referenced where applicable. 
 -----------------------------------------------------------------------
*/
var portraitMode=true;

// FIXED MOBILE DIMENSIONS
var mobilePortraitWidth = 480;
var mobilePortraitHeight = 640;
var mobileLandscapeWidth = 640;
var mobileLandscapeHeight = 480;

// ADJUSTED LATER, BASED ON ORIENTATION
var mobileWidth=portraitMode?mobilePortraitWidth:mobileLandscapeWidth;
var mobileHeight=portraitMode?mobilePortraitHeight:mobileLandscapeHeight;

var desktopWidth=640,desktopHeight=480;
var w,h,multiplier,destW,destH;

// A KEY-VALUE PAIR
var dynamicClickableEntityDivs = {}

var coreDivsToResize = [
	'game',
	'play',
	'orientate',
]

 // IF GAME IS RUN WITHIN IFRAME, ADJUST ACCORDINGLY TO AVOID HAVING SCROLLBAR EFFECT
var advancedDivsToResize = {
	'MobileAdInGamePreroll':{
		'box-width':_SETTINGS['Ad']['Mobile']['Preroll']['Width']+2,
		'box-height':_SETTINGS['Ad']['Mobile']['Preroll']['Height']+20,
	},	
	'MobileAdInGameEnd':{
		'box-width':_SETTINGS['Ad']['Mobile']['End']['Width']+2,
		'box-height':_SETTINGS['Ad']['Mobile']['End']['Height']+20,
	},	
	
	// Second
	'MobileAdInGamePreroll2':{
		'box-width':_SETTINGS['Ad']['Mobile']['Preroll']['Width']+2,
		'box-height':_SETTINGS['Ad']['Mobile']['Preroll']['Height']+20,
	},	
	'MobileAdInGameEnd2':{
		'box-width':_SETTINGS['Ad']['Mobile']['End']['Width']+2,
		'box-height':_SETTINGS['Ad']['Mobile']['End']['Height']+20,
	},	

	// Third
	'MobileAdInGamePreroll3':{
		'box-width':_SETTINGS['Ad']['Mobile']['Preroll']['Width']+2,
		'box-height':_SETTINGS['Ad']['Mobile']['Preroll']['Height']+20,
	},	
	'MobileAdInGameEnd3':{
		'box-width':_SETTINGS['Ad']['Mobile']['End']['Width']+2,
		'box-height':_SETTINGS['Ad']['Mobile']['End']['Height']+20,
	},	
}

function adjustLayers(width,height){
		
	// CORE DIVS
	for(i=0;i<coreDivsToResize.length;i++){
		//console.log('resizing div layer ',coreDivsToResize[i]);
		
		if(ig.ua.mobile){
			$('#'+coreDivsToResize[i]).width(w);
			$('#'+coreDivsToResize[i]).height(h);				
		}else{
			$('#'+coreDivsToResize[i]).width(destW);
			$('#'+coreDivsToResize[i]).height(destH);
			$('#'+coreDivsToResize[i]).css('left',width?0:(w / 2) - (destW / 2));	
		}
	}
	
	// ADVANCED OVERLAYS AND BOXES
	for(key in advancedDivsToResize){
		try{
			$('#'+key).width(w);
			$('#'+key).height(h);			
			$('#'+key+'-Box').css('left',(w-advancedDivsToResize[key]['box-width'])/2);
			$('#'+key+'-Box').css('top',(h-advancedDivsToResize[key]['box-height'])/2);				
		}catch(err){
			console.log(err);
		}			
	}
	
	$('#ajaxbar').width(w);
	$('#ajaxbar').height(h);

	
	//console.log(destW,destH);
}

function sizeHandler() {	

    if (!$('#game')) {
        return;
    }

    w = window.innerWidth;
    h = window.innerHeight;
			
	if(ig.ua.mobile){
		multiplier = Math.min((h / mobileHeight), (w / mobileWidth));
	    destW = mobileWidth * multiplier;
	    destH = mobileHeight * multiplier;
	}else{
		multiplier = Math.min((h / desktopHeight), (w / desktopWidth));
	    destW = desktopWidth * multiplier;
	    destH = desktopHeight * multiplier;
	}	
	
	widthRatio = window.innerWidth / mobileWidth ;
	heightRatio = window.innerHeight / mobileHeight ;
	
	adjustLayers();
	
	window.scrollTo(0,1);
};

// MOBILE PATH: orientationHandler -> sizeHandler -> adjustLayers
function orientationHandler(){
	console.log('changing orientation ...');
	
	if(ig.ua.mobile){		
		if(portraitMode){
			var test = window.innerHeight < window.innerWidth;
		}else{
			var test = window.innerHeight > window.innerWidth;
		}
		if(test){
			//var orientation = false ;	//landscape
			$('#orientate').show();
			$('#game').hide();
			//alert(window.innerHeight +"/"+ window.innerWidth + "hide");
		}else{
			//var orientation = true ;	//portrait
			$('#orientate').hide();
			$('#game').show();
			//alert(window.innerHeight +"/"+ window.innerWidth + "show");
		}		
	}

	sizeHandler();
}

function fixSamsungHandler(){// fix Samsung stock browser touch problem , for android 4.2 or above
	if(!ig.ua.android)return ;	//if isnt android return
	if(parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android")+8,navigator.userAgent.indexOf("Android")+11)) < 4.2)return ; //if android under 4.2 return 
	if(navigator.userAgent.indexOf("GT") < 0)return ; //if isnt samsung return
	if(navigator.userAgent.indexOf("Chrome") > 0)return ; // if using chrome return
	if(navigator.userAgent.indexOf("Firefox") > 0)return ;	// if using firefox return 
	
	document.addEventListener("touchstart", function(evt) {
		evt.preventDefault();
		return false ;
	},false);
	document.addEventListener("touchmove", function(evt) {
		evt.preventDefault();
		return false ;
	},false);
	document.addEventListener("touchend", function(evt) {
		evt.preventDefault();
		return false ;
	},false);
}

// EVENT LISTENERS
window.addEventListener('resize', function (evt) {
	orientationHandler();
}, false);
window.addEventListener('orientationchange', function (evt) {
	orientationHandler();
}, false);

if(getQueryVariable('webview')==='true'){
	$(window).focus(function() {
		if(ig.ua.mobile) ig.game.resumeGame();
		if(ig.game) ig.game.pressMute(); 
	});
	
	$(window).blur(function() {
		if(ig.game)ig.game.pressMute();
	});
}else{
	window.onfocus = function() {
		if(ig.ua.mobile) ig.game.resumeGame(); // ON FOCUS (FIX SPLASH FREEZE ANDROID)
		if(ig.game) ig.game.pressMute(); 
	};
	window.onblur = function() {
		if(ig.game)ig.game.pressMute();
	};
}

document.ontouchmove = function(e){ 
    window.scrollTo(0, 1);
}