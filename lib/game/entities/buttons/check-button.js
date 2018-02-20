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
		},
		clicking:function(){
			this.pressed = true;
			
			if (this.gameControl.ball.stick===true){
				this.gameControl.ball.stick=false;
				this.gameControl.ball.accWhenStart();
				
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