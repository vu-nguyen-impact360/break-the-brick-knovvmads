ig.module('game.entities.buttons.yes-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityYesButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(226,63),
		image: new ig.Image('media/graphics/button/yes-button.png'),
		fillColor:null,
		zIndex:450,
		gameControl:null,
		tutorialPage:null,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				this.gameControl.tutorialIndex +=1
				//console.log("<Click>");
			}
			
		},
		clicking:function(){
			
		},
		released:function(){
			
		},
		update:function(){
			this.parent();
			
			if (this.tutorialPage.enable===true&&this.gameControl.tutorialIndex===1){
				
				if (this.enable===false){
					this.enable = true;
					this.pos.x = 369.65;
				}
					
				
			}else if (this.tutorialPage.enable===false||this.gameControl.tutorialIndex>1){
				
				if (this.enable===true){
					this.enable = false;
					this.pos.x = -1000;
				}	
				
			}
			
			
			//console.log(this.enable);
			
			
		},
		draw:function(){
			
			if (this.enable===true){
			
				this.parent();
			
				this.image.draw(this.pos.x,this.pos.y);
				
				
				
			}
			
		}
		
		
		
	});
});