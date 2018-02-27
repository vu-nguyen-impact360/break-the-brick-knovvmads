ig.module('game.entities.pause-page')
.requires(
	'impact.entity',
	'game.entities.buttons.play-button'
)
.defines(function() {
    EntityPausePage = ig.Entity.extend({
        zIndex:300,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		//animSheet: new ig.AnimationSheet('media/graphics/game/player.png',117,23),
		imageBackground: new ig.Image('media/graphics/game/background.png'),
		imagePopUp: new ig.Image('media/graphics/game/pause-page.png'),
		gameControl:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.enable = false;
			this.playButtom = ig.game.spawnEntity(EntityPlayButton,0,ig.system.height/2 - this.size.y/4,{gameControl:this.gameControl,pausePage:this})
			
			ig.game.sortEntitiesDeferred();
			
        },
        update:function(){
            
            this.parent();
			
			if (this.gameControl.pause===true){
				
				if (this.enable===false){
					
					this.enable = true;
					
				}
				
				
			}
			if (this.gameControl.pause===false||this.gameControl.countToPlay===true){
				
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
				
				this.imagePopUp.draw(this.pos.x + (960 - 449)/2 ,this.pos.y + (540 - 174)/2  - 40);
				
			}
			
			
			
        }
		
    });
});