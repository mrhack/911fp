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

});