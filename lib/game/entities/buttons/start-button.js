ig.module('game.entities.buttons.start-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityStartButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(226,63),
		image: new ig.Image('media/graphics/button/start-button.png'),
		fillColor:null,
		zIndex:500,
		gameControl:null,
		homePage:null,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			
			this.bgPopUp = ig.game.getEntitiesByType(EntityBgPopUp)[0];
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				this.gameControl.home = false;
				this.gameControl.startGameplay();
				
				
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
				
				this.pos.x = 960/2 - this.size.x/2;
				this.pos.y = 540 - 122;
				
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