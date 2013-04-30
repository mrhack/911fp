/* webapp js */
define(function( require , exports , model ){

    var bodyStyle = document.defaultView.getComputedStyle(document.body);
    var bodyHeight = parseInt( bodyStyle.height.match(/\d+/)[0] );

    var wrap = document.getElementById('wraper');
    wrap.style.minHeight = bodyHeight + 'px';
    wrap.style.position = 'relative';


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