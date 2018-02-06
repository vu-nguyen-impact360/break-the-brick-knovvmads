ig.module('game.entities.game-control')
.requires(
	'impact.entity',
	'game.entities.player',
	'game.entities.buttons.check-button'
)
.defines(function() {
    EntityGameControl = ig.Entity.extend({
        zIndex:200,
        pos:new Vector2(0,0),
        size:new Vector2(20,20),
        color:new ColorRGB(125,255,125,1),
        init:function(x,y,settings){
            this.parent(x,y,settings);
			
			this.checkButton = ig.game.spawnEntity(EntityCheckButton,0,0,{gameControl:this});
			
			this.player = ig.game.spawnEntity(EntityPlayer,400,500,{gameControl:this});
           
        },
        update:function(){
            
            this.parent();
			
			console.log(this.checkButton.pressed);
            
        },
        draw:function(){
            this.parent();
			
			
        }
    });
});