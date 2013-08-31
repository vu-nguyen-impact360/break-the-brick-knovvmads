var MobileAdInGameEnd = {
	
	ad_duration:_SETTINGS['Ad']['Mobile']['End']['Duration'],
	ad_width:_SETTINGS['Ad']['Mobile']['End']['Width'],
	ad_height:_SETTINGS['Ad']['Mobile']['End']['Height'],
	
	ready_in:_STRINGS['Ad']['Mobile']['Preroll']['ReadyIn'],
	loading:_STRINGS['Ad']['Mobile']['Preroll']['Loading'],
	close:_STRINGS['Ad']['Mobile']['Preroll']['Close']+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
		
	Initialize:function(){	
		this.overlay = $('#MobileAdInGameEnd');
		this.box = $('#MobileAdInGameEnd-Box');
		this.game = $('#game');
		
		this.boxContents = {
			footer:$('#MobileAdInGameEnd-Box-Footer'),			
			header:$('#MobileAdInGameEnd-Box-Header'),
			close:$('#MobileAdInGameEnd-Box-Close'),
			body:$('#MobileAdInGameEnd-Box-Body'), // Contains the ad			
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
			MobileAdInGameEnd.boxContents.header.text(MobileAdInGameEnd.ready_in+i+'...');			
			MobileAdInGameEnd.boxContents.footer.text(MobileAdInGameEnd.loading);
			i--;
			if(i<0){
				clearInterval(inter);
				MobileAdInGameEnd.boxContents.close.css('left',MobileAdInGameEnd.boxContents.body.width()-23);
				MobileAdInGameEnd.boxContents.close.show();
				MobileAdInGameEnd.boxContents.header.html(MobileAdInGameEnd.close);
				MobileAdInGameEnd.boxContents.footer.text('');
			}
		},1000);
	},
	
	Close:function(){
		this.overlay.hide();
	}

};





