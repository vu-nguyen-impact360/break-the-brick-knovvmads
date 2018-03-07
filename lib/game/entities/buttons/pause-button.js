ig.module('game.entities.buttons.pause-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityPauseButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(63,63),
		image: new ig.Image('media/graphics/button/pause-button.png'),
		fillColor:null,
		zIndex:500,
		gameControl:null,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.state = false;
			
		},
		clicked:function(){
			
			if (this.state===false&&this.gameControl.countToPlay===false){
				
				this.state = true;
				this.gameControl.pause = this.state;
				
			}
			/*
			else if (this.state===true){
				
				this.state = false;
				this.gameControl.countToPlay = true;
				
			}
			*/
			//this.state = !this.state;
			
		},
		clicking:function(){
			
		},
		released:function(){
			
		},
		update:function(){
			this.parent();
			
			if (this.gameControl.gameOver===true||this.gameControl.home===true){
				
				this.pos.x = -1000;
				
			}else if (this.gameControl.gameOver===false&&this.gameControl.home===false){
				this.pos.x = 40 + 20 ;
			}
			
			
		},
		draw:function(){
			
			if (this.state===false){
			
				this.parent();
			
				this.image.draw(this.pos.x,this.pos.y);
			
			}
			
		}
		
		
		
	});
});