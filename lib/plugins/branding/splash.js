ig.module(
	'plugins.branding.splash'
)
.requires(
	'impact.impact',
	'impact.entity'
)
.defines(function(){
	/* NOTE: DO NOT EDIT : THIS IS FOR CLIENT BRANDING */
	
	/* THIS WILL NOT BE UPLOADED TO TEST + PRODUCTION SERVER
	   WE HAVE TO UPLOAD A SPECIAL COMPILED CODE to a different S3 folder (eg: Spilgames)
	   FACTORY BUILD WILL INCLUDE THAT SPECIFIC BRANDING
	*/
	this.START_BRANDING_SPLASH;
	ig.BrandingSplash = ig.Class.extend({
		splash: new ig.Image('media/graphics/branding/splash/splash.png'),		
		
		init: function(){
			ig.game.spawnEntity(EntityBranding,0,0)
		}
	});

	EntityBranding = ig.Entity.extend({
		size: { x: 300, y: 250 },
		splash: new ig.AnimationSheet('media/graphics/branding/splash/splash.png',300,250),

		init: function (x, y, settings) {
			this.parent(x, y, settings);

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

			this.anims.idle = new ig.Animation(this.splash,0,[0], true);
			this.currentAnim = this.anims.idle;
		}

	});
	
	this.END_BRANDING_SPLASH;
});
