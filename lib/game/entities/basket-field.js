ig.module('game.entities.basket-field')
.requires(
	'impact.entity'
)
.defines(function() {
	EntityBasketField = ig.Entity.extend({
		gravityFactor: 0,
		size: {x: 480, y: 640},
		anims: {
			"court1": new ig.Animation( 
				new ig.AnimationSheet( 'media/graphics/backgrounds/basketfield_angle_3.png', 480, 640 ),
				1, [0], true 
			),
			"court2": new ig.Animation( 
				new ig.AnimationSheet( 'media/graphics/backgrounds/basketfield_angle_2.png', 480, 640 ),
				1, [0], true 
			),
			"court3": new ig.Animation( 
				new ig.AnimationSheet( 'media/graphics/backgrounds/basketfield_angle_1.png', 480, 640 ),
				1, [0], true 
			),
			"court4": new ig.Animation( 
				new ig.AnimationSheet( 'media/graphics/backgrounds/basketfield_angle_2.png', 480, 640 ),
				1, [0], true 
			),
			"court5": new ig.Animation( 
				new ig.AnimationSheet( 'media/graphics/backgrounds/basketfield_angle_3.png', 480, 640 ),
				1, [0], true 
			)
		},
		zIndex: 1,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			if(typeof(wm)=='undefined'){
				
				this.currentAnim = this.anims.court1;
			}
		},
		
		update: function() {
			this.parent();
			
			if(typeof(wm)=='undefined'){
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