/**
 * Used to generate counting down. It will convert remaining time on ig.Timer into
 * day, hour, minute, and second
 * 
 * - Progress feature: getting ratio of the time remaining. (increment)
 * 
 * @version 1.0.0
 * 
 * @since 1.0.0
 * @example
 * 
 *     //How to use
 *     //---------------
 *     //Call it once
 *     //---------------
 *     var cDown = new ig.Timer(10);
 *     
 *     //---------------
 *     //Call it durring update or draw
 *     //---------------
 *     var iCountdown = cDown.countdown();
 *     //iCountdown = {d:number, h: number, m: number, s: number};
 * 
 *     var iCountup = cDown.countup();
 *     //iCountup = {d:number, h: number, m: number, s: number};
 *     
 *     cDown.countToString(iCountdown); //parameter = object of countdown or countup
 *     //iCountdown = {dd:string, hh: string, mm: string, ss: string};
 *     
 *     var progress = cDown.progress();
 *     //progress = number from 0-1;
 * 
 * 
 */
ig
.module('plugins.time-counter')
.requires('impact.timer')
.defines(function () {
    ig.Timer.inject({
        countPrevDelta: false,
        countPrevData: false,
        countConvert: function(delta){
            if(this.countPrevDelta !== delta){
                var d, h, m, s = delta;
                m = Math.floor(s / 60);
                s = s % 60;
                h = Math.floor(m / 60);
                m = m % 60;
                d = Math.floor(h / 24);
                h = h % 24;
                this.countPrevData = { d: d, h: h, m: m, s: s };
            }
            return this.countPrevData ? this.countPrevData : { d: 0, h: 0, m: 0, s: 0 };
        },
        countup: function () {
            if (this.delta() < 0) return { d: 0, h: 0, m: 0, s: 0 };
            return this.countConvert(Math.floor(this.delta()));
        },
        countdown: function () {
            if (this.delta() > 0) return { d: 0, h: 0, m: 0, s: 0 };
            return this.countConvert(Math.abs(Math.floor(this.delta())));
        },
        countToString: function (obj) {
            obj.d = ("0" + obj.d).slice(-2);
            obj.h = ("0" + obj.h).slice(-2);
            obj.m = ("0" + obj.m).slice(-2);
            obj.s = ("0" + obj.s).slice(-2);
            return obj;
        },
        progress: function () {
            if (this.delta() > 0) return 1;
            return (this.target + this.delta()) / this.target;
        },
    });
});