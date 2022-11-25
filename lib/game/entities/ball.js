ig.module('game.entities.ball')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityBall = ig.Entity.extend({
        zIndex:240,
        pos:new Vector2(0,0),
        size:new Vector2(84,84),
        color:new ColorRGB(125,255,125,1),
		animSheet: new ig.AnimationSheet('media/graphics/game/ball.png', 84, 83),
		checkAgainst:ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.LITE,
		gameControl:null,
		maxVel:new Vector2(1000,1000),
		vel:new Vector2(0,0), // 400,-400
		notedVel: new Vector2(0,0),
		accVel: new Vector2(400,400),
		barSound:"barSound",
		blockSound:"blockSound",
		ironSound:"ironSound",
		colliPlayer:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.addAnim('narmal', 0.1, [0]);
            this.currentAnim = this.anims.narmal;
			
			this.notedVel.x = this.vel.x;
			this.notedVel.x = this.vel.y;
			
			//this.gameControl.ballNumber += 1;
			
			//this.stick = true;
			
			//this.reStart();
			
        },
        update:function(){
			
				//console.log(this.pos.y);
			
			if (this.gameControl.pause===false&&this.stick===false&&this.gameControl.delay===false&&this.gameControl.tutorialDone===true){
				
	            this.parent();
				
				this.notedVel.x = this.vel.x;
				this.notedVel.y = this.vel.y;
			
			}
            
			if (this.pos.y  > ig.system.height || this.pos.x < 80 - 28||this.pos.x > ig.system.width - 80|| this.pos.y < -28){
			
				this.kill();
				
			}
			/*
			if (this.stick===true){
				
				console.log(this.gameControl.player.pos.x);
				
				if (this.gameControl.player.pos.x <= 40){
					
					this.pos.x = 40 + this.gameControl.player.size.x/2 - this.size.x/2 ;
					
				}else if (this.gameControl.player.pos.x >= 803){
					
					this.pos.x = 803 + this.gameControl.player.size.x/2 - this.size.x/2 ;
					
				}else {
					
					this.pos.x = this.gameControl.player.pos.x + this.gameControl.player.size.x/2 - this.size.x/2 ;
					
				}
				
				
				
			}
			*/
			
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
				
				if (this.colliPlayer===true){
					this.colliPlayer = false;
				}
				
				ig.soundHandler.sfxPlayer.play(this.blockSound);
				
			}else if (other.tag==="wallSide") {
				
				this.vel.x = this.notedVel.x;
				
				this.vel.x *= -1;
				
				if (this.colliPlayer===true){
					this.colliPlayer = false;
				}
				
				ig.soundHandler.sfxPlayer.play(this.blockSound);
				
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
				
				if (this.colliPlayer===false){
					
					ig.soundHandler.sfxPlayer.play(this.barSound);
					this.colliPlayer = true;
					
				}
				
				
				
				
			}else if (other.tag==="block"){
				
				
				if (axis==="x"){
					
					this.vel.x = this.notedVel.x;
					
					this.vel.x *= -1;
					
				}else if (axis==="y"){
					
					this.vel.y = this.notedVel.y;
					
					this.vel.y *= -1;
					
				}
				
				other.hp -= 1;
				
				this.gameControl.score += 1;
				
				other.updateHp();
				
				ig.soundHandler.sfxPlayer.play(this.blockSound);
				
				if (this.colliPlayer===true){
					this.colliPlayer = false;
				}
				
			}else if (other.tag==="iron"){
				
				
				
				if (axis==="x"){
					
					this.vel.x = this.notedVel.x;
					
					this.vel.x *= -1;
					
				}else if (axis==="y"){
					
					this.vel.y = this.notedVel.y;
					
					this.vel.y *= -1;
					
				}
				
				// accVel.x = accVel.y
				if (this.accVel.x<600){
					
					this.vel.x /= this.accVel.x;
					this.vel.y /= this.accVel.y;
				
					this.accVel.x += 20;
					this.accVel.y += 20;
				
					this.vel.x *= this.accVel.x;
					this.vel.y *= this.accVel.y;
					
					//console.log(this.accVel.x);
					
				}
				
				
				ig.soundHandler.sfxPlayer.play(this.ironSound);
				
				if (this.colliPlayer===true){
					this.colliPlayer = false;
				}
				
			}
			
			
			
		},
		reStart:function(){
			this.stick = true;
			this.pos.x = this.gameControl.player.pos.x + this.gameControl.player.size.x/2 - this.size.x/2 + 10;
			if (ig.ua.mobile){
				this.pos.y = 1740 - this.size.y; // player.pos.y - this.size.y
			}else{
				this.pos.y = 1000 - this.size.y; // player.pos.y - this.size.y
			}
			this.accVel.x = 800;
			this.accVel.y = 800;
		},
		accWhenStart:function(){
			
			this.pointerX =  this.gameControl.player.pointer.pos.x;
			this.pointerY =  this.gameControl.player.pointer.pos.y;
			
			this.pointX = this.pos.x + this.size.x/2;
			this.pointY = this.pos.y + this.size.y/2;
			
			//console.log(this.pointY);
			this.powerX = this.pointerX - this.pointX;
			this.powerY = this.pointerY - this.pointY;
			
			
			this.VectorSize = Math.sqrt( ( Math.pow(this.powerX,2) + Math.pow(this.powerY,2) ) );
			
			if (this.VectorSize<0){
				this.VectorSize *= -1;
			}
			
			
			this.newVelX = this.powerX/this.VectorSize;
			this.newVelY = this.powerY/this.VectorSize;
			
			
			
			
			if (this.newVelY<0&&this.newVelY>-0.2){
				this.newVelY = -0.2;
			}else if (this.newVelY>0&&this.newVelY<0.2){
				this.newVelY = 0.2;
			}
			
			
			//console.log(this.newVelY);
			
			this.vel.x = this.newVelX*this.accVel.x;
			this.vel.y = this.newVelY*this.accVel.y;
			
			
		},
		kill:function(){
			this.parent();
			
			//this.gameControl.ballNumber -= 1;
			
		}
		
		
		
    });
});