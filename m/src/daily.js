define(function( require , exports , model ){

    require( 'jquery.mobile' );
    require('../../m/src/base');


    var selectTag = function($list , cb , selectClass , eventType){
        selectClass = selectClass || 'selected';
        eventType = eventType || 'click';
        $list[eventType](function(ev){
            $list.removeClass(selectClass);
            $(this).addClass(selectClass);
            cb && cb.call(this , $(this));
        });
    };

    selectTag( $('#dailys-tap a') , function(){
        var index = $(this).index();
        $('#dailys-detail').children()
            .hide()
            .eq( index )
            .show();
    } , '' , 'tap' );
    var c = getURLParameter('c');
    if(c=='b')
    {
        $('#dailys-tap a').eq(1).tap();
    }
    function getURLParameter(name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
        );
    }
});