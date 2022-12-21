ig.module('game.entities.buttons.button-more-games')
.requires(
	'game.entities.buttons.button'
	,'plugins.clickable-div-layer'
)
.defines(function() {
	EntityButtonMoreGames = EntityButton.extend({
		type:ig.Entity.TYPE.A,
		gravityFactor:0,
		logo: new ig.AnimationSheet('media/graphics/button/more-game-button.png', 206, 113),
		size:{x:206,y:113,},
		zIndex: 500,
		clickableLayer:null,
		link:null,
		newWindow:false,
		div_layer_name:"more-games",
		name:"moregames",
		pos: new Vector2(0,0),
		correctPos: new Vector2((1920+ 206) * 0.5 + 60,750),
		correctPosMobile: new Vector2((1080 - 206) * 0.5,1525),
		//correctPosMoblie: new Vector2(297,665),
		homePage:null,
		init:function(x,y,settings){
			this.parent(x,y,settings);
			this.enable = false;
			
			// if (ig.ua.mobile){
			// 	this.pos.x = this.correctPosMobile.x;
			// 	this.pos.y = this.correctPosMobile.y;
			// }else{
			// 	this.pos.x = this.correctPos.x;
			// 	this.pos.y = this.correctPos.y;
			// }
			
            //ig.soundHandler.unmuteAll(true);
            
			if(ig.global.wm)
			{
				return;
			}
			
			if(settings.div_layer_name)
			{
				//console.log('settings found ... using that div layer name')
				this.div_layer_name = settings.div_layer_name;
			}
			else
			{
				this.div_layer_name = 'more-games'
			}
			
			if(_SETTINGS.MoreGames.Enabled)
			{
				this.anims.idle = new ig.Animation(this.logo,0,[0], true);
				this.currentAnim = this.anims.idle;
				
				if(_SETTINGS.MoreGames.Link)
				{
					this.link=_SETTINGS.MoreGames.Link;
				}
				if(_SETTINGS.MoreGames.NewWindow)
				{
					this.newWindow = _SETTINGS.MoreGames.NewWindow;
				}
				this.clickableLayer = new ClickableDivLayer(this);
			}
			else
			{
				this.kill();
			}	
		},
        show:function()
        {
            var elem = ig.domHandler.getElementById("#"+this.div_layer_name);
            ig.domHandler.show(elem);
        },
        hide:function()
        {
            var elem = ig.domHandler.getElementById("#"+this.div_layer_name);
            ig.domHandler.hide(elem);
        },
		clicked:function()
		{
			
		},
		clicking:function()
		{
			
		},
		released:function()
		{
			
		},
		draw:function(){
			
			
			if(this.enable===true){
				this.parent();
			}

		},
		update:function(){
			this.parent();
			//console.log(this.enable);
			
			if (this.enable===true){
				this.show();
				if (ig.ua.mobile){
					this.pos.x = this.correctPosMobile.x;
					this.pos.y = this.correctPosMobile.y;
				}else{
					this.pos.x = this.correctPos.x;
					this.pos.y = this.correctPos.y;
				}


			}else{
				//this.zIndex = 100;
				this.hide();
				this.pos.x = -1000;
				this.pos.y = -1000;
			}

			if (this.homePage.enable===true){
				this.show();
				this.enable = true;

			}else {
				this.hide();
				this.enable = false;
			}
			this.clickableLayer.update(this.pos.x, this.pos.y);
			//console.log(this.enable);
			//console.log(this.pos.x);
			
		}
		
	});
});