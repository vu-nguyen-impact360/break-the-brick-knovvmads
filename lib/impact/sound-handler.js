/**
 *  SoundHandler
 *
 * In order to play sounds and have better control over all music and sound assets throughout
 * Jukebox settings are still done in jukebox.js
 * 
 * play example: ig.soundHandler.playSound(ig.soundHandler.SOUNDID.kittyopeningSound);
 *
 *
 *
 *  Created by Justin Ng on 2014-08-19.
 *  Copyright (c) 2014 __MyCompanyName__. All rights reserved.
 */

ig.module('impact.sound-handler')
.requires(
)
.defines(function () {

    ig.SoundHandler = ig.Class.extend({
		formats:{
			ogg:".ogg",
			mp3:".mp3",
		},
		
		jukebox:null,
		
		pausePosition:null,
		globalMute:false,
		
		forceMuted:false,
		muted:false,
		bgmPlaying:false,
		soundPlaying:false,
		currentSoundPlaying:null,
		
		soundBuffer:[],
		voSoundLoaded:[],
		sfxSoundLoaded:[],
		
		SOUNDID:{},
		
		voSoundsToLoad:[
		],
		
		/**
		* Define your sounds here
		* Add the sounds of mp3 and ogg using howler
		* the name is the given id of the sound which will be stored in SOUNDID of this handler class
		*/
		sfxSoundsToLoad:[
			{name:"staticSound", path:"media/audio/play/static"},
			{name:"openingSound", path:"media/audio/opening/opening"},
			{name:"kittyopeningSound", path:"media/audio/opening/kittyopening"},
		],		
		debug:false,
		
        init:function() 
		{
			//Setups all the sounds
			//Define your setup of sounds here
			//Make sure to turn on the relevent settings here
			if(ig.ua.mobile) //mobile
			{
				this.initSfx();
				//this.initVoSfx();
				//this.setupJukebox();
			}
			else//Desktop
			{
				this.initSfx();
				//this.initVoSfx();
				//this.setupDesktopMusic();
			}
			
			this.setupWindowHandler();
        },
		
		//Checking for loading of all vo sounds
		allVoSoundLoaded:function()
		{
			if(this.voSoundLoaded.length >= this.voSoundsToLoad.length)
			{
				if(this.debug)
				{
					console.log("Vo ready");
				}
				for(index=0;index<this.voSoundLoaded.length;index++)
				{
					this.voSoundLoaded[index].on("end",function()
											{
												//Prevents double playing means can double check the sound playing
												//Its possible to remove and customize. Up to each individual developer
												arguments[0].isPlaying = false;
												this.soundBuffer.pop();
												//console.log("end " + this.soundBuffer.length);
											}.bind(this,this.voSoundLoaded[index])
									);
					this.voSoundLoaded[index].on("play",function()
											{
												//console.log("play " + this.soundBuffer.length);
												arguments[0].isPlaying = true;
											}.bind(this,this.voSoundLoaded[index])
									);
				}
				return true;
			}
			else
			{
				//console.log("Vo not ready: Loaded only:" + this.voSoundLoaded.length +" / "+this.voSoundsToLoad.length);
				return false;
			}
		},
		
		//Checking if all SFX sounds are loaded
		allSfxSoundLoaded:function()
		{
			if(this.sfxSoundLoaded.length >= this.sfxSoundsToLoad.length)
			{
				return true;
			}
			else
			{
				return false;
			}
		},	
		
		stopBackgroundMusic:function()
		{
			if(ig.ua.mobile)
			{
				// STOPPING JUKEBOX DOESN'T WORK ON DEVICE. WE USE PAUSE INSTEAD
				this.pausePosition = this.jukebox.player.pause();
				this.bgmPlaying = false;
			}
			else
			{
				this.bgmPlaying = false;
				ig.music.pause();
			}						
		},
		
		playBackgroundMusic:function()
		{
			if(ig.ua.mobile)
			{
				if(this.pausePosition)
				{
					this.jukebox.player.resume(this.pausePosition);
				}
				else
				{
					this.jukebox.player.play(this.jukebox.player.settings.spritemap.music.start,true);
				}
				this.bgmPlaying = true;				
			}
			else
			{
				this.bgmPlaying = true;
				ig.music.play();
			}			
		},

		/**
		* Helper function to play sounds
		* @params ID, the id defined as the name and is the ID stored in attribute SOUNDID
		* play sound example:
		* ig.soundHandler.playSound(ig.soundHandler.SOUNDID.kittyopeningSound);
		* heck you can even chuck the parameter an ID that you know as a string but its up to you
		*/
		playSound:function(id)
		{
			var voToPlay = this[id];
			if(voToPlay)
			{
				//console.log("play sound:" + id);
				if((!this.forceMuted
					|| !this.muted))
				{
					if(!voToPlay.isPlaying) // check if sound has not been played // you can remove this if you need multiple sounds to come out in sequence
					{
						this.soundBuffer.push(voToPlay);
						voToPlay.play();
					}
				}
			}
		},
		
		/**
		* this stops whatever sounds that is playing and plays the sound with the given id
		*/
		stopAllAndPlaySound:function(id)
		{
			this.stopAllSounds();
			this.playSound(id);
		},
		
		/**
		* Stops all sounds from playing provided they are in the buffer
		*/
		stopAllSounds:function()
		{
			for(index=0;index<this.soundBuffer.length;index++)
			{
				this.soundBuffer[index].isPlaying = false;
				this.soundBuffer.splice(0,1)[0].stop();
			}
		},
		
		/**
		* @Params
		* id: the id to give this sound sprite
		* soundPath: the sound path without the format, normally loads mp3 and ogg
		* onLoadFn: optional, on load function if you want to do fancy stuff when the sound on loads or for pre loading check purposes
		* voice: boolean to determine if its voice
		*
		**/
		addSound:function(id,soundPath,onLoadFn)
		{
			var pathOgg = soundPath+this.formats.ogg;
			var pathMp3 = soundPath+this.formats.mp3;
			this.SOUNDID[id]= id;
			if(onLoadFn)
			{
				this[id] = new Howl({urls:[pathOgg,pathMp3],onload:onLoadFn});
			}
			else
			{
				this[id] = new Howl({urls:[pathOgg,pathMp3]});
			}
		},
		/* Old Yew Meng's fix, has been replaced but if things don't work out can always try this function again replacing the force bgm loop in main.js
		replayIfPause:function()
		{
			//BGM looping fix for mobile 
			if(ig.ua.mobile) 
			{
				if(this.jukebox) 
				{
					if(this.jukebox.player) 
					{
						for (var s in this.jukebox.player.settings.spritemap) 
						{
							if( this.jukebox.player.getCurrentTime() <=
								(this.jukebox.player.settings.spritemap[s].end 
									//- this.jukebox.player.settings.timeout/1000
								 ) 
							)
							{	
								//console.log(this.jukebox.player.getCurrentTime());
								//continue;
							}
							else 
							{
								this.jukebox.player.pause();
								//this.setupJukebox();
								this.jukebox.player.resume(this.jukebox.player.settings.spritemap[s].start);
							}
						}
					}
				}
			}
		},
		*/
		
		/**
		* Mute all the sounds
		* this is just a helper function for the mute()
		* this does not touch bgm
		*/
		_muteSounds:function()
		{	
			for(i=0;i<ig.resources.length;i++)
			{
				if(ig.resources[i].multiChannel)
				{
					ig.resources[i].stop();
				}
			}
			Howler.mute();
			if(this.debug)
			{
				console.log('Sounds muted');
			}
			
		},
		
		/**
		* unmute all the sounds
		* this is just a helper function for unmute()
		* this does not touch bgm
		*/
		_unMuteSounds:function()
		{
			Howler.unmute();
			ig.Sound.enabled = true;
			if(this.debug)
			{
				console.log('Sounds can play');
			}
			
		},
		
		/**
		* the focus blur mute and unmute relies on a force muted check to return to the state after focus and blur of windows
		*/
		focusBlurMute:function()
		{
			if(!this.forceMuted)
			{
				this.mute();
			}
		},
		
		focusBlurUnmute:function()
		{
			if(!this.forceMuted)
			{
				this.unmute();
			}
		},
		
		/**
		* if you want to force mute the sounds and music that even on blur and focus won't turn the sound back on
		* @params bool the boolean true/false on whether to be forced into mute state or not
		*/
		setForceMuted:function(bool)
		{
			this.forceMuted = bool;
		},
		
		mute:function()
		{
			this._muteSounds();
			if(!ig.ua.mobile)
			{
				ig.music.volume = 0;
			}
			else
			{
				if(this.jukebox)
				{
					this.jukebox.player.pause();
					this.jukebox.player.setVolume(0.01);
				}
			}
			this.muted = true;		
		},
		
		unmute:function()
		{
			this._unMuteSounds();
			if(!ig.ua.mobile)
			{
				ig.music.volume = 1;
			}
			else
			{
				if(this.jukebox)
				{
					this.jukebox.player.resume();
					this.jukebox.player.setVolume(1);
				}
				
			}
			this.muted = false;
		},
		
		/**
		*  The window blur and focus events have been placed here so you can control it better
		*/
		setupWindowHandler:function()
		{
			if(getQueryVariable('webview')==='true')
			{
				$(window).focus(function() 
				{
					if(ig.ua.mobile && ig.game) ig.game.resumeGame();
					if(ig.soundHandler) ig.soundHandler.focusBlurUnmute(); 
				});

				$(window).blur(function() 
				{
					if(ig.soundHandler)ig.soundHandler.focusBlurMute();
				});
			}
			else
			{
				window.onfocus = function() 
				{
					if(ig.ua.mobile&& ig.game) ig.game.resumeGame();
					if(ig.soundHandler) ig.soundHandler.focusBlurUnmute(); 
				};
				window.onblur = function() 
				{
					if(ig.soundHandler)ig.soundHandler.focusBlurMute();
				};
			}
		},
		
		/**
		* adds the SFX in the sfxSoundLoaded list
		*/		
		initSfx: function()
		{
			//function(){}.bind(Represented object known as this, arguments)
			for(index=0;index<this.sfxSoundsToLoad.length;index++)
			{
				var onLoadFn=function(){
					
					//console.log(arguments[0].name);
					this.sfxSoundLoaded.push(this[arguments[0]]);
				}.bind(this,this.sfxSoundsToLoad[index].name);
				
				this.addSound(this.sfxSoundsToLoad[index].name,this.sfxSoundsToLoad[index].path,onLoadFn);
			}
		},
		
		initVoSfx:function()
		{
			for(index=0;index<this.voSoundsToLoad.length;index++)
			{
				var onLoadFn=function(){
						//console.log(arguments[0].name);
						this.voSoundLoaded.push(this[arguments[0]]);
					}.bind(this,this.voSoundsToLoad[index].name);
				
				this.addSound(this.voSoundsToLoad[index].name,this.voSoundsToLoad[index].path,onLoadFn);
				
				//this.addSound(this.voSoundsToLoad[index].name,this.voSoundsToLoad[index].path,function(){this.voSoundLoaded.push(this[this.voSoundsToLoad[index].name])}.bind(this.voSoundsToLoad[index]));
			}
		},
		
		//Desktop music is setup here
		setupDesktopMusic:function()
		{
			ig.music.add('media/sounds/desktop/background.*', 'background');	
			
		},
		
		setupJukebox:function()
		{
			if(ig.ua.mobile)
			{
				this.jukebox = new ig.Jukebox();//the music file is set in the jukebox.js
			}			
		},
		
		forceLoopBGM:function()
		{
			if(!this.forceMuted)
			{
				if(this.jukebox) 
				{
					if(this.jukebox.player) 
					{
						if(!this.jukebox.player.getCurrentTime())
						{
							this.jukebox.player.resume();
	        			}

						// all
						if(this.jukebox.player.settings.spritemap.music && this.jukebox.player.settings.spritemap.music.loop) 
						{
							if( this.jukebox.player.getCurrentTime() >= this.jukebox.player.settings.spritemap.music.end ){
								this.jukebox.player.resume(this.jukebox.player.settings.spritemap.music.start);
							}
						}

						// mobile: iOS, android
						else if(this.jukebox.player.isPlaying && this.jukebox.player.isPlaying.loop) {
							if( this.jukebox.player.getCurrentTime() >= this.jukebox.player.isPlaying.end ){
								this.jukebox.player.resume(this.jukebox.player.isPlaying.start);
							}
						}

						// mobile: winPhone
						else if(this.jukebox.player.backgroundMusic && this.jukebox.player.backgroundMusic.loop) {
							if( this.jukebox.player.getCurrentTime() >= this.jukebox.player.backgroundMusic.end ){
								this.jukebox.player.resume(this.jukebox.player.backgroundMusic.start);
							}
						}
					}
				}
			}
		}
		
    
    });

});