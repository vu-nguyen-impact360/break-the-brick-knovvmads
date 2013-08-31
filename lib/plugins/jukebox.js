ig.module( 'plugins.jukebox' )
.defines(function(){
	ig.Jukebox = ig.Class.extend({		
		init: function(){
			this.player = new jukebox.Player({
			    resources: [
			      'media/sounds/mobile/spritemap.mp3',
			      'media/sounds/mobile/spritemap.ogg',
			    ],

				autoplay:'music',
				
			    spritemap: {
									
					music: {
						start: 3.00,
						end: 86.00,	
						loop:true,			
					},
										
					// more audio bytes here		
			    }
		   });	
		},
	});	
});