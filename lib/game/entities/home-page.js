ig.module('game.entities.home-page')
.requires(
	'impact.entity',
	'game.entities.buttons.start-button'
)
.defines(function() {
    EntityHomePage = ig.Entity.extend({
        zIndex:300,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		//animSheet: new ig.AnimationSheet('media/graphics/game/player.png',117,23),
		image: new ig.Image('media/graphics/game/home-page.png'),
		gameControl:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.enable = true;
			
			this.startButtom = ig.game.spawnEntity(EntityStartButton,0,0,{gameControl:this.gameControl,homePage:this})
			/*
			this.reStartButtom = ig.game.spawnEntity(EntityRestartButton,0,0,{gameControl:this.gameControl,pausePage:this,resultPage:this.gameControl.resultPage})
			*/
			ig.game.sortEntitiesDeferred();
			
        },
        update:function(){
            
            this.parent();
			
			if (this.gameControl.home===true){
				
				this.enable = true;
				
			}else if (this.gameControl.home===false){
				
				this.enable = false;
				
			}
			
			
        },
        draw:function(){
            this.parent();
			
			if (this.enable===true){
				
				this.image.draw(this.pos.x,this.pos.y);
				
			}
			
			
			
        }
		
    });
});