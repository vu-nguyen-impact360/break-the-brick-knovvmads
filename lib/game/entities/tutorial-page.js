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
		gameControl:null,
		posDown:new Vector2(0,540),
		posMid:new Vector2(0,0),
		posUp:new Vector2(0,-540),
		takeItOut:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.enable = false;
			
			
			this.skipButtom = ig.game.spawnEntity(EntitySkipButton,53,14,{gameControl:this.gameControl,tutorialPage:this});
			this.yesButtom = ig.game.spawnEntity(EntityYesButton,369.65,344.58,{gameControl:this.gameControl,tutorialPage:this});
			this.noButtom = ig.game.spawnEntity(EntityNoButton,369.65,421.56,{gameControl:this.gameControl,tutorialPage:this});
			
			
			ig.game.sortEntitiesDeferred();
			
			
			//this.bgPopUp = ig.game.getEntitiesByType(EntityBgPopUp)[0];
			
			//this.speedMove = 60;
			
			this.mixIndex = 10; // max page of tutorial
			
			
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
					ig.system.context.font = "20px Champ";   // set font
					ig.system.context.textAlign = 'center';
				
						ig.system.context.fillText("Do you want a tutorial?",480,220);
					
				}else {
					ig.system.context.fillStyle = "#7E6E8A";   // set font colour
					ig.system.context.font = "50px Champ";   // set font
					ig.system.context.textAlign = 'center';
				
						ig.system.context.fillText("page "+this.gameControl.tutorialIndex,480,220);
					
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