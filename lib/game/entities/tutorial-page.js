ig.module('game.entities.tutorial-page')
.requires(
	'impact.entity',
	'game.entities.buttons.skip-button',
	'game.entities.buttons.yes-button',
	'game.entities.buttons.no-button'
)
.defines(function() {
    EntityTutorialPage = ig.Entity.extend({
        zIndex:300,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		//animSheet: new ig.AnimationSheet('media/graphics/game/player.png',117,23),
		//imageBackground: new ig.Image('media/graphics/game/background.png'),
		imagePopUp: new ig.Image('media/graphics/game/tutorial-page.png'),
		imageHand: new ig.Image('media/graphics/tutorial/hand_t.png'),
		imagePlayer: new ig.Image('media/graphics/tutorial/player_t.png'),
		imageBall: new ig.Image('media/graphics/tutorial/ball_t.png'),
		imageBlack1: new ig.Image('media/graphics/tutorial/black1_t.png'),
		imageBlack2: new ig.Image('media/graphics/tutorial/black2_t.png'),
		imageBlack3: new ig.Image('media/graphics/tutorial/black3_t.png'),
		imageBlack4: new ig.Image('media/graphics/tutorial/black4_t.png'),
		imageBlack5: new ig.Image('media/graphics/tutorial/black5_t.png'),
		imageIron: new ig.Image('media/graphics/tutorial/iron-block_t.png'),
		imageItem1: new ig.Image('media/graphics/tutorial/item1_t.png'),
		imageItem2: new ig.Image('media/graphics/tutorial/item2_t.png'),
		imageItem3: new ig.Image('media/graphics/tutorial/item3_t.png'),
		imageItem4: new ig.Image('media/graphics/tutorial/item4_t.png'),
		gameControl:null,
		posDown:new Vector2(0,540),
		posMid:new Vector2(0,0),
		posUp:new Vector2(0,-540),
		takeItOut:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.enable = false;
			
			
			this.skipButtom = ig.game.spawnEntity(EntitySkipButton,-1000,14,{gameControl:this.gameControl,tutorialPage:this});
			this.yesButtom = ig.game.spawnEntity(EntityYesButton,369.65,344.58,{gameControl:this.gameControl,tutorialPage:this});
			this.noButtom = ig.game.spawnEntity(EntityNoButton,369.65,421.56,{gameControl:this.gameControl,tutorialPage:this});
			
			
			ig.game.sortEntitiesDeferred();
			
			
			//this.bgPopUp = ig.game.getEntitiesByType(EntityBgPopUp)[0];
			
			//this.speedMove = 60;
			
			this.mixIndex = 7; // max page of tutorial
			
			// page 2
			this.handMove = true;
			this.playerMove = false;
			
			this.handSpeed = 8;
			this.playerSpeed = 5;
			
			this.handPosX = 300;
			this.handPosY = 355;
			
			this.playerPosX = 300;
			this.playerPosY = 460;
			
			//page 3
			
			this.ball1 = new Vector2(290,320);
			this.ball2 = new Vector2(340,320);
			this.ball3 = new Vector2(380,320);

			this.vecX1 = 3;
			this.vecX2 = 3;
			this.vecX3 = 3;
			
			this.vecY1 = 2;
			this.vecY2 = 2;
			this.vecY3 = 2;
			
			this.hit = false;
			
			//page 4
			
			this.black1 = new Vector2(360,330);
			this.black2 = new Vector2(420,330);
			
			this.black3 = new Vector2(480,330);
			this.black4 = new Vector2(480,330);
			
			this.black5 = new Vector2(540,450);
			
			this.ballPage4 = new Vector2(360,420+28);
			this.vecPage4 = new Vector2(3,-2);
			
			this.hited1 = false;
			this.hited2 = false;
			
			//page 5
			
			this.ballPage5 = new Vector2(360,420+28);
			this.vecPage5 = new Vector2(3,-2);
			
			//page 6
			
			this.itemPos1 = new Vector2(310,310);
			this.itemPos2 = new Vector2(400,385);
			this.itemPos3 = new Vector2(490,420);
			this.itemPos4 = new Vector2(580,340);
			
			this.accItem = 2;
			
        },
        update:function(){
            
            this.parent();
			
			if (this.gameControl.tutorialDone===false&&this.gameControl.home===false&&this.gameControl.setting===false){
				
				if (this.enable===false){
					
					this.enable = true;
					//this.bgPopUp.enable = true;
					//this.bgPopUp.show = true;
					
					
				}
				
				
			}
			if (this.gameControl.tutorialDone===true){
				
				if (this.enable===true){
					
					this.enable = false;
					//this.bgPopUp.fixSet();
				}
				
			}
			
			if (this.enable===true){
				
				if (this.gameControl.checkButton.pressed===true){
					this.gameControl.checkButton.pressed = false;
					this.gameControl.tutorialIndex +=1
					
					if (this.gameControl.tutorialIndex > this.mixIndex){
						
						this.clase();
						
					}
					
					
				}
				
			}
			
			if  (this.gameControl.tutorialIndex===2) {
				
				if (this.handMove=== true&&this.handPosX<690){
					this.handPosX += this.handSpeed;
					
					if (this.handPosX>430){
						this.playerMove = true;
					}
					
					if (this.handPosX >= 690){
						this.handMove = false;
						this.handPosX = 690;
						
					}
					
				}
				
				if (this.playerMove===true&&this.playerPosX<690){
					this.playerPosX += this.playerSpeed;
					
					if (this.playerPosX >= 690){
						this.playerMove = false;
						this.playerPosX = 690;
						
					}
					
				}
				
				if (this.handMove===false&&this.playerMove===false)
				{
					
					this.handPosX -= this.handSpeed;
					
					if (this.handPosX <= 300){
						//this.handMove = true;
						this.handPosX = 300;
						
					}
					
					this.playerPosX -= this.playerSpeed;
					if (this.playerPosX <= 300){
						//this.playerMove = false;
						this.playerPosX = 300;
						
					}
					
					if (this.handPosX===300&&this.playerPosX===300){
						this.handMove = true;
					}
					
				}
				
				
			}
			
			if  (this.gameControl.tutorialIndex===3) {
				
				if (this.hit===false){
					
					this.ball1.x += this.vecX1;
					this.ball2.x += this.vecX2;
					this.ball3.x += this.vecX3;
				
					this.ball1.y += this.vecY1;
					this.ball2.y += this.vecY2;
					this.ball3.y += this.vecY3;
					
					if (this.ball1.y>=450 - 28){
					
						this.ball1.y = 450 - 28;
						this.ball2.y = 450 - 28;
						this.ball3.y = 450 - 28;
						
						this.hit = true;
						
						this.vecX1 = -3.4;
						this.vecY1 = -2;
						
						this.vecX2 = 0;
						this.vecY2 = -2;
						
						this.vecX3 = 2.4;
						this.vecY3 = -2;
						
					}
					
				}else if (this.hit===true){
					
					this.ball1.x += this.vecX1;
					this.ball2.x += this.vecX2;
					this.ball3.x += this.vecX3;
				
					this.ball1.y += this.vecY1;
					this.ball2.y += this.vecY2;
					this.ball3.y += this.vecY3;
					
					if (this.ball2.y<=320){
					
						this.ball1 = new Vector2(290,320);
						this.ball2 = new Vector2(340,320);
						this.ball3 = new Vector2(380,320);
						
						this.hit = false;
						
						this.vecX1 = 3;
						this.vecY1 = 2;
						
						this.vecX2 = 3;
						this.vecY2 = 2;
						
						this.vecX3 = 3;
						this.vecY3 = 2;
						
					}
					
				}
				
				
			}
			
			if  (this.gameControl.tutorialIndex===4) {
			
				this.ballPage4.x += this.vecPage4.x;
				this.ballPage4.y += this.vecPage4.y;
					
				if (this.hited1===false&&this.hited2===false){
					
					if (this.ballPage4.y<=this.black3.y+32){
						
						this.ballPage4.y=this.black3.y+32;
						this.hited1 = true;
						this.vecPage4.y *= -1;
						
					}
					
				}
				
				if (this.hited1===true){
					
					if (this.ballPage4.y>=this.black5.y-28){
						
						this.ballPage4.y=this.black5.y-28;
						this.hited2 = true;
						this.vecPage4.y *= -1;
						
					}
					
				}
				
				if (this.hited2===true){
					
					if (this.ballPage4.y<=this.black3.y){
						
						this.hited1 = false;
						this.hited2 = false;
						
						this.ballPage4 = new Vector2(360,420+28);
						
					}
					
				}
				
					
			}
			
			if  (this.gameControl.tutorialIndex===5) {
				
				this.ballPage5.x += this.vecPage5.x;
				this.ballPage5.y += this.vecPage5.y;
				
				if (this.ballPage5.y<=330+32){
					
					this.ballPage5.y=330+32;
					this.vecPage5.y = -3;
					this.vecPage5.x = 4.5;
					this.vecPage5.y *= -1;
					
					
				}
				
				if (this.ballPage5.y>= 420+28){
					
					this.vecPage5.y = -2;
					this.vecPage5.x = 3;
					this.ballPage5 = new Vector2(360,420+28);
					
				}
				
			}
			
			if  (this.gameControl.tutorialIndex===6) {
				
				this.itemPos1.y += this.accItem;
				
				if (this.itemPos1.y >= 450){
					
					this.itemPos1.y = 310;
					
				}
				
				this.itemPos2.y += this.accItem;
				
				if (this.itemPos2.y >= 450){
					
					this.itemPos2.y = 310;
					
				}
				
				this.itemPos3.y += this.accItem;
				
				if (this.itemPos3.y >= 450){
					
					this.itemPos3.y = 310;
					
				}
				
				this.itemPos4.y += this.accItem;
				
				if (this.itemPos4.y >= 450){
					
					this.itemPos4.y = 310;
					
				}
				
			}
			/*
			
			if (this.enable===true){
				
				if (this.pos.y > this.posMid.y){
					this.pos.y -= this.speedMove;
				}
				
				if (this.backButtom.pressed === true){
					
					this.takeItOut = true;
					this.bgPopUp.unshow = true;
					
					this.gameControl.preReStart();

					
					
				}
				
				if (this.takeItOut===true){
					
					
						if (this.pos.y > this.posUp.y){
						
							this.pos.y -= this.speedMove;
						
							if (this.pos.y <= this.posUp.y){
							
								//if ( this.backButtom.pressed === true ){
								
									//this.gameControl.pauseButton.state = false;
									//this.gameControl.countToPlay = true;
								this.gameControl.setting = false;
								this.gameControl.home = true;
								this.backButtom.pressed = false;
								
								//} 
							
								this.takeItOut = false;
								this.pos.y = this.posDown.y;
								this.enable = false;
						
							}
						
						}
					
					
					
					
					
				}
				
			}
			*/
			
			//console.log(this.gameControl.countToPlay);
			
			
        },
        draw:function(){
            this.parent();
			
			if (this.enable===true){
				
				//console.log(this.gameControl.tutorialIndex);
				//this.imageBackground.draw(this.pos.x,this.pos.y);
				
				ig.system.context.fillStyle = "#7E6E8A";   // set font colour
				ig.system.context.font = "50px Champ";   // set font
				ig.system.context.textAlign = 'center';
				
				
				//ig.system.context.fillText("TUTORIAL",this.pos.x + 480,this.pos.y + 100);
				ig.system.context.fillText("TUTORIAL",480,100);
				
				//this.imagePopUp.draw(this.pos.x + (960 - 449)/2 ,this.pos.y + (540 - 174)/2  - 40);
				this.imagePopUp.draw(this.pos.x,this.pos.y);
				
				// page of tutorial
				
				if (this.gameControl.tutorialIndex===1){
					
					ig.system.context.fillStyle = "#7E6E8A";   // set font colour
					ig.system.context.font = "30px Champ";   // set font
					ig.system.context.textAlign = 'center';
				
						ig.system.context.fillText(_STRINGS.Game.toturial01_01,480,220);
					
				}else if  (this.gameControl.tutorialIndex===2) {
					ig.system.context.fillStyle = "#7E6E8A";   // set font colour
					ig.system.context.font = "20px Champ";   // set font
					ig.system.context.textAlign = 'center';
				
						ig.system.context.fillText(_STRINGS.Game.toturial02_01,480,190);
						ig.system.context.fillText(_STRINGS.Game.toturial02_02,480,220);
						
						this.imageHand.draw(this.handPosX - 25,this.handPosY);
						this.imagePlayer.draw(this.playerPosX - 117/2,this.playerPosY);
					
				}else if  (this.gameControl.tutorialIndex===3) {
					ig.system.context.fillStyle = "#7E6E8A";   // set font colour
					ig.system.context.font = "20px Champ";   // set font
					ig.system.context.textAlign = 'center';
				
						ig.system.context.fillText(_STRINGS.Game.toturial03_01,480,190);
						ig.system.context.fillText(_STRINGS.Game.toturial03_02,480,220);
						ig.system.context.fillText(_STRINGS.Game.toturial03_03,480,250);
						
						this.imageBall.draw(this.ball1.x,this.ball1.y);
						this.imageBall.draw(this.ball2.x,this.ball2.y);
						this.imageBall.draw(this.ball3.x,this.ball3.y);
						this.imagePlayer.draw(450,450);
						
				}else if  (this.gameControl.tutorialIndex===4) {
					ig.system.context.fillStyle = "#7E6E8A";   // set font colour
					ig.system.context.font = "20px Champ";   // set font
					ig.system.context.textAlign = 'center';
				
						ig.system.context.fillText(_STRINGS.Game.toturial04_01,480,190);
						ig.system.context.fillText(_STRINGS.Game.toturial04_02,480,220);
						ig.system.context.fillText(_STRINGS.Game.toturial04_03,480,250);
						
						this.imageBlack1.draw(this.black1.x,this.black1.y);
						this.imageBlack2.draw(this.black2.x,this.black2.y);
						
						if (this.hited1===false){
							
							this.imageBlack3.draw(this.black3.x,this.black3.y);
							
						}else {
							
							this.imageBlack4.draw(this.black4.x,this.black4.y);
							
						}
						
						if (this.hited2===false){
							
							this.imageBlack5.draw(this.black5.x,this.black5.y);
							
						}
						
						this.imageBall.draw(this.ballPage4.x,this.ballPage4.y);
						
				}else if  (this.gameControl.tutorialIndex===5) {
					ig.system.context.fillStyle = "#7E6E8A";   // set font colour
					ig.system.context.font = "20px Champ";   // set font
					ig.system.context.textAlign = 'center';
				
						ig.system.context.fillText(_STRINGS.Game.toturial05_01,480,190);
						ig.system.context.fillText(_STRINGS.Game.toturial05_02,480,220);
						ig.system.context.fillText(_STRINGS.Game.toturial05_03,480,250);
						
						this.imageIron.draw(310,330);
						this.imageIron.draw(370,330);
						this.imageIron.draw(430,330);
						this.imageIron.draw(490,330);
						this.imageIron.draw(550,330);
						this.imageIron.draw(610,330);
						
						this.imageBall.draw(this.ballPage5.x,this.ballPage5.y);
						
				}else if  (this.gameControl.tutorialIndex===6) {
					ig.system.context.fillStyle = "#7E6E8A";   // set font colour
					ig.system.context.font = "20px Champ";   // set font
					ig.system.context.textAlign = 'center';
				
						ig.system.context.fillText(_STRINGS.Game.toturial06_01,480,190);
						ig.system.context.fillText(_STRINGS.Game.toturial06_02,480,220);
						ig.system.context.fillText(_STRINGS.Game.toturial06_03,480,250);
						
						this.imageItem1.draw(this.itemPos1.x,this.itemPos1.y);
						this.imageItem2.draw(this.itemPos2.x,this.itemPos2.y);
						this.imageItem3.draw(this.itemPos3.x,this.itemPos3.y);
						this.imageItem4.draw(this.itemPos4.x,this.itemPos4.y);
						
						
				}else if  (this.gameControl.tutorialIndex===7) {
					ig.system.context.fillStyle = "#7E6E8A";   // set font colour
					ig.system.context.font = "20px Champ";   // set font
					ig.system.context.textAlign = 'center';
				
						ig.system.context.fillText(_STRINGS.Game.toturial07_01,480,190);
						ig.system.context.fillText(_STRINGS.Game.toturial07_02,480,220);
						//ig.system.context.fillText(" ",480,250);
						
						
						
				}
				
				
				
			}
			
			
			
        },
		clase:function(){
			
			this.gameControl.tutorialIndex = 1;
			this.gameControl.tutorialDone = true;
			this.enable = false;
			
		}
		
    });
});