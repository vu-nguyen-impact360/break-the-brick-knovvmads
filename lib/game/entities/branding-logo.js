this.START_BRANDING_LOGO;
ig.module('game.entities.branding-logo')
.requires(
	'impact.entity'
)
.defines(function() {
	EntityBrandingLogo = ig.Entity.extend({
		gravityFactor:0,
		logo: new ig.AnimationSheet('branding/logo.png',_SETTINGS['Branding']['Logo']['Width'],_SETTINGS['Branding']['Logo']['Height']),
		size:{x:32,
			y:32,
		},

		init:function(x,y,settings){
			this.parent(x,y,settings);

			// init stuff here
			if(typeof(wm)=='undefined'){
				if(!_SETTINGS['Branding']['Logo']['Enabled']){
					this.kill();
				}else{
					// Start resizing intelligently
					this.size.x = _SETTINGS['Branding']['Logo']['Width'];
					
					// Must centralize
					this.pos.x = ig.system.width/2 - this.size.x/2;
										
				}			
			}
			
			this.anims.idle = new ig.Animation(this.logo,0,[0], true);
			this.currentAnim = this.anims.idle;
			
			// BUILD CLICKABLE LAYER
			this.checkClickableLayer('branding-logo',_SETTINGS['Branding']['Logo']['Link'],true);
		},

		doesClickableLayerExist:function(id){
			for(k in dynamicClickableEntityDivs){
				if(k==id) return true;
			}			
			return false;	
		},

		checkClickableLayer:function(divID,outboundLink,open_new_window){
			if(typeof(wm)=='undefined'){				
				// IF LAYER ALREADY EXISTS, SHOW OVERLAY. ELSE, CREATE CLICKABLE LAYER
				if(this.doesClickableLayerExist(divID)){
					// SHOW OVERLAY
					ig.game.showOverlay([divID]);
					
					// REINJECT NEW LINK
					$('#'+divID).find('[href]').attr('href',outboundLink);
					
				}else{
					this.createClickableOutboundLayer(divID,outboundLink,'branding/invisible.png',open_new_window);
				}							
			}			
		},
								
		// WORKAROUND BECAUSE CANVAS CANNOT BE CLICKED TO AN OUTBOUND LINK. TOLERATES RESIZING
		createClickableOutboundLayer:function(id,outbound_link,image_path,open_new_window){			
			// CREATE LAYER
		    var div = ig.$new('div');
		    div.id = id;
		    document.body.appendChild(div);
    		
			// ADJUST LAYER
			$('#'+div.id).css('float','left');
			$('#'+div.id).css('width',this.size.x*multiplier);
			$('#'+div.id).css('height',this.size.y*multiplier*1.5); // doesn't fix iphone5
			$('#'+div.id).css('position','absolute');
						
			// PEG LAYER TO ENTITY
			var reference = {
				x:(w / 2) - (destW / 2),
				y:(h / 2) - (destH / 2),
			} 
			
			console.log(reference.x,reference.y);
			
			if(w == mobileWidth){
				$('#'+div.id).css('left',this.pos.x);
				$('#'+div.id).css('top',this.pos.y);				
			}else{
				$('#'+div.id).css('left',reference.x + this.pos.x*multiplier);
				$('#'+div.id).css('top',reference.y + this.pos.y*multiplier);				
			}
			
			// INJECT LINK AND IMAGE
			if(open_new_window){
				$('#'+div.id).html('<a target=\'_blank\' href=\'' + outbound_link + '\'><img style=\'width:100%;height:100%\' src=\'' + image_path + '\'></a>');
			}else{
				$('#'+div.id).html('<a href=\'' + outbound_link + '\'><img style=\'width:100%;height:100%\' src=\'' + image_path + '\'></a>');				
			}

			// ADD TO HANDLER FOR RESIZING
			dynamicClickableEntityDivs[id] = {};
			dynamicClickableEntityDivs[id]['width'] = this.size.x*multiplier;
			dynamicClickableEntityDivs[id]['height'] = this.size.y*multiplier;
			dynamicClickableEntityDivs[id]['entity_pos_x'] = this.pos.x; 
			dynamicClickableEntityDivs[id]['entity_pos_y'] = this.pos.y; 
		},		
	});
});
this.END_BRANDING_LOGO;