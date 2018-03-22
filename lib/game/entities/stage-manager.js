ig.module('game.entities.stage-manager')
.requires(
	'impact.entity',
	'game.entities.block',
	'game.entities.block-iron'
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
			
			this.stateNumber = 3;
			this.reStart = false;
			
        },
        update:function(){
            
            this.parent();
			
			if (this.gameControl.blockNumber<=0 && this.reStart===false && this.gameControl.home===false &&this.gameControl.delay===false){
				
				this.gameControl.whiteFade.clearStage();
				//this.gameControl.nextStage();
				//this.genaretionStage();
			}
			
			
        },
        draw:function(){
            this.parent();
			
        },
		genaretionStage:function(){
			
			if (this.gameControl.home===false){
				/*
				this.randomNumber = Math.floor(Math.random()*this.stateNumber);
			
				if (this.randomNumber===0){
					this.stage01();
				}else if (this.randomNumber===1){
					this.stage02();
				}else if (this.randomNumber===2){
					this.stage03();
				}
				*/
				
				this.stage05();
				
				if (this.reStart===true){
				
					this.reStart = false;
				
				}
			
				ig.game.sortEntitiesDeferred();
				
			}
			
			
		},
		reSet:function(){
			
			this.reStart = true;
			
			this.bloctList = ig.game.getEntitiesByType(EntityBlock);
			
			for (var i =0 ; i< this.bloctList.length;i++){
				this.bloctList[i].kill();
			}
			
			this.ironList = ig.game.getEntitiesByType(EntityBlockIron);
			
			for (var i =0 ; i< this.ironList.length;i++){
				this.ironList[i].kill();
			}
			
		},
		stage01:function(){
			
			ig.game.spawnEntity(EntityBlock,40,85,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,40 + 60,85,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,40 + 60 + 60,85,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,40,85 + 32,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,40 + 60,85 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,40 + 60 + 60,85 + 32,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,40,85 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,40 + 60,85 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,40 + 60 + 60,85 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,40,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,40 + 60,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,40 + 60 + 60,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,40,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,40 + 60,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,40 + 60 + 60,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			
			
			ig.game.spawnEntity(EntityBlock,860,85,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,860 - 60,85,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,860 - 60 - 60,85,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,860,85 + 32,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,860 - 60,85 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,860 - 60 - 60,85 + 32,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,860,85 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,860 - 60,85 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,860 - 60 - 60,85 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,860,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,860 - 60,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,860 - 60 - 60,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,860,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,860 - 60,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,860 - 60 - 60,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			
			ig.game.spawnEntity(EntityBlock,390,85,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,390 + 60,85,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,390 + 60 + 60,85,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,390,85 + 32,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,390 + 60,85 + 32,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,390 + 60 + 60,85 + 32,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,390,85 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,390 + 60,85 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,390 + 60 + 60,85 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,390,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,390 + 60,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,390 + 60 + 60,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,390,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,390 + 60,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,390 + 60 + 60,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"violet",hp:2});
			
			ig.game.spawnEntity(EntityBlock,275 - 5,85,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,275 - 5,85 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,275 - 5,85 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,275 - 5,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,275 - 5,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,275 - 5,85 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,275 - 5,85 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			
			ig.game.spawnEntity(EntityBlock,625 + 5,85,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,625 + 5,85 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,625 + 5,85 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,625 + 5,85 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,625 + 5,85 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,625 + 5,85 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			//ig.game.spawnEntity(EntityBlock,625,85 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			
			ig.game.spawnEntity(EntityBlock,270 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60 + 60 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60 + 60 + 60 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			
			ig.game.spawnEntity(EntityBlock,275 - 5,85 + 32 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60 + 60 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,270 + 60 + 60 + 60 + 60 + 60 + 60,85 + 32 + 32 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"black",hp:2});
			
		},
		stage02:function(){
			
			ig.game.spawnEntity(EntityBlock,10 + 80,100 ,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80,100 ,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 ,100 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 ,100 ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 ,100 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 ,100 ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80,100 ,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 ,{gameControl:this.gameControl,color:"yellow",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 ,{gameControl:this.gameControl,color:"violet",hp:2});
			
			ig.game.spawnEntity(EntityBlock,10 + 80,100 + 52 ,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80,100 + 52 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 ,100 + 52 ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 ,100 + 52 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 ,100 + 52 ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 ,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80,100 + 52,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 ,{gameControl:this.gameControl,color:"yellow",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 ,{gameControl:this.gameControl,color:"pink",hp:1});
			
			ig.game.spawnEntity(EntityBlock,10 + 80,100 + 52 + 52 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80,100 + 52 + 52 ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 ,100 + 52 + 52 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 ,100 + 52 + 52 ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 ,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80,100 + 52 + 52,{gameControl:this.gameControl,color:"yellow",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 ,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 ,{gameControl:this.gameControl,color:"red",hp:2});
			
			ig.game.spawnEntity(EntityBlock,10 + 80,100 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80,100 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 ,100 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"yellow",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80,100 + 52 + 52 + 52,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"black",hp:1});
		
			ig.game.spawnEntity(EntityBlock,10 + 80,100 + 52 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80,100 + 52 + 52 + 52 + 52,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 ,100 + 52 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"red",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 + 52,{gameControl:this.gameControl,color:"yellow",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80,100 + 52 + 52 + 52 + 52,{gameControl:this.gameControl,color:"pink",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,10 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 + 80 ,100 + 52 + 52 + 52 + 52 ,{gameControl:this.gameControl,color:"yellow",hp:2});
		},
		stage03:function(){
			
			ig.game.spawnEntity(EntityBlock,60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:2});
		
			ig.game.spawnEntity(EntityBlock,60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 ,{gameControl:this.gameControl,color:"violet",hp:2});
		
			ig.game.spawnEntity(EntityBlock,60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80  + 80  ,{gameControl:this.gameControl,color:"yellow",hp:2});
		
			ig.game.spawnEntity(EntityBlock,60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 80 + 80  + 80  ,{gameControl:this.gameControl,color:"pink",hp:2});
		
			
		},
		stage04:function(){
			
			ig.game.spawnEntity(EntityBlock,90,95,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlockIron,90,95 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60,95,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60,95 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60,95,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60,95 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,95,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32,{gameControl:this.gameControl});
			
			ig.game.spawnEntity(EntityBlock,90,95 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"red",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,95 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl,color:"pink",hp:2});
			
			
		},
		stage05:function(){
			
			ig.game.spawnEntity(EntityBlock,90,100 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"black",hp:1});
			
			ig.game.spawnEntity(EntityBlock,90 + 60,100 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 ,{gameControl:this.gameControl,color:"violet",hp:1});
			
			
			ig.game.spawnEntity(EntityBlock,90,100 + 32 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"violet",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"violet",hp:1});
			
			ig.game.spawnEntity(EntityBlock,90 + 60,100 + 32 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"black",hp:1});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 ,{gameControl:this.gameControl,color:"black",hp:1});
			
			ig.game.spawnEntity(EntityBlockIron,90,100 + 32 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlockIron,90 + 60,100 + 32 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60,100 + 32 + 32,{gameControl:this.gameControl});
			
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32,{gameControl:this.gameControl});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60,100 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60,100 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			
			//
			ig.game.spawnEntity(EntityBlock,90,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			
			
			ig.game.spawnEntity(EntityBlock,90,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"black",hp:2});
			
			ig.game.spawnEntity(EntityBlock,90 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			ig.game.spawnEntity(EntityBlock,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 ,{gameControl:this.gameControl,color:"violet",hp:2});
			
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl});
			ig.game.spawnEntity(EntityBlockIron,90 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60 + 60,100 + 32 + 32 + 32 + 32 + 32,{gameControl:this.gameControl});
			
			
		}
		
		
    });
});