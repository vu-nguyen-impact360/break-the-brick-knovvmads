ig.module('game.entities.buttons.check-button')
.requires(
	'impact.entity',
	'plugins.data.vector'
)
.defines(function() {
	EntityCheckButton = ig.Entity.extend({
		collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
		size:new Vector2(960,540),
		fillColor:null,
		zIndex:400,
		gameControl:null,
		init:function(x,y,settings){
			this.parent(x,y,settings);
						
			this.pressed = false;
			
		},
		clicked:function(){
			//throw "no implementation on clicked()";
			
			if (this.gameControl.ballNumber>0){
				
				this.arrayBall = ig.game.getEntitiesByType(EntityBall);
			
				if (this.arrayBall[0].stick===true){
					this.arrayBall[0].stick=false;
					this.arrayBall[0].accWhenStart();
				}
				
			}
			
			
		},
		clicking:function(){
			
			if (this.gameControl.ballNumber>0){
				
				this.arrayBall = ig.game.getEntitiesByType(EntityBall);
			
				if (this.arrayBall[0].stick===false){
					this.pressed = true;
				}
				
			}
			
			
			
		},
		released:function(){
			this.pressed = false;
		},
		update:function(){
			this.parent();
		},
		draw:function(){
			this.parent();
			
		}
		
		
		
	});
});