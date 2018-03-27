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
		stopSound:"stopSound",
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.state = false;
			
		},
		clicked:function(){
			
			if (this.state===false&&this.gameControl.countToPlay===false&&this.gameControl.delay===false&&this.gameControl.tutorialDone===true){
				
				this.state = true;
				this.gameControl.pause = this.state;
				ig.soundHandler.sfxPlayer.play(this.stopSound);
				
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
			
			if (this.gameControl.gameOver===true||this.gameControl.home===true||this.gameControl.setting===true&&this.gameControl.tutorialDone===true){
				
				this.pos.x = -1000;
				
			}else if (this.gameControl.gameOver===false&&this.gameControl.home===false||this.gameControl.tutorialDone===false){
				this.pos.x = 53 ;
			}
			
			
		},
		draw:function(){
			
			if (this.state===false&&this.gameControl.tutorialDone===true){
			
				this.parent();
			
				this.image.draw(this.pos.x,this.pos.y);
			
			}
			
		}
		
		
		
	});
});