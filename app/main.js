/*
 * main model
 */
define(function(require, exports, module) {
    var selectTag = function($list , cb , selectClass , eventType){
        selectClass = selectClass || 'selected';
        eventType = eventType || 'click';
        $list[eventType](function(ev){
            $list.removeClass(selectClass);
            $(this).addClass(selectClass);
            cb && cb.call(this , $(this));
        });
    };
    // require jquery ani plugin
    require('jquery.ani');

    // dom ready
    $(function(){
        // init first load effect event;
        /*
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
        */
        $(window).resize(function(){
            var w = $(this).width();
        });
    });


    // for daily.html
    $(function(){
        var $actWrap = $('#G_daily-acts');
        var $actMap = $('#G_daily-map');
        var selectedClass = 'selected';
        var $mapWrap = $('#G_map-container');

        var map = null;
        var renderMap = function( lnglat ){
            if( !map ){
                map = new google.maps.Map( $mapWrap[0] , {
                    zoom : 3,
                    streetViewControl: false,
                    scaleControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
            }
            // TODO....
        }
        $actWrap.find('.daily-times-h li')
            .click(function(){
                $actWrap.attr('class' , $(this).attr('for'));
            });
        // acts to map
        $actWrap.find('.daily-times-h a').click(function(){
            // hide current wrap
            $actWrap.hide();
            // show map wrap
            $actMap.show();

            var cName = $(this).attr('for');
            $actMap.find('.daily-tit .selected')
                .removeClass(selectedClass);
            $actMap.find( '.' + cName )
                .addClass(selectedClass)
                .trigger('click');
            return false;
        });

        selectTag($actMap.find('[lnglat]') , function(){
            var lnglat = $(this).attr('lnglat');
            // render map;
            renderMap( lnglat );
        });
        // tab for click event

        // return back
        $('#G_return').click(function(){
            $actWrap.show();
            $actMap.hide();
        })
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

     // for photos.html
     $(function(){
        var $listWrap = $('#G_photo-list');
        var $showImg = $('#G_photo-wrap img');

        var $lists = $listWrap.find('img');
        // btns
        var $btnWrap = $('#G_photo-btns');
        var $prev = $btnWrap.find('.photo-prev')
            .click(function(){
                goToIndex( $listWrap.find('.selected').index() - 1 );
            });
        var $next = $btnWrap.find('.photo-next')
            .click(function(){
                goToIndex( $listWrap.find('.selected').index() + 1 );
            });
        var $curr = $btnWrap.find('.photo-curr');
        var goToIndex    = function ( index) {
            index = ( index + $lists.length ) % $lists.length;
            var $currImg = $lists
                .removeClass('selected')
                .eq( index )
                .addClass('selected');

            $showImg.attr('src' , $currImg.attr('src'));

            $curr.html( index + 1 );
            // TODO... change prev and next status

        }
        $listWrap.delegate('img' , 'click' , function(){
            var index = $(this).index();
            goToIndex( index );
        } );

     });


   /*--------------------------- for sign form */
   $(function(){
     if(!$('#G_sign-section').length) return;
     seajs.use('jquery.uniform' , function(  ){
        $("select").uniform();
     });

     seajs.use('jquery.validate' , function(){
        var _str_user_name="请输入姓名";
        var _str_chexing="请选择您感兴趣的车型";
        var _str_baoshijiezhongxin="请选择您感兴趣的保时捷中心";
        var _str_phone='请输入手机号码';
        var _str_number= '请输入正确的11位手机号码';
        var _str_rangelength= '请输入正确的11位手机号码';
        var _str_email="请输入邮箱";
        var _str_agree="请阅读保密政策";
        var _str_shared = "分享成功";
        $("form").validate({
            rules: {
                user_name: "required",
                chexing: "required",
                baoshijiezhongxin: "required",
                phone: { required: true },
                email: {
                    required: true,
                    email: true
                },
                agree: "required"
            },
            messages: {
                user_name: _str_user_name,
                chexing: _str_chexing,
                baoshijiezhongxin: _str_baoshijiezhongxin,
                phone: {required:_str_phone},
                email: _str_email,
                agree: _str_agree
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit(function () {
                     return false;
                });
                return false;
            }
        });
     });
   });
});