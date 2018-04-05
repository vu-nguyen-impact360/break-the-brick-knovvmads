ig.module('game.entities.wall-side')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityWallSide = ig.Entity.extend({
        zIndex:240,
        pos:new Vector2(0,0),
        size:new Vector2(40,960),
        color:new ColorRGB(125,255,125,1),
		leftImage:new ig.Image('media/graphics/game/wall-left.png'),
		rightImage:new ig.Image('media/graphics/game/wall-right.png'),
		leftImageMobile:new ig.Image('media/graphics/game/wall-left-m.png'),
		rightImageMobile:new ig.Image('media/graphics/game/wall-right-m.png'),
		checkAgainst:ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		tag:"wallSide",
		gameControl:null,
		rightSide:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			
        },
        update:function(){
            
            this.parent();
			
			
			
			
            
        },
        draw:function(){
			
			this.parent();
			
			if (this.gameControl.showWall===true){
				 
				if (this.rightSide===true){
					if (ig.ua.mobile){
						this.rightImageMobile.draw(this.pos.x,this.pos.y);
					}else{
						this.rightImage.draw(this.pos.x,this.pos.y);
					}
					
				
				}else if (this.rightSide===false){
					
					if (ig.ua.mobile){
						this.leftImageMobile.draw(this.pos.x,this.pos.y);
					}else{
						this.leftImage.draw(this.pos.x,this.pos.y);
					}
					
					
				}
				
				 
			}
           
			
        }
		
    });
});