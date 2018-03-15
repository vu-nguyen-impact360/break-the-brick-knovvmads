ig.module('game.entities.bg-pop-up')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityBgPopUp = ig.Entity.extend({
        zIndex:290,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		animSheet: new ig.AnimationSheet('media/graphics/game/background.png',960,540),
		//image: new ig.Image('media/graphics/game/background.png'),
		gameControl:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
		 this.addAnim('BG', 0.1, [0]);
		 this.currentAnim = this.anims.BG;
		
			
			this.alfhaPoint = 0;
			this.alfhaStepBy = 0.05;
			
			this.currentAnim.alpha = this.alfhaPoint;
			
			this.enable = false;
			this.show = false;
			this.unshow = false;
			
        },
        update:function(){
            
            this.parent();
			
			//console.log("bg : "+this.alfhaPoint);
			
			if (this.enable===true){
				
			
				if (this.alfhaPoint<1&&this.show===true){
				
					this.alfhaPoint += this.alfhaStepBy;
				
					if (this.alfhaPoint>1){
						this.alfhaPoint=1;
						this.show = false;
					}
				
					this.currentAnim.alpha = this.alfhaPoint;
				
				}
			
			
				if (this.alfhaPoint>0&&this.unshow===true){
			
					this.alfhaPoint -= this.alfhaStepBy;
			
					if (this.alfhaPoint<0){
						this.alfhaPoint=0;
						this.unshow = false;
						this.fixSet();
					}
				
					this.currentAnim.alpha = this.alfhaPoint;
					
				}
				
			}else if (this.enable===false){
				this.fixSet();
			}
			
			
        },
        draw:function(){
			
			if (this.enable===true){
				
				 this.parent();
				 
			}
			
        },
		fixSet:function(){
			
			this.enable = false;
			this.show = false;
			this.unshow = false;
			this.alfhaPoint = 0;
			this.currentAnim.alpha = this.alfhaPoint;
		}
		
    });
});