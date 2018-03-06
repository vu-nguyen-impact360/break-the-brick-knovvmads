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
	'game.entities.power-up',
	'game.entities.pause-page',
	'game.entities.ui',
	'game.entities.result-page',
	'game.entities.buttons.sound-bar-button'
)
.defines(function() {
    EntityGameControl = ig.Entity.extend({
        zIndex:500,
        pos:new Vector2(0,0),
        size:new Vector2(20,20),
        color:new ColorRGB(125,255,125,1),
        init:function(x,y,settings){
            this.parent(x,y,settings);
			this.background = ig.game.spawnEntity(EntityBackground,0 ,0,{gameControl:this});
			this.ui = ig.game.spawnEntity(EntityUi,0 ,0,{gameControl:this});
			//this.power = ig.game.spawnEntity(EntityPowerUp,450 ,0,{gameControl:this,typePower:4});
			
			this.pauseButton = ig.game.ig.module('game.entities.result-page')
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
});spawnEntity(EntityPauseButton,40 + 20 ,20,{gameControl:this})
			this.pause = this.pauseButton.state;
			
			this.blockNumber = 0;
			this.stageManager = ig.game.spawnEntity(EntityStageManager,0,0,{gameControl:this});
			
			this.ballNumber = 0;
			
			this.player = ig.game.spawnEntity(EntityPlayer,ig.system.width/2 - 117/2,500,{gameControl:this});
			
			/*
			this.ball = ig.game.spawnEntity(EntityBall,0,0,{gameControl:this});
			this.ball.reStart();
			*/
			
			this.checkButton = ig.game.spawnEntity(EntityCheckButton,0,0,{gameControl:this});
			
			
			this.rightWall = ig.game.spawnEntity(EntityWallSide,920,0,{gameControl:this,rightSide:true});
			this.leftWall = ig.game.spawnEntity(EntityWallSide,0,0,{gameControl:this,rightSide:false});
			this.upWall = ig.game.spawnEntity(EntityWallUp,0,-40,{gameControl:this});
			
			//page
			this.resultPage = ig.game.spawnEntity(EntityResultPage,0,0,{gameControl:this});
			this.pausePage = ig.game.spawnEntity(EntityPausePage,0,0,{gameControl:this});
			
			// sound  ,  sfx   BAR
			this.soundBar = ig.game.spawnEntity(EntitySoundBarButton,0,0,{gameControl:this});
			
			
			this.startGame();
			
			ig.game.sortEntitiesDeferred();
			
			
			this.heart = 2;
			this.score = 0;
			this.Highscore = 0;
			this.countToPlay = false;
			this.timeCountToPlay = 0;
			
			// Page pop-up control
			this.gameOver = false;
			this.home = false;
			           
        },
        update:function(){
            
            this.parent();
			
			
			
			if (this.pause===false){
				
				//this.pause = this.pauseButton.state;
				
				this.checkGameEnd();
				
			}
			
			if (this.countToPlay===true){
				this.timeCountToPlay += 1;
			}
			
			//console.log(this.ballNumber);
			//console.log(this.gameOver);
			
            
        },
        draw:function(){
            this.parent();
			
			/*
			ig.system.context.fillStyle = "#7E6E8A";   // set font colour
			ig.system.context.font = "20px Champ";   // set font
			ig.system.context.textAlign = 'center';
				
			//ig.system.context.fillText(this.heart,480,30);
			
			if (this.heart<0){
				ig.system.context.fillText("Game Over",480,270);
			}
			
			*/
			
			
        },
		startGame:function(){
			
			this.ball = ig.game.spawnEntity(EntityBall,0,0,{gameControl:this});
			this.ball.reStart();
			
			ig.game.sortEntitiesDeferred();
			
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
			
		},
		nextStage:function(){
			
			this.checkButton.released();
			
			this.player.reStart();
			
			this.oldBall = ig.game.getEntitiesByType(EntityBall);
			
			if (this.ballNumber===3){
				
				this.oldBall[2].kill();
				this.oldBall[1].kill();
				this.oldBall[0].reStart();
				
			}else if (this.ballNumber===2){

				this.oldBall[1].kill();
				this.oldBall[0].reStart();
				
			}else if (this.ballNumber===1){

				this.oldBall[0].reStart();
				
			}
			
			this.item = ig.game.getEntitiesByType(EntityPowerUp);
			
			for (var i =0 ; i< this.item.length;i++){
				this.item[i].kill();
			}
			
			this.stageManager.genaretionStage();
			
			
		},
		continue:function(){
			
			this.checkButton.released();
			
			this.player.reStart();
			
			this.startGame();
			
			this.item = ig.game.getEntitiesByType(EntityPowerUp);
			
			for (var i =0 ; i< this.item.length;i++){
				this.item[i].kill();
			}
			
		},
		checkGameEnd:function(){
			
			if (this.ballNumber<=0){
				
				if (this.heart>0){
				
					this.heart -= 1;
					this.continue();
				
				}else if (this.heart<=0){
					
					
					if (this.Highscore<this.score){
						
						this.Highscore = this.score;
						
					}
					
					this.gameOver = true;
					
				}
				
			}
			
			
			
				
		},
		reStart:function(){
			
			
			this.checkButton.released();
			
			this.player.reStart();
			
			this.thisBall = ig.game.getEntitiesByType(EntityBall);
			
			for (var i =0 ; i< this.thisBall.length;i++){
				this.thisBall[i].kill();
			}
			
			this.item = ig.game.getEntitiesByType(EntityPowerUp);
			
			for (var i =0 ; i< this.item.length;i++){
				this.item[i].kill();
			}
			
			this.ball = ig.game.spawnEntity(EntityBall,0,0,{gameControl:this});
			this.ball.reStart();
			
			ig.game.sortEntitiesDeferred();
			
			this.stageManager.reSet();
			this.stageManager.genaretionStage();
			
			this.heart = 2;
			this.score = 0;
			this.gameOver = false;
			this.countToPlay = false;
			this.pauseButton.state = false;
			this.pause = false;
			
		}
		
		
    });
});