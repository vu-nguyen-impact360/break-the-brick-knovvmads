ig.module('game.entities.buttons.home-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityHomeButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(205,113),
		image: new ig.Image('media/graphics/button/home-button.png'),
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
				this.gameControl.toHomePage();
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
					
					if (ig.ua.mobile){
						this.pos.x = this.pausePage.pos.x + (1080 - 208)/2 + 205 + 80;
						this.pos.y = this.pausePage.pos.y + 569*2 + 50*2;
					}else{
						this.pos.x = this.pausePage.pos.x + (1920 - 208)/2 + 205 + 80;
						this.pos.y = this.pausePage.pos.y + 1080 - 119*2 - 60*2;
					}
					
				}else if (this.resultPage.enable===true){
					
					if (ig.ua.mobile){
						this.pos.x = this.resultPage.pos.x + 1080/2 + 5*2 + 10*2;
						this.pos.y = this.resultPage.pos.y + 1100;
					}else{
						this.pos.x = this.resultPage.pos.x + 1920/2 + 15*2;
						this.pos.y = this.resultPage.pos.y + 1080 - 119*2 - 60*2;
					}
					
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