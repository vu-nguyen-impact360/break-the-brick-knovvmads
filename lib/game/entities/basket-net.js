ig.module('game.entities.basket-net')
.requires(
	'impact.entity'
)
.defines(function() {
	EntityBasketNet = ig.Entity.extend({
		zIndex: 3,
		size: {x: 44, y: 44},
		anchor: {x: 0.5, y: 0.5},
		gravityFactor: 0,
		netGravityFactor: 2.5,
		
		points: [],
		physics_accuracy: 44,
	    net_height		: 13,
	    net_width		: 11,
	    spacing         : { x:    4, y:     6 },
		spacingStep     : { x:  0.1, y:   0.1 },
				
		pointDelta		: 0.012,
		netColor		: "rgba(0,0,0, 0.25)",
		
		enabled_tearing	: false,
		tear_distance	: 30,
		
		ball_influence	: 44,

		init:function(x,y,settings){
			this.parent(x,y,settings);
			
			if(typeof(wm)=='undefined'){
			    this.points = [];
				
				this._POS = {x: this.pos.x, y: this.pos.y};
				this.pos.x -= this.anchor.x*this.size.x;
				this.pos.y -= this.anchor.y*this.size.y;
				
				
				this.setupNet();
			}
		},
		
		setupNet: function() {
			/* 
				canvas drawn net using Verlet Integration 
				1. particle: A point in space.
				2. constraint: Links particles together given some criteria and operational params.
			*/
			
	    	
		    for (var y = 0; y <= this.net_height; y++) {
	    		var start_x = this._POS.x - this.net_width * (this.spacing.x-y*this.spacingStep.x) / 2,
					start_y = this.pos.y;
				
		        for (var x = 0; x <= this.net_width; x++) {

		            var p = this.newPoint(
						start_x + x * (this.spacing.x-this.spacingStep.x)*(this.net_height-y)/this.net_height, 
						start_y + y * (this.spacing.y-this.spacingStep.y)
					);
					

		            if(x !== 0) {
						// attach
		            	this.attachPoint(p, this.points[this.points.length - 1]);
		            } 
					// pin a quarter of rows to rim
					if(y <= 1/4*this.net_height) {
						// if ellipse is defined, use it
						if(this.ellipse) {
							/* math is fun, i love algebraic expression :)
							
							General Equation of an Ellipse
									 2       2
								    x       y
								   ---  +  ---  = 1
								   	 2	     2
								    a       b
								@x: coordinates of point x on the ellipse
								@y: coordinates of point y on the ellipse
								@a: radius on the x axis
								@b: radius on the y axis
							
								(x*x)/(a*a) + (y*y)/(b*b) = 1 
											  (y*y)/(b*b) = 1 - (x*x)/(a*a) 
													(y*y) = ( 1-(x*x)/(a*a) ) * (b*b) 
													    y = SQUARE_ROOT( ( 1-(x*x)/(a*a) ) * (b*b) )
							*/
							
							// given x, compute y1(-ve for foreground, higher), y2(+ve for background, lower):
							var ellipse_x = p.x - this._POS.x,	// translate x
								ellipse_y = p.y - this._POS.y;	// translate y
							
							p.y = this._POS.y + this.ellipse.y_Multiplier * Math.sqrt(
								( 1-(ellipse_x*ellipse_x)/(this.ellipse.a*this.ellipse.a) ) * (this.ellipse.b*this.ellipse.b)
							);
							
						} 
						
						// pin to RIM
						this.pinPoint(p, p.x, p.y);
					}
					else {
						// attach
						this.attachPoint(p, this.points[x + (y - 1) * (this.net_width + 1)]);
					}
					
		            this.points.push(p);
		        }
		    }
		},
		
		newPoint: function(x, y) {
			/* Particle */
			var point = {
				x  		: x,
				y  		: y,
				px 		: x,
				py 		: y,
				
				vx 		: 0,
				vy 		: 0,
				pin_x 	: null,
				pin_y 	: null,
            
				constraints: []
			};
			return point;
		},
		
		attachPoint: function(newPoint, point) {
			/* adding constraint */
			newPoint.constraints.push(
				this.newConstraint(newPoint, point)
			);
			
		},
		
		newConstraint: function (p1, p2) {
			/* Constraint */
			var constraint = {}
		    constraint.p1 = p1;
		    constraint.p2 = p2;
		    constraint.length = 0.5*(this.spacing.x+this.spacing.y).round();
			
			return constraint;
		},
		
		pinPoint: function (point, pinx, piny) {
			point.pin_x = pinx;
			point.pin_y = piny;
		},
		
		/* UPDATE */
		update: function() {
			this.parent();
			
			if(typeof(wm)=='undefined'){
				this.updateCloth();
				
				var basketBalls = ig.game.getEntitiesByType(EntityBasketBall);
				for(var ballIndex = 0; ballIndex < basketBalls.length; ballIndex++) {
					var basketBall = basketBalls[ballIndex];
					
					if(basketBall._POS.x >= this._POS.x-5 && basketBall._POS.x <= this._POS.x+5) {
						if(basketBall._POS.y >= this._POS.y-5 && basketBall._POS.y <= this._POS.y+5) {
							if(basketBall.vel.y >= 0) {
								if(!this.score) this.score = [];
								if(!(this.score.indexOf(basketBall) > 0) ) {
									this.score.push(basketBall);
								}
							}
						}
					}
				}
				
			}
		},
		
		updateCloth: function() {
			var i = this.physics_accuracy;

			while (i--) {
				var p = this.points.length;
				while (p--) this.resolve_point_constraints(this.points[p]);
			}

			i = this.points.length;
			while (i--) this.updatePoint(this.points[i], this.pointDelta);
		},
		
		updatePoint: function(point, delta) {	
				
			// basketball force
			var basketBalls = ig.game.getEntitiesByType(EntityBasketBall);
			for(var ballIndex = 0; ballIndex < basketBalls.length; ballIndex++) {
				var basketBall = basketBalls[ballIndex];
				
				var diff_x = point.x - (basketBall.pos.x+0.5*basketBall.size.x),
        		 	diff_y = point.y - (basketBall.pos.y+0.5*basketBall.size.y),
       			  	dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
					
        		if (dist < this.ball_influence) {					
					
					point.px = point.x - (basketBall.vel.x) * 0.12;
        		    point.py = point.y - (basketBall.vel.y) * 0.06;
					
					basketBall.vel.x -= (point.x - point.px) * 0.02;
					basketBall.vel.y -= (point.x - point.px) * 0.005;
					
				}
			}
			/*
			
						if(this.control.basketBall) {
							var diff_x = point.x - (this.control.basketBall.pos.x+0.5*this.control.basketBall.size.x),
			            	 	diff_y = point.y - (this.control.basketBall.pos.y+0.5*this.control.basketBall.size.y),
			           		  	dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
								
				        	if (dist < this.ball_influence) {					
								
								point.px = point.x - (this.control.basketBall.vel.x) * 0.12;
				        	    point.py = point.y - (this.control.basketBall.vel.y) * 0.06;
								
								this.control.basketBall.vel.x -= (point.x - point.px) * 0;
								this.control.basketBall.vel.y -= (point.x - point.px) * 0;
								
							}
							
							
						}
						*/
			
			
		    this.add_point_force(point, 0, ig.game.gravity*this.netGravityFactor);

		    delta *= delta;
		    nx = point.x + ((point.x - point.px) * 0.99) + ((point.vx / 2) * delta);
		    ny = point.y + ((point.y - point.py) * 0.99) + ((point.vy / 2) * delta);
			
		    point.px = point.x;
		    point.py = point.y;

		    point.x = nx;
		    point.y = ny;

		    point.vy = 0;
			point.vx = 0;
		},
		
		add_point_force: function(point, x, y) {
		    point.vx += x;
		    point.vy += y;
		},
		
		resolve_point_constraints: function(point) {
			if (point.pin_x != null && point.pin_y != null) {
			    point.x = point.pin_x;
			    point.y = point.pin_y;
			    return;
			}
			
			var i = point.constraints.length;
			while (i--) this.resolveConstraint(point.constraints[i]);
			
			if (point.x > this.boundsx) {
			
			    point.x = 2 * this.boundsx - point.x;
			
			} else if (point.x < 1) {
			
			    point.x = 2 - point.x;
			}
			
			if (point.y > this.boundsy) {
			
			    point.y = 2 * this.boundsy - point.y;
			
			} else if (point.y < 1) {
			
			    point.y = 2 - point.y;
			}
		},
		
		resolveConstraint: function(constraint) {
			var diff_x = constraint.p1.x - constraint.p2.x,
			    diff_y = constraint.p1.y - constraint.p2.y,
			    dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
			    diff = (constraint.length - dist) / dist;
			
			if(this.enabled_tearing) {
				if (dist > this.tear_distance) this.remove_point_constraint(constraint.p1, constraint);
			}
			
			var px = diff_x * diff * 0.5;
			var py = diff_y * diff * 0.5;
			
			constraint.p1.x += px;
			constraint.p1.y += py;
			constraint.p2.x -= px;
			constraint.p2.y -= py;
		},
		
		remove_point_constraint: function (point, lnk) {

		    var i = point.constraints.length;
		    while (i--)
		        if (point.constraints[i] == lnk) point.constraints.splice(i, 1);
		},
		
		
		/* DRAW */		
		draw:function(){
			this.parent();
			
			if(typeof(wm)=='undefined'){
				this.drawCloth(ig.system.context);
				
				if(this.score) {
					ig.system.context.textAlign = 'center';
					ig.system.context.textBaseline = 'bottom';
					ig.system.context.font = '14px arial';
					ig.system.context.fillStyle = 'rgba(55,255,55,1)';
					ig.system.context.fillText(this.score.length, this._POS.x, this._POS.y)
				}
			}
		},
		
		drawCloth: function (ctx) {
			ctx.beginPath();

			var i = this.points.length;
			while (i--) this.drawPoints(ctx, this.points[i]);

			ctx.lineWidth = 0.75;
			ctx.strokeStyle = this.netColor;
			ctx.stroke();
		},
		
		drawPoints: function(ctx, point) {
			if (point.constraints.length <= 0) return;

			var i = point.constraints.length;
			while (i--) this.drawConstraint(ctx, point.constraints[i]);
		},
		
		drawConstraint: function(ctx, constraint) {
			ctx.moveTo(constraint.p1.x, constraint.p1.y);
			ctx.lineTo(constraint.p2.x, constraint.p2.y);
		},
		
	});

});