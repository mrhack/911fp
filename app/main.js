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
    require('jquery.easing');
    //require('modernizr');


     // ----------------------- dom ready index.html
    // process bar
    var processBar = function ($proBar , $proMsg){
        var prog = 0,
            step = 0,
            stepAdd = 15,
            _timer = function(){
                if (prog >= 99) return false;
                stepAdd--;
                if (stepAdd < 2)stepAdd = 2;
                prog += stepAdd;
                step ++;
                $proMsg && $proMsg.html(prog+"%");
                $proBar.animate({width : prog + '%'}, step*30, null, _timer);
            };
        return {
            stop: function(){
                $proBar.stop(true);
                return this;
            },
            end: function(){
                $proMsg && $proMsg.html('100%');
                $proBar.stop(false , false).css('width' , '100%');
                return this;
            },
            start: function(){
                _timer();
                return this;
            },
            reset: function(){
                prog = 0;
                step = 0;
                stepAdd = 12;
                $proMsg && $proMsg.html('0%');
                $proBar.stop(true).css('width' , '0%');
                return this;
            }
        }
    };
    var initCars = function(){
        // init first load effect event;
        $('[jq-effect]').effect( function(){
            //$(this).css({'left' :'' , 'right' : ''});
			$('#cars .wheel2').delay(2000).fadeOut();
        } );
		// hide wheel
		$('#cars .wheel').delay(1000).fadeOut( 1500 );
		$('#cars .wheel2').delay(300).fadeIn( 100 );

        var aniTime = 800;
        var $cars = $('#cars .car');
        var $navs = $('#navs .nav');
        if( !$cars.length ) return;
        var $tits = $('#navs .nav1,#navs .nav2').click(function(){
            var index = $(this).closest('.nav').index();
            _goIndex( index );
        });

		// hover effect
		$navs.hover(function(){
			$(this).animate({'opacity':0.6});
		},function(){
			$(this).animate({'opacity':1});
		});
        // click text
        var rightCfg = {
            right : '-150%'
        };
        var leftCfg = {
            right : 0
        }
        var _goIndex = function( index ){
            // click event
            $cars.each( function( i , dom ){
                var delay = i == index ? 100 : 600 - i * 300;
                // fade out car
                $(dom).delay( delay-1000 ).stop()
                    .animate( i == index ? rightCfg : {right: ( i * 5 + 190 ) + '%' } ,
                        i == index ? aniTime + 400 : aniTime ,'easeInQuint', function(){
                            // hide wheel
                            $(this).find('.wheel').fadeOut(200);
                        });

                setTimeout( function(){
                    if(i == index) $(dom).find('.wheel').show();
                    setTimeout(function(){
                        $(dom).addClass( i == index ? 'car-run-right' : 'car-run-left' );
                    } , 1);
                } , delay );

                // fade out nav
                $navs.delay( delay+250 )
                    .animate( {left : '-180%'} ,  aniTime );
            });
			$('.logo-wrap').delay(600).animate({'margin-left':'-200%'},800);
			$('header').delay(600).animate({'border':'0'},800);
			$('#t_logo').delay(600).animate({'margin-left':'-200%'},800);
			$('nav').delay(600).animate({'opacity':0},800);
			$('#navs').delay(1000).animate({'opacity':0},800);
            setTimeout( function(){
                window.location.href = $('nav a').eq( 4 - index ).attr('href')
            } , 2000 );
        }

        // click nav bar
        var $nav = $('nav').delegate('.menu' , 'click' , function(){
            // start animation
            if( $( this ).hasClass('disable') ) return false;
            var index = $nav.find('.menu').index( this );
            if( index > 0 ) {
                _goIndex( 4 - index );
                return false;
            }
        });


    };
	if($('html').hasClass('touch') && navigator.userAgent.match(/iPad/i) == null){
		 window.location.href="m";
	}
    var pro = processBar( $('#process-bar') , $('#process-num') )
                .start();
    $(window).load(function(){
      // end process
      pro.end();
      // hide loading,  show wrap
      $('#t_wrap').show();
      $('footer').show();
      setTimeout(function(){
         $('#lpn_mask').animate( {top:-$(window).height()} , function(){
			 initCars();
			 $(this).hide();
			});
      } , 600);
    });
	$(window).bind("pageshow", function(event) {
		if (event.originalEvent.persisted) {
			window.location.reload();
		}
	});
	if( $.browser.msie ){
		setTimeout(function(){
         $('#lpn_mask').animate( {top:-$(window).height()} , function(){
			 initCars();
			 $(this).hide();
			});
      } , 3000);
	}

    // fix footer ,if space is enough , set footer position fixed to bottom
    // ugly ie6, real ugly
    if( !$.browser.msie || $.browser.version > 6 ){

        var $footer     = $('footer').css('opacity' , 0 );
        $(window).resize(function(){
            var scrollHeight = $(document).height();
            var wHeight     = $(window).height();
            if( scrollHeight <= wHeight ){
                $footer.css({
                    position: 'fixed',
                    bottom  : 0,
                    width   : '100%'
                });
            }
            $footer.css('opacity' , 1 ).fadeIn();
        })
        .load( function() {
            $(window).trigger('resize');
        });
    } else {
        //fix ie6 share btn1 hover event
        $('.share1').hover(function(){
            $(this).css({
                backgroundPositionY: -35
            })
            .children()
            .show();
        }, function(){
            $(this).css({
                backgroundPositionY: 0
            })
            .children()
            .hide();
        });
    }
    // for daily.html
    $(function(){

        function getURLParameter(name) {
            return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
            );
        }
        var $actWrap = $('#G_daily-acts');
        var $actMap = $('#G_daily-map');
        var selectedClass = 'selected';
        var $mapWrap = $('#G_map-container');

        if( !$mapWrap.length ) return;

        var map = null;
        var styles = [
          {
            stylers: [
              { hue: "#000" },
              { saturation: -100 }
            ]
          },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
              { lightness: 50 },
              { visibility: "simplified" }
            ]
          },{
            featureType: "road",
            elementType: "labels",
            stylers: [
              { visibility: "on" }
            ]
          }
        ];
        // Create a map object, and include the MapTypeId to add
        // to the map type control.
        var mapOptions = {
          zoom: 17,
          center: new google.maps.LatLng(31.213368,121.506979),
          mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
          }
        };
        var marker;
        var renderMap = function( lnglat ){
            if( !map ){
                // Create a new StyledMapType object, passing it the array of styles,
                // as well as the name to be displayed on the map type control.
                var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
                map = new google.maps.Map($mapWrap[0],mapOptions);
                //Associate the styled map with the MapTypeId and set it to display.
                map.mapTypes.set('map_style', styledMap);
                map.setMapTypeId('map_style');
            }

            var lnglats = lnglat.split(',');
            var point = new google.maps.LatLng(parseFloat(lnglats[0]),parseFloat(lnglats[1]));
            if( !marker ) {
                marker = new google.maps.Marker({
                    position: point,
                    map: map,
                    title: 'Strictly'
                });
            } else {
                marker.setOptions( { position: point } );
            }

            map.setCenter( point );
        }
        $actWrap.find('.daily-times-h li')
            .click(function(){
                $actWrap.attr('class' , $(this).attr('for'));
            });

        // first focus to bj
        if ( location.hash == '#bg-act' ){
            $actWrap.find('.daily-times-h li')
                .eq(1)
                .trigger('click');
        }
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
        var c = getURLParameter('c');
        if(c=='b')
        {
            $('.bj-loc').click();
        }

    });

    // for act.html
    $(function(){
        var $actOns = $('.js-act-con');
        var timer = null;
        var inAction = $.browser.msie && $.browser.version == 6 ? 'show' : 'fadeIn';
        var outAction = $.browser.msie && $.browser.version == 6 ? 'hide' : 'fadeOut';
        var showTip = function( index ){
            clearTimeout( timer );
            timer = setTimeout(function(){
               var $tip =  $actOns.filter(':visible')
                    .find('.tip-wrap')
                    .each( function( i ){
                        if( i == index ){
                            $(this)[ inAction ]();
                        } else {
                            $(this)[ outAction ]();
                        }
                    } )
                    .eq(index)
                    [ $.browser.msie && $.browser.version == 6 ? 'show' : 'fadeIn']();
            } , 200);
        }

        var hideTip = function( index ){
            clearTimeout( timer );
            timer = setTimeout(function(){
                var $tip = $actOns.filter(':visible')
                    .find('.tip-wrap')
                    [ outAction ]();
            } , 20);
        }
        if( !$actOns.length ) return;
        selectTag( $('.daily-tit a') , function( ){
            var index = $(this).index();
            $actOns.eq( index ^ 1 )
                .stop(true , true)
                .css('opacity' , 1)
                .animate({
                    opacity: 0
                } , 400 , '' , function(){
                    $(this).hide();
                    $actOns.eq( index )
                        .stop(true , true)
                        .show()
                        .css('opacity' , 0)
                        .animate({
                            opacity: 1
                        } , 400);
                });
        } );


        // hover in and hover out
        $actOns.find('area')
            .add( $actOns.find('.tip-wrap') )// hover tip , steal show the tip , when move out , hide the tip also.
            .hover( function(){
                var index = parseInt( $(this).attr('index') || $(this).index() );
                showTip( index );
            } , function(){
                var index = parseInt( $(this).attr('index') || $(this).index() );
                hideTip( index );
            });
    });

     // for photos.html
    $(function(){
        var $listWrap = $('#G_photo-list');
        if( !$listWrap.length ) return;
        var $listInner = $('#G_photo-list').children();
        var $imgWrap = $('#G_photo-wrap');
        var $imgInner = $('#G_photo-wrap-inner');
        var $currImg = $imgInner.find('img');

        // all images
        var $lists = $listWrap.find('img');


        $listInner.width( $lists.length * ( 54 + 10 ) );
        $lists.show();
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
        var $prev_b = $('.photo-prev-b')
            .click(function(){
                $prev.click();
            });
		var $next_b = $('.photo-next-b')
            .click(function(){
                $next.click();
            });
        var $curr = $btnWrap.find('.photo-curr');
        var marginLeft = 0;
        var wrapWidth = $listWrap.width();
        var slideAnimate = false;
        var $newImg = null;
        var wrapLength = $imgWrap.width();
        var createLoading = function( $wrap ){
            var position = $wrap.css('position');
            var fixPos = {relative:1,absolute:1,fixed:1};
            if( !fixPos[ position ] ){
                $wrap.css('position' , 'relative');
            }
            return $('<div class="loading"></div>')
                .appendTo( $wrap )
                .css({
                    opacity : 0.5,
                    position: 'absolute',
                    top     : 0,
                    left    : 0,
                    width   : $wrap.width(),
                    height   : $wrap.height()
                });
        }
        var lastSlideConfig = null;
        var loadingFromServer = false;
        var sildeImage = function( src , turnLeft , cb){

            if( loadingFromServer ){
                $newImg.unbind('load');
                loadingFromServer = false;
                arguments.callee.apply('' , [].slice.call( arguments ));
                return;
            }
            if( slideAnimate ){
                lastSlideConfig = [ src , turnLeft ];
                return;
            }
            loadingFromServer = true;
            var time = new Date();
            var $loading = null;
            var loaded = false;
            src = src.replace(/small/ , 'big');
            $newImg = $('<img />')
                .load( function(){
                    $newImg[ turnLeft ? 'appendTo' : 'prependTo' ]( $imgInner );
                    loadingFromServer   = false;
                    slideAnimate        = true;
                    $imgInner.css('marginLeft' , turnLeft ? 0 : - wrapLength )
                        .animate( {
                            marginLeft: turnLeft ? - wrapLength : 0
                        } , '' , function(){
                            $imgInner.css( 'marginLeft' , 0 );
                            $currImg.remove();
                            $currImg = $newImg;
                            $newImg = null;
                            cb && cb();
                            slideAnimate = false;
                            if( lastSlideConfig ){
                                sildeImage.apply( '' , lastSlideConfig );
                                lastSlideConfig = null;
                            }
                        });

                    loaded = true;
                    $imgWrap.find('.loading').remove();
                });

            // 200 ms to wait for image load
            setTimeout( function(){
                if( !loaded ){
                    // create loading
                    $loading = $imgWrap.find('.loading');
                    $loading = $loading.length ? $loading
                        : createLoading( $imgWrap );
                }
            } , 200 );

            $newImg.attr( 'src' , src );
        }

        var preload = function( $t ){
            var _src1 = $t.next().attr('src');
            var _src2 = $t.next().next().attr('src');
            // preload next two image

            if( _src1 )
                document.createElement('img').src = _src1.replace(/small/ , 'big');
            if( _src2 )
                document.createElement('img').src = _src2.replace(/small/ , 'big');
        }
        // TODO delete var animate
        var goToIndex    = function ( index ) {
            //if( slideAnimate ) return;
            index = ( index + $lists.length ) % $lists.length;
            var currIndex = $lists.filter('.selected').index();
            var $currImg = $lists
                .removeClass('selected')
                .eq( index )
                .addClass('selected');

            // slide image left
            //slideAnimate = true;
            sildeImage( $currImg.attr('src') , currIndex < index  , function(){
                //slideAnimate = false;
            });

            // preload next two image
            preload( $currImg );

            $curr.html( index + 1 );
            // TODO... change prev and next status

            // if overflowed
            // scroll to right ===>

            if( ( index + 1 ) * 64 <= Math.abs( marginLeft ) ){
                marginLeft = Math.max ( ( index + 1 ) * 64 - wrapWidth , 0 );
                $listInner.stop(true , false).animate( { marginLeft: -marginLeft } );
            } else
            // scroll to left <===
            if( ( index + 1 ) * 64 > Math.abs( marginLeft ) + wrapWidth ){
                marginLeft = index * 64;
                $listInner.stop(true , false).animate( { marginLeft: -marginLeft } );
            }
        }
        $listWrap.delegate('img' , 'click' , function(){
            var index = $(this).index();
            goToIndex( index );
        } );

        // first preload next two photos
        // preload next two image
        preload( $lists.eq(0) );
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
function sharethis(e, t, n, r, i, s, o, u) {
    var a = "",
        f = document.location.toString(),
        l = "";
    r = typeof r == "undefined" || r == null ? "" : r, u = typeof u == "undefined" || u == null ? !0 : u, i = "" + (typeof i != "undefined" && i != null ? i : $('meta[property="og:title"]').attr("content")), i = i != "undefined" ? i : document.title, s = "" + (typeof s != "undefined" && s != null ? s : $('meta[property="og:description"]').attr("content")), s = s != "undefined" ? s : "", o = "" + (typeof o != "undefined" && o != null ? o : $('meta[property="og:image"]').attr("content")), o = o != "undefined" ? o : "", o.indexOf("#CONFIGSTRING#") >= 0 && (o = o.replace("#CONFIGSTRING#", caymanConfig.getConfigString())), f = f.replace(/[\?|&]ws=[^&]*/g, ""), f = f.replace(/[\?|&]pc=[^&]*/g, ""), f = f.replace(/[\?|&]deeplink=[^&]*/g, ""), f = f.replace(/[\?|&]uc=[^&]*/g, ""),  l = f + (f.indexOf(!1) ? "?" : "&") + "c=0" + r, n != "undefinded" && (l = l + "&pc=" + n), a = e;
    if (t = "facebook") a = a.replace(/&#91;/mg, "["), a = a.replace(/&#93;/mg, "]");
    u ? (a = a.replace("#TITLE#", encodeURIComponent(i)), a = a.replace("#TEXT#", encodeURIComponent(s)), a = a.replace("#MEDIA#", encodeURIComponent(o)), a = a.replace("#URL#", encodeURIComponent(l))) : (a = e.replace("#TITLE#", i), a = a.replace("#TEXT#", encodeURIComponent(s)), a = a.replace("#MEDIA#", o), a = a.replace("#URL#", l)),  window.open(a, "share")
}