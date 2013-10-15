ig.module('game.entities.branding-logo-placeholder')
.requires(
	'impact.entity'
)
.defines(function() {
	EntityBrandingLogoPlaceholder = ig.Entity.extend({
		gravityFactor:0,
		size:{x:32,
			y:32,
		},
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.7)',

		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			// init stuff here
			if(typeof(wm)=='undefined'){
				if(_SETTINGS['Branding']['Logo']['Enabled']){
					try{
						ig.game.spawnEntity(EntityBrandingLogo,this.pos.x,this.pos.y);
					}catch(err){
						console.log(err);
					}					
				}
				this.kill();		
			}
			
		}		
	});
});