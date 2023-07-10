this.START_BRANDING_SPLASH;
ig.module(
    'plugins.branding.splash'
)
.requires(
    'impact.impact',
    'impact.entity'
)
.defines(function(){
    ig.BrandingSplash = ig.Class.extend({
        init: function(){
            ig.game.spawnEntity(EntityBranding,0,0);
        }
    });

    EntityBranding = ig.Entity.extend({
        gravityFactor:0,
        size: { x: 32, y: 32 },
        //splash_320x480: new ig.AnimationSheet('branding/splash_320x480.png',320,200),
        //splash_480x640: new ig.AnimationSheet('branding/splash_480x640.png',480,240),
        splashlogo: new ig.Image('branding/splash1.png'),

        init: function (x, y, settings) {
            this.parent(x, y, settings);

            /*
            // Resize
            if(ig.system.width<=320){
                this.size.x = 320;
                this.size.y = 200;
                this.anims.idle = new ig.Animation(this.splash_320x480,0,[0], true);
            }else{
                this.size.x = 480;
                this.size.y = 240;
                this.anims.idle = new ig.Animation(this.splash_480x640,0,[0], true);
            }
            this.currentAnim = this.anims.idle;
            // Reposition
            this.pos.x = (ig.system.width - this.size.x)/2;
            this.pos.y = -this.size.y-200;
            // Tween
            this.endPosY = (ig.system.height - this.size.y)/2;
            var tween1 = this.tween( {pos: {y: this.endPosY}}, 0.5, {easing:ig.Tween.Easing.Bounce.EaseIn});
            var tween2 = this.tween({},2.5,{onComplete:function(){
                // load next level
                ig.game.director.loadLevel(ig.game.director.currentLevel);
            }});
            tween1.chain(tween2);
            tween1.start();
            */

            this.pos.x = ig.system.width/2;
            this.pos.y = 0 - this.splashlogo.height/2;
            var tween1 = this.tween( {pos: {y: ig.system.height/2 - this.splashlogo.height/2}}, 0.5, {easing:ig.Tween.Easing.Linear.EaseNone});
            var tween2 = this.tween({},2,{onComplete:function(){
                // load next level
                ig.game.director.loadLevel(ig.game.director.currentLevel);

            }});
            tween1.chain(tween2);
            tween1.start();
        },

        createClickableLayer:function(){
            // BUILD CLICKABLE LAYER
            console.log('Build clickable layer')
            this.checkClickableLayer('branding-splash',_SETTINGS['Branding']['Logo']['Link'],true);
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
                    this.createClickableOutboundLayer(divID,outboundLink,'media/graphics/misc/invisible.png',open_new_window);
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
            $('#'+div.id).css('position','absolute');

            if(ig.ua.mobile){//w == mobileWidth){
                var heightRatio = window.innerHeight / mobileHeight ;
                var widthRatio = window.innerWidth / mobileWidth ;
                $('#'+div.id).css('left',this.pos.x*widthRatio);
                $('#'+div.id).css('top',this.pos.y*heightRatio);
                $('#'+div.id).css('width',this.size.x*widthRatio);
                $('#'+div.id).css('height',this.size.y*heightRatio);
            }else{
                // PEG LAYER TO ENTITY
                var reference = {
                    x:(w / 2) - (destW / 2),
                    y:(h / 2) - (destH / 2),
                }
                console.log(reference.x,reference.y);

                $('#'+div.id).css('left',reference.x + this.pos.x*multiplier);
                $('#'+div.id).css('top',reference.y + this.pos.y*multiplier);
                $('#'+div.id).css('width',this.size.x*multiplier);
                $('#'+div.id).css('height',this.size.y*multiplier);
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

        draw:function(){
            /*
            ig.system.context.fillStyle = '#ffffff';
            ig.system.context.fillRect( 0, 0, ig.system.width, ig.system.height );
            ig.system.context.fillStyle = '#000';
            ig.system.context.font="12px Arial";
            if(ig.system.width<=320){
                ig.system.context.fillText("powered by MarketJS.com",ig.system.width-150,ig.system.height-15);
            }else{
                ig.system.context.fillText("powered by MarketJS.com",ig.system.width-160,ig.system.height-15);
            }
            this.parent();
            */

            ig.system.context.fillStyle = '#FFFFFF';
            ig.system.context.fillRect( 0, 0, ig.system.width, ig.system.height );

            this.splashlogo.draw(this.pos.x - this.splashlogo.width/2,
                                 this.pos.y);

            this.parent();
        }

    });
});
this.END_BRANDING_SPLASH;
