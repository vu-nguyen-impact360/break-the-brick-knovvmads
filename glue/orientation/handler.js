/* MarketJS SizeHandler Library
 -----------------------------------------------------------------------
 Copyright (c) 2012 MarketJS Limited. Certain portions may come from 3rd parties and
 carry their own licensing terms and are referenced where applicable. 
 -----------------------------------------------------------------------
*/
var portraitMode;

// FIXED MOBILE DIMENSIONS
var mobilePortraitWidth = 480;
var mobilePortraitHeight = 640;
var mobileLandscapeWidth = 640;
var mobileLandscapeHeight = 480;

// ADJUSTED LATER, BASED ON ORIENTATION
var mobileWidth=mobilePortraitWidth;
var mobileHeight=mobilePortraitHeight;

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
}

function adjustLayers(width,height){
	// FOR DYNAMIC CLICKABLE ENTITIES (SCALABLE LAYER POSITIONED ON TOP OF IN-GAME ENTITY)
	/*
	for(key in dynamicClickableEntityDivs){
		// RESIZE ACCORDINGLY
		$('#'+key).width(dynamicClickableEntityDivs[key]['width']);
		$('#'+key).height(dynamicClickableEntityDivs[key]['height']);		

		// PEG LAYER TO ENTITY
		var reference = {
			x:(w / 2) - (destW / 2),
			y:(h / 2) - (destH / 2),
		} 
		
		// MAGIC
		$('#'+key).css('left',reference.x + dynamicClickableEntityDivs[key]['entity_pos_x']*multiplier);
		$('#'+key).css('top',reference.y + dynamicClickableEntityDivs[key]['entity_pos_y']*multiplier);				
	}
	*/
		
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
		$('#'+key).width(w);
		$('#'+key).height(h);			
		$('#'+key+'-Box').css('left',(w-advancedDivsToResize[key]['box-width'])/2);
		$('#'+key+'-Box').css('top',(h-advancedDivsToResize[key]['box-height'])/2);				
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
	
	adjustLayers();
	
	window.scrollTo(0,1);
};

// MOBILE PATH: orientationHandler -> sizeHandler -> adjustLayers
function orientationHandler(){
	console.log('changing orientation ...');
					
	var orientation = window.orientation;
	switch(orientation){
		case 0:
			//alert('portrait detected');
			$('#orientate').hide();
			$('#game').show();
			break;
		case 90:
			//alert('landscape detected');
			$('#orientate').show();
			$('#game').hide();
			break;
		case -90:
			//alert('landscape detected');
			$('#orientate').show();
			$('#game').hide();
			break;
		case 180:
			//alert('portrait detected');
			$('#orientate').hide();
			$('#game').show();
			break;
	}

	sizeHandler();
}

// EVENT LISTENERS
window.addEventListener('resize', function (evt) {
	sizeHandler();
}, false);
window.addEventListener('orientationchange', function (evt) {
	orientationHandler();
	sizeHandler();
}, false);

document.ontouchmove = function(e){ 
    window.scrollTo(0, 1);
}