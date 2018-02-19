ig.module('game.entities.block')
.requires(
	'impact.entity',
	'game.entities.power-up'
)
.defines(function() {
    EntityBlock = ig.Entity.extend({
        zIndex:230,
        pos:new Vector2(0,0),
        size:new Vector2(60,32),
        color:new ColorRGB(125,255,125,1),
		animSheet: new ig.AnimationSheet('media/graphics/game/block.png',60,32),
		checkAgainst:ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.ACTIVE,
		gameControl:null,
		tag:"block",
		color:null,
		hp:null,
		dropChance:100, // 5%
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.addAnim('pink1', 0.1, [0]);
			this.addAnim('violet1', 0.1, [1]);
			this.addAnim('yellow1', 0.1, [2]);
			this.addAnim('red1', 0.1, [3]);
			this.addAnim('black1', 0.1, [4]);
			this.addAnim('pink2', 0.1, [5]);
			this.addAnim('violet2', 0.1, [6]);
			this.addAnim('yellow2', 0.1, [7]);
			this.addAnim('red2', 0.1, [8]);
			this.addAnim('black2', 0.1, [9]);
			
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
				this.currentAnim = this.anims.black1;
				this.color = "black";
			}else if (color==="black2"){
				this.currentAnim = this.anims.black2;
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
					this.currentAnim = this.anims.black1;
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
					this.currentAnim = this.anims.black2;
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
				var boo = ig.game.spawnEntity(EntityPowerUp,this.pos.x + this.size.x/2 - 20.75 ,this.pos.y + this.size.y/2,{gameControl:this.gameControl,typePower:4}) // 20.75 is haft of power-up's size
				
				console.log(boo);
			}
			
		}
		
			
			
		
    });
});