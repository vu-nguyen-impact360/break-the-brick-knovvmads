ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.debug.debug',
    //Patches
    'plugins.patches.webkit-image-smoothing-patch',
    'plugins.patches.windowfocus-onMouseDown-patch',
    
	// PLUGINS
    'plugins.handlers.dom-handler',
    'plugins.handlers.size-handler',
    'plugins.handlers.api-handler',
    'plugins.audio.sound-handler',
    'plugins.io.io-manager',
	'plugins.splash-loader',
	'plugins.tween',
	'plugins.url-parameters',
	'plugins.director',
	'plugins.impact-storage',
	'plugins.web-storage',
    
	// BRANDING SPLASH
	'plugins.branding.splash',
	
	// BRANDING ENTITIES
	'game.entities.branding-logo-placeholder',

	// MORE GAMES
	'game.entities.buttons.button-more-games',
	
	// ENTITIES
	'game.entities.opening-shield',
	'game.entities.opening-kitty',
	'game.entities.pointer',
	'game.entities.pointer-selector',
	'game.entities.select',
	
	// LEVELS
	'game.levels.opening',
	'game.levels.test-desktop',
	'game.levels.test-mobile'
)
.defines(function(){	
	this.START_OBFUSCATION;
	this.FRAMEBREAKER;
    
	MyGame = ig.Game.extend({
        io:null,
        paused:false,	
		init: function() {						
			// SERVER-SIDE INTEGRATIONS
            this.setupMarketJsGameCenter();
            
            //The io manager so you can access ig.game.io.mouse
            this.io = new IoManager();
            this.setupUrlParams = new ig.UrlParameters();
            
			this.removeLoadingWheel();
            
			this.finalize();
			this.webStorageTest();

		},

		webStorageTest: function(){
			console.log('-------Begin test 1------');
			//Clear previous collection
			var ws = new WebStorage({namespace: 'web-storage',collection: 'unitesting',});
			ws.clear().commit();
			var data, tempData, globalData;

			console.group('Initiation');

				console.group('Should create empty data if its not use dive');
					ws = new WebStorage({
						namespace: 'web-storage',
						collection: 'unit-test-1'
					});
					console.assert(ws.get() === undefined);//should no data
					console.assert(ws._isEmptyObject(ws.tempData));//should empty working data
					console.assert(ws._isEmptyObject(ws.globalData));//should empty
				console.groupEnd();
				//Lest save previous data
				ws.set(1).commit();
				console.group("Using dive");
					console.group("Should force simple dive into an object");
						//Re initiate new web storage
						ws = new WebStorage({
							namespace: 'web-storage',
							collection: 'unit-test-2',
							dive: ['unit-test-1']
						});
						//Previous storage {"web-storage": {"unit-test-1":1}}
						//this will prepare {"web-storage": {"unit-test-1":{}}}. Replacing data 1 on previously state
						//However it won't create 'web-storage'->'unit-test-1'->'unit-test-2' scope until saving a new data into it

						console.assert(ws.get() === undefined);//should no data since 'unit-test-2' has no any data

						console.assert(ws._isEmptyObject(ws.tempData));//'unit-test-1' is force to be empty {}

						//however 'web-storage' now has member 'unit-test-1' which is empty object
						//'web-storage'->'unit-test-1'->{} or {"web-storage": {"unit-test-1":{}}
						console.assert(ws.globalData['unit-test-1']);

						//Since ws still connected to 'unit-test-2' so lets test input value in it, at this time we insert {"key": 2}
						ws.set(2, 'key').commit();

						//Now the data become {"web-storage": {"unit-test-1": {"unit-test-2" :{"key": 2}}
						console.assert(ws.get('key') === 2);
					console.groupEnd();

					console.group("Should use previous dive object");
						ws = new WebStorage({
							namespace: 'web-storage',
							collection: 'unit-test-3',
							dive: ['unit-test-1', 'unit-test-2']
						});
						//previous storage {"web-storage": {"unit-test-1": {"unit-test-2" :{"key": 2}}
						console.assert(ws.get() === undefined);//should no data since 'unit-test-3' has no any data
						console.assert(ws.tempData['key'] === 2);//Temp data is on "unit-test-2" which has previous data {"key": 2}
						console.assert(ws.globalData['unit-test-1']['unit-test-2']['key'] === 2);//As well as the namesapce is not empty
					console.groupEnd();

					console.group("Should not able to overide dive object which has previous data");
						ws = new WebStorage({
							namespace: 'web-storage',
							collection: 'unit-test-3',
							dive: ['unit-test-1', 'unit-test-2']
						});
						data = ws.set(25).commit().get();
						console.assert(data === 25);//should have single value
						
						//Temp data is on "unit-test-2" which has previous data {"key": 2} is not deleted
						console.assert(ws.tempData['key'] === 2);

						console.assert(ws.tempData['unit-test-3'] === 25);//since working data is on 'unit-test-3'
					console.groupEnd();

				console.groupEnd();

			console.groupEnd();

			console.group('Get data');

				//Pervious storage is
				//{"web-storage":{"unit-test-1":{"unit-test-2":{"key":2,"unit-test-3":25}}}}

				console.group("Casual get (non dive)");
					ws = new WebStorage({namespace: "web-storage", collection: "unit-test-2"});
					data = ws.get();
					console.assert(data === undefined);

					ws = new WebStorage({namespace: "web-storage", collection: "unit-test-1"});
					data = ws.get();
					console.assert(typeof(data) === 'object');
					console.assert(typeof(data['unit-test-2']) === 'object');
					console.assert(typeof(data['unit-test-2']['key']) !== 'object');
					console.assert(typeof(data['unit-test-2']['unit-test-3']) !== 'object');
					console.assert(data['unit-test-2']['key'] === 2);
					console.assert(data['unit-test-2']['unit-test-3'] === 25);
				console.groupEnd();

				console.group("Casual get (with dive)");
					ws = new WebStorage({namespace: "web-storage", collection: "unit-test-3", dive:['unit-test-1']});
					data = ws.get();
					console.assert(data === undefined);

					ws = new WebStorage({namespace: "web-storage", collection: "unit-test-2", dive:['unit-test-1']});
					data = ws.get();
					console.assert(typeof(data) === 'object');
					console.assert(typeof(data['unit-test-3']) !== 'object');
					console.assert(typeof(data['key']) !== 'object');
					console.assert(data['key'] === 2);
					console.assert(data['unit-test-3'] === 25);
				console.groupEnd();

				console.group("Get key (no dive)");
					ws = new WebStorage({namespace: "web-storage", collection: "unit-test-1"});
					data = ws.get('unit-test-2');
					console.assert(data['key'] === 2);
					console.assert(data['unit-test-3'] === 25);
				console.groupEnd();

				console.group("Get key (with dive)");
					ws = new WebStorage({namespace: "web-storage", collection: "unit-test-2", dive:['unit-test-1']});
					console.assert(ws.get('key') === 2);
					console.assert(ws.get('unit-test-3') === 25);
				console.groupEnd();

				console.group("Get integer");
					ws = new WebStorage({namespace: "web-storage", collection: "unit-test-2", dive:['unit-test-1']});
					data = ws.set('005510AS', 'key').getInt('key');
					console.assert(data === 5510);
				console.groupEnd();

				console.group("Get float");
					ws = new WebStorage({namespace: "web-storage", collection: "unit-test-2", dive:['unit-test-1']});
					data = ws.set('00.0524sdf', 'key').getFloat('key');
					console.assert(data === 0.0524);
				console.groupEnd();

				console.group("Get bool");
					ws = new WebStorage({namespace: "web-storage", collection: "unit-test-2", dive:['unit-test-1']});
					data = ws.set(true, 'data-true').getBool('data-true');
					console.assert(data);
					data = ws.set(false, 'data-false').getBool('data-false');
					console.assert(!data);
					ws.commit();
				console.groupEnd();

			console.groupEnd();

			console.group('Set data');
				//Latest data is
				//{"unit-test-1":{"unit-test-2":{"key":2,"unit-test-3":25,"data-true":true,"data-false":false}}}

				console.group('Set init');
					ws = new WebStorage({namespace: "web-storage", collection: "score", dive:['unit-test-1']});
					//Set with key
					data = ws.setInit(10, "current").get();
					console.assert(data.current === 10);
					//This cannot set other high with set init
					data = ws.setInit(20, "current").get();
					console.assert(data.current === 10);
					//This also cannot force available object to be simple object
					//Set without key
					data = ws.setInit(20).get();
					console.assert(data.current === 10);
					ws.commit();
				console.groupEnd();

				console.group('Set highest');
					ws = new WebStorage({namespace: "web-storage", collection: "score", dive:['unit-test-1']});
					var score = ws.get('current');
					console.assert(score === 10);
					//First init the lowest value
					console.assert(ws.setInit(0, 'high').get('high') === 0);
					data = ws.setHighest(25, 'high').get('high');
					console.assert(data === 25);
					data = ws.setHighest(20, 'high').get('high');
					console.assert(data === 25);
					data = ws.setHighest(30, 'high').get('high');
					console.assert(data === 30);
					ws.commit();
				console.groupEnd();

			console.groupEnd();

			console.group('Storage modify');
				//latest stroage is
				//{"unit-test-1":{"unit-test-2":{"key":2,"unit-test-3":25,"data-true":true,"data-false":false},"score":{"current":10,"high":30}}}
				console.group("Commit");
					ws = new WebStorage({namespace: "web-storage", collection: "score", dive:['unit-test-1']});
					ws.set(60, 'coins').commit();
					ws = new WebStorage({namespace: "web-storage", collection: "score", dive:['unit-test-1']});
					data = ws.get('coins');
					console.assert(data === 60);
				console.groupEnd();

				console.group("Rollback");
					ws = new WebStorage({namespace: "web-storage", collection: "score", dive:['unit-test-1']});
					data = ws.set(70, 'coins').get('coins');
					console.assert(data === 70);
					data = ws.rollback().get('coins');
					console.assert(data === 60);
				console.groupEnd();

			console.groupEnd();

			console.group("Deleteing");
				console.group("unset. delete only sepfic key or collection");
					ws = new WebStorage({namespace: "web-storage", collection: "score", dive:['unit-test-1']});
					ws.unset('coins').get('coins');
					console.assert(ws.get('coins') === undefined);
					console.assert(ws.get('current') === 10);
					ws.unset();
					console.assert(ws.get() === undefined);
				console.groupEnd();

				console.group("Clear all data on namespace");
					ws = new WebStorage({namespace: "web-storage", collection: "score", dive:['unit-test-1']});
					ws.clear();
					console.assert(ws.global === undefined);
				console.groupEnd();

			console.groupEnd();
		},
		
		setupMarketJsGameCenter:function()
		{   
			if(_SETTINGS)
			{
				if(_SETTINGS['MarketJSGameCenter']){				
                
                    var el = ig.domHandler.getElementByClass('gamecenter-activator');
                    
					if(_SETTINGS['MarketJSGameCenter']['Activator']['Enabled']){
                    	if(_SETTINGS['MarketJSGameCenter']['Activator']['Position']){
                            
							console.log('MarketJSGameCenter activator settings present ....')
                            
                            ig.domHandler.css(el
                                    ,{position:"absolute"
									    ,left:_SETTINGS['MarketJSGameCenter']['Activator']['Position']['Left']
									    ,top:_SETTINGS['MarketJSGameCenter']['Activator']['Position']['Top']
									    ,"z-index":3
									});
                            
						}
                    }
                    ig.domHandler.show(el);             		
				}else{
					console.log('MarketJSGameCenter settings not defined in game settings')
				}
			}
		},
		
		finalize:function(){
            if(ig.ua.mobile){
    			// Inject link 
                var elem = ig.domHandler.getElementById("#play");
                ig.domHandler.attr(elem,'onclick'
                            ,'ig.soundHandler.sfxPlayer.play("staticSound");ig.game.splashClick();');
                ig.domHandler.show(elem);
				// Special hack
				// $('body').height($('#game').height()+75);
				// sizeHandler();					
				// Special hack
				//$('body').height($('#game').height());							
			}else{
				this.start();
			}
            ig.sizeHandler.reorient();	
		},
		
		
		removeLoadingWheel:function(){
			// Remove the loading wheel
			try{
				$('#ajaxbar').css('background','none');
			}catch(err){
				console.log(err)
			}			
		},

		showDebugMenu:function(){
			console.log('showing debug menu ...');
			// SHOW DEBUG LINES
			ig.Entity._debugShowBoxes = true;	

			// SHOW DEBUG PANELS	
			$('.ig_debug').show();							
		},
		
		start:function(){	
			this.resetPlayerStats();
								
			// TEST Eg: load level using Director plugin
			if(ig.ua.mobile){
				this.director = new ig.Director(this,[
						LevelOpening,
						LevelTestMobile
				]);										
			}else{
				this.director = new ig.Director(this,[
						LevelOpening,
						LevelTestDesktop
				]);					
			}
			
			// CALL LOAD LEVELS
			if(_SETTINGS['Branding']['Splash']['Enabled']){
				try{
					this.branding = new ig.BrandingSplash();
				}catch(err){
					console.log(err)
					console.log('Loading original levels ...')
					this.director.loadLevel(this.director.currentLevel);
				}					
			}else{
				this.director.loadLevel(this.director.currentLevel);
			}
						
			this.spawnEntity(EntityPointerSelector,50,50);
						
			// MUSIC // Changed to use ig.soundHandler
			ig.soundHandler.bgmPlayer.play(ig.soundHandler.bgmPlayer.soundList.background);
            
        },
		
		fpsCount: function(){
			if(!this.fpsTimer){
				this.fpsTimer = new ig.Timer(1);
			}
			if(this.fpsTimer && this.fpsTimer.delta() < 0){
				if(this.fpsCounter != null){
					this.fpsCounter ++ ;
				}else{
					this.fpsCounter = 0 ;
				}
			}else{
				ig.game.fps = this.fpsCounter ;
				this.fpsCounter = 0 ;
				this.fpsTimer.reset();
			}
		},	
			
		endGame:function(){
			console.log('End game')
			// IMPORTANT
			ig.soundHandler.bgmPlayer.stop();	
			
			// SUBMIT STATISTICS - USE ONLY WHEN MARKETJS API IS CONFIGURED
			// this.submitStats();
            ig.apiHandler.run("MJSEnd");
		},
		
		resetPlayerStats:function(){
			ig.log('resetting player stats ...');
			this.playerStats = {
				// EG: coins,score,lives, etc
				id:this.playerStats?this.playerStats.id:null, // FOR FACEBOOK LOGIN IDS
			}				
		},		
    
        splashClick:function()
        {
            var elem = ig.domHandler.getElementById("#play")
            ig.domHandler.hide(elem);
            // Show ads
            ig.apiHandler.run("MJSFooter");
            ig.apiHandler.run("MJSHeader");
        
            ig.game.start();
            //ig.soundHandler.bgmPlayer.play(ig.soundHandler.bgmPlayer.soundList.bgm);
        },

		pauseGame:function(){
			ig.system.stopRunLoop.call(ig.system);
			console.log('Game Paused');
		},

		resumeGame:function(){
			ig.system.startRunLoop.call(ig.system);
			console.log('Game Resumed');	
		},
		
		showOverlay:function(divList){			
			for(i=0;i<divList.length;i++){				
				if($('#'+divList[i])) $('#'+divList[i]).show();
				if(document.getElementById(divList[i])) document.getElementById(divList[i]).style.visibility="visible";
			}	
			
			// OPTIONAL
			//this.pauseGame();		
		},
	
		hideOverlay:function(divList){
			for(i=0;i<divList.length;i++){
				if($('#'+divList[i])) $('#'+divList[i]).hide();
				if(document.getElementById(divList[i])) document.getElementById(divList[i]).style.visibility="hidden";
			}
			
			// OPTIONAL
			//this.resumeGame();
		},
		
		currentBGMVolume:1,
        addition:0.1,
		// MODIFIED UPDATE() function to utilize Pause button. See EntityPause (pause.js)
		update:function(){
            
			//Optional - to use 
			//this.fpsCount();
			if( this.paused ) {
	        // only update some of the entities when paused:
                this.updateWhilePaused();
	        }
	        else {
	            // call update() as normal when not paused
	            this.parent(); 
	
				//BGM looping fix for mobile 
				if(ig.ua.mobile && ig.soundHandler) // A win phone fix by yew meng added into ig.soundHandler
				{
					ig.soundHandler.forceLoopBGM();
				}
	        }	
		},
        
        updateWhilePaused:function()
        {
            for( var i = 0; i < this.entities.length; i++ ) {
                if( this.entities[i].ignorePause ) {
                    this.entities[i].update();
                }
            }
        },
		
		draw: function(){
			this.parent();
				//Optional - to use , debug console , e.g : ig.game.debugCL("debug something");
				//hold click on screen for 2s to enable debug console
			//this.drawDebug();
		},
        
        /**
        * A new function to aid old android browser multiple canvas functionality
        * basically everytime you want to clear rect for android browser
        * you use this function instead
        */
    	clearCanvas:function(ctx,width,height){
            var canvas = ctx.canvas;
            ctx.clearRect(0, 0, width, height);
            /*
            var w=canvas.width;
            canvas.width=1;
            canvas.width=w; 
            */
            /*
            canvas.style.visibility = "hidden"; // Force a change in DOM
            canvas.offsetHeight; // Cause a repaint to take play
            canvas.style.visibility = "inherit"; // Make visible again
            */
            
            canvas.style.display = "none";// Detach from DOM
            canvas.offsetHeight; // Force the detach
            canvas.style.display = "inherit"; // Reattach to DOM
       
        },
        
		drawDebug: function(){	//-----draw debug-----
			if(!ig.global.wm){
				// enable console
				this.debugEnable();
				//debug postion set to top left
				if(this.viewDebug){

					//draw debug bg				
					ig.system.context.fillStyle = '#000000';
					ig.system.context.globalAlpha = 0.35 ;
					ig.system.context.fillRect(0,0,ig.system.width/4,ig.system.height);
					ig.system.context.globalAlpha = 1 ;

					if(this.debug && this.debug.length > 0){
						//draw debug console log
						for(i = 0; i < this.debug.length; i++){
							ig.system.context.font = "10px Arial";
							ig.system.context.fillStyle = '#ffffff';
							ig.system.context.fillText(this.debugLine - this.debug.length + i + ": " + this.debug[i],10,50 + 10 * i);
						}

						// delete console log 1 by 1 per 2s , OPTIONAL
						//if(!this.debugTimer){
						//	this.debugTimer = new ig.Timer(2);
						//}else if(this.debugTimer && this.debugTimer.delta() > 0){
						//	this.debug.splice(0,1);
						//	if(this.debug.length > 0){
						//		this.debugTimer.reset();
						//	}else{
						//		this.debugTimer = null ;
						//	}
						//}
					}
				}
			}	
		},

		debugCL: function(consoleLog){ // ----- add debug console log -----
			//add console log to array
			if(!this.debug){
				this.debug = [] ;
				this.debugLine = 1 ;
				this.debug.push(consoleLog);
			}else{
				if(this.debug.length < 50){
					this.debug.push(consoleLog);
				}else{
					this.debug.splice(0,1);
					this.debug.push(consoleLog);
				}
				this.debugLine++;	
			}
			console.log(consoleLog);
		},

		debugEnable: function(){	// enable debug console
			//hold on screen for more than 2s then can enable debug
			if(ig.input.pressed('click')){
				this.debugEnableTimer = new ig.Timer(2);
			}
			if(this.debugEnableTimer && this.debugEnableTimer.delta() < 0){
				if(ig.input.released('click')){
					this.debugEnableTimer = null ;
				}
			}else if(this.debugEnableTimer && this.debugEnableTimer.delta() > 0){
				this.debugEnableTimer = null ;
				if(this.viewDebug){
					this.viewDebug = false;
				}else{
					this.viewDebug = true;
				}
			}
		},	
	});
	
    ig.domHandler = null;
    ig.domHandler = new ig.DomHandler();
	ig.domHandler.forcedDeviceDetection();
    ig.domHandler.forcedDeviceRotation();
    
    //API handler
    ig.apiHandler = new ig.ApiHandler();

    //Size handler has a dependency on the dom handler so it must be initialize after dom handler
    ig.sizeHandler = new ig.SizeHandler(ig.domHandler);
    
    //Setup the canvas

    var fps=60;
    if(ig.ua.mobile)
    {
        ig.Sound.enabled = false;
        ig.main( '#canvas', MyGame, fps, ig.sizeHandler.mobile.actualResolution.x,  ig.sizeHandler.mobile.actualResolution.y, ig.sizeHandler.scale, ig.SplashLoader );
        ig.sizeHandler.resize();
        
    }
    else
    {
        ig.main( '#canvas', MyGame, fps, ig.sizeHandler.desktop.actualResolution.x,  ig.sizeHandler.desktop.actualResolution.y, ig.sizeHandler.scale, ig.SplashLoader );
    }
    
	//Added sound handler with the tag ig.soundHandler
    ig.soundHandler = null;
    ig.soundHandler = new ig.SoundHandler();
    
    ig.sizeHandler.reorient();
    
	this.END_OBFUSCATION;
});