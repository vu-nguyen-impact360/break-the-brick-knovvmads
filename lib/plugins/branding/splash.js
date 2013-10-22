this.START_BRANDING_SPLASH;
ig.module(
	'plugins.branding.splash'
)
.requires(
	'impact.impact',
	'impact.entity'
)
.defines(function(){
	ig.BrandingSplash = ig.Class.extend({
		init: function(){
			ig.game.spawnEntity(EntityBranding,0,0);
		}
	});

	EntityBranding = ig.Entity.extend({
		gravityFactor:0,
		size: { x: 32, y: 32 },
		splash_320x480: new ig.AnimationSheet('branding/splash_320x480.png',320,267),
		splash_480x640: new ig.AnimationSheet('branding/splash_480x640.png',480,400),
		
		init: function (x, y, settings) {
			this.parent(x, y, settings);

			// Resize
			if(ig.system.width<=320){
				this.size.x = 320;
				this.size.y = 267;
				this.anims.idle = new ig.Animation(this.splash_320x480,0,[0], true);
			}else{
				this.size.x = 480;
				this.size.y = 400;
				this.anims.idle = new ig.Animation(this.splash_480x640,0,[0], true);
			}

			// Reposition
			this.pos.x = (ig.system.width - this.size.x)/2;
			this.pos.y = -this.size.y-200;
			
			// Tween
			this.endPosY = (ig.system.height - this.size.y)/2;
			var tween1 = this.tween( {pos: {y: this.endPosY}}, 0.5, {easing:ig.Tween.Easing.Bounce.EaseIn} );
			var tween2 = this.tween({},2,{onComplete:function(){
				ig.game.director.loadLevel(ig.game.director.currentLevel);
			}});
			tween1.chain(tween2);

			tween1.start();

			this.currentAnim = this.anims.idle;
		},

		draw:function(){			
			ig.system.context.fillStyle = '#ffffff';
			ig.system.context.fillRect( 0, 0, ig.system.width, ig.system.height );
			this.parent();
		}

	});
});
this.END_BRANDING_SPLASH;