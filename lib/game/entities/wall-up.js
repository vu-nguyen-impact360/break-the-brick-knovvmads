ig.module('game.entities.wall-up')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityWallUp = ig.Entity.extend({
        zIndex:240,
        pos:new Vector2(0,0),
        size:new Vector2(1920,80),
        color:new ColorRGB(125,255,125,1),
		//leftImage:new ig.Image('media/graphics/game/wall-left.png'),
		//rightImage:new ig.Image('media/graphics/game/wall-right.png'),
		checkAgainst:ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		gameControl:null,
		tag:"wallUp",
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			
        },
        update:function(){
            
            this.parent();
			
			//
			// console.log("HELLO");
            
        },
        draw:function(){
            this.parent();
			
        }
		
    });
});