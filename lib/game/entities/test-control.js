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
                            console.log("Update", objectValue, this.coordsTween._currentElapsed, easeValue); 
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
                    )
                	.start();
                
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