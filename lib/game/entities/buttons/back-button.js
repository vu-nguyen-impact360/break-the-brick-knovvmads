ig.module('game.entities.buttons.back-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityBackButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(205,113),
		image: new ig.Image('media/graphics/button/home-button.png'),
		fillColor:null,
		zIndex:500,
		gameControl:null,
		settingPage:null,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			this.pressed = false;
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				//this.gameControl.setting = false;
				//this.gameControl.home = true;
				this.pressed = true;
				
			}
			
			//this.state = !this.state;
			
		},
		clicking:function(){
			
		},
		released:function(){
			
		},
		update:function(){
			this.parent();
			
			if (this.gameControl.setting===true){
				this.enable = true;
				
				if (ig.ua.mobile){
					this.pos.x = this.settingPage.pos.x + (1080 - 205)/2;
					this.pos.y = this.settingPage.pos.y + 1200;
				}else{
					this.pos.x = this.settingPage.pos.x + (1920 - 205)/2;
					this.pos.y = this.settingPage.pos.y + 1080 - 314 - 80;
				}
				
				//this.zIndex = 500;
				
			}else if (this.gameControl.setting===false){
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