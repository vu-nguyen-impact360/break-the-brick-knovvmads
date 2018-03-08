ig.module('game.entities.buttons.back-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityBackButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(157,157),
		image: new ig.Image('media/graphics/button/play-button.png'),
		fillColor:null,
		zIndex:500,
		gameControl:null,
		settingPage:null,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				this.gameControl.setting = false;
				this.gameControl.home = true;
				
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
				
				this.pos.x = (960 - 157)/2;
				this.pos.y = 540 - 157 - 40;
				
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