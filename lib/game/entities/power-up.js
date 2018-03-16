ig.module('game.entities.power-up')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityPowerUp = ig.Entity.extend({
        zIndex:250,
        pos:new Vector2(0,0),
        size:new Vector2(41.5,42),
        color:new ColorRGB(125,255,125,1),
		animSheet: new ig.AnimationSheet('media/graphics/game/power.png',41.5,42),
		collides: ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.B,
		gameControl:null,
		typePower:null,
		tag:"power-up",
		maxVel:new Vector2(1000,1000),
		vel:new Vector2(0,200),
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.addAnim('triple', 0.1, [0]);
			this.addAnim('expand', 0.1, [1]);
			this.addAnim('heart', 0.1, [2]);
			this.addAnim('fire', 0.1, [3]);
			
            //this.currentAnim = this.anims.pink1;
			this.updateAnim();
			
        },
        update:function(){
            
			if (this.gameControl.pause===false&&this.gameControl.delay===false){
			
            	this.parent();
				
				
			
				if (this.pos.y - this.size.y*2 > ig.system.height){
				
					this.kill();
					
				}
				
			}
			
        },
        draw:function(){
            this.parent();
			
			
        },
		kill:function(){
			this.parent();
			
			//console.log("break");
			
		},
		updateAnim:function(){
			
			if (this.typePower===1){
				
				this.currentAnim = this.anims.triple;
				
			}else if (this.typePower===2){
				
				this.currentAnim = this.anims.expand;
				
			}else if (this.typePower===3){
				
				this.currentAnim = this.anims.heart;
				
			}else if (this.typePower===4){
				
				this.currentAnim = this.anims.fire;
				
			}
			
		}
		
    });
});