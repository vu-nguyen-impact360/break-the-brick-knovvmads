ig.module('game.entities.buttons.skip-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntitySkipButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(63,63),
		image: new ig.Image('media/graphics/button/skip-button.png'),
		fillColor:null,
		zIndex:510,
		gameControl:null,
		tutorialPage:null,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				this.tutorialPage.clase();
				//console.log("<Click>");
			}
			
		},
		clicking:function(){
			
		},
		released:function(){
			
		},
		update:function(){
			this.parent();
			
			if (this.tutorialPage.enable===true&&this.gameControl.tutorialIndex>1){
				
				if (this.enable===false){
					this.enable = true;
					this.pos.x = 53;
				}
					
				
			}else if (this.tutorialPage.enable===false){
				
				if (this.enable===true){
					this.enable = false;
					this.pos.x = -1000;
				}	
				
			}
			
			
		},
		draw:function(){
			
			if (this.enable===true){
			
				this.parent();
			
				this.image.draw(this.pos.x,this.pos.y);
				
				
				
			}
			
		}
		
		
		
	});
});