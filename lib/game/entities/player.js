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
		gunImage: new ig.Image('media/graphics/game/gun.png'),
		checkAgainst:ig.Entity.TYPE.BOTH,
		collides: ig.Entity.COLLIDES.ACTIVE,
		gameControl:null,
		tag:"player",
		fireSound:"fireSound",
		itemSound:"itemSound",
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.addAnim('narmal', 0.1, [0]);
            this.currentAnim = this.anims.narmal;
			
			this.pointer = ig.game.spawnEntity(EntityPointer,0,0);
			this.center = ig.game.spawnEntity(EntityPointer,0,0);
			//this.offset = new Vector2(this.size.x/2,this.size.y/2);
			
			this.speedMove = 50;
			//this.control = false;
			
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
			this.gunDeltaPosY = 0;
			
			if (ig.ua.mobile){
				this.pos.y = 870;
			}
			
        },
        update:function(){
            
            this.parent();
			// fix bug when keep the power-up
			if (ig.ua.mobile){
				if (this.pos.y!==870){
					this.pos.y = 870;
				}
			}else{
				if (this.pos.y!==500){
					this.pos.y = 500;
				}
			}
			
			// fix bug when keep the power-up
			if (this.vel.y!==0){
				this.vel.y = 0;
			}
			
			if (this.gameControl.pause===false&&this.gameControl.delay===false&&this.gameControl.tutorialDone===true){
				
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
			
			if (this.fire===true){
				
				this.gunImage.draw(this.pos.x + this.size.x/4 - 18/2,this.pos.y - this.gunDeltaPosY);
				this.gunImage.draw(this.pos.x + this.size.x/4 + this.size.x/4 + this.size.x/4 - 18/2,this.pos.y - this.gunDeltaPosY);
			
			}
			
			if (this.gameControl.home===false&&this.gameControl.setting===false){
				
				 this.parent();
				
			}
			
           
			/*
            var ctx=ig.system.context;
            ctx.fillStyle=this.color.getHex();
            ctx.fillRect(this.pos.x,this.pos.y,this.size.x,this.size.y);
			*/
        },
		move:function(){
			
			if (ig.ua.mobile){
				
				if (this.gameControl.checkButton.pressed===true){
					
						if (this.pos.x < this.pointer.pos.x - this.size.x/2){
				
							this.pos.x += this.speedMove;
							if (this.pos.x > this.pointer.pos.x -this.size.x/2){
								this.pos.x = this.pointer.pos.x -this.size.x/2;
						
								if (this.pos.x > ig.system.width - 40 - this.size.x){
									this.pos.x = ig.system.width - 40 - this.size.x;
								}
							}
				
						}else if (this.pos.x > this.pointer.pos.x -this.size.x/2){
				
							this.pos.x -= this.speedMove;
							if (this.pos.x < this.pointer.pos.x -this.size.x/2){
								this.pos.x = this.pointer.pos.x -this.size.x/2;
							}
				
						}
					
				
			
				}
				
			}else{
				
				
				
				if (this.gameControl.ballNumber>0){
				
				this.thisBall = ig.game.getEntitiesByType(EntityBall);
				
   				 if (this.thisBall[0].stick===false){
				 	
   	 				if (this.pos.x < this.pointer.pos.x - this.size.x/2){
			
   	 					this.pos.x += this.speedMove;
   	 					if (this.pos.x > this.pointer.pos.x -this.size.x/2){
   	 						this.pos.x = this.pointer.pos.x -this.size.x/2;
					
   	 						if (this.pos.x > ig.system.width - 40 - this.size.x){
   	 							this.pos.x = ig.system.width - 40 - this.size.x;
   	 						}
   	 					}
			
   	 				}else if (this.pos.x > this.pointer.pos.x -this.size.x/2){
			
   	 					this.pos.x -= this.speedMove;
   	 					if (this.pos.x < this.pointer.pos.x -this.size.x/2){
   	 						this.pos.x = this.pointer.pos.x -this.size.x/2;
   	 					}
			
   	 				}
					
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
					
					if (this.gameControl.heart<9){
						
						this.gameControl.heart += 1;
						
					}
					
					
				}else if (other.typePower===4){
					
					this.firePower();
					
				}
				
				other.kill();
				ig.soundHandler.sfxPlayer.play(this.itemSound);
				
				
			}
			
		},
		scalPower:function(){
			
			if (this.fire===true&&this.fireTimeCount>18){
				this.fireTimeCount = 18;
			}
			
			this.expand = true;
			this.expandTimeCount = 720; // 300 
			
			//this.scalPerTime = 0.05;
			//this.scalUp = true;
			//this.scalDown = false;
		},
		scaling:function(){
			
			if (this.expandTimeCount>700){ //300 - 20 = 280
				this.thisScale += this.scalPerTime;
				
				if(this.thisScale > 1.5){
					this.thisScale = 1.5 ;
				}
				this.setScale(this.thisScale,1);
				
				// fix bug scaling out 
				if (ig.ua.mobile){
					if (this.pos.x + this.size.x > (540 - 40)){
						this.pos.x = (540-40) - this.size.x;
					}
				}else{
					if (this.pos.x + this.size.x > (960 - 40)){
						this.pos.x = (960-40) - this.size.x;
					}
				}
				
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
			this.fireTimeCount = 480; // 240 
			//this.fireTime = this.fireRate;
			
		},
		firing:function(){
			
			if (this.fireTimeCount>462){ // 240 - 18 = 222
				this.gunDeltaPosY += 1;
				if(this.gunDeltaPosY > 18){
					this.gunDeltaPosY = 18 ;
				}
				
			}else if (this.fireTimeCount<18){ // 18
				this.gunDeltaPosY -= 1;
				if(this.gunDeltaPosY < 0){
					this.gunDeltaPosY = 0 ;
					this.fireTime = 0 ;
				}
				
			}
			
			
			if (this.fireTime>=this.fireRate){
				
				ig.game.spawnEntity(EntityBullet,this.pos.x + this.size.x/4 - 17/2,this.pos.y - 17,{gameControl:this.gameControl})
				ig.game.spawnEntity(EntityBullet,this.pos.x + this.size.x/4 + this.size.x/4 + this.size.x/4 - 17/2,this.pos.y - 17,{gameControl:this.gameControl})
				
				ig.game.sortEntitiesDeferred();	
				
				ig.soundHandler.sfxPlayer.play(this.fireSound);
				
				this.fireTime = 0;
			}
			
				this.fireTime += 1;
			
			this.fireTimeCount -=1;
			
			if (this.fireTimeCount<=0){
				this.fire = false;
			}
			
		},
		reStart:function(){
			
			this.pos.x = ig.system.width/2 - 117/2;
			this.pos.y = 1000;
			
			this.speedMove = 50;
			this.control = false;
			
			// expand-power
			this.expand = false;
			this.expandTimeCount = 0;
			this.thisScale = 1;
			
			this.setScale(1,1);
			
			//fire-power
			this.fire = false;
			this.fireTimeCount = 0;
			this.fireTime = 0;
			
			this.bulletArray = ig.game.getEntitiesByType(EntityBullet);
			
			for (var i =0 ; i< this.bulletArray.length;i++){
				this.bulletArray[i].kill();
			}
			
		}
		
		
    });
});