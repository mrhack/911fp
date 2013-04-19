/*
 * main model
 */
define(function(require, exports, module) {

    // require jquery ani plugin
    require('jquery.ani');
    // dom ready
    $(function(){
        // init first load effect event;
        $('[jq-effect]').effect();

        // click text
        var rightCfg = {
            left : 2500
        };
        var leftCfg = {
            left : -500
        }
        var $cars = $('#car-wrap .car');
        var aniTime = 2000;
        var $tits = $('#car-nav .tit').click(function(){
            var index = $(this).closest('.nav').index();

            // click event
            $cars.each( function( i , dom ){
                var delay = Math.random() * 500;
                $(dom).delay(delay)
                    .animate( i == index ? rightCfg : leftCfg ,  aniTime );
            });
        });
    });
});