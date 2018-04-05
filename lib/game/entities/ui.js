ig.module('game.entities.ui')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityUi = ig.Entity.extend({
        zIndex:400,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		collides: ig.Entity.COLLIDES.NEVER,
		heartImage: new ig.Image('media/graphics/game/heart.png'),
		gameControl:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			//this.genaretionStage();
			
        },
        update:function(){
            
            this.parent();
			
			
        },
        draw:function(){
            this.parent();
			
			if (this.gameControl.countToPlay===true&&this.gameControl.tutorialDone===true){
				
				ig.system.context.fillStyle = "#7E6E8A";   // set font colour
				ig.system.context.font = "60px Champ";   // set font
				ig.system.context.textAlign = 'center';
				
				if (this.gameControl.timeCountToPlay>=0&&this.gameControl.timeCountToPlay<30){
					if (ig.ua.mobile){
						ig.system.context.fillText("3",270,480 + 60);
					}else{
						ig.system.context.fillText("3",480,270 + 60);
					}
					
					
				}else if (this.gameControl.timeCountToPlay>=30&&this.gameControl.timeCountToPlay<60){
					if (ig.ua.mobile){
						ig.system.context.fillText("2",270,480 + 60);
					}else{
						ig.system.context.fillText("2",480,270 + 60);
					}
					
					
				}else if (this.gameControl.timeCountToPlay>=60&&this.gameControl.timeCountToPlay<90){
					if (ig.ua.mobile){
						ig.system.context.fillText("1",270,480 + 60);
					}else{
						ig.system.context.fillText("1",480,270 + 60);
					}
					
				}else if (this.gameControl.timeCountToPlay>60){
					
					this.gameControl.countToPlay=false;
					this.gameControl.timeCountToPlay = 0;
					this.gameControl.pause = false;
					
				}
					
				
			}
			
			if ( (this.gameControl.pause===false||this.gameControl.countToPlay===true)&&this.gameControl.gameOver===false&&this.gameControl.home===false&&this.gameControl.setting===false&&this.gameControl.tutorialDone===true){
				
				ig.system.context.fillStyle = "#7E6E8A";   // set font colour
				ig.system.context.font = "50px Champ";   // set font
				ig.system.context.textAlign = 'center';
				
				if (ig.ua.mobile){
					ig.system.context.fillText(this.gameControl.score,270,60);
				
					this.heartImage.draw(480 - 60 - 20,20);
					ig.system.context.fillText("x" + this.gameControl.heart,475,60);
				
				}else{
					ig.system.context.fillText(this.gameControl.score,480,60);
				
					this.heartImage.draw(960 - 160 - 20,20);
					ig.system.context.fillText("x" + this.gameControl.heart,960 - 90,60);
				
				}
				
			}
			
        }
		
    });
});