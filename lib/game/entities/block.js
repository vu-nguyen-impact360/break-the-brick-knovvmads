ig.module('game.entities.block')
.requires(
	'impact.entity'
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
			}
				
		}
		
			
			
		
    });
});