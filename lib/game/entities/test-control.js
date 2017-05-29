ig.module('game.entities.test-control')
.requires(
	'impact.entity',
    'game.entities.test'
)
.defines(function() {
    EntityTestControl = ig.Entity.extend({
        zIndex:99999,
        size:new Vector2(20,20),
        testEnt:null,
        tween:null,
        init:function(x,y,settings){
            this.parent(x,y,settings);
            if(!ig.global.wm){
                
                // alias 
                ig.game.testControl = this;
                
                // test cases
                // this.initTestCase1();   // basic tween and chaining test
                // this.initTestCase2();   // callback functions test
                // this.initTestCase3();   // tween control test - start, pause, 
                this.initTestCase4();   // vector issue
                
                
            }    
        },
        
        initTestCase1: function() {
            /* Test Case 1 */
            this.testEnt = ig.game.spawnEntity(EntityTest,200,200);
            
            // chaining test
            this.tweenSlow = new ig.TweenDef(this.testEnt.pos).
                                to({x:100,y:100},2000).
                                //onComplete(function(){console.log("end slow tween", this)}).
                                easing(ig.Tween.Easing.Bounce.EaseOut).
                                interpolation(ig.Tween.Interpolation.Bezier).
                                // delay(500).
                                repeat(2).
                                // repeatDelay(1000).
                                yoyo(true);
            this.tweenFast = new ig.TweenDef(this.testEnt.pos).
                                to({x:300,y:300},500).
                                //onComplete(function(){console.log("end fast tween", this)}).
                                //easing(ig.Tween.Easing.Bounce.EaseIn).
                                //interpolation(ig.Tween.Interpolation.Linear).
                                repeat(4).
                                // chain(this.tweenSlow).
                                yoyo(true);
            // loop test
            this.tweenSlow.chain(this.tweenFast);
            this.tweenFast.chain(this.tweenSlow);
            
            // start
            this.tweenFast.start();
            // this.tweenSlow.start();
        },
        
        initTestCase2: function() {
            /* Test Case 2 */
            var coords = { x: 0, y: 0 };
            this.coordsTween = new ig.TweenDef(coords)
            	.to({ x: 100, y: 100 }, 1000)
                .easing(ig.Tween.Easing.Bounce.EaseInOut)
                .onStart(
                    function( objectValue ) {
                        /* On Start CallBack */
                        console.log("Start", objectValue);
                        
                        /* Do something here */
                        this.coordsTween.pause();
                        
                    }.bind(this)
                )
            	.onUpdate(
                    function( objectValue, easeValue ) {
                        /* On Update CallBack */
                        // console.log("Update", objectValue, this.coordsTween._currentElapsed, easeValue); 
                        // Please note that easeValue may differ due to easing, which is fine.
                        
                        // 'this' here refer to this entity, with binding
                        // without binding, this refer to the object 'coords'
                        // console.log(this, easeValue);
                
                        /* Do something here */
                        
                        /* Conditional stop */
                        if( this.coordsTween._currentElapsed >= 0.5 ) { // check if 50% done
                            this.coordsTween.stop();    // stop it
                        }
                        
                    }.bind(this) /* binding this entity */ 
                )
                .onStop(
                    function(objectValue) {
                        /* On Stop CallBack */
                        console.log("Stop", objectValue);
                        
                        /* Do something here */
                        
                        
                    }.bind(this)
                )
                .onComplete(
                    function(objectValue) {
                        /* On Complete CallBack */
                        console.log("Complete", objectValue);
                        
                        /* Do something here */
                        
                        
                    }.bind(this)
                )
                .onPause(
                    function(objectValue) {
                        /* On Pause CallBack */
                        console.log("Pause", objectValue);
                        
                        /* Do something here */
                        this.coordsTween.resume();
                        
                    }.bind(this)
                )
                .onResume(
                    function(objectValue) {
                        /* On Resume CallBack */
                        console.log("Resume", objectValue);
                        
                        /* Do something here */
                        
                        
                    }.bind(this)
                )/*
            	.start();
        },
        
        initTestCase3: function() {
            /* Test Case 3 */
            this.spawnTweenEntity();
            this.spawnTweenControlButtons();
        },
        
        initTestCase4: function() {
            this.testEntityA = ig.game.spawnEntity(EntityTest,450,200, { control: this, /* pos: new Vector2(450,200), */ size: new Vector2(20,40), /* color: new ColorRGB(255,125,125,1) */ });
            this.testEntityB = ig.game.spawnEntity(EntityTest,475,200, { control: this, /* pos: new Vector2(470,200), */ size: new Vector2(40,20), /* color: new ColorRGB(125,125,255,1) */ });
        
            /* colorRGB value change test */
            
            // only color of entity B should change to pure RED
            this.testEntityB.color.r = 255;
            this.testEntityB.color.g = 0;
            this.testEntityB.color.b = 0;
            
            
        },
        
        spawnTweenEntity: function() {
            this.tweenEntity = ig.game.spawnEntity(EntityTest,600,200, { control: this, color: new ColorRGB(255,125,125,1) });
        },
        
        spawnTweenControlButtons: function() {
            this.tweenControlButtons = {
                
                start   : ig.game.spawnEntity( EntityButton, 500, 100, { control: this} ),
                stop    : ig.game.spawnEntity( EntityButton, 500, 200, { control: this} ),
                pause   : ig.game.spawnEntity( EntityButton, 500, 300, { control: this} ),
                resume  : ig.game.spawnEntity( EntityButton, 500, 400, { control: this} ),
                end     : ig.game.spawnEntity( EntityButton, 500, 500, { control: this} )                
            };
            
            // this.setupTweenControlButtons();
        },
        
        setupTweenControlButtons: function() {
            for(button in this.tweenControlButtons) {
                button.draw = function() {
                    this.parent(); 
                    
                    ig.system.context.fillStyle = new ColorRGB(125,255,125,1);
                    ig.system.context.fillRect( this.pos.x, this.pos.y, this.size.x, this.size.y );
                };
            }
        },
        
        
        update:function(){
            this.parent();
            
            // console.log(this.tween._currentElapsed);
            
            // console.log(this.testEnt.pos);
        },
        draw:function(){
            this.parent();
            
        }
    });
});