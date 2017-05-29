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
 *     var cDown = new ig.Timer(60*60);
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
.module('plugins.countdown')
.requires('impact.timer')
.defines(function () {
    ig.Timer.inject({
        countConvert: function(d,h,m,s){
            m = Math.floor(s / 60);
            s = s % 60;
            h = Math.floor(m / 60);
            m = m % 60;
            d = Math.floor(h / 24);
            h = h % 24;
            return { d: d, h: h, m: m, s: s };
        },
        countup: function () {
            var _this = this;
            if (_this.delta() < 0) return { d: 0, h: 0, m: 0, s: 0 };
            var d, h, m, s = Math.floor(Math.abs(_this.delta()));
            return _this.countConvert(d, h, m, s);
        },
        countdown: function () {
            var _this = this;
            if (_this.delta() > 0) return { d: 0, h: 0, m: 0, s: 0 };
            var result, d, h, m, s = Math.floor(Math.abs(_this.delta()));
            s += 1;
            return _this.countConvert(d, h, m, s);
        },
        countToString: function (obj) {
            var _this = this;
            obj.d = ("0" + obj.d).slice(-2);
            obj.h = ("0" + obj.h).slice(-2);
            obj.m = ("0" + obj.m).slice(-2);
            obj.s = ("0" + obj.s).slice(-2);
            return obj;
        },
        progress: function () {
            /** @type{App.Countdown} */
            var _this = this;
            if (_this.delta() > 0) return 1;
            return (_this.target + _this.delta()) / _this.target;
        },
    });
});