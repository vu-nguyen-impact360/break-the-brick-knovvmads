ig.module('game.entities.buttons.restart-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityRestartButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(119,119),
		image: new ig.Image('media/graphics/button/restart-button.png'),
		fillColor:null,
		zIndex:500,
		gameControl:null,
		pausePage:null,
		resultPage:null,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			this.enable = false;
			this.pressed = false;
			
		},
		clicked:function(){
			
			if (this.enable===true){
				
				this.pressed = true;
				/*
				this.gameControl.reStart();
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
			
			if (this.pausePage.enable===true||this.resultPage.enable===true){
				this.enable = true;
				
				if (this.pausePage.enable===true){
					this.pos.x = this.pausePage.pos.x +  260;
					this.pos.y = this.pausePage.pos.y + 540 - 119 - 60;
				}else if (this.resultPage.enable===true){
					this.pos.x = this.resultPage.pos.x + 960/2 - 119;
					this.pos.y = this.resultPage.pos.y + 540 - 119 - 60;
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