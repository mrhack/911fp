define(function( require , exports , model ){

    var $ = require('jquery');
    require('jquery.mobile');
    require('../../m/src/base');


    // for slider
    var selectTag = function($list , cb , selectClass , eventType){
        selectClass = selectClass || 'selected';
        eventType = eventType || 'click';
        $list[eventType](function(ev){
            $list.removeClass(selectClass);
            $(this).addClass(selectClass);
            cb && cb.call(this , $(this));
        });
    };


    // dom ready
    $(function(){

        $(window).resize( function(){

            windowWidth = $(window).width();
            // reset slide btn
            fixSlideBtn();
            // reset details width
            fixDetailWidth();

            // reset image map
            //fixImageMap();
        });

        var windowWidth = $(window).width();

        // reset slide-btn position
        var $btnWrap = $('#slide-btns');
        var $prev = $btnWrap.find('.prev-wrap')
            .tap( function(){
                slidePrev();
            });
        var $next = $btnWrap.find('.next-wrap')
            .tap( function(){
                slideNext();
            });
        var $actDetails = $('.mod-b').find('.act-detail-wrap');

        // for swipe gestureto show next or prev details
        $actDetails.find('.tip-details')
            .swipeleft(function(){
                slideNext();
            })
            .swiperight(function(){
                slidePrev();
            });

        // for tap area
        $actDetails.find('area')
            .tap(function(){
                var index = $(this).index();
                slideToIndex( index );
            });

        selectTag( $('.mod-h a') , function( ){
            var index = $(this).index();
            $actDetails.eq( index ^ 1 )
                .stop(true , true)
                .css('opacity' , 1)
                .animate({
                    opacity: 0.5
                } , 400 , '' , function(){
                    $(this).hide();
                    $actDetails.eq( index )
                        .stop(true , true)
                        .show()
                        .css('opacity' , 0.5)
                        .animate({
                            opacity: 1
                        } , 400);
                });
            is_slide_shanghai = !index;
             // reset slide btn status
            fixSlideBtn();
        } , '' , 'tap');


        var sh_index = 0;
        var bj_index = 0;
        var is_slide_shanghai = true;
        var is_sliding = false;
        var getIndex = function(){
            return is_slide_shanghai ? sh_index : bj_index;
        }
        var slideToIndex = function( index ){
            var currIndex = getIndex();
            var $details = $actDetails.filter(':visible').find('.tip-detail');
            // no more details
            if( index < 0 || index >= $details.length || is_sliding ) return;

            is_sliding = true;
            $actDetails.filter(':visible')
                .find('.tip-details')
                .animate({
                    marginLeft : - index * windowWidth
                } , 300 , '' ,function(){
                    is_sliding = false;
                    is_slide_shanghai ? sh_index = index : bj_index = index;
                    // reset btn status
                    fixSlideBtn();

                    // show right tip on map
                    fixMapTip();
                });
        }
        // slide to left
        var slideNext = function(){
            var index = getIndex();
            slideToIndex( index + 1 );
        }
        // slide to right
        var slidePrev = function(){
            var index = getIndex();
            slideToIndex( index - 1 );
        }
        // set slide left and slide right button position
        var fixSlideBtn = function(){
            var $actWrap = $actDetails.filter(':visible');
            var index = getIndex();
            var $detail = $actWrap.find('.tip-detail').eq(index);
            var imgHeight = $detail.find('img').height();

            $btnWrap.show()
                .children()
                .css( 'top' , $actWrap.find('.img-map').height() + imgHeight / 2 );

            $prev[ index == 0 ? 'hide' : 'show' ]();
            $next[ index == $detail.siblings().length ? 'hide' : 'show' ]();
        }

        // show right map tip on map image
        var fixMapTip = function(){
            $actDetails.filter(':visible')
                .find('.img-map')
                .find('.tip')
                .hide()
                .eq( getIndex() )
                .show();
        }

        // set right map coords while window is resized
        var originImgWidth = null;
        var fixImageMap = function(){
            // get orginImgWidth
            var $img = $actDetails.filter(':visible')
                .find('img[usemap]');
            if( !originImgWidth ){
                $('<img />').load(function(){
                    originImgWidth = this.width;
                })
                .attr('src' , $img.attr('src'));
            }
        };

        // fix detail width, set it's parent's width n * windowWidth
        // set every detail width is windowWidth
        var fixDetailWidth = function(){
            $actDetails.find('.tip-details')
                .each( function( i , dom ){
                    $(dom).css('width' , $(dom).children().length * windowWidth )
                        .css('marginLeft' , - windowWidth * ( i == 0 ? sh_index : bj_index ) );
                })
                .children()
                .show()
                .css('width' , windowWidth );
        }

        // first load
        fixDetailWidth();
        fixSlideBtn();
    });
});