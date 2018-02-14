ig.module('game.entities.game-control')
.requires(
	'impact.entity',
	'game.entities.player',
	'game.entities.buttons.check-button',
	'game.entities.wall-side',
	'game.entities.wall-up',
	'game.entities.ball',
	'game.entities.block',
)
.defines(function() {
    EntityGameControl = ig.Entity.extend({
        zIndex:200,
        pos:new Vector2(0,0),
        size:new Vector2(20,20),
        color:new ColorRGB(125,255,125,1),
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.checkButton = ig.game.spawnEntity(EntityCheckButton,0,0,{gameControl:this})
			
			this.ball = ig.game.spawnEntity(EntityBall,200,200,{gameControl:this});
			
			this.player = ig.game.spawnEntity(EntityPlayer,400,500,{gameControl:this});
			
			this.rightWall = ig.game.spawnEntity(EntityWallSide,920,0,{gameControl:this,rightSide:true});
			this.leftWall = ig.game.spawnEntity(EntityWallSide,0,0,{gameControl:this,rightSide:false});
			this.upWall = ig.game.spawnEntity(EntityWallUp,0,-40,{gameControl:this});
			
			ig.game.spawnEntity(EntityBlock,450,50,{gameControl:this,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32,{gameControl:this,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32 + 32,{gameControl:this,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32 + 32 + 32 ,{gameControl:this,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32 + 32 + 32 + 32,{gameControl:this,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32 + 32 + 32 + 32 + 32,{gameControl:this,color:"pink",hp:2});
			
			ig.game.spawnEntity(EntityBlock,300,50,{gameControl:this,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32,{gameControl:this,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32 + 32,{gameControl:this,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32 + 32 + 32 ,{gameControl:this,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32 + 32 + 32 + 32,{gameControl:this,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32 + 32 + 32 + 32 + 32,{gameControl:this,color:"pink",hp:2});
			
			ig.game.spawnEntity(EntityBlock,600,50,{gameControl:this,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32,{gameControl:this,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32 + 32,{gameControl:this,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32 + 32 + 32 ,{gameControl:this,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32 + 32 + 32 + 32,{gameControl:this,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32 + 32 + 32 + 32 + 32,{gameControl:this,color:"pink",hp:2});
			
           
        },
        update:function(){
            
            this.parent();
			
			//console.log(this.checkButton.pressed);
            
        },
        draw:function(){
            this.parent();
			
			
        }
    });
});