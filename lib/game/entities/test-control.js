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
                                    repeat(2).
                                    yoyo(true);
                this.tweenFast = new ig.TweenDef(this.testEnt.pos).
                                    to({x:300,y:300},500).
                                    //onComplete(function(){console.log("end fast tween", this)}).
                                    //easing(ig.Tween.Easing.Bounce.EaseIn).
                                    //interpolation(ig.Tween.Interpolation.Linear).
                                    repeat(4).
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
                	.onUpdate(function( easeValue ) {
                        // 'this' here refer to this entity, with binding
                        // without binding, this refer to the object 'coords'
                        console.log(this, easeValue);
                    
                        /* Do something here */
                        this.coordsTween.stop(); // onUpdate will not stop, if this is commented
                        
                	}.bind(this) /* binding this entity */ )
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