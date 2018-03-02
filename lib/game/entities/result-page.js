ig.module('game.entities.result-page')
.requires(
	'impact.entity',
	'game.entities.buttons.play-button',
	'game.entities.buttons.restart-button'
)
.defines(function() {
    EntityResultPage = ig.Entity.extend({
        zIndex:300,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		//image:new ig.Image('media/graphics/game/result-page.png'),
		gameControl:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.enable = false;
			
			ig.game.sortEntitiesDeferred();
			
        },
        update:function(){
            
            this.parent();
			
			if (this.gameControl.gameOver===true){
				
				if (this.enable===false){
					
					this.enable = true;
					
				}
				
				
			}
			if (this.gameControl.gameOver===false){
				
				if (this.enable===true){
					
					this.enable = false;
					
				}
				
			}
			
			//console.log(this.gameControl.countToPlay);
			
			
        },
        draw:function(){
            this.parent();
			
			if (this.enable===true){
				
				this.imageBackground.draw(this.pos.x,this.pos.y);
				
				this.imagePopUp.draw(this.pos.x,this.pos.y);
				
			}
			
			
			
        }
		
    });
});