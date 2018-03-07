ig.module('game.entities.buttons.sound-bar-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntitySoundBarButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(329,50),
		image: new ig.Image('media/graphics/button/play-button.png'),
		fillColor:null,
		zIndex:500,
		gameControl:null,
		pausePage:null,
		barImage:new ig.Image('media/graphics/button/scroll-bar.png'), // 329 x 31 pixle
		backImage:new ig.Image('media/graphics/button/back-bar.png'), // 329 x 31 pixle
		buttonImage:new ig.Image('media/graphics/button/scroll-button.png'), // 50 x 50 pixle
		//homePage:null,
		//testSound:"testSound",
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
			this.value = 1;
			
			/*
			var data = ig.game.io.storageGet(ig.game.io.gamekey);
			data = data || {volume:{sfx:1, bgm:1}, highScore:0, style:1};
			this.value = data.volume.sfx;
				
			ig.soundHandler.sfxPlayer.volume(this.value);
			*/
			this.level = 329*this.value;
			
			
			this.pausePage = ig.game.getEntitiesByType(EntityPausePage)[0];
			//this.settingPage = ig.game.getEntitiesByType(EntitySettingPage)[0];
			
			this.controlAble = false;
			
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				this.controlAble = true;
				
			}
			
			
		},
		clicking:function(){
			
		},
		released:function(){
			
			
			
		},
		draw:function(){
			this.parent();
			
			if(this.enable===true){
				
				this.backImage.draw(this.pos.x,this.pos.y + 9.5,[0],[0],[329],[31]);
				
				if  (this.levle<1){
					this.barImage.draw(this.pos.x,this.pos.y + 9.5 ,[0],[0],1,[31]);
				}else{
					this.barImage.draw(this.pos.x,this.pos.y + 9.5,[0],[0],[this.level],[31]);
				}
				
				this.buttonImage.draw(this.pos.x + this.level - 25,this.pos.y - 12.5 + 9.5);
				
				/*
				ig.system.context.fillStyle = "white";   // set font colour
				ig.system.context.font = "24px LoveloBlack";   // set font
				ig.system.context.fillText( _STRINGS.Game.SFX,this.pos.x - 70 ,this.pos.y + 20);
				*/
			}
		

		},
		update:function(){
			this.parent();
			
			//console.log("this.value " + this.value);
			//console.log("ENABLE " + this.enable);
			
			if (this.pausePage.enable===true){ // ||this.settingPage.enable===true
				this.enable = true;
			}else if (this.pausePage.enable===false){
				this.enable = false;
			}
			
			
			if (this.enable===true){
				//this.zIndex = 500;
				
				if (this.pausePage.enable===true){
					this.pos.x = this.pausePage.pos.x + (960 - 449)/2 + 86.5;
					this.pos.y = this.pausePage.pos.y + (540 - 174)/2  - 40 + 29;
				} 
				/*
				else if (this.settingPage.enable===true){
					this.pos.x = this.settingPage.pos.x + 400 + 30;
					this.pos.y = this.settingPage.pos.y + 220;
				}
				*/
				if (this.controlAble===true){
				
					if (this.pointer.pos.x > this.pos.x && this.pointer.pos.x < (this.pos.x + this.size.x)){
					
						this.level = (this.pointer.pos.x - this.pos.x);
					
					} else if (this.pointer.pos.x < this.pos.x){
					
						this.level = 0;
					
					} else if (this.pointer.pos.x > (this.pos.x + this.size.x)){
					
						this.level = (this.size.x);
					
					}
				
					//console.log("this.level" + this.level);
				
					this.value = (this.level/329);
				
					ig.soundHandler.sfxPlayer.volume(this.value);
					
					/*
					
					var data = ig.game.io.storageGet(ig.game.io.gamekey);
					//data = data || {volume:{sfx:1, bgm:1}, highScore:0, style:1};
					data.volume.sfx = this.value;
					ig.game.io.storageSet(ig.game.io.gamekey, data);
					
					*/		
					
					//console.log("this.value" + data.volume.sfx);
					
					console.log("this.value" + this.value);
				
				}
				
			}else{
				
				//this.zIndex = -100;
				this.pos.x = 1000;
				this.pos.y = 1000;
				
			}
			
			if (ig.input.released('click')&&this.controlAble===true){
				this.controlAble = false;
				
				/*
				this.testSound.volume = ig.soundHandler.sfxPlayer.getVolume();
				ig.soundHandler.sfxPlayer.play(this.testSound);
				*/
				
			}
			
			
		}
		
	
		
		
	});
});