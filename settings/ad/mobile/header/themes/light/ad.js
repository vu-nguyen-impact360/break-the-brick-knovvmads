var MobileAdInGameHeader = {
	
	ad_duration:_SETTINGS['Ad']['Mobile']['Header']['Duration'],
	ad_width:_SETTINGS['Ad']['Mobile']['Header']['Width'],
	ad_height:_SETTINGS['Ad']['Mobile']['Header']['Height'],
	
	Initialize:function(){
		this.div = $('#MobileAdInGameHeader');
		this.game = $('#game');
			
		// Centralize
		this.div.width(this.ad_width);
		this.div.height(this.ad_height);

		this.div.css('left',this.game.position().left+(this.game.width()-this.div.width())/2)
		this.div.css('top',0)

		// Show
		this.div.show(this.Timer(this.ad_duration));			
	},

	Timer:function(duration){
		var inter = setInterval(function(){
			duration--;
			if(duration<0){
				MobileAdInGameHeader.div.hide();
				clearInterval(inter);				
			}
		},1000);
	},
};








