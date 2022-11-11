ig.module('plugins.splash-loader').requires('impact.loader', 'impact.animation').defines(function() {
	ig.SplashLoader = ig.Loader.extend({
		splashDesktop: new ig.Image('media/graphics/splash/desktop/cover.jpg'),
		splashMobile: new ig.Image('media/graphics/splash/mobile/cover.jpg'),
		//customAnim: new ig.AnimationSheet('media/graphics/splash/loading/anim.png',256,160),//Use your own file
		loadingBar: new ig.Image('media/graphics/splash/loading/loading-bar.png'),
		loadingBack: new ig.Image('media/graphics/splash/loading/loading-back.png'),
		desktopCoverDIVID: "play-desktop",
		init: function(gameClass, resources) {
			this.parent(gameClass, resources);
			//console.log("asdasdasd");
			// ENABLE, IF CUSTOM ANIMATION REQUIRED DURING LOADING
			this.setupCustomAnimation();
			// ADS
			ig.apiHandler.run("MJSPreroll");
		},
		end: function() {
			this.parent();
			this._drawStatus = 1;
			this.draw();
			if(ig.ua.mobile) {
				var play = ig.domHandler.getElementById("#play");
				ig.domHandler.show(play);
			} else {
				// desktop
				this.tapToStartDiv();
				return;
			}
			ig.system.setGame(MyGame);
			// CLEAR CUSTOM ANIMATION TIMER
			// window.clearInterval(ig.loadingScreen.animationTimer);
		},
		tapToStartDiv: function(onClickCallbackFunction) {
			/* create DIV */
			this.desktopCoverDIV = document.createElement("div");
			this.desktopCoverDIV.id = this.desktopCoverDIVID;
			this.desktopCoverDIV.setAttribute("class", "play");
			this.desktopCoverDIV.setAttribute("style", "position: absolute; display: block; z-index: 999999; background-color: rgba(23, 32, 53, 0.7); visibility: visible; font-size: 10vmin; text-align: center; vertical-align: middle; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;");
			this.desktopCoverDIV.innerHTML = "<div style='color:white;background-color: rgba(255, 255, 255, 0.3); border: 2px solid #fff; font-size:20px; border-radius: 5px; position: relative; float: left; top: 50%; left: 50%; transform: translate(-50%, -50%);'><div style='padding:20px 50px; font-family: Arial;'>" + _STRINGS["Splash"]["TapToStart"] + "</div></div>";
			/* inject DIV */
			var parentDIV = document.getElementById("play").parentNode || document.getElementById("ajaxbar");
			parentDIV.appendChild(this.desktopCoverDIV);
			/* reize DIV */
			try {
				if(typeof(ig.sizeHandler) !== "undefined") {
					if(typeof(ig.sizeHandler.coreDivsToResize) !== "undefined") {
						ig.sizeHandler.coreDivsToResize.push(("#" + this.desktopCoverDIVID));
						if(typeof(ig.sizeHandler.reorient) === "function") {
							ig.sizeHandler.reorient();
						}
					}
				} else if(typeof(coreDivsToResize) !== "undefined") {
					coreDivsToResize.push(this.desktopCoverDIVID);
					if(typeof(sizeHandler) === "function") {
						sizeHandler();
					}
				}
			} catch(error) {
				console.log(error);
			}
			/* click DIV */
			this.desktopCoverDIV.addEventListener("click", function() {
				/* play audio */
				try {
					if(typeof(ig.soundHandler) !== "undefined") {
						/* resume audio context */
						if(typeof(ig.soundHandler.bgmPlayer) !== "undefined") {
							if(typeof(ig.soundHandler.bgmPlayer.webaudio) !== "undefined") {
								if(typeof(ig.soundHandler.bgmPlayer.webaudio.context) !== "undefined") {
									ig.soundHandler.bgmPlayer.webaudio.context.resume();
								}
							}
						} else {
							/* re-instantiate sound handler */
							ig.soundHandler = null;
							if(typeof(ig.soundList) !== "undefined") {
								ig.soundHandler = new ig.SoundHandler(ig.soundList);
							} else {
								ig.soundHandler = new ig.SoundHandler();
							}
						}
						/* play static audio */
						if(typeof(ig.soundHandler.sfxPlayer) !== "undefined") {
							if(typeof(ig.soundHandler.sfxPlayer.play) === "function") {
								ig.soundHandler.sfxPlayer.play("staticSound");
							}
						} else if(typeof(ig.soundHandler.staticSound) !== "undefined") {
							if(typeof(ig.soundHandler.staticSound.play) === "function") {
								ig.soundHandler.staticSound.play();
							}
						} else if(typeof(ig.soundHandler.playSound) === "function") {
							ig.soundHandler.playSound("staticSound");
						}
					} else if(typeof(Howl) !== "undefined") {
						ig.global.staticSound = new Howl({
							src: ['media/audio/play/static.ogg', 'media/audio/play/static.mp3']
						});
						ig.global.staticSound.play();
					} else if(typeof(createjs) !== "undefined") {
						if(typeof(createjs.Sound) !== "undefined" && typeof(createjs.Sound.play) === "function") {
							createjs.Sound.play('opening');
						}
					}
				} catch(error) {
					console.log(error);
				}
				/* hide DIV */
				this.setAttribute("style", "visibility: hidden;");
				/* end function */
				if(typeof(onClickCallbackFunction) === "function") {
					onClickCallbackFunction();
				}
				/* play game */
				ig.system.setGame(MyGame);
			});
		},
		setupCustomAnimation: function() {
			//this.animHeight = this.customAnim.height;
			//this.animWidth = this.customAnim.width;
			//this.customAnim = new ig.Animation(this.customAnim, 0.025, [0,1,2,3,4,5,6,7]);
			// this.customAnim.currentFrame = 0;
			// // Assign this class instance an arbitrary name
			// ig.loadingScreen = this;
			// // Create an external timer variable
			// ig.loadingScreen.animationTimer = window.setInterval('ig.loadingScreen.animate()',100);
		},
		animate: function() {
			// Somehow the update() function doesn't work in Loader class. Resort to using external timer to increment
			// current frame in anim object
			// if(this.customAnim.currentFrame<this.customAnim.sequence.length){
			//     this.customAnim.currentFrame++;
			// }else{
			//     this.customAnim.currentFrame=0;
			// }
			// this.customAnim.gotoFrame(this.customAnim.currentFrame);
			ig.Timer.step();
			//this.customAnim.update();
		},
		draw: function() {
			this._drawStatus += (this.status - this._drawStatus) / 5;
			// CLEAR RECTANGLE
			ig.system.context.fillStyle = '#000';
			ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
			var s = ig.system.scale;
			// DIMENSIONS OF LOADING BAR
			var w, h, x, y;
			if(ig.ua.mobile) {
				// CUSTOM POSITIONS (TRIAL & ERROR)
				w = 180*2;
				h = 24*2;
				x = ig.system.width * 0.5 - w / 2;
				y = ig.system.height * 0.67;
				this.splashMobile.draw(0, 0);
			} else {
				// CUSTOM POSITIONS (TRIAL & ERROR)
				w = 394*2 //250;
				h = 37*2 //30;
				x = 283*2 //ig.system.width * 0.5-w/2;
				y = 411*2 //ig.system.height * 0.67;
				this.splashDesktop.draw(0, 0);
			}
			// DRAW LOADING BAR
			this.loadingBack.draw(x * s, y * s, [0], [0], w * s, [h * s]);
			this.loadingBar.draw(x * s, y * s, [0], [0], [w * s * this._drawStatus], [h * s]);
			/*

            ig.system.context.fillStyle = '#fff';
            ig.system.context.fillRect( x*s, y*s, w*s, h*s );

            ig.system.context.fillStyle = '#000';
            ig.system.context.fillRect( x*s+s, y*s+s, w*s-s-s, h*s-s-s );

            ig.system.context.fillStyle = '#A00A2D'; // COLOR
            ig.system.context.fillRect( x*s, y*s, w*s*this._drawStatus, h*s );

            //Animation run
			this.animate();
            //Draw the animation. Set your custom animation position
			this.customAnim.draw(
                (x*s) + (w*s*this._drawStatus) - this.animWidth + 20,
                y*s+s - this.animHeight * 0.5 + 42
            );

            ig.system.context.fillStyle = '#ffffff';
            ig.system.context.font = "16px Arial";

            // DRAW LOADING TEXT
            var text = _STRINGS.Splash["Loading"];
            var xpos,ypos;

            if(ig.ua.mobile){    // MOBILE
                xpos = ig.system.width/2 - ig.system.context.measureText(text).width/2;
                ypos = y*s+18;
            }else{                // DESKTOP
                xpos = ig.system.width/2 - ig.system.context.measureText(text).width/2;
                ypos = y*s+18;
            }

            ig.system.context.fillText(text, xpos, ypos );
            ig.system.context.font = "bold 14px Arial";
            ig.system.context.fillStyle = '#000000';

            // DRAW LOGO TEXT LINE1
            text = _STRINGS.Splash["LogoLine1"];
            if(ig.ua.mobile){ // MOBILE
                xpos = ig.system.width/2 - ig.system.context.measureText(text).width/2;    ;
                ypos = ig.system.height * 0.6;;
            }else{            // DESKTOP
                xpos = ig.system.width/2 - ig.system.context.measureText(text).width/2;    ;
                ypos = ig.system.height * 0.6;
            }

            ig.system.context.font = "bold 12px Arial";
            ig.system.context.fillText(text, xpos, ypos );

            // DRAW LOGO TEXT LINE2
            text = _STRINGS.Splash["LogoLine2"];
            if(ig.ua.mobile){ // MOBILE
                xpos = ig.system.width/2 - ig.system.context.measureText(text).width/2;    ;
                ypos = ig.system.height * 0.6 + 15;
            }else{            // DESKTOP
                xpos = ig.system.width/2 - ig.system.context.measureText(text).width/2;    ;
                ypos = ig.system.height * 0.6 + 15;
            }
			*/
			// preload fonts
			ig.system.context.font = "1px Champ"; // set font
			ig.system.context.fillText('.', -100, -100); // draw offscreen
		}
	});
});
