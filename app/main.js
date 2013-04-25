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


    // init map
    $(function(){
        var $mapWrap = $('#G_map-container');
        $('.render-map').click(function(){
            var lnglat = $(this).attr('lnglat');
            var map = new google.maps.Map( $mapWrap[0] , {
                zoom : 3,
                streetViewControl: false,
                scaleControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var marker = new google.maps.Marker({
                map: map,
                draggable: true
            });
            var geocoder = new google.maps.Geocoder();
            var address = "xxxxxxxx";
            geocoder.geocode( { 'address': address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var bounds = results[0].geometry.viewport;
                    map.fitBounds(bounds);
                    marker.setPosition(results[0].geometry.location);
                    marker.setTitle(address);
                } else alert(lang.searchError);
            });
        });
    });
});