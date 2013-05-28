/* webapp js */
define(function( require , exports , model ){

    var $ = require('jquery');
    require('jquery.mobile');

   // tap header event
    var header = document.getElementsByTagName('header')[0];
    var nav = document.getElementsByTagName('nav')[0];
    header.addEventListener('click' , function( ev ){
        nav.style.bottom = '-300%';

         ev.stopPropagation();
    } , false);

    // prevent propagation
    nav.addEventListener('click' , function(ev){
        ev.stopPropagation();
    });

    var backBtn = nav.getElementsByClassName('back-nav')[0];
    backBtn.addEventListener( 'click' , function( ev ){

        nav.style.bottom = '100%';

         ev.stopPropagation();
         ev.preventDefault();
    } );

    header.getElementsByClassName('icon-back-area')[0]
        .addEventListener('click' , function(ev){
            ev.stopPropagation();
        });



    var windowWidth = $(window).width();
    var windowHieght = $(window).height();
    var closeWidth  =  38;
    var topHeight = closeWidth / 2;
    $(window).resize(function(){
        windowWidth = $(window).width();
        windowHieght = $(window).height();

        // resize img
        var $img = $bigImgWrap.find('img');
        fitImgSize( $img );
        // resize imgwraper
        $bigImgWrap.css({
            'margin-top': - $img.height() / 2 ,
            'width' : windowWidth
        });

        // fix close position
        fitCloseSize();
        fixOriginLink();
        fixPrevNext();
    });
    var fitCloseSize = function( $close ){
        var $close = $bigImgWrap.find('.close');
        var $img = $bigImgWrap.find('img');
        $close.css('right' , ( windowWidth - $img.width() ) / 2)
            .css('top' , windowHieght - $img.height() > 2 * closeWidth ? - closeWidth : 0);
    }
    var fitImgSize = function( $img ){
        var imgWidth = $img.width();
        var imgHeight = $img.height();
        // reset img width and height to fit the window viewport
        // if img height is highter than windowHieght - 48 * 2
        // include close btn height
        if( imgHeight / imgWidth * windowWidth * 0.9 > windowHieght ){
            imgWidth = parseInt( windowHieght * imgWidth / imgHeight );
            $img.css({
                'height': windowHieght ,
                'width' : imgWidth  ,
                'margin-left': ( windowWidth - imgWidth ) / 2,
                'margin-right': ( windowWidth - imgWidth ) / 2
            });
        } else {
            $img.css({
                'width': windowWidth * 0.9 ,
                'height': imgHeight / imgWidth * windowWidth * 0.9,
                'margin-left': 0.05 * windowWidth,
                'margin-right': 0.05 * windowWidth
            });
        }
    }
    var fixPrevNext = function(){
        var $img = $photoList.find('.selected');
        var index = $img.index();
        var $next = $imageWrap.find('.next-wrap');
        var $prev = $imageWrap.find('.prev-wrap');
        var imgWidth = $bigImgWrap.find('img').width();
        if( index < 1 ){
            // hide prev
            $prev.hide();
        } else if ( index > maxImageIndex - 2 ){
            // hide next
            $next.hide();
        } else {
            $next.show();
            $prev.show();
        }
        $next.css('right' ,( windowWidth - imgWidth ) / 2 + 20 );
        $prev.css('left' , ( windowWidth - imgWidth ) / 2 + 20 );
    }
    var fixOriginLink = function(){
        var $img = $bigImgWrap.find('img');
        var $link = $bigImgWrap.find('.origin-pic');
        var linkHeight = $link.outerHeight();
        $link.css('right' , (windowWidth - $bigImgWrap.find('img').width() ) / 2)
            .css(windowHieght - $img.height() > 2 * linkHeight ? {
                'bottom' : 'auto',
                'top'   : '100%'
            } : {
                'top' : 'auto',
                'bottom' : 0
            });;

    }
       // for photos notto scale
    var fixZoom = function( disableZoom ){
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        if (viewportmeta) {
            viewportmeta.content = disableZoom ?
                'width=500, minimum-scale=0.5, maximum-scale=2.0,user-scalable=0':
                'width=500, minimum-scale=0.5, maximum-scale=2.0,user-scalable=1';
        }
    }
    var $photoList = $('#photos-list');
    // save current tap image index
    var imgIndex   = -1;
    var $imageWrap = $('#nl-mask').tap( function(){
            setTimeout( function() {
                $imageWrap.hide();
                // remove all swipe images
                $bigImgWrap.children()
                    .remove()
                    .end()
                    .css('left',0);
                // reset index
                imgIndex = -1;
                // remove selected style
                $photoList.find('.selected')
                    .removeClass('selected');

                // show image in middle of viewport
                // disable scroll
                $imageWrap.parent().css({
                    overflow: 'auto',
                    height: ''
                });

                // enable zoom
                fixZoom( false );
            } , 300 );
            return false;
        } )
        .swipeleft( function(){
            var $curr = $photoList.find('.selected');
            var $next = $curr
                .next()
                .trigger('tap');
            if( !$next.length ){
                if( $curr.index() == 11 ){
                    $('#more-photos').trigger('click');
                    $curr.next().trigger('tap');
                } else {
                    // TODO.. show last page panel
                    $noMoreTip.html('已经是最后一张了')
                        .fadeIn();
                }
            }
        } )
        .swiperight( function(){
            var $prev = $photoList.find('.selected')
                .prev()
                .trigger('tap');
            if( !$prev.length ){
                // TODO.. show first page panel
                $noMoreTip.html('已经是第一张了')
                    .fadeIn();
            }
        } )
        .delegate('.next-wrap' , 'tap' , function(){
            //
            $(this).trigger('swipeleft');
            return false;
        })
        .delegate('.prev-wrap' , 'tap' , function(){
            $(this).trigger('swiperight');
            return false;
        })
        .delegate('.origin-pic' , 'tap' , function(ev){
            ev.stopPropagation();
        });;

    var $bigImgWrap = $('#nl-wrap');
    var $loading = $imageWrap.find('.loading');
    var $noMoreTip  =  $('#no-more-photos');
    var isSlideing = false;
    var isLoading = false;
    var $newImage = null;
    var showImage = function( index , lastIndex ) {
        var $imgs = $photoList.find('img');
        var src = $imgs.eq( index ).attr('src')
            .replace(/small/ , 'big');
        var $bigImg = $bigImgWrap.find('[index="' + index + '"]');


        // preload next images
        var next1 = $imgs.eq( index + 1 ).attr('src');
        if( next1 )
            $('<img />').attr('src' ,  next1.replace(/small/ , 'big'));
        var next2= $imgs.eq( index + 2 ).attr('src');
        if( next2 )
            $('<img />').attr('src' ,  next2.replace(/small/ , 'big') );
        var next3= $imgs.eq( index + 3 ).attr('src');
        if( next3 )
            $('<img />').attr('src' ,  next3.replace(/small/ , 'big') );
        // hide $noMoreTip
        $noMoreTip.hide();
        // hild close btn
        $bigImgWrap.find(':not(img)').remove();

        // show image in middle of viewport
        // disable scroll
        var scrollTop = $('body').scrollTop();
        $imageWrap.parent()
            .css({
                overflow: 'hidden',
                height: '100%'
            })
            .scrollTop( scrollTop )
            .end()
            .show()
            .css('top' , scrollTop );
        // disable zoom
        fixZoom( true );
        setTimeout( function(){
            if( isLoading ){
                $loading.show();
            }
        } , 100 );
        // add new image to wrap
        $bigImgWrap.css({
            'width': ($bigImgWrap.children().length + 2) * windowWidth
        });

        isLoading = true;
        $newImage = $('<img />')
            .attr( 'index' , index )
            .load( function(){
                isLoading = false;
                var $img = $(this)
                    [ index > lastIndex ? 'appendTo' : 'prependTo' ]( $bigImgWrap );

                fitImgSize( $img );


                $bigImgWrap.css('left' , index > lastIndex ? '+=0' : '-=' + windowWidth );
                $loading.hide();
                // scroll to right position
                isSlideing = true;
                $bigImgWrap
                    .css('margin-top' , - $bigImgWrap.height() / 2 )
                    .animate({
                        left : - $(this).index() * windowWidth
                    } , 500 , '' , function(){
                        $img.siblings().remove();
                        isSlideing = false;
                        $bigImgWrap.css({
                            'width' : windowWidth,
                            'left' : 0} )
                        .append('<i class="close">×</i>')
                        .append('<a class="origin-pic" target="_blank" href="' + $img.attr('src').replace(/big/,'original') +'">查看原图</a>');
                        // fix size
                        fitCloseSize();
                        // fix origin-pic
                        fixOriginLink();
                        fixPrevNext();
                    });
            } )
            .attr( 'src' , src );
    }
    $('.photos-list').delegate('img' , 'tap' , function(){
        if( isSlideing ) return;
        var $t = $(this);
        var lastIndex = imgIndex;
        var src = $t.attr('src');
        if( !src ) return;

        imgIndex = $t.index();

        $t.siblings()
            .removeClass('selected')
            .end()
            .addClass('selected');
        // loading big image
        setTimeout( function() {
            showImage( imgIndex , lastIndex );
        } , 100);

        return false;
    });


    // for more images
    var maxImageIndex = 35;
    var currImageIndex = 12;
    $('#more-photos').click( function(){
        var currImageIndex = 12;
        var $t = $(this);
        var $imgs = $photoList.find('img');
        var imgHeight = $imgs.height();
        // if is expanded
        if( $t.hasClass('silde-up') ){
            $photoList.animate({
                height : 3 * ( imgHeight + 8)
            }, 400 );
            $t.removeClass('silde-up');
            return;
        }

        $photoList.animate({
            height : Math.ceil( maxImageIndex / 4 ) * ( imgHeight + 8)
        } , 400);
        // if is loaded
        if( $t.hasClass('more-showed') ){
            $photoList.find('img')
                .show();

            $t.addClass('silde-up');
            return;
        }
        // expand more images
        // show animate for photo-list

        for (var i = currImageIndex + 1; i <= maxImageIndex; i++ ) {
            $('<img />')
                .appendTo($photoList)
                .attr('src' , './photo/small/b-' + i + '.jpg');
        };
        $t.addClass('more-showed')
            // add slide tag
            .addClass('silde-up');
    } );
    // footer
    $('.share1').tap(function(){
            $('#share_li1').fadeIn();
        });
    $('.share_cancel').tap(function(){
        $('#share_li1').fadeOut();
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