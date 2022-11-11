ig.module('game.entities.buttons.setting-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntitySettingButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(452,126),
		image: new ig.Image('media/graphics/button/setting-button.png'),
		fillColor:null,
		zIndex:500,
		gameControl:null,
		homePage:null,
		stopSound:"stopSound",
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				this.gameControl.home = false;
				this.gameControl.setting = true;
				ig.soundHandler.sfxPlayer.play(this.stopSound);
				
			}
			
			//this.state = !this.state;
			
		},
		clicking:function(){
			
		},
		released:function(){
			
		},
		update:function(){
			this.parent();
			
			if (this.gameControl.home===true){
				this.enable = true;

				if (_SETTINGS.MoreGames.Enabled === false) {
					if (ig.ua.mobile) {
						this.pos.x = 1080 / 2 - this.size.x / 2;
						this.pos.y = 680 * 2;
					} else {
						this.pos.x = 1920 / 2 - this.size.x - 30;
						this.pos.y = 1080 - 122 * 2;
					}
				}
				else {
					if (ig.ua.mobile){
						this.pos.x = 1080/2 - this.size.x/2;
						this.pos.y = 680*2;
					}else{
						this.pos.x = 1920/2 - this.size.x/2 - 452 - 30*2;
						this.pos.y = 1080 - 122*2;
					}
				}
				//this.zIndex = 500;
				
			}else if (this.gameControl.home===false){
				this.enable = false;
				
				this.pos.x = -1000;
				this.pos.y = -1000;
				//this.zIndex = -600;
			}
			
			//console.log(this.pos.x);
			
		},
		draw:function(){
			this.parent();
			
			if (this.enable===true){
				this.image.draw(this.pos.x,this.pos.y);
			}
						
		}
		
		
		
	});
});