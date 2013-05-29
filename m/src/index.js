/* webapp js */
define(function( require , exports , model ){


    var bodyStyle = document.defaultView.getComputedStyle(document.body);
    var bodyHeight = parseInt( bodyStyle.height.match(/\d+/)[0] );

    var wrap = document.getElementById('wraper');
    wrap.style.minHeight = bodyHeight + 'px';
    wrap.style.position = 'relative';


    window.addEventListener('load' , function(){
        require('../../m/src/base');
        var nav = document.getElementsByTagName('nav')[0];
        nav.style.bottom = '-300%';
        setTimeout( function(){
            nav.style.bottom = '100%';
        } , 5000);
    });

});