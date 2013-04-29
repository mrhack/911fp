/* webapp js */
define(function( require , exports , model ){

    var bodyStyle = document.defaultView.getComputedStyle(document.body);
    var bodyHeight = parseInt( bodyStyle.height.match(/\d+/)[0] );

    var wrap = document.getElementById('wraper');
    wrap.style.minHeight = bodyHeight + 'px';
    wrap.style.position = 'relative';
    /*
     * Animate Class
     */
    var Animate = function(originNumArr,targetNumArr,speed,easing,step,callback){
        this.queue = [];
        this.duration = speed;
        this.easing = easing;
        this.step = step;
        this.callback = callback;
        for (var i = 0; i < originNumArr.length; i++){
            this.queue.push(new Animate.fx(originNumArr[i],targetNumArr[i]));
        }
        // begin animation
        this.begin();
    }
    Animate.prototype = {
        begin: function(){
            if(this._t) return ;
            var that = this;
            this.startTime = +new Date();
            // loop
            this._t = setInterval(function(){
                that.tempTime = +new Date() - that.startTime;
                var queue = that.queue;
                if(that.tempTime > that.duration){
                    that.end();
                    // end Animate
                    return;
                }
                var easing = Animate.easing[that.easing] || Animate.easing.linear,
                    currValues = [];
                for (var i = 0,len = queue.length; i < len; i++){
                    currValues.push(queue[i].update(that.tempTime,that.duration,easing));
                }
                // run step to update
                that.step(currValues);
            },13);
        },
        stop: function(){
            clearInterval(this._t);
        },
        // go to end of the animation
        end: function(){
            clearInterval(this._t);
            var queue = this.queue,
                currValues = [];
            for (var i = 0,len = queue.length; i < len; i++){
                currValues.push(queue[i].target);
            }
            this.step(currValues);
            // call callback function
            this.callback && this.callback();
        }
    }
    //
    Animate.fx = function(origin,target){
        this.origin = origin;
        this.target = target;
        this.dist = target - origin;
    }
    Animate.fx.prototype = {
        update: function(n,duration,easing){
            var pos = easing(n/duration, n , 0 ,1 , duration);
            return this.origin + this.dist * pos;
        }
    }
    // easing
    Animate.easing = {
        linear: function( p, n, firstNum, diff ) {
            return firstNum + diff * p;
        },
        swing: function( p, n, firstNum, diff ) {
            return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }
    };

    // tap header event
    var header = document.getElementsByTagName('header')[0];
    var nav = document.getElementsByTagName('nav')[0];
    header.addEventListener('touchend' , function( ev ){
        new Animate( [ 100 ] , [-300] , 500 , 'easeOutExpo' , function( arr ){
            nav.style.bottom = arr[0] + '%';
        } );
         ev.stopPropagation();
    } , false);

    // prevent propagation
    nav.addEventListener('touchend' , function(ev){
        ev.stopPropagation();
    });

    var backBtn = nav.getElementsByClassName('back-nav')[0];
    backBtn.addEventListener( 'touchend' , function( ev ){
        new Animate( [ -300 ] , [100] , 500 , 'easeInExpo' , function( arr ){
            nav.style.bottom = arr[0] + '%';
        } );
         ev.stopPropagation();
    } );


    // footer
    document.querySelector('.share1')
        .addEventListener('touchend' , function(){
            document.getElementById('share_li1').style.display = 'block';
        });
    document.querySelector('.share_cancel')
        .addEventListener('touchend' , function(){
            document.getElementById('share_li1').style.display = 'none';
        });
});



function sharethis(e, t, n, r, i, s, o, u) {
    var a = "",
        f = document.location.toString(),
        $ = function( selecter ){
            var item = document.querySelector( selecter );
            return {
                attr: function ( name ){
                    return item ? item.getAttribute( name ) : '';
                }
            }
        },
        l = "";
    r = typeof r == "undefined" || r == null ? "" : r, u = typeof u == "undefined" || u == null ? !0 : u, i = "" + (typeof i != "undefined" && i != null ? i : $('meta[property="og:title"]').attr("content")), i = i != "undefined" ? i : document.title, s = "" + (typeof s != "undefined" && s != null ? s : $('meta[property="og:description"]').attr("content")), s = s != "undefined" ? s : "", o = "" + (typeof o != "undefined" && o != null ? o : $('meta[property="og:image"]').attr("content")), o = o != "undefined" ? o : "", o.indexOf("#CONFIGSTRING#") >= 0 && (o = o.replace("#CONFIGSTRING#", caymanConfig.getConfigString())), f = f.replace(/[\?|&]ws=[^&]*/g, ""), f = f.replace(/[\?|&]pc=[^&]*/g, ""), f = f.replace(/[\?|&]deeplink=[^&]*/g, ""), f = f.replace(/[\?|&]uc=[^&]*/g, ""),  l = f + (f.indexOf(!1) ? "?" : "&") + "c=0" + r, n != "undefinded" && (l = l + "&pc=" + n), a = e;
    if (t = "facebook") a = a.replace(/&#91;/mg, "["), a = a.replace(/&#93;/mg, "]");
    u ? (a = a.replace("#TITLE#", encodeURIComponent(i)), a = a.replace("#TEXT#", encodeURIComponent(s)), a = a.replace("#MEDIA#", encodeURIComponent(o)), a = a.replace("#URL#", encodeURIComponent(l))) : (a = e.replace("#TITLE#", i), a = a.replace("#TEXT#", encodeURIComponent(s)), a = a.replace("#MEDIA#", o), a = a.replace("#URL#", l)),  window.open(a, "share")
}