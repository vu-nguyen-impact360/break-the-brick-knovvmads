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
		maxVel:new Vector2(1000,1000),
		vel:new Vector2(400,400),
		notedVel: new Vector2(0,0),
		accVel: new Vector2(400,400),
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.addAnim('narmal', 0.1, [0]);
            this.currentAnim = this.anims.narmal;
			
			this.notedVel.x = this.vel.x;
			this.notedVel.x = this.vel.y;
			
			
			
			
        },
        update:function(){
			
			if (this.gameControl.pause===false){
				
	            this.parent();
			
				this.notedVel.x = this.vel.x;
				this.notedVel.y = this.vel.y;
			
			}
            
			
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
			
			//console.log(other.tag);
			
			
			if (other.tag==="wallUp"){
				
				this.vel.y = this.notedVel.y;
				
				this.vel.y *= -1;
				
			}else if (other.tag==="wallSide") {
				
				this.vel.x = this.notedVel.x;
				
				this.vel.x *= -1;
				
			}else if (other.tag==="player") {
				
				//this.vel.y = this.notedVel.y;
				
				
				this.playerPointx = other.pos.x + other.size.x/2;
				this.playerPointy = other.pos.y + other.size.y;
				
				//console.log(this.playerPointy);
				
				this.pointX = this.pos.x + this.size.x/2;
				this.pointY = this.pos.y + this.size.y/2;
				
				//console.log(this.pointY);
				this.powerX = this.pointX - this.playerPointx;
				this.powerY = this.pointY - this.playerPointy;
				
				
				this.VectorSize = Math.sqrt( ( Math.pow(this.powerX,2) + Math.pow(this.powerY,2) ) );
				
				if (this.VectorSize<0){
					this.VectorSize *= -1;
				}
				
				
				this.newVelX = this.powerX/this.VectorSize;
				this.newVelY = this.powerY/this.VectorSize;
				
				
				this.vel.x = this.newVelX*this.accVel.x;
				this.vel.y = this.newVelY*this.accVel.y;
				
				
				//this.vel.x *= 1.5; 
				//this.vel.y *= 1.5;
				
				
				
			}else if (other.tag==="block"){
				
				this.vel.x = this.notedVel.x;
				this.vel.y = this.notedVel.y;
								
				this.otherPointx = other.pos.x + other.size.x/2;
				this.otherPointy = other.pos.y + other.size.y/2;
				
				this.pointX = this.pos.x + this.size.x/2;
				this.pointY = this.pos.y + this.size.y/2;
				
				if ((this.pointX >= this.otherPointx + other.size.x/2)&&(this.vel.x<0)||(this.pointX <= this.otherPointx - other.size.x/2)&&(this.vel.x>0)){
					
					//this.vel.x = this.notedVel.x;
					this.vel.x *= -1;
					
					console.log("Hit");
					
				}else{
					
					//this.vel.y = this.notedVel.y;
					this.vel.y *= -1;
					
					console.log("Hited > w <");
					
				}
				
				other.hp -= 1;
				
				other.updateHp();
				
				
				
			}
			
			
			
		}
		
    });
});