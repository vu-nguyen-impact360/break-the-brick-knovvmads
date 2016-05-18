ig.module('game.entities.game-control')
.requires(
  'impact.entity',
  'game.entities.basket-net',
  'game.entities.basket-ball',
  'game.entities.player'
)
.defines(function() { 
  
  EntityGameControl = ig.Entity.extend({
    init:function(x,y,settings){
      this.parent(x,y,settings);
      
      if(typeof(wm)=='undefined'){
        
        this.spawnBasketNet(
          0.505*ig.system.width, 
          0.515*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.505*ig.system.width, 
        	0.1*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.505*ig.system.width, 
        	0.25*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.505*ig.system.width, 
        	0.75*ig.system.height
        );
        
        
        this.spawnBasketNet(
        	0.25*ig.system.width, 
        	0.515*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.25*ig.system.width, 
        	0.1*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.25*ig.system.width, 
        	0.25*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.25*ig.system.width, 
        	0.75*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.75*ig.system.width, 
        	0.515*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.75*ig.system.width, 
        	0.1*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.75*ig.system.width, 
        	0.25*ig.system.height
        );
        
        this.spawnBasketNet(
        	0.75*ig.system.width, 
        	0.75*ig.system.height
        );
        
        for(var i = 0; i < 10000; i++) {
        	this.tween(
        		{}, i*0.5,
        		{
        			onComplete: function() {
        				this.throwBasketBall();
        			}.bind(this)
        		}
        		
        	).start();
        }
        
        this.player = ig.game.spawnEntity(EntityPlayer, 
        	0.5*ig.system.width, 
        	0.75*ig.system.height,
        	{
        		control: this
        	}
        );
			}
		},
		
		spawnBasketNet: function(x, y) {
			this.basketNetBack = ig.game.spawnEntity(EntityBasketNet, 
				x, 
				y,
				{
					size: { x: 44, y: 44 },
					control: this,
					zIndex: 2,
					ball_influence: 11,
					ellipse: {
						a: 22,
						b: 0.5*22,
						y_Multiplier: -1,
					},
				}
			);
			this.basketNetFront = ig.game.spawnEntity(EntityBasketNet, 
				x, 
				y,
				{
					size: { x: 44, y: 44 },
					control: this,
					zIndex: 4,
					ball_influence: 22,
					ellipse: {
						a: 22,
						b: 0.5*22,
						y_Multiplier: 1,
					}
				}
			);
			
			// attach together
			this.joinNet(
				this.basketNetBack,
				this.basketNetFront
			);
		},
		 
		
		throwBasketBall: function() {
			this.basketBall = ig.game.spawnEntity(EntityBasketBall, 
				[0.25,0.5,0.75].random()*ig.system.width, 
				0.45*ig.system.height,
				{
					control: this,
					zIndex: 3,
					vel: {
						x: 333*( Math.random()-Math.random() ),
						y: -666
					}
				}
			);
		},
		
		joinNet: function(backNet, frontNet) {
			/* 		backNet		fontNet
					 0 1 2		 A B C
					 3 4 5		 D E F
					 6 7 8		 G H I
				
				attach 0 - A ; attach 2 - C ;
				attach 3 - D ; attach 5 - F ;
				attach 6 - G ; attach 8 - I ;
			*/
			
			//// additional row for pin
			for(var rowIndex = 0; rowIndex <= frontNet.net_height; rowIndex++) {
				// 0 - A ...
				var pointIndex = rowIndex*frontNet.net_width;
				frontNet.attachPoint(frontNet.points[pointIndex], backNet.points[pointIndex]);
				//frontNet.attachPoint(frontNet.points[pointIndex+1], backNet.points[pointIndex+1]);
				//frontNet.attachPoint(frontNet.points[pointIndex+2], backNet.points[pointIndex+2]);
								
				// 2 - C ...
				pointIndex = ( (rowIndex+1)*frontNet.net_width );
				frontNet.attachPoint(frontNet.points[pointIndex], backNet.points[pointIndex]);
				//frontNet.attachPoint(frontNet.points[pointIndex-1], backNet.points[pointIndex-1]);
				//frontNet.attachPoint(frontNet.points[pointIndex-2], backNet.points[pointIndex-2]);
				
				//console.log(rowIndex, pointIndex, frontNet.points.length-1); 
			}
			
			// all points
			for(var pointIndex = frontNet.net_width-1; pointIndex < frontNet.points.length; pointIndex++) {
				//frontNet.attachPoint(frontNet.points[pointIndex], backNet.points[pointIndex]);
				
				if(pointIndex-frontNet.net_width >= frontNet.net_width) {
				//	frontNet.attachPoint(frontNet.points[pointIndex], backNet.points[pointIndex-frontNet.net_width]);
				//	backNet.attachPoint(backNet.points[pointIndex], frontNet.points[pointIndex-frontNet.net_width]);
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