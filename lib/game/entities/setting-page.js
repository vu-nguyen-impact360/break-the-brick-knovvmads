ig.module('game.entities.setting-page')
.requires(
	'impact.entity',
	'game.entities.buttons.back-button'
)
.defines(function() {
    EntitySettingPage = ig.Entity.extend({
        zIndex:300,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		//animSheet: new ig.AnimationSheet('media/graphics/game/player.png',117,23),
		//imageBackground: new ig.Image('media/graphics/game/background.png'),
		imagePopUp: new ig.Image('media/graphics/game/pause-page.png'),
		gameControl:null,
		posDown:new Vector2(0,1080),
		posMid:new Vector2(0,0),
		posUp:new Vector2(0,-1080),
		posDownMobile:new Vector2(0,1920),
		posMidMobile:new Vector2(0,0),
		posUpMobile:new Vector2(0,-1920),
		takeItOut:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.enable = false;
			
			
			this.backButtom = ig.game.spawnEntity(EntityBackButton,0,0,{gameControl:this.gameControl,settingPage:this})
			
			
			ig.game.sortEntitiesDeferred();
			
			
			this.bgPopUp = ig.game.getEntitiesByType(EntityBgPopUp)[0];
			
			if (ig.ua.mobile){
				this.speedMove = 120;
			}else{
				this.speedMove = 60;
			}
		
			
        },
        update:function(){
            
            this.parent();
			
			if (this.gameControl.setting===true){
				
				if (this.enable===false){
					
					this.enable = true;
					this.bgPopUp.enable = true;
					this.bgPopUp.show = true;
					
					
				}
				
				
			}
			if (this.gameControl.setting===false){
				
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
				
					if (this.backButtom.pressed === true){
					
						this.takeItOut = true;
						this.bgPopUp.unshow = true;
					
						this.gameControl.preReStart();

					
					
					}
				
					if (this.takeItOut===true){
					
					
							if (this.pos.y > this.posUpMobile.y){
						
								this.pos.y -= this.speedMove;
						
								if (this.pos.y <= this.posUpMobile.y){
							
									//if ( this.backButtom.pressed === true ){
								
										//this.gameControl.pauseButton.state = false;
										//this.gameControl.countToPlay = true;
									this.gameControl.setting = false;
									this.gameControl.home = true;
									this.backButtom.pressed = false;
								
									//} 
							
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
				
			}
			
			
			//console.log(this.gameControl.countToPlay);
			
			
        },
        draw:function(){
            this.parent();
			
			if (this.enable===true){
				
				//this.imageBackground.draw(this.pos.x,this.pos.y);
				
				ig.system.context.fillStyle = "#7E6E8A";   // set font colour
				ig.system.context.font = "100px Champ";   // set font
				ig.system.context.textAlign = 'center';
				
				if (ig.ua.mobile){
					ig.system.context.fillText("SETTING",this.pos.x + 270*2,this.pos.y + 240*2);
				
					this.imagePopUp.draw(this.pos.x + (1080 - 898)/2 ,this.pos.y + (1920 - 348)/2  - 60*2);
				}else{
					ig.system.context.fillText("SETTING",this.pos.x + 480*2,this.pos.y + 100*2);
				
					this.imagePopUp.draw(this.pos.x + (1920 - 898)/2 ,this.pos.y + (1080 - 348)/2  - 40*2);
				}
				
				
				
			}
			
			
			
        }
		
    });
});