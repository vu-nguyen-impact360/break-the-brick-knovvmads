ig.module('game.entities.basket-ball')
.requires(
	'impact.entity'
)
.defines(function() {
	EntityBasketBall = ig.Entity.extend({
		zIndex: 3,
		size: {x: 44, y: 44},
		anchor: {x: 0.5, y: 0.5},
		animSheet: new ig.AnimationSheet( 'media/graphics/sprites/basketball.png', 44, 44 ),
		bounciness: 2,
		maxVel: {x: 128, y: 128 },
		friction: {x: 0.25, y: 0.25 },
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			if(typeof(wm)=='undefined'){
				this._POS = {x: this.pos.x, y: this.pos.y};
				this.pos.x -= this.anchor.x*this.size.x;
				this.pos.y -= this.anchor.y*this.size.y;
				
				this.addAnim( 'idle', 0.075, [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,] );
				this.currentAnim = this.anims.idle;
				
				this.updateRadius();
			}
			
			ig.game.sortEntitiesDeferred();
		},
		
		
		updateRadius: function() {
			this.radius = 0.5*(this.size.x + this.size.y);
		},
		
		update: function() {
			this.parent();
			
			if(this.pos.y>ig.system.height) this.kill();
			
			if(typeof(wm)=='undefined'){
				
				this._POS.x = this.pos.x+this.anchor.x*this.size.x;
				this._POS.y = this.pos.y+this.anchor.y*this.size.y;
				
				var basketBalls = ig.game.getEntitiesByType(EntityBasketBall);
				for(var ballIndex = 0; ballIndex < basketBalls.length; ballIndex++) {
					var basketBall = basketBalls[ballIndex];
					
					if(basketBall !== this) {
						var distance = this.distanceTo(basketBall);
						if( distance <= (this.radius) ) {
						}
					}					
				}
				
				
				if(this.currentAnim.frame < this.currentAnim.sequence.length/2) {
				//	this.currentAnim.angle+=(-2.25).toRad();
				}
				else {
				//	this.currentAnim.angle+=(2.25).toRad();
				}
				
			}
		},
		
		draw:function(){
			this.parent();
			if(typeof(wm)=='undefined'){
			}
		}
		
	});

});