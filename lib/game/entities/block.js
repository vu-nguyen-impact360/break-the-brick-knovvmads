ig.module('game.entities.block')
.requires(
	'impact.entity',
	'game.entities.power-up'
)
.defines(function() {
    EntityBlock = ig.Entity.extend({
        zIndex:230,
        pos:new Vector2(0,0),
        size:new Vector2(120, 64),
        color:new ColorRGB(125,255,125,1),
		// animSheet: new ig.AnimationSheet('media/graphics/game/block.png', 120, 64),
		checkAgainst:ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		gameControl:null,
		tag:"block",
		color:null,
		hp:null,
		dropChance: 10, // 5%
        init:function(x,y,settings){
			this.parent(x*2, y*2, settings);

			// if(ig.ua.mobile) {
			// 	this.parent(x * 2, ((y * 2) + 100), settings);
			// } else {
			// 	this.parent(x * 2, y * 2, settings);
			// }

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_red.png', 120, 64);
			this.addAnim('pink1', 0.1, [0]);

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_green.png', 120, 64);
			this.addAnim('violet1', 0.1, [0]);

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_yellow.png', 120, 64);
			this.addAnim('yellow1', 0.1, [0]);

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_orange.png', 120, 64);
			this.addAnim('red1', 0.1, [0]);

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_blue.png', 120, 64);
			this.addAnim('blue1', 0.1, [0]);

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_red_crack.png', 120, 64);
			this.addAnim('pink2', 0.1, [0]);

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_green_crack.png', 120, 64);
			this.addAnim('violet2', 0.1, [0]);

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_yellow_crack.png', 120, 64);
			this.addAnim('yellow2', 0.1, [0])

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_orange_crack.png', 120, 64);
			this.addAnim('red2', 0.1, [0]);

			this.animSheet = new ig.AnimationSheet('media/graphics/game/brick_blue_crack.png', 120, 64);
			this.addAnim('blue2', 0.1, [0]);
            //this.currentAnim = this.anims.pink1;
			this.updateHp();
			this.gameControl.blockNumber +=1;

        },
        update:function(){
            
            this.parent();
			
        },
        draw:function(){
            this.parent();
			
        },
		setColor:function(color){
			
			
			if (color==="pink1"){
				this.currentAnim = this.anims.pink1;
				this.color = "pink";
			}else if (color==="pink2"){
				this.currentAnim = this.anims.pink2;
				this.color = "pink";
			}else if (color==="violet1"){
				this.currentAnim = this.anims.violet1;
				this.color = "violet";
			}else if (color==="violet2"){
				this.currentAnim = this.anims.violet2;
				this.color = "violet";
			}else if (color==="yellow1"){
				this.currentAnim = this.anims.yellow1;
				this.color = "yellow";
			}else if (color==="yellow2"){
				this.currentAnim = this.anims.yellow2;
				this.color = "yellow";
			}else if (color==="red1"){
				this.currentAnim = this.anims.red1;
				this.color = "red";
			}else if (color==="red2"){
				this.currentAnim = this.anims.red2;
				this.color = "red";
			}else if (color==="black1"){
				this.currentAnim = this.anims.blue1;
				this.color = "black";
			}else if (color==="black2"){
				this.currentAnim = this.anims.blue2;
				this.color = "black";
			}
			
		},
		kill:function(){
			 this.parent();
			 
			 this.gameControl.blockNumber-= 1;
			 
			 
			 
		},
		updateHp:function(){
			
			if (this.hp===2){
				
				if (this.color==="pink"){
					this.currentAnim = this.anims.pink1;
				}else if (this.color==="violet"){
					this.currentAnim = this.anims.violet1;
				}else if (this.color==="yellow"){
					this.currentAnim = this.anims.yellow1;
				}else if (this.color==="red"){
					this.currentAnim = this.anims.red1;
				}else if (this.color==="black"){
					this.currentAnim = this.anims.blue1;
				}
				
			}else if (this.hp===1){
				
				if (this.color==="pink"){
					this.currentAnim = this.anims.pink2;
				}else if (this.color==="violet"){
					this.currentAnim = this.anims.violet2;
				}else if (this.color==="yellow"){
					this.currentAnim = this.anims.yellow2;
				}else if (this.color==="red"){
					this.currentAnim = this.anims.red2;
				}else if (this.color==="black"){
					this.currentAnim = this.anims.blue2;
				}
				
			}else if (this.hp<=0){
				this.kill();
				
				this.randomDrop();
				
			}
				
		},
		randomDrop:function(){
			
			this.chacne = Math.floor(Math.random()*100);
			
			if (this.chacne < this.dropChance){
				this.drop();
			}
			
		},
		drop:function(){
			
			this.powerNumber = Math.floor(Math.random()*4);
			
			if (this.powerNumber===0){
				ig.game.spawnEntity(EntityPowerUp,this.pos.x + this.size.x/2 - 20.75 ,this.pos.y + this.size.y/2,{gameControl:this.gameControl,typePower:1}) // 20.75 is haft of power-up's size
			}else if (this.powerNumber===1){
				ig.game.spawnEntity(EntityPowerUp,this.pos.x + this.size.x/2 - 20.75 ,this.pos.y + this.size.y/2,{gameControl:this.gameControl,typePower:2}) // 20.75 is haft of power-up's size
			}else if (this.powerNumber===2){
				ig.game.spawnEntity(EntityPowerUp,this.pos.x + this.size.x/2 - 20.75 ,this.pos.y + this.size.y/2,{gameControl:this.gameControl,typePower:3}) // 20.75 is haft of power-up's size
			}else if (this.powerNumber===3){
				ig.game.spawnEntity(EntityPowerUp,this.pos.x + this.size.x/2 - 20.75 ,this.pos.y + this.size.y/2,{gameControl:this.gameControl,typePower:4}) // 20.75 is haft of power-up's size
			}
			
			ig.game.sortEntitiesDeferred();
			
			
		}
		
			
			
		
    });
});