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
                
                this.testEnt = ig.game.spawnEntity(EntityTest,200,200);
                
                this.tween = new ig.TweenDef(this.testEnt.pos).
                                    to({x:100,y:100},2000).
                                    onComplete(function(){console.log("end")}).
                                    easing(ig.Tween.Easing.Bounce.EaseOut).
                                    interpolation(ig.Tween.Interpolation.Bezier).
                                    repeat(12).
                                    start();
                /*
                var coords = { x: 0, y: 0 };
                var tween = new TWEEN.Tween(coords)
                	.to({ x: 100, y: 100 }, 1000)
                	.onUpdate(function() {
                		console.log(this.x, this.y);
                	})
                	.start();

                requestAnimationFrame(animate);

                function animate(time) {
                	requestAnimationFrame(animate);
                	TWEEN.update(time);
                }
                */
            }
            
            
        },
        update:function(){
            this.parent();
            
            console.log(this.tween._currentElapsed);
            
            //console.log(this.testEnt.pos);
        },
        draw:function(){
            this.parent();
            
        }
    });
});