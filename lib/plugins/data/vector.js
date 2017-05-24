/**
 *  Vector
 *  Created by Justin Ng on 2015-03-05.
 *  Copyright (c) 2015 MarketJS. All rights reserved.
 */
ig.module('plugins.data.vector')
.requires(
)
.defines(function () {
    Vector2 = ig.Class.extend({
		x:null,
		y:null,
		valType:"number",

		init: function (x,y){
			if(typeof(x) === this.valType
				&& typeof(y) === this.valType)
			{
				this.x=x;
				this.y=y;
			}
        },

		row:function(y){
			if(typeof(y)===this.valType)
			{
				this.y = y;
			}
			return this.y;
		},

		col:function(x){
			if(typeof(x)===this.valType)
			{
				this.x=x;
			}
			return this.x;
		},

        magnitude: function(){
            return Math.sqrt(this.squaredLength());
        },

        unit: function(){
            var mag = this.magnitude();
            //Magnitude should not be negative ever since its the product of the squares of x and y, square root.
            //If Magnitude is 0 then we have a divide by 0 error.
            if(mag > 0){
                return new Vector2(this.x/mag, this.y/mag);
            }
            else
            {
                throw ("Divide by 0 error in unitVector function of vector:"+this);
                return new Vector2(0, 0);
            }
        },
        squaredLength:function(){
            return this.x * this.x + this.y * this.y;
        },

        add: function(vector){
            this.x+=vector.x;
            this.y+=vector.y;
            return this;
        },

        sub: function(vector){
            this.x-=vector.x;
            this.y-=vector.y;
            return this;
        },

        mul:function(vector){
            this.x*=vector.x;
            this.y*=vector.y;
            return this;
        },

        mulScalar:function(val){
            this.x*=val;
            this.y*=val;
            return this;
        },
        

        div:function(vector){
            this.x/=vector.x;
            this.y/=vector.y;
            return this;
        },

        divScalar:function(val){
            this.x/=val;
            this.y/=val;
            return this;
        },
        
        /**
        * Dot product between two vectors
        */
        dot: function(vector){
            return (this.x*vector.x + this.y*vector.y);
        },
        
        /**
        * Returns the z component of the cross product of the two vectors augmented to 3D.
        */
        cross:function(vector){
            return this.x * vector.y - this.y * vector.x;
        },
        /**
        * Assumes y axis points down else this is turn right
        */
        turnRight:function(){
            var temp = this.x;
            this.x = -this.y;
            this.y = temp;
            return this;
        },
        /**
        * Assumes y axis points down else this is turn left
        */
        turnLeft:function(){
            var temp = this.x;
            this.x = this.y;
            this.y = -temp;
            return this;
        },
        
        rotate:function(angle){
            var vector = this.clone();
            this.x =vector.x * Math.cos(angle) - vector.y * Math.sin(angle);
            this.y =vector.x * Math.sin(angle) + vector.y * Math.cos(angle);
            return this;
        },
        
        //In radians
        angle:function(){
            return Math.atan2(this.y,this.x);
        },
        
        clone:function(){
            return new Vector2(this.x,this.y);
        },
        
        /*
        testAll:function(){
            var vectortest = this.clone();
            var vectortest2 = new Vector2(10,15);
            console.log(vectortest);
            console.log(vectortest.add(vectortest2));
            console.log(vectortest.sub(vectortest2));
            console.log(vectortest.mul(vectortest2));
            console.log(vectortest.div(vectortest2));
            console.log(vectortest.turnRight());
            console.log(vectortest.turnLeft());

            console.log(vectortest.dot(vectortest2));
            console.log(vectortest.cross(vectortest2));
            

            console.log(vectortest.angle());

            console.log(vectortest.angle()*180/Math.PI);
            
            console.log(vectortest.rotate(Math.PI));

            console.log(vectortest.squaredLength());
            console.log(vectortest.magnitude());
            console.log(vectortest.unit());
            
        }*/
    });
});
