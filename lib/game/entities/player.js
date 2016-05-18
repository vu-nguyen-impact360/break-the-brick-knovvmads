ig.module('game.entities.player')
.requires(
	'impact.entity'
)
.defines(function() {
	EntityPlayer = ig.Entity.extend({
		gravityFactor: 0,
		size: {x: 336, y: 275},
		anims: {
			"pickup": new ig.Animation( 
				new ig.AnimationSheet( 'media/graphics/sprites/player-pick.png', 336, 275 ),
				0.05, [0,1,2,3,4,5,6,7,8,9,10,11], true 
			),
			"ready": new ig.Animation( 
				new ig.AnimationSheet( 'media/graphics/backgrounds/basketfield_angle_2.png', 480, 640 ),
				1, [0], true 
			),
			"shoot": new ig.Animation( 
				new ig.AnimationSheet( 'media/graphics/backgrounds/basketfield_angle_1.png', 480, 640 ),
				1, [0], true 
			),
		},
		zIndex: 6,
		
		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			if(typeof(wm)=='undefined'){
				
				this.currentAnim = this.anims.pickup;
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