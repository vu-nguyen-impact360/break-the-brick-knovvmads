ig.module('game.entities.result-page')
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
		//imageBackground: new ig.Image('media/graphics/game/background.png'),
		// imagePopUp: new ig.Image('media/graphics/game/result-page.png'),
		// imagePopUpMobile: new ig.Image('media/graphics/game/result-page-m.png'),
		scorePopup: new ig.Image('media/graphics/game/score.png'),
		highScorePopup: new ig.Image('media/graphics/game/score_high.png'),
		gameControl:null,
		posDown:new Vector2(0,1080),
		posMid:new Vector2(0,0),
		posUp:new Vector2(0,-1080),
		takeItOut:false,
		reStartButtom:null,
		homeButtom:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.enable = false;
			
			this.bgPopUp = ig.game.getEntitiesByType(EntityBgPopUp)[0];
			
			this.speedMove = 60;
			
			
        },
        update:function(){
            
            this.parent();
			
			//console.log(this.homeButtom);
			
			if (this.gameControl.gameOver===true){
				
				if (this.enable===false){
					
					this.enable = true;
					this.bgPopUp.enable = true;
					this.bgPopUp.show = true;
					
				}
				
				
			}else if (this.gameControl.gameOver===false){
				
				if (this.enable===true){
					
					this.enable = false;
					this.bgPopUp.fixSet();
				}
				
			}
			
			
			if (this.enable===true){
				
				if (this.pos.y < this.posMid.y){
					this.pos.y += this.speedMove;
				}
				
				if (this.reStartButtom.pressed===true ||this.homeButtom.pressed===true ){
					
					this.takeItOut = true;
					this.bgPopUp.unshow = true;
					
					if (this.reStartButtom.pressed===true||this.homeButtom.pressed===true){
						this.gameControl.preReStart();
					}
					
					
				}
				
				if (this.takeItOut===true){
					
					
						if (this.pos.y < this.posDown.y){
						
							this.pos.y += this.speedMove;
						
							if (this.pos.y >= this.posDown.y){
							
								if (this.reStartButtom.pressed===true){
								
									//this.gameControl.reStart();
									this.gameControl.reSet();
									this.reStartButtom.pressed = false;
								
								} else if (this.homeButtom.pressed===true){
								
									this.gameControl.home = true;
									this.gameControl.toHomePage();
									this.homeButtom.pressed = false;
								
								}
							
								this.takeItOut = false;
								this.pos.y = this.posUp.y;
								this.enable = false;
						
							}
						
						}
					
					
					
					
					
				}
				
			}
			
			//console.log( " result  "+this.gameControl.gameOver);
			
			
        },
        draw:function(){
            this.parent();
			
			if (this.enable===true){
				
				//this.imageBackground.draw(this.pos.x,this.pos.y);
				
				ig.system.context.fillStyle = "#ffffff";   // set font colour
				ig.system.context.font = "100px OswaldBold";   // set font
				ig.system.context.textAlign = 'center';
				
				if (ig.ua.mobile){
					
					ig.system.context.fillText("GAME OVER",this.pos.x + 270*2,this.pos.y + 480);

					this.scorePopup.draw(this.pos.x + (1080 - 595)*0.5, this.pos.y + 600);

					this.highScorePopup.draw(this.pos.x + (1080 - 595)*0.5, this.pos.y + 800);

					ig.system.context.fillStyle = "#000000";   // set font colour
					ig.system.context.font = "60px OswaldBold";   // set font
					ig.system.context.textAlign = 'center';

					ig.system.context.fillText(_STRINGS.Results.Score,this.pos.x + (1080 - 595)*0.5 + 128,this.pos.y + 600 + 92);
					ig.system.context.fillText(_STRINGS.Results.HighScore,this.pos.x + (1080 - 595)*0.5 + 130,this.pos.y + 800 + 92);

					ig.system.context.fillText(this.gameControl.score,this.pos.x + (1080 - 595)*0.5 + 427,this.pos.y + 600 + 92);
					ig.system.context.fillText(this.gameControl.Highscore,this.pos.x + (1080 - 595)*0.5 + 427,this.pos.y + 800 + 92);

				}else{
					
					ig.system.context.fillText("GAME OVER",this.pos.x + 480*2,this.pos.y + 100*2);
				
				
					this.scorePopup.draw(this.pos.x + (1920 - 595)*0.5 - 320, this.pos.y + (1080 - 152*2)/2);

					this.highScorePopup.draw(this.pos.x + (1920 - 595)*0.5 + 320, this.pos.y + (1080 - 152*2)/2);

					ig.system.context.fillStyle = "#7E6E8A";   // set font colour
					ig.system.context.font = "60px OswaldBold";   // set font
					ig.system.context.textAlign = 'center';
				
					ig.system.context.fillStyle = "#000000";   // set font colour

					ig.system.context.fillText(_STRINGS.Results.Score,this.pos.x + (1920 - 595)*0.5 - 190,this.pos.y + (1080 - 152*2)/2 + 92);
					ig.system.context.fillText(_STRINGS.Results.HighScore,this.pos.x + (1920 - 595)*0.5 + 450,this.pos.y + (1080 - 152*2)/2 + 92);

					ig.system.context.fillText(this.gameControl.score,this.pos.x + (1920 - 595)*0.5 + 110,this.pos.y + (1080 - 152*2)/2 + 92);
					ig.system.context.fillText(this.gameControl.Highscore,this.pos.x + (1920 - 595)*0.5 + 750,this.pos.y + (1080 - 152*2)/2 + 92);
					
				}
				
				
				
			}
			
			
			
        }
		
    });
});