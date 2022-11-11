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
				ig.system.context.font = "120px Champ";   // set font
				ig.system.context.textAlign = 'center';

				var pos = {
					x: 270 * 2,
					y: (480 + 60) * 2,
					ym: (270 + 60) * 2
				}

				if (this.gameControl.timeCountToPlay>=0&&this.gameControl.timeCountToPlay<30){
					if (ig.ua.mobile){
						ig.system.context.fillText("3", pos.x, pos.y);
					}else{
						ig.system.context.fillText("3",pos.x, pos.ym);
					}
					
					
				}else if (this.gameControl.timeCountToPlay>=30&&this.gameControl.timeCountToPlay<60){
					if (ig.ua.mobile){
						ig.system.context.fillText("2", pos.x, pos.y);
					}else{
						ig.system.context.fillText("2",pos.x, pos.ym);
					}
					
					
				}else if (this.gameControl.timeCountToPlay>=60&&this.gameControl.timeCountToPlay<90){
					if (ig.ua.mobile){
						ig.system.context.fillText("1", pos.x, pos.y);
					}else{
						ig.system.context.fillText("1",pos.x, pos.ym);
					}
					
				}else if (this.gameControl.timeCountToPlay>60){
					
					this.gameControl.countToPlay=false;
					this.gameControl.timeCountToPlay = 0;
					this.gameControl.pause = false;
					
				}
					
				
			}
			
			if ( (this.gameControl.pause===false||this.gameControl.countToPlay===true)&&this.gameControl.gameOver===false&&this.gameControl.home===false&&this.gameControl.setting===false&&this.gameControl.tutorialDone===true){
				
				ig.system.context.fillStyle = "#7E6E8A";   // set font colour
				ig.system.context.font = "100px Champ";   // set font
				ig.system.context.textAlign = 'center';
				
				if (ig.ua.mobile){
					ig.system.context.fillText(this.gameControl.score,270*2,60*2);
				
					this.heartImage.draw(480*2 - 60*2 - 20, 20*2);
					ig.system.context.fillText("x" + this.gameControl.heart,475*2,60*2);
				
				}else{
					ig.system.context.fillText(this.gameControl.score,480*2,60*2);
					this.heartImage.draw(1920 - 160*2 - 20, 20*2);
					ig.system.context.fillText("x" + this.gameControl.heart,960*2 - 90*2,60*2);
				
				}
				
			}
			
        }
		
    });
});