/*
 * main model
 */
define(function(require, exports, module) {

    // require jquery ani plugin
    require('jquery.ani');

    // dom ready
    $(function(){
        // init first load effect event;
        $('[jq-effect]').effect( function(){
            $(this).css({'left' :'' , 'right' : ''});
        } );

        // click text
        var rightCfg = {
            right : '-100%'
        };
        var leftCfg = {
            right : '200%'
        }
        var $cars = $('#car-wrap .car');
        var aniTime = 2000;
        var $navs =$('#car-nav .nav');
        var $tits = $('#car-nav .tit').click(function(){
            var index = $(this).closest('.nav').index();

            // click event
            $cars.each( function( i , dom ){
                var delay = i == index ? 100 : 300 + Math.random() * 500;
                // fade out car
                $(dom).delay( delay )
                    .animate( i == index ? rightCfg : leftCfg ,  aniTime );

                // fade out nav
                $navs.eq( i )
                    .delay( delay + 300 )
                    .animate( {left : '150%'} ,  aniTime );
            });

            // fade out logo
            $('#logo-wrap').fadeOut();
        });

        $(window).resize(function(){
            var w = $(this).width();
        });
    });
});