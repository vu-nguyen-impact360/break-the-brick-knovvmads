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
		imageBackground: new ig.Image('media/graphics/game/background.png'),
		imagePopUp: new ig.Image('media/graphics/game/result-page.png'),
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
				
				ig.system.context.fillStyle = "#7E6E8A";   // set font colour
				ig.system.context.font = "50px Champ";   // set font
				ig.system.context.textAlign = 'center';
				
				
				ig.system.context.fillText("GAME OVER",480,100);
				
				
				this.imagePopUp.draw((960 - 799)/2,(540 - 152)/2 - 35);
				
				ig.system.context.fillStyle = "#7E6E8A";   // set font colour
				ig.system.context.font = "60px Champ";   // set font
				ig.system.context.textAlign = 'center';
				
				ig.system.context.fillStyle = "#FEF8F7";   // set font colour
				ig.system.context.fillText(this.gameControl.score,(960 - 799)/2 + 200,(540 - 152)/2 + 123 - 35);
				
				ig.system.context.fillStyle = "#6D637A";   // set font colour
				ig.system.context.fillText(this.gameControl.Highscore,(960 - 799)/2 + 610,(540 - 152)/2 + 123 - 35);
				
				
			}
			
			
			
        }
		
    });
});