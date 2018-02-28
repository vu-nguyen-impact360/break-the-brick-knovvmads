ig.module('game.entities.buttons.restart-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityRestartButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(157,157),
		image: new ig.Image('media/graphics/button/ -button.png'),
		fillColor:null,
		zIndex:500,
		gameControl:null,
		pausePage:null,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				
				//this.gameControl.
				
			}
			
			//this.state = !this.state;
			
		},
		clicking:function(){
			
		},
		released:function(){
			
		},
		update:function(){
			this.parent();
			
			if (this.pausePage.enable===true){
				this.enable = true;
				
				this.pos.x = (960 - 157)/2;
				this.pos.y = 540 - 157 - 40;
				
				//this.zIndex = 500;
				
			}else if (this.pausePage.enable===false){
				this.enable = false;
				
				this.pos.x = -1000;
				this.pos.y = -1000;
				//this.zIndex = -600;
			}
			
			console.log(this.pos.x);
			
		},
		draw:function(){
			this.parent();
			
			if (this.enable===true){
				this.image.draw(this.pos.x,this.pos.y);
			}
						
		}
		
		
		
	});
});