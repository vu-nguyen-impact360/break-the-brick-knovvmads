ig.module('game.entities.wall-side')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityWallSide = ig.Entity.extend({
        zIndex:240,
        pos:new Vector2(0,0),
        size:new Vector2(40,540),
        color:new ColorRGB(125,255,125,1),
		leftImage:new ig.Image('media/graphics/game/wall-left.png'),
		rightImage:new ig.Image('media/graphics/game/wall-right.png'),
		checkAgainst:ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
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
			
			if (this.rightSide===true){
				
				this.rightImage.draw(this.pos.x,this.pos.y);
				
			}else if (this.rightSide===false){
				
				this.leftImage.draw(this.pos.x,this.pos.y);
				
			}
			
        }
		
    });
});