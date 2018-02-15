ig.module('game.entities.stage-manager')
.requires(
	'impact.entity',
	'game.entities.block'
)
.defines(function() {
    EntityStageManager = ig.Entity.extend({
        zIndex:230,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		collides: ig.Entity.COLLIDES.NEVER,
		gameControl:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			//this.genaretionStage();
			
        },
        update:function(){
            
            this.parent();
			
			if (this.gameControl.blockNumber<=0){
				
				this.genaretionStage();
				
			}
			
			
        },
        draw:function(){
            this.parent();
			
        },
		genaretionStage:function(){
			
			ig.game.spawnEntity(EntityBlock,450,50,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,450,50 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			
			ig.game.spawnEntity(EntityBlock,300,50,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,300,50 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			
			ig.game.spawnEntity(EntityBlock,600,50,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,600,50 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			
		}
		
    });
});