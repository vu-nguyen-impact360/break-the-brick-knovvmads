ig.module('game.entities.game-control')
.requires(
	'impact.entity',
	'game.entities.player',
	'game.entities.buttons.check-button',
	'game.entities.wall-side',
	'game.entities.wall-up',
	'game.entities.ball',
	'game.entities.block',
	'game.entities.stage-manager',
	'game.entities.buttons.pause-button',
	'game.entities.background'
)
.defines(function() {
    EntityGameControl = ig.Entity.extend({
        zIndex:200,
        pos:new Vector2(0,0),
        size:new Vector2(20,20),
        color:new ColorRGB(125,255,125,1),
        init:function(x,y,settings){
            this.parent(x,y,settings);
			this.background = ig.game.spawnEntity(EntityBackground,0 ,0,{gameControl:this})
			
			this.pauseButton = ig.game.spawnEntity(EntityPauseButton,40 + 20 ,20,{gameControl:this})
			this.pause = this.pauseButton.state;
			
			this.blockNumber = 0;
			this.stageManager = ig.game.spawnEntity(EntityStageManager,0,0,{gameControl:this})
			
			
			this.checkButton = ig.game.spawnEntity(EntityCheckButton,0,0,{gameControl:this})
			
			this.ball = ig.game.spawnEntity(EntityBall,200,200,{gameControl:this});
			
			this.player = ig.game.spawnEntity(EntityPlayer,400,500,{gameControl:this});
			
			this.rightWall = ig.game.spawnEntity(EntityWallSide,920,0,{gameControl:this,rightSide:true});
			this.leftWall = ig.game.spawnEntity(EntityWallSide,0,0,{gameControl:this,rightSide:false});
			this.upWall = ig.game.spawnEntity(EntityWallUp,0,-40,{gameControl:this});
			           
        },
        update:function(){
            
            this.parent();
			
			this.pause = this.pauseButton.state;
			
			if (this.pause===false){
				
			}
			
			console.log(this.pause);
            
        },
        draw:function(){
            this.parent();
			
			
        }
    });
});