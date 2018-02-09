ig.module('game.entities.ball')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityBall = ig.Entity.extend({
        zIndex:240,
        pos:new Vector2(0,0),
        size:new Vector2(28,28),
        color:new ColorRGB(125,255,125,1),
		animSheet: new ig.AnimationSheet('media/graphics/game/ball.png',28,28),
		checkAgainst:ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.LITE,
		gameControl:null,
		maxVel:new Vector2(500,500),
		vel:new Vector2(200,200),
		notedVel: new Vector2(0,0),
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.addAnim('narmal', 0.1, [0]);
            this.currentAnim = this.anims.narmal;
			
			this.notedVel.x = this.vel.x;
			this.notedVel.x = this.vel.y;
			
			
			
			
        },
        update:function(){
            
            this.parent();
			
			this.notedVel.x = this.vel.x;
			this.notedVel.y = this.vel.y;
			
			
			
        },
        draw:function(){
            this.parent();
			/*
            var ctx=ig.system.context;
            ctx.fillStyle=this.color.getHex();
            ctx.fillRect(this.pos.x,this.pos.y,this.size.x,this.size.y);
			*/
        },
		collideWith:function(other, axis){
			
			console.log(other.tag);
			
			
			if (other.tag==="wallUp"){
				
				this.vel.y = this.notedVel.y;
				
				this.vel.y *= -1;
				
			}else if (other.tag==="wallSide") {
				
				this.vel.x = this.notedVel.x;
				
				this.vel.x *= -1;
				
			}else if (other.tag==="player") {
				
				this.vel.y = this.notedVel.y;
				
				this.vel.y *= -1;
				
				
				
				
			}
			
			
			
		}
		
    });
});