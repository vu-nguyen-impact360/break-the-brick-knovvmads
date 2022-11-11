ig.module(
    'plugins.handlers.size-handler'
)
.requires(
    'plugins.data.vector'
)
.defines(function(){
    ig.SizeHandler = ig.Class.extend({

        //portraitMode only effect Mobile !!!
        portraitMode: true,

        //Mobile mode stretches to fit by default
        disableStretchToFitOnMobileFlag: false,

        //stretch to fit off-portrait mode (e.g. orientation cover)
        //only applicable if stretch to fit disabled in Mobile
        enableStretchToFitOnAntiPortraitModeFlag: true,

        //Scaling limits only used when mobile is not stretched
        enableScalingLimitsOnMobileFlag: false,
        minScalingOnMobile: 0.0,
        maxScalingOnMobile: 1.0,

        //Desktop mode repects aspect ratio by default
        enableStretchToFitOnDesktopFlag: false,

        //Scaling limits only used when desktop is not stretched
        enableScalingLimitsOnDesktopFlag: false,
        minScalingOnDesktop: 0.0,
        maxScalingOnDesktop: 1.0,

        desktop:{
            actualSize:new Vector2(window.innerWidth,window.innerHeight),
            actualResolution:new Vector2(1920,1080)
        },

        mobile:{
            actualSize:new Vector2(window.innerWidth,window.innerHeight),
            actualResolution:new Vector2(1080,1920)
        },

        windowSize:new Vector2(window.innerWidth,window.innerHeight),
        scaleRatioMultiplier:new Vector2(1,1),
        sizeRatio:new Vector2(1,1),
        scale:1,

        domHandler:null,

        // A KEY-VALUE PAIR
        dynamicClickableEntityDivs:{},

        coreDivsToResize:[
            '#canvas',
            '#play',
            '#orientate'
        ],

        adsToResize:{
            'MobileAdInGamePreroll':{
                'box-width':_SETTINGS['Ad']['Mobile']['Preroll']['Width']+2,
                'box-height':_SETTINGS['Ad']['Mobile']['Preroll']['Height']+20,
            },
            'MobileAdInGameEnd':{
                'box-width':_SETTINGS['Ad']['Mobile']['End']['Width']+2,
                'box-height':_SETTINGS['Ad']['Mobile']['End']['Height']+20,
            },

            // Second
            'MobileAdInGamePreroll2':{
                'box-width':_SETTINGS['Ad']['Mobile']['Preroll']['Width']+2,
                'box-height':_SETTINGS['Ad']['Mobile']['Preroll']['Height']+20,
            },
            'MobileAdInGameEnd2':{
                'box-width':_SETTINGS['Ad']['Mobile']['End']['Width']+2,
                'box-height':_SETTINGS['Ad']['Mobile']['End']['Height']+20,
            },

            // Third
            'MobileAdInGamePreroll3':{
                'box-width':_SETTINGS['Ad']['Mobile']['Preroll']['Width']+2,
                'box-height':_SETTINGS['Ad']['Mobile']['Preroll']['Height']+20,
            },
            'MobileAdInGameEnd3':{
                'box-width':_SETTINGS['Ad']['Mobile']['End']['Width']+2,
                'box-height':_SETTINGS['Ad']['Mobile']['End']['Height']+20,
            },
        },

        init:function(domHandler)
        {
            this.domHandler= domHandler;
            if(typeof(domHandler) === "undefined")
            {
                throw "undefined Dom Handler for Size Handler";
            }

            this.sizeCalcs();
            this.eventListenerSetup();
            this.samsungFix();
        },

        sizeCalcs:function()
        {
            this.windowSize = new Vector2(window.innerWidth,window.innerHeight);

            if(ig.ua.mobile)
            {
                this.mobile.actualSize = new Vector2(window.innerWidth,window.innerHeight);
                var mobileTempSize = new Vector2(this.mobile.actualResolution.x
                                                ,this.mobile.actualResolution.y);

                this.scaleRatioMultiplier = new Vector2(this.mobile.actualSize.x / mobileTempSize.x,
                                                        this.mobile.actualSize.y / mobileTempSize.y);

                if(this.disableStretchToFitOnMobileFlag){
                    var multiplier = Math.min(this.scaleRatioMultiplier.x,this.scaleRatioMultiplier.y);

                    if(this.enableScalingLimitsOnMobileFlag){
                        if(multiplier > this.maxScalingOnMobile){
                           multiplier = this.maxScalingOnMobile;
                        }
                        if(multiplier < this.maxScalingOnMobile){
                           multiplier = this.maxScalingOnMobile;
                        }
                    }

                    this.mobile.actualSize.x = mobileTempSize.x * multiplier;
                    this.mobile.actualSize.y = mobileTempSize.y * multiplier;

                }else{
                    this.sizeRatio.x = this.scaleRatioMultiplier.x;
                    this.sizeRatio.y = this.scaleRatioMultiplier.y;
                }
            }
            else
            {
                this.desktop.actualSize = new Vector2(window.innerWidth,window.innerHeight);
                var desktopTempSize = new Vector2(this.desktop.actualResolution.x
                                                 ,this.desktop.actualResolution.y);

                this.scaleRatioMultiplier = new Vector2(this.desktop.actualSize.x / desktopTempSize.x,
                                                        this.desktop.actualSize.y / desktopTempSize.y);

                if(this.enableStretchToFitOnDesktopFlag){
                    this.sizeRatio.x = this.scaleRatioMultiplier.x;
                    this.sizeRatio.y = this.scaleRatioMultiplier.y;

                }else{
                    var multiplier = Math.min(this.scaleRatioMultiplier.x,this.scaleRatioMultiplier.y);

                    if(this.enableScalingLimitsOnDesktopFlag){
                        if(multiplier > this.maxScalingOnDesktop){
                           multiplier = this.maxScalingOnDesktop;
                        }
                        if(multiplier < this.minScalingOnDesktop){
                           multiplier = this.minScalingOnDesktop;
                        }
                    }

                    this.desktop.actualSize.x = desktopTempSize.x * multiplier;
                    this.desktop.actualSize.y = desktopTempSize.y * multiplier;
                }
            }
        },


        resizeLayers:function(width,height)
        {
            for(var index=0;index<this.coreDivsToResize.length;index++)
            {
                var elem = ig.domHandler.getElementById(this.coreDivsToResize[index]);
                if(ig.ua.mobile)
                {
                    if(this.disableStretchToFitOnMobileFlag){
                        var l = Math.floor(((ig.sizeHandler.windowSize.x/2) - (ig.sizeHandler.mobile.actualSize.x/2)));
                        //ig.domHandler.resizeOffsetLeft(elem,Math.floor(ig.sizeHandler.mobile.actualSize.x),Math.floor(ig.sizeHandler.mobile.actualSize.y),l);
                        var t = Math.floor(((ig.sizeHandler.windowSize.y/2) - (ig.sizeHandler.mobile.actualSize.y/2)));
                        if(l<0)l=0;
                        if(t<0)t=0;
                        ig.domHandler.resizeOffset(elem,Math.floor(ig.sizeHandler.mobile.actualSize.x),Math.floor(ig.sizeHandler.mobile.actualSize.y),l, t);

                        var test = false;
                        if(this.portraitMode){
                            test = window.innerHeight < window.innerWidth;
                        }
                        else{
                            test = window.innerHeight > window.innerWidth;
                        }
                        if(test){
                            //did not match portraitMode
                            if(this.enableStretchToFitOnAntiPortraitModeFlag){
                                ig.domHandler.resizeOffset(elem,Math.floor(window.innerWidth),Math.floor(window.innerHeight), 0, 0);

                            }else{
                                var scaleRatioMultiplier = new Vector2(window.innerWidth / this.mobile.actualResolution.y,
                                                                       window.innerHeight / this.mobile.actualResolution.x);
                                var temp_multiplier = Math.min(scaleRatioMultiplier.x, scaleRatioMultiplier.y);

                                var w = this.mobile.actualResolution.y * temp_multiplier;
                                var h = this.mobile.actualResolution.x * temp_multiplier;

                                var l = Math.floor(((ig.sizeHandler.windowSize.x/2) - (w/2)));
                                var t = Math.floor(((ig.sizeHandler.windowSize.y/2) - (h/2)));
                                if(l<0)l=0;
                                if(t<0)t=0;
                                ig.domHandler.resizeOffset(elem,Math.floor(w),Math.floor(h), l, t);
                            }
                        }
                    }else{
                        ig.domHandler.resize(elem,Math.floor(ig.sizeHandler.mobile.actualSize.x),Math.floor(ig.sizeHandler.mobile.actualSize.y));
                    }
                }
                else
                {
                    if(this.enableStretchToFitOnDesktopFlag){
                        ig.domHandler.resize(elem,Math.floor(ig.sizeHandler.desktop.actualSize.x),Math.floor(ig.sizeHandler.desktop.actualSize.y));

                    }else{
                        var l = Math.floor(((ig.sizeHandler.windowSize.x/2) - (ig.sizeHandler.desktop.actualSize.x/2)));
                        //ig.domHandler.resizeOffsetLeft(elem,Math.floor(ig.sizeHandler.desktop.actualSize.x),Math.floor(ig.sizeHandler.desktop.actualSize.y),l);
                        var t = Math.floor(((ig.sizeHandler.windowSize.y/2) - (ig.sizeHandler.desktop.actualSize.y/2)));
                        if(l<0)l=0;
                        if(t<0)t=0;
                        ig.domHandler.resizeOffset(elem,Math.floor(ig.sizeHandler.desktop.actualSize.x),Math.floor(ig.sizeHandler.desktop.actualSize.y),l, t);
                    }
                }
            }

            for(var key in this.adsToResize)
            {
                var keyDiv=ig.domHandler.getElementById('#'+key);
                var keyBox=ig.domHandler.getElementById('#'+key+'-Box');

                var divLeft=(window.innerWidth-this.adsToResize[key]['box-width'])/2 +"px";
                var divTop=(window.innerHeight-this.adsToResize[key]['box-height'])/2 +"px";

                if(keyDiv)
                {
                    ig.domHandler.css(keyDiv
                                        ,{

                                            width:window.innerWidth
                                            ,height:window.innerHeight
                                        }
                                    );
                }
                if(keyBox)
                {
                    ig.domHandler.css(keyBox
                                        ,{
                                            left:divLeft
                                            ,top:divTop
                                        }
                                    );
                }
            }

            for(var key in this.dynamicClickableEntityDivs)
            {
                var aspectRatioMin = Math.min(ig.sizeHandler.scaleRatioMultiplier.x,ig.sizeHandler.scaleRatioMultiplier.y);
                var div = ig.domHandler.getElementById("#"+key);
                if(ig.ua.mobile)
                {
                    var posX = this.dynamicClickableEntityDivs[key]['entity_pos_x'];
                    var posY = this.dynamicClickableEntityDivs[key]['entity_pos_y'];
                    var sizeX = this.dynamicClickableEntityDivs[key]['width'];
                    var sizeY = this.dynamicClickableEntityDivs[key]['height'];

                    var divleft=Math.floor(posX*this.scaleRatioMultiplier.x) + "px";
                    var divtop=Math.floor(posY*this.scaleRatioMultiplier.y) + "px";
                    var divwidth=Math.floor(sizeX*this.scaleRatioMultiplier.x) + "px";
                    var divheight=Math.floor(sizeY*this.scaleRatioMultiplier.y) + "px";

                    ig.domHandler.css(div
                                        ,{
                                            float:"left"
                                            ,position:"absolute"
                                            ,left:divleft
                                            ,top:divtop
                                            ,width:divwidth
                                            ,height:divheight
                                            ,"z-index":3
                                        }
                                    );
                }
                else
                {
                    var canvas = ig.domHandler.getElementById("#canvas");

                    var offsets = ig.domHandler.getOffsets(canvas);

                    var offsetLeft = offsets.left;
                    var offsetTop = offsets.top;

                    var posX = this.dynamicClickableEntityDivs[key]['entity_pos_x'];
                    var posY = this.dynamicClickableEntityDivs[key]['entity_pos_y'];
                    var sizeX = this.dynamicClickableEntityDivs[key]['width'];
                    var sizeY = this.dynamicClickableEntityDivs[key]['height'];

                    var divleft=Math.floor(offsetLeft + posX*aspectRatioMin) + "px";
                    var divtop=Math.floor(offsetTop + posY*aspectRatioMin)+ "px";
                    var divwidth=Math.floor(sizeX*aspectRatioMin) + "px";
                    var divheight=Math.floor(sizeY*aspectRatioMin) + "px";

                    ig.domHandler.css(div
                                        ,{
                                            float:"left"
                                            ,position:"absolute"
                                            ,left:divleft
                                            ,top: divtop
                                            ,width: divwidth
                                            ,height:divheight
                                            ,"z-index":3
                                        }
                                    );
                }
                if(this.dynamicClickableEntityDivs[key]['font-size']){
                    var fontSize = this.dynamicClickableEntityDivs[key]['font-size'];
                    ig.domHandler.css(div, {"font-size": (fontSize*aspectRatioMin) +"px"});
                }
            }
            $('#ajaxbar').width(this.windowSize.x);
            $('#ajaxbar').height(this.windowSize.y);
            // ADVANCED OVERLAYS AND BOXES
                /*
                try{
                    $('#'+key).width(w);
                    $('#'+key).height(h);
                    $('#'+key+'-Box').css('left',(w-advancedDivsToResize[key]['box-width'])/2);
                    $('#'+key+'-Box').css('top',(h-advancedDivsToResize[key]['box-height'])/2);
                }catch(err){
                    console.log(err);
                }
                */
        },

        resize:function()
        {
            //console.log("resizing ");
            //Initial Resize of the canvas


            this.sizeCalcs();

            this.resizeLayers();


        },

        reorient:function()
        {
            console.log('changing orientation ...');

            if(ig.ua.mobile){
                var test = false;
                if(this.portraitMode){
                    test = window.innerHeight < window.innerWidth;
                }
                else{
                    test = window.innerHeight > window.innerWidth;
                }
                var orientate = this.domHandler.getElementById("#orientate");
                var canvas = this.domHandler.getElementById("#game");
                if(test){
                    //var orientation = false ;    //landscape

                    this.domHandler.show(orientate);
                    this.domHandler.hide(canvas);
                    console.log("portrait"+window.innerWidth +","+window.innerHeight);
                    //alert(window.innerHeight +"/"+ window.innerWidth + "hide");
                }else{

                    this.domHandler.show(canvas);
                    this.domHandler.hide(orientate);
                    console.log("landscape"+window.innerWidth +","+window.innerHeight);
                    //var orientation = true ;    //portrait

                    //alert(window.innerHeight +"/"+ window.innerWidth + "show");
                }
            }
            if(!ig.ua.mobile)
            {
                this.resize();
            }
            else
            {
                this.resize();
                this.resizeAds();
            }

        },


        resizeAds:function()
        {
            for(var key in this.adsToResize)
            {
                var keyDiv=ig.domHandler.getElementById('#'+key);
                var keyBox=ig.domHandler.getElementById('#'+key+'-Box');

                var divLeft=(window.innerWidth-this.adsToResize[key]['box-width'])/2 +"px";
                var divTop=(window.innerHeight-this.adsToResize[key]['box-height'])/2 +"px";

                if(keyDiv)
                {
                    ig.domHandler.css(keyDiv
                                        ,{
                                            width:window.innerWidth
                                            ,height:window.innerHeight
                                        }
                                    );
                }
                if(keyBox)
                {
                    ig.domHandler.css(keyBox
                                        ,{
                                            left:divLeft
                                            ,top:divTop
                                        }
                                    );
                }
            }
        },

        samsungFix:function()
        {

            if(!ig.ua.android)return ;    //if isnt android return
            if(parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android")+8,navigator.userAgent.indexOf("Android")+11)) < 4.2)return ; //if android under 4.2 return
            if(navigator.userAgent.indexOf("GT") < 0)return ; //if isnt samsung return
            if(navigator.userAgent.indexOf("Chrome") > 0)return ; // if using chrome return
            if(navigator.userAgent.indexOf("Firefox") > 0)return ;    // if using firefox return

            document.addEventListener("touchstart", function(evt) {
                evt.preventDefault();
                return false ;
            },false);
            document.addEventListener("touchmove", function(evt) {
                evt.preventDefault();
                return false ;
            },false);
            document.addEventListener("touchend", function(evt) {
                evt.preventDefault();
                return false ;
            },false);

        },


        orientationInterval:null,
        orientationTimeout:null,
        orientationHandler:function(){

            this.reorient();
            window.scrollTo(0, 1);
        },
        orientationDelayHandler:function(){
            if(this.orientationInterval == null)
            {
                this.orientationInterval = window.setInterval(this.orientationHandler.bind(this),100);
            }
            if(this.orientationTimeout == null)
            {
                this.orientationTimeout = window.setTimeout(function(){this.clearAllIntervals()}.bind(this),2000);
            }
        },
        clearAllIntervals:function()
        {
            window.clearInterval(this.orientationInterval);
            this.orientationInterval=null;
            window.clearTimeout(this.orientationTimeout);
            this.orientationTimeout=null;
        },


        eventListenerSetup:function()
        {
            if(ig.ua.iOS)
            {
                // viewport
                window.addEventListener("orientationchange", this.orientationDelayHandler.bind(this));
                window.addEventListener("resize", this.orientationDelayHandler.bind(this));
            }
            else
            {
                // viewport
                window.addEventListener("orientationchange", this.orientationHandler.bind(this));
                window.addEventListener("resize", this.orientationHandler.bind(this));
            }

            /*
            window.addEventListener('resize', function (evt) {
                this.reorient();
                window.scrollTo(0, 1);
            }.bind(this), false);

            window.addEventListener('orientationchange', function (evt) {
                this.reorient();
                window.scrollTo(0, 1);
            }.bind(this), false);
            */
            document.ontouchmove = function(e){
                window.scrollTo(0, 1);
                e.preventDefault();
            }
        }
    });
});
