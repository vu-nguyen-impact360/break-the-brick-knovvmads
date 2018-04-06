ig.module('game.entities.pause-page')
.requires(
	'impact.entity',
	'game.entities.buttons.play-button',
	'game.entities.buttons.restart-button',
	'game.entities.buttons.home-button'
)
.defines(function() {
    EntityPausePage = ig.Entity.extend({
        zIndex:300,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		//animSheet: new ig.AnimationSheet('media/graphics/game/background.png',960,540),
		//imageBackground: new ig.Image('media/graphics/game/background.png'),
		imagePopUp: new ig.Image('media/graphics/game/pause-page.png'),
		gameControl:null,
		posDown:new Vector2(0,540),
		posMid:new Vector2(0,0),
		posUp:new Vector2(0,-540),
		posDownMobile:new Vector2(0,960),
		posMidMobile:new Vector2(0,0),
		posUpMobile:new Vector2(0,-960),
		takeItOut:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			
			this.enable = false;
			this.playButtom = ig.game.spawnEntity(EntityPlayButton,0,ig.system.height/2 - this.size.y/4,{gameControl:this.gameControl,pausePage:this})
			
			this.reStartButtom = ig.game.spawnEntity(EntityRestartButton,0,0,{gameControl:this.gameControl,pausePage:this,resultPage:this.gameControl.resultPage})
			
			this.homeButtom = ig.game.spawnEntity(EntityHomeButton,0,0,{gameControl:this.gameControl,pausePage:this,resultPage:this.gameControl.resultPage})
			
			ig.game.sortEntitiesDeferred();
			
			this.bgPopUp = ig.game.getEntitiesByType(EntityBgPopUp)[0];
			
			
			if (ig.ua.mobile){
				this.speedMove = 120;
			}else{
				this.speedMove = 60;
			}
		
			//console.log(this.bgPopUp);
			
        },
        update:function(){
            
            this.parent();
			
			//console.log("Pause : "+this.enable);
			
			if (this.gameControl.pause===true){
				
				if (this.enable===false){
					
					this.enable = true;
					this.bgPopUp.enable = true;
					this.bgPopUp.show = true;
					
				}
				
				
				
			}
			if (this.gameControl.pause===false||this.gameControl.countToPlay===true&&this.gameControl.home===false){
				
				if (this.enable===true){
					
					this.enable = false;
					this.bgPopUp.fixSet();
				}
				
			}
			
			if (this.enable===true){
				
				if (ig.ua.mobile){
					
				
					if (this.pos.y > this.posMidMobile.y){
						this.pos.y -= this.speedMove;
					}
				
					if (this.playButtom.pressed === true ||this.reStartButtom.pressed===true ||this.homeButtom.pressed===true ){
					
						this.takeItOut = true;
						this.bgPopUp.unshow = true;
					
						if (this.reStartButtom.pressed===true||this.homeButtom.pressed===true){
							this.gameControl.preReStart();
						}
					
					
					}
				
					if (this.takeItOut===true){
					
					
							if (this.pos.y > this.posUpMobile.y){
						
								this.pos.y -= this.speedMove;
						
								if (this.pos.y <= this.posUpMobile.y){
							
									if ( this.playButtom.pressed === true ){
								
										this.gameControl.pauseButton.state = false;
										this.gameControl.countToPlay = true;
										this.playButtom.pressed = false;
								
									} else if (this.reStartButtom.pressed===true){
								
										this.gameControl.reStart();
										this.reStartButtom.pressed = false;
								
									} else if (this.homeButtom.pressed===true){
								
										this.gameControl.home = true;
										this.gameControl.toHomePage();
										this.homeButtom.pressed = false;
								
									}
							
									this.takeItOut = false;
									this.pos.y = this.posDownMobile.y;
									this.enable = false;
						
								}
						
							}
					
					}
				
					
				}else{
				
					if (this.pos.y > this.posMid.y){
						this.pos.y -= this.speedMove;
					}
				
					if (this.playButtom.pressed === true ||this.reStartButtom.pressed===true ||this.homeButtom.pressed===true ){
					
						this.takeItOut = true;
						this.bgPopUp.unshow = true;
					
						if (this.reStartButtom.pressed===true||this.homeButtom.pressed===true){
							this.gameControl.preReStart();
						}
					
					
					}
				
					if (this.takeItOut===true){
					
					
							if (this.pos.y > this.posUp.y){
						
								this.pos.y -= this.speedMove;
						
								if (this.pos.y <= this.posUp.y){
							
									if ( this.playButtom.pressed === true ){
								
										this.gameControl.pauseButton.state = false;
										this.gameControl.countToPlay = true;
										this.playButtom.pressed = false;
								
									} else if (this.reStartButtom.pressed===true){
								
										this.gameControl.reStart();
										this.reStartButtom.pressed = false;
								
									} else if (this.homeButtom.pressed===true){
								
										this.gameControl.home = true;
										this.gameControl.toHomePage();
										this.homeButtom.pressed = false;
								
									}
							
									this.takeItOut = false;
									this.pos.y = this.posDown.y;
									this.enable = false;
						
								}
						
							}
					
					}
				
				}
				
			}
			
			//console.log(this.gameControl.countToPlay);
			
			
        },
        draw:function(){
            
			
			if (this.enable===true){
				
				this.parent();
				
				//this.imageBackground.draw(this.pos.x,this.pos.y);
				
				ig.system.context.fillStyle = "#7E6E8A";   // set font colour
				ig.system.context.font = "50px Champ";   // set font
				ig.system.context.textAlign = 'center';
				
				if (ig.ua.mobile){
					ig.system.context.fillText("PAUSE",this.pos.x + 270, this.pos.y + 240);
				
					this.imagePopUp.draw(this.pos.x + (540 - 449)/2 ,this.pos.y + (960 - 174)/2  - 60);
				}else{
					ig.system.context.fillText("PAUSE",this.pos.x + 480, this.pos.y + 100);
				
					this.imagePopUp.draw(this.pos.x + (960 - 449)/2 ,this.pos.y + (540 - 174)/2  - 40);
				}
				
				
				
			}
			
			
			
        }
		
    });
});