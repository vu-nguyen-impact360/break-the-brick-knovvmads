ig.module('game.entities.block-iron')
.requires(
	'impact.entity',
	'game.entities.power-up'
)
.defines(function() {
    EntityBlockIron = ig.Entity.extend({
        zIndex:230,
        pos:new Vector2(0,0),
        size:new Vector2(120,64),
        color:new ColorRGB(125,255,125,1),
		animSheet: new ig.AnimationSheet('media/graphics/game/iron-block.png',120,64),
		checkAgainst:ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		gameControl:null,
		tag:"iron",

        init:function(x,y,settings){
            this.parent(x*2, y*2, settings);

            // if(ig.ua.mobile) {
            //     this.parent(x * 2, (y * 2) + 100, settings);
            // } else {
            //     this.parent(x * 2, y * 2, settings);
            // }

			this.addAnim('normal', 0.1, [0]);
			
            this.currentAnim = this.anims.normal;
        },
        update:function(){
            
            this.parent();
			
        },
        draw:function(){
            this.parent();
			
        },
		kill:function(){
			 this.parent();
			 
			 
			 
		}
			
		
    });
});