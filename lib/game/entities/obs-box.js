/**
 *  Score
 *
 *  Created by SalteMishel on 2015-01-02.
 *  Copyright (c) 2014 __MyCompanyName__. All rights reserved.
 */
ig.module('game.entities.obs-box')
    .requires(
	'plugins.box2d.entity'

    )
    .defines(function() {

        EntityObsBox = ig.Box2DEntity.extend({
            gravityFactor: 0,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.B,
            zIndex: 1000,
            sc:2,
            size:{x:20,y:20},
            gamePaused:false,
            scX:1,
            scY:1,
            box2dType: 0, // entity shape 0 polygon , 1 circle , 2 custom
            dynamicType: 0, // entity collision type 0 dynamice , 1 kinematic , 2 static
            density: 0.8,	//entiy density
            friction: 0.3, //entiy friction
            restitution: 0.1, //entiy restitution
            mass: 0.8,
            INERTIA: 0,
            ANGULAR_DAMPING: 0.715,
            im: new ig.Image('media/graphics/sprites/block.png'),
            name:"box",
            broken:false,
            jointSet:false,
            sleepVel:0.14,

            sleepAtStart:true,
            init: function(x, y, settings) {



                this.parent(x, y, settings);

                if (ig.global.wm) return;

                if(this.sleepAtStart){

                this.body.SetAwake(false);
                }


            },

            beginContact: function(other, contact, argument){
                if(!other)return;
                if(this.broken==true)return;

                if(other.name=="explosion"){
/*
                this.broken=true;
                this.setBrokenAnim();

                var distance=Math.abs(other.distanceTo(this))>other.size.x*0.5?other.size.x*0.5:Math.abs(other.distanceTo(this));

                var power = distance/other.size.x*0.5*5000;

                var angle=other.angleTo(this);

                var x = power * Math.cos(angle),
                    y = power * Math.sin(angle)
                var force = new Box2D.Common.Math.b2Vec2(x,y);

                this.body.ApplyImpulse(force, this.body.GetPosition());
                this.body.ApplyTorque(0.24);
                this.body.m_angularDamping = this.ANGULAR_DAMPING;
                this.body.m_mass = 0.037;
                this.body.m_I = this.INERTIA;
*/



                }



		},


            oriStat: function() {

                this.addAnim('throw', 0.05, [1,2,3,4,4,4,0], true);

            },


            tweenF: function(num,targ) {

                switch(num) {



                case "shineLeft":
/*
                        this.logo.shineX=-500;

                        this.tweener("logo",{shineX:this.logoIm.width+20},2,"expandLogo");
*/
                break;



                }

                        },



            update: function() {

                if (ig.global.wm) return;

                this.parent();


            },


            ready: function() {

                //this.parent();

                this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];

            },


            draw: function() {

                this.parent();


            },

        });

    });
