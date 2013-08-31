var MobileAdInGameFooter = {
	
	ad_duration:_SETTINGS['Ad']['Mobile']['Footer']['Duration'],
	ad_width:_SETTINGS['Ad']['Mobile']['Footer']['Width'],
	ad_height:_SETTINGS['Ad']['Mobile']['Footer']['Height'],
	
	Initialize:function(){
		this.div = $('#MobileAdInGameFooter');
		this.game = $('#game');
			
		// Centralize
		this.div.width(this.ad_width);
		this.div.height(this.ad_height);

		this.div.css('left',this.game.position().left+(this.game.width()-this.div.width())/2)
		this.div.css('top',this.game.height()-this.div.height()-5)

		// Show
		this.div.show(this.Timer(this.ad_duration));			
	},

	Timer:function(duration){
		var inter = setInterval(function(){
			duration--;
			if(duration<0){
				MobileAdInGameFooter.div.hide();
				clearInterval(inter);				
			}
		},1000);
	},
};








