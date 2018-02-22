ig.module('game.entities.player')
.requires(
	'impact.entity',
	'plugins.scale',
	'game.entities.bullet'
)
.defines(function() {
    EntityPlayer = ig.Entity.extend({
        zIndex:230,
        pos:new Vector2(0,0),
        size:new Vector2(117,23),
        color:new ColorRGB(125,255,125,1),
		animSheet: new ig.AnimationSheet('media/graphics/game/player.png',117,23),
		checkAgainst:ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.ACTIVE,
		gameControl:null,
		tag:"player",
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.addAnim('narmal', 0.1, [0]);
            this.currentAnim = this.anims.narmal;
			
			this.pointer = ig.game.spawnEntity(EntityPointer,0,0);
			
			//this.offset = new Vector2(this.size.x/2,this.size.y/2);
			
			this.speedMove = 10;
			
			// expand-power
			this.expand = false;
			this.expandTimeCount = 0;
			this.scalPerTime = 0.05;
			this.thisScale = 1;
			
			//fire-power
			this.fire = false;
			this.fireTimeCount = 0;
			this.fireRate = 30;
			this.fireTime = 0;
			
        },
        update:function(){
            
            this.parent();
			// fix bug when keep the power-up
			if (this.pos.y!==500){
				this.pos.y = 500;
			}
			// fix bug when keep the power-up
			if (this.vel.y!==0){
				this.vel.y = 0;
			}
			
			if (this.gameControl.pause===false){
				
				this.move();
				
				if (this.expand===true){
					this.scaling();
					
					//console.log(this.expandTimeCount);
					
				}
				
				if (this.fire===true){
					this.firing();
					
					//console.log(this.fireTimeCount);
					
				}
				
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
		move:function(){
			
			if (this.gameControl.checkButton.pressed===true){
				
				if (this.pos.x < this.pointer.pos.x - this.size.x/2){
					
					this.pos.x += this.speedMove;
					if (this.pos.x > this.pointer.pos.x -this.size.x/2){
						this.pos.x = this.pointer.pos.x -this.size.x/2;
					}
					
				}else if (this.pos.x > this.pointer.pos.x -this.size.x/2){
					
					this.pos.x -= this.speedMove;
					if (this.pos.x < this.pointer.pos.x -this.size.x/2){
						this.pos.x = this.pointer.pos.x -this.size.x/2;
					}
					
				}
				
			}
			
			
			
		},
		check:function(other){
				
			if(other instanceof EntityPowerUp)
				//console.log("Hi domo, I'm power-up");

			if (other.tag==="power-up"){
				
				//console.log("keep : " + other.typePower);
				
				if (other.typePower===1){
					
					this.gameControl.cloningBall();
					
				}else if (other.typePower===2){
					
					this.scalPower();
					
				}else if (other.typePower===3){
					
					this.gameControl.heart += 1;
					
				}else if (other.typePower===4){
					
					this.firePower();
					
				}
				
				other.kill();
				
			}
			
		},
		scalPower:function(){
			
			if (this.fire===true){
				this.fire = false;
				this.fireTimeCount = 0;
			}
			
			this.expand = true;
			this.expandTimeCount = 300;
			//this.scalPerTime = 0.05;
			//this.scalUp = true;
			//this.scalDown = false;
		},
		scaling:function(){
			
			if (this.expandTimeCount>280){
				this.thisScale += this.scalPerTime;
				if(this.thisScale > 1.5){
					this.thisScale = 1.5 ;
				}
				this.setScale(this.thisScale,1);
			}else if (this.expandTimeCount<20){
				this.thisScale -= this.scalPerTime;
				if(this.thisScale < 1){
					this.thisScale = 1 ;
				}
				this.setScale(this.thisScale,1);
			}
			
			this.expandTimeCount -=1;
			
			if (this.expandTimeCount<=0){
				this.expand = false;
			}
			
			
		},
		firePower:function(){
			
			if (this.expand===true&&this.expandTimeCount>20){
				this.expandTimeCount = 20;
			}
			
			this.fire = true;
			this.fireTimeCount = 240;
			//this.fireTime = this.fireRate;
			
		},
		firing:function(){
			
			
			if (this.fireTime>=this.fireRate){
				
				ig.game.spawnEntity(EntityBullet,this.pos.x + this.size.x/4 - 17/2,this.pos.y - 17,{gameControl:this.gameControl})
				ig.game.spawnEntity(EntityBullet,this.pos.x + this.size.x/4 + this.size.x/4 + this.size.x/4 - 17/2,this.pos.y - 17,{gameControl:this.gameControl})
				
				ig.game.sortEntitiesDeferred();	
				
				this.fireTime = 0;
			}
			
				this.fireTime += 1;
			
			this.fireTimeCount -=1;
			
			if (this.fireTimeCount<=0){
				this.fire = false;
			}
			
		}
		
		
    });
});