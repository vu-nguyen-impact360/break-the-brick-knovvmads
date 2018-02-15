ig.module('game.entities.player')
.requires(
	'impact.entity'
)
.defines(function() {
    EntityPlayer = ig.Entity.extend({
        zIndex:230,
        pos:new Vector2(0,0),
        size:new Vector2(117,23),
        color:new ColorRGB(125,255,125,1),
		animSheet: new ig.AnimationSheet('media/graphics/game/player.png',117,23),
		checkAgainst:ig.Entity.TYPE.A,
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
			
        },
        update:function(){
            
            this.parent();
			
			
			
			if (this.gameControl.pause===false){
				
				this.move();
				
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
			
			
			
		}
		
    });
});