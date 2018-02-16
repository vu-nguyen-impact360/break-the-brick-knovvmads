ig.module('game.entities.background')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityBackground = ig.Entity.extend({
        zIndex:-1000,
        pos:new Vector2(0,0),
        size:new Vector2(1,1),
        color:new ColorRGB(125,255,125,1),
		//animSheet: new ig.AnimationSheet('media/graphics/game/player.png',117,23),
		image: new ig.Image('media/graphics/game/background.png'),
		gameControl:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			
        },
        update:function(){
            
            this.parent();
			
			
        },
        draw:function(){
            this.parent();
			
			this.image.draw(this.pos.x,this.pos.y);
			
        }
		
    });
});