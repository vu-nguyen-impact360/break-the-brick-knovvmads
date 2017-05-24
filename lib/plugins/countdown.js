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
 *     //countdown = {d:number, h: number, m: number, s: number};
 *     //countdown = null if there is no time remaining
 *     
 *     var sCountdown = cDown.countdownOstring();
 *     //countdown = {dd:string, hh: string, mm: string, ss: string};
 *     //countdown = null if there is no time remaining
 *     
 *     var progress = cDown.progress();
 *     //countdown = number from 0-1;
 *     //countdown = null if there is no time remaining
 * 
 * 
 */
ig
.module('plugins.countdown')
.requires('impact.timer')
.defines(function () {
    ig.Timer.inject({
        countdown: function () {
            /** @type{App.Countdown} */
            var _this = this;
            if (_this.delta() > 0) return null;
            var result, d, h, m, s = Math.floor(Math.abs(_this.delta()));
            s += 1;
            m = Math.floor(s / 60);
            s = s % 60;
            h = Math.floor(m / 60);
            m = m % 60;
            d = Math.floor(h / 24);
            h = h % 24;
            return (d <= 0 && h <= 0 && m <= 0 && s <= 0) ? null : {
                d: d,
                h: h,
                m: m,
                s: s
            };
        },
        countdownOstring: function () {
            /** @type{App.Countdown} */
            var _this = this;
            if (_this.delta() > 0) return null;
            var res = this.countdown();
            res.d = ("0" + res.d).slice(-2);
            res.h = ("0" + res.h).slice(-2);
            res.m = ("0" + res.m).slice(-2);
            res.s = ("0" + res.s).slice(-2);
            return res;
        },
        progress: function () {
            /** @type{App.Countdown} */
            var _this = this;
            if (_this.delta() > 0) return null;
            return (_this.target + _this.delta()) / _this.target;
        },
    });
});