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
	'game.entities.background',
	'game.entities.power-up'
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
			
			//this.power = ig.game.spawnEntity(EntityPowerUp,450 ,0,{gameControl:this,typePower:4})
			
			this.pauseButton = ig.game.spawnEntity(EntityPauseButton,40 + 20 ,20,{gameControl:this})
			this.pause = this.pauseButton.state;
			
			this.blockNumber = 0;
			this.stageManager = ig.game.spawnEntity(EntityStageManager,0,0,{gameControl:this})
			
			this.ballNumber = 0;
			
			this.player = ig.game.spawnEntity(EntityPlayer,400,500,{gameControl:this});
			
			/*
			this.ball = ig.game.spawnEntity(EntityBall,0,0,{gameControl:this});
			this.ball.reStart();
			*/
			
			this.checkButton = ig.game.spawnEntity(EntityCheckButton,0,0,{gameControl:this})
			
			
			this.rightWall = ig.game.spawnEntity(EntityWallSide,920,0,{gameControl:this,rightSide:true});
			this.leftWall = ig.game.spawnEntity(EntityWallSide,0,0,{gameControl:this,rightSide:false});
			this.upWall = ig.game.spawnEntity(EntityWallUp,0,-40,{gameControl:this});
			
			this.startGame();
			
			ig.game.sortEntitiesDeferred();
			
			
			this.heart = 3;
			this.score = 0;
			
			           
        },
        update:function(){
            
            this.parent();
			
			this.pause = this.pauseButton.state;
			
			if (this.pause===false){
				
			}
			
			//console.log(this.ballNumber);
			console.log(this.heart);
			
            
        },
        draw:function(){
            this.parent();
			
			ig.system.context.fillStyle = "black";   // set font colour
			ig.system.context.font = "20px Champ";   // set font
			ig.system.context.textAlign = 'center';
				
			ig.system.context.fillText("text",480,270);
			
			
        },
		startGame:function(){
			
			this.ball = ig.game.spawnEntity(EntityBall,0,0,{gameControl:this});
			this.ball.reStart();
			
		},
		cloningBall:function(){
			
			if (this.ballNumber<3){
				
				this.arrayBall = ig.game.getEntitiesByType(EntityBall);
				
				if (this.ballNumber===1){
					
					
					this.angleX = this.arrayBall[0].vel.x/this.arrayBall[0].accVel.x;
					this.angleY = this.arrayBall[0].vel.y/this.arrayBall[0].accVel.y;
					
					//ball 2 
					this.ball2 = ig.game.spawnEntity(EntityBall,this.arrayBall[0].pos.x,this.arrayBall[0].pos.y,{gameControl:this});
					this.ball2.accVel.x = this.arrayBall[0].accVel.x;
					this.ball2.accVel.y = this.arrayBall[0].accVel.y;
					
					this.ball2AngleX = this.angleX*-1;
					
					
					this.ball2AngleY = this.angleY ;
					
					
					this.ball2.vel.x = (this.ball2AngleX)*this.ball2.accVel.x;
					this.ball2.vel.y = (this.ball2AngleY)*this.ball2.accVel.y;
					
					this.ball2.stick = false;
					
					
					// ball 3
					this.ball3 = ig.game.spawnEntity(EntityBall,this.arrayBall[0].pos.x,this.arrayBall[0].pos.y,{gameControl:this});
					this.ball3.accVel.x = this.arrayBall[0].accVel.x;
					this.ball3.accVel.y = this.arrayBall[0].accVel.y;
					
					this.ball3AngleX = this.angleX ;
					
					
					this.ball3AngleY = this.angleY *-1;
					
					
					this.ball3.vel.x = (this.ball3AngleX)*this.ball3.accVel.x;
					this.ball3.vel.y = (this.ball3AngleY)*this.ball3.accVel.y;
					
					this.ball3.stick = false;
					
					
				}else if (this.ballNumber===2){
					
					this.angleX = this.arrayBall[0].vel.x/this.arrayBall[0].accVel.x;
					this.angleY = this.arrayBall[0].vel.y/this.arrayBall[0].accVel.y;
					
					//ball 3
					this.ball3 = ig.game.spawnEntity(EntityBall,this.arrayBall[0].pos.x,this.arrayBall[0].pos.y,{gameControl:this});
					this.ball3.accVel.x = this.arrayBall[0].accVel.x;
					this.ball3.accVel.y = this.arrayBall[0].accVel.y;
					
					this.ball3AngleX = this.angleX ;
					
					
					this.ball3AngleY = this.angleY *-1;
					
					
					this.ball3.vel.x = (this.ball3AngleX)*this.ball3.accVel.x;
					this.ball3.vel.y = (this.ball3AngleY)*this.ball3.accVel.y;
					
					this.ball3.stick = false;
					
					
				}
				
				
			}
			
		ig.game.sortEntitiesDeferred();	
			
		}
		
		
    });
});