ig.module('game.entities.buttons.play-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityPlayButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(157,157),
		image: new ig.Image('media/graphics/button/play-button.png'),
		fillColor:null,
		zIndex:500,
		gameControl:null,
		pausePage:null,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			this.pressed = false;
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				this.pressed = true;
				
				/*
				this.gameControl.pauseButton.state = false;
				this.gameControl.countToPlay = true;
				*/
			}
			
			//this.state = !this.state;
			
		},
		clicking:function(){
			
		},
		released:function(){
			
		},
		update:function(){
			this.parent();
			
			if (this.pausePage.enable===true){
				this.enable = true;
				
				if (ig.ua.mobile){
					this.pos.x = this.pausePage.pos.x + (540 - 157)/2;
					this.pos.y = this.pausePage.pos.y + 600;
				}else{
					this.pos.x = this.pausePage.pos.x + (960 - 157)/2;
					this.pos.y = this.pausePage.pos.y + 540 - 157 - 40;
				}
				
				//this.zIndex = 500;
				
			}else if (this.pausePage.enable===false){
				this.enable = false;
				
				this.pos.x = -1000;
				this.pos.y = -1000;
				//this.zIndex = -600;
			}
			
			//console.log(this.pos.x);
			
		},
		draw:function(){
			this.parent();
			
			if (this.enable===true){
				this.image.draw(this.pos.x,this.pos.y);
			}
						
		}
		
		
		
	});
});