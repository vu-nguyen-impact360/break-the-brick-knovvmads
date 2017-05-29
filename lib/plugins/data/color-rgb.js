/**
 *  Vector
 *  Created by Justin Ng on 2015-03-05.
 *  Copyright (c) 2015 MarketJS. All rights reserved.
 */
ig.module('plugins.data.color-rgb')
.requires(
)
.defines(function () {
    ColorRGB = ig.Class.extend({
        
        r:0,
        g:0,
        b:0,
        a:1,
        
        init: function (r,g,b,a){
            this.r=r;
            this.g=g;
            this.b=b;
            this.a=a;
        },
        
        getStyle:function()
        {
            return "rgba("+this.r+","+
                            this.g+","+
                            this.b+","+
                            this.a+")";
        },
        getHex:function(){
            
            var r = this.r.toString(16);
            var g = this.g.toString(16);
            var b = this.b.toString(16);
            var padding=2;
            while(r.length<padding){
                r = "0" + r;
            }
            while(g.length<padding){
                g = "0" + g;
            }
            while(b.length<padding){
                b = "0" + b;
            }
            return "#"+r+g+b;
        },
        clone:function(){
            return new ColorRGB(this.r,this.g,this.b,this.a);
        }
        
        
    });
});
