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
	'game.entities.buttons.sound-bar-button',
	'game.entities.home-page',
	'game.entities.setting-page',
	'game.entities.buttons.music-bar-button',
	'game.entities.bg-pop-up',
	'game.entities.white-fade',
	'game.entities.tutorial-page'
)
.defines(function() {
    EntityGameControl = ig.Entity.extend({
        zIndex:500,
        pos:new Vector2(0,0),
        size:new Vector2(20,20),
        color:new ColorRGB(125,255,125,1),
		resetSound:"resetSound",
        init:function(x,y,settings){
            this.parent(x,y,settings);
			this.background = ig.game.spawnEntity(EntityBackground,0 ,0,{gameControl:this});
			this.bgPopUp = ig.game.spawnEntity(EntityBgPopUp,0 ,0,{gameControl:this});
			this.ui = ig.game.spawnEntity(EntityUi,0 ,0,{gameControl:this});
			
			this.whiteFade = ig.game.spawnEntity(EntityWhiteFade,0 ,0,{gameControl:this});
			
			//this.power = ig.game.spawnEntity(EntityPowerUp,450 ,0,{gameControl:this,typePower:4});
			
			this.pauseButton = ig.game.spawnEntity(EntityPauseButton,53 ,14,{gameControl:this})
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
			
			// wall
			if (ig.ua.mobile){
				
				this.rightWall = ig.game.spawnEntity(EntityWallSide,500,0,{gameControl:this,rightSide:true});
				
			}else{
			
				this.rightWall = ig.game.spawnEntity(EntityWallSide,920,0,{gameControl:this,rightSide:true});
				
			}
			this.leftWall = ig.game.spawnEntity(EntityWallSide,0,0,{gameControl:this,rightSide:false});
			this.upWall = ig.game.spawnEntity(EntityWallUp,0,-40,{gameControl:this});
			
			//page
			this.resultPage = ig.game.spawnEntity(EntityResultPage,0,-540,{gameControl:this});
			if (ig.ua.mobile){
				this.pausePage = ig.game.spawnEntity(EntityPausePage,0,960,{gameControl:this});
			}else{
				this.pausePage = ig.game.spawnEntity(EntityPausePage,0,540,{gameControl:this});
			}
			
			this.resultPage.reStartButtom = this.pausePage.reStartButtom;
			this.resultPage.homeButtom = this.pausePage.homeButtom;
			
			
			this.homePage = ig.game.spawnEntity(EntityHomePage,0,0,{gameControl:this});
			if (ig.ua.mobile){
				this.settingPage = ig.game.spawnEntity(EntitySettingPage,0,960,{gameControl:this});
			}else{
				this.settingPage = ig.game.spawnEntity(EntitySettingPage,0,540,{gameControl:this});	
			}
			this.tutorialPage =  ig.game.spawnEntity(EntityTutorialPage,0,0,{gameControl:this});
			
			// sound  ,  sfx   BAR
			this.soundBar = ig.game.spawnEntity(EntitySoundBarButton,0,0,{gameControl:this});
			this.musicBar = ig.game.spawnEntity(EntityMusicBarButton,0,0,{gameControl:this});
			
			
			
			ig.game.sortEntitiesDeferred();
			
			var data = ig.game.io.storageGet(ig.game.io.gamekey);
			data = data || {volume:{sfx:1, bgm:1}, highScore:0};
			this.Highscore = data.highScore;
			
			
			this.heart = 2;
			this.score = 0;
			this.countToPlay = false;
			this.timeCountToPlay = 0;
			this.showWall = true;
			this.delay = false;
			
			// Page pop-up control // *  if all false = in game play  * //
			/* this.pause */
			this.gameOver = false;
			this.home = true; // start at home-page
			this.setting = false;
			this.tutorialIndex = 1;
			this.tutorialDone = false;
			
			this.preReStart();
			
        },
        update:function(){
            
            this.parent();
			
			if (this.home===false&&this.setting===false){
				
				if (this.tutorialDone===true){
					
					this.ballList = ig.game.getEntitiesByType(EntityBall)
					this.ballNumber = this.ballList.length;
					
					if (this.pause===false&&this.delay===false){
				
						//this.pause = this.pauseButton.state;
				
						this.checkGameEnd();
				
					}
			
					if (this.countToPlay===true){
						this.timeCountToPlay += 1;
					}
					
					
				}else if (this.tutorialDone===false){
					
					// now do not anything
					
				}
				
			}
			
			
			//console.log(this.ballNumber);
			//console.log(this.home);
			
            
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
		startGameplay:function(){ // home-page to gameplay
			
			this.thisBall = ig.game.getEntitiesByType(EntityBall);
			
			for (var i =0 ; i< this.thisBall.length;i++){
				this.thisBall[i].kill();
			}
			
			this.ball = ig.game.spawnEntity(EntityBall,0,0,{gameControl:this});
			this.ball.reStart();
			
			this.stageManager.genaretionStage();
			
			ig.game.sortEntitiesDeferred();
			
			this.showWall = true;
			
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
			
			this.ironList = ig.game.getEntitiesByType(EntityBlockIron);
			
			for (var i =0 ; i< this.ironList.length;i++){
				this.ironList[i].kill();
			}
			
			this.stageManager.genaretionStage();
			
			
		},
		continue:function(){
			
			this.checkButton.released();
			
			this.player.reStart();
			
			//this.startGameplay();
			
			this.thisBall = ig.game.getEntitiesByType(EntityBall);
			
			for (var i =0 ; i< this.thisBall.length;i++){
				this.thisBall[i].kill();
			}
			
			this.ball = ig.game.spawnEntity(EntityBall,0,0,{gameControl:this});
			this.ball.reStart();
			
			ig.game.sortEntitiesDeferred();	
			
			this.item = ig.game.getEntitiesByType(EntityPowerUp);
			
			for (var i =0 ; i< this.item.length;i++){
				this.item[i].kill();
			}
			
		},
		checkGameEnd:function(){
			
			if (this.ballNumber<=0){
				
				if (this.heart>0){
				
					this.heart -= 1;
					//this.continue();
					this.whiteFade.continueStage();
					ig.soundHandler.sfxPlayer.play(this.resetSound);
				
				}else if (this.heart<=0){
					
					
					if (this.Highscore<this.score){
						
						this.Highscore = this.score;
						
						var data = ig.game.io.storageGet(ig.game.io.gamekey);
						data.highScore = this.Highscore;
						ig.game.io.storageSet(ig.game.io.gamekey, data);
					
						
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
			this.showWall = true;
			//this.delay = false;
			
		},
		toHomePage:function(){
			
			this.home = true;
			this.setting = false;
			
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
			
			this.heart = 2;
			this.score = 0;
			this.gameOver = false;
			this.countToPlay = false;
			this.pauseButton.state = false;
			this.pause = false;
			
			this.stageManager.reSet();
			
			//this.homePage.moreGameButtom.enable = true;
			//this.homePage.moreGameButtom.show();
			
			//this.home = true;
			//this.setting = false;
			//this.delay = false;
			
		},
		preReStart:function(){
			
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
			
			this.stageManager.reSet();
			this.showWall = false;
		}
		
		
    });
});