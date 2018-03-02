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
			
			this.stateNumber = 1;
			this.reStart = false;
			
        },
        update:function(){
            
            this.parent();
			
			if (this.gameControl.blockNumber<=0 && this.reStart===false){
				
				//this.gameControl.reball = true;
				this.gameControl.nextStage();
				//this.genaretionStage();
			}
			
			
        },
        draw:function(){
            this.parent();
			
        },
		genaretionStage:function(){
			
			this.randomNumber = Math.floor(Math.random()*this.stateNumber);
			
			if (this.randomNumber===0){
				this.stage01();
			}else if (this.randomNumber===1){
				this.stage02();
			}
			
			if (this.reStart===false){
				
				this.reStart = true;
				
			}
			
			ig.game.sortEntitiesDeferred();
			
		},
		reSet:function(){
			
			this.reStart = true;
			
			this.bloctList = ig.game.getEntitiesByType(EntityBlock);
			
			for (var i =0 ; i< this.bloctList.length;i++){
				this.bloctList[i].kill();
			}
			
		},
		stage01:function(){
			
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
			
		},
		stage02:function(){
			
			ig.game.spawnEntity(EntityBlock,450,50,{gameControl:this.gameControl,color:"pink",hp:2});
			
		}
		
		
    });
});