ig.module('game.entities.bullet')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityBullet = ig.Entity.extend({
        zIndex:228,
        pos:new Vector2(0,0),
        size:new Vector2(33,33),
        color:new ColorRGB(125,255,125,1),
		animSheet: new ig.AnimationSheet('media/graphics/game/bullet.png',33,33),
		checkAgainst:ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		gameControl:null,
		maxVel:new Vector2(1000,1000),
		vel:new Vector2(0,-600),
		blockSound:"blockSound",
		ironSound:"ironSound",
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.addAnim('narmal', 0.1, [0]);
            this.currentAnim = this.anims.narmal;
			
        },
        update:function(){
			
            if (this.gameControl.pause===false&&this.gameControl.delay===false){
            	
				this.parent();
				
            }
            
			
			
        },
        draw:function(){
            this.parent();
			
        },
		collideWith:function(other, axis){
			
			//console.log(other.tag);
			
			
			if (other.tag==="wallUp"){
				
				this.kill();
				
			}else if (other.tag==="block"){
				
				
				this.kill();
				
				other.hp -= 1;
				
				this.gameControl.score += 1;
				
				other.updateHp();
				
				ig.soundHandler.sfxPlayer.play(this.blockSound);
				
			}else if (other.tag==="iron"){
				
				
				this.kill();
				
				ig.soundHandler.sfxPlayer.play(this.ironSound);
				
			}
			
			
			
		},
		kill:function(){
			
			this.parent();
			
		}
		
		
    });
});