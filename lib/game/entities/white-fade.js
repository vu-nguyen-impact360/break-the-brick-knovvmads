ig.module('game.entities.white-fade')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityWhiteFade = ig.Entity.extend({
        zIndex:290,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		//animSheet: new ig.AnimationSheet('media/graphics/game/background.png',960,540),
		//image: new ig.Image('media/graphics/game/background.png'),
		gameControl:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			if (ig.ua.mobile){
				this.animSheet = new ig.AnimationSheet('media/graphics/game/background-m.png',1080,1920);
			}else{
				this.animSheet = new ig.AnimationSheet('media/graphics/game/background.png',1920,1080);
			}
			
			this.enable = false;
			
		 	this.addAnim('BG', 0.1, [0]);
			this.currentAnim = this.anims.BG;
		
			
			this.alfhaPoint = 0;
			this.alfhaStepBy = 0.01;
			this.alfhaUp = true;
			//this.show = false;
			
			this.clear = false;
			this.continue = false;
			
			this.currentAnim.alpha = this.alfhaPoint;
			
			
        },
        update:function(){
            
            this.parent();
			//console.log(this.enable);
			
			if (this.enable===true){
				
				
				if (this.alfhaUp===true){
					
					this.alfhaPoint += this.alfhaStepBy;
					
					this.currentAnim.alpha = this.alfhaPoint;
					
					if (this.alfhaPoint>this.alfhaStepBy){
						
					this.alfhaPoint = 1;
					this.currentAnim.alpha = this.alfhaPoint;
					this.alfhaUp = false;
					
						if (this.clear===true){
							
							this.gameControl.nextStage();
							this.clear = false;
						
						}else if (this.continue===true){
							
							this.gameControl.continue();
							this.continoe = false;
						}
						
						
					}
					
				}else if (this.alfhaUp===false){
					
					this.alfhaPoint -= this.alfhaStepBy;
					
					this.currentAnim.alpha = this.alfhaPoint;
					
					if (this.alfhaPoint<this.alfhaStepBy){
						
					this.alfhaPoint = 0;
					this.currentAnim.alpha = this.alfhaPoint;
					this.alfhaUp = false;
					this.enable = false;
					this.gameControl.delay = false;
					}
					
				}
				
			}
			
			
        },
        draw:function(){
			
			if (this.enable===true){
				
				 this.parent();
				
			}
			
        },
		clearStage:function(){
			
			this.enable = true;
			this.clear = true;
			this.alfhaUp = true;
			this.alfhaPoint = 0;
			this.gameControl.delay = true;
			//console.log("pass");
			
		},
		continueStage:function(){
			
			this.enable = true;
			this.continue = true;
			this.alfhaUp = true;
			this.alfhaPoint = 0;
			this.gameControl.delay = true;
			
		}
		
    });
});