ig.module('game.entities.home-page')
.requires(
	'impact.entity',
	'game.entities.buttons.play-button',
	'game.entities.buttons.restart-button'
)
.defines(function() {
    EntityHomePage = ig.Entity.extend({
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
			/*
			this.playButtom = ig.game.spawnEntity(EntityPlayButton,0,ig.system.height/2 - this.size.y/4,{gameControl:this.gameControl,pausePage:this})

			this.reStartButtom = ig.game.spawnEntity(EntityRestartButton,0,0,{gameControl:this.gameControl,pausePage:this,resultPage:this.gameControl.resultPage})
			*/
			ig.game.sortEntitiesDeferred();
			
        },
        update:function(){
            
            this.parent();
			
			//console.log(this.gameControl.countToPlay);
			
			
        },
        draw:function(){
            this.parent();
			
			if (this.enable===true){
				
				this.imageBackground.draw(this.pos.x,this.pos.y);
				
			}
			
			
			
        }
		
    });
});