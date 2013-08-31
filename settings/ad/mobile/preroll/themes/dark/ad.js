var MobileAdInGamePreroll = {
	
	ad_duration:_SETTINGS['Ad']['Mobile']['Preroll']['Duration'],
	ad_width:_SETTINGS['Ad']['Mobile']['Preroll']['Width'],
	ad_height:_SETTINGS['Ad']['Mobile']['Preroll']['Height'],
	
	ready_in:_STRINGS['Ad']['Mobile']['Preroll']['ReadyIn'],
	loading:_STRINGS['Ad']['Mobile']['Preroll']['Loading'],
	close:_STRINGS['Ad']['Mobile']['Preroll']['Close']+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		
	Initialize:function(){	
		this.overlay = $('#MobileAdInGamePreroll');
		this.box = $('#MobileAdInGamePreroll-Box');
		this.game = $('#game');
		
		this.boxContents = {
			footer:$('#MobileAdInGamePreroll-Box-Footer'),			
			header:$('#MobileAdInGamePreroll-Box-Header'),
			close:$('#MobileAdInGamePreroll-Box-Close'),
			body:$('#MobileAdInGamePreroll-Box-Body'), // Contains the ad			
		};
		
		// Centralize
		this.box.width(this.ad_width);
		this.box.height(this.ad_height);
	
		this.box.css('left',(this.overlay.width()-this.box.width())/2);
		this.box.css('top',(this.overlay.height()-this.box.height()-this.boxContents.header.height()-this.boxContents.footer.height())/2);	

		// Start
		this.overlay.show(this.Timer(this.ad_duration));		
	},
	
	Timer:function(duration){
		var i=duration;
		var inter = setInterval(function(){
			MobileAdInGamePreroll.boxContents.header.text(MobileAdInGamePreroll.ready_in+i+'...');			
			MobileAdInGamePreroll.boxContents.footer.text(MobileAdInGamePreroll.loading);
			i--;
			if(i<0){
				clearInterval(inter);
				MobileAdInGamePreroll.boxContents.close.css('left',MobileAdInGamePreroll.boxContents.body.width()-23);
				MobileAdInGamePreroll.boxContents.close.show();
				MobileAdInGamePreroll.boxContents.header.html(MobileAdInGamePreroll.close);
				MobileAdInGamePreroll.boxContents.footer.text('');
			}
		},1000);
	},
	
	Close:function(){
		this.overlay.hide();
	}

};





