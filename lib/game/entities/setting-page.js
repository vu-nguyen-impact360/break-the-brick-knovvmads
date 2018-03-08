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
		imageBackground: new ig.Image('media/graphics/game/background.png'),
		imagePopUp: new ig.Image('media/graphics/game/pause-page.png'),
		gameControl:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.enable = false;
			
			
			this.backButtom = ig.game.spawnEntity(EntityBackButton,0,0,{gameControl:this.gameControl,settingPage:this})
			
			
			ig.game.sortEntitiesDeferred();
			
        },
        update:function(){
            
            this.parent();
			
			if (this.gameControl.setting===true){
				
				if (this.enable===false){
					
					this.enable = true;
					
				}
				
				
			}
			if (this.gameControl.setting===false){
				
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
				
				
				ig.system.context.fillText("SETTING",480,100);
				
				
				this.imagePopUp.draw(this.pos.x + (960 - 449)/2 ,this.pos.y + (540 - 174)/2  - 40);
				
			}
			
			
			
        }
		
    });
});