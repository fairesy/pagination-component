require.config({
    paths : {
        'QUnit' : '../bower_components/qunit/qunit/qunit',
        'jquery' : '../node_modules/jquery/dist/jquery.min',
        'eventEmitter' : '../bower_components/eventEmitter/EventEmitter.min',
        'pagination.component' : '../js/pagination.component'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       }
    }
})
require(["QUnit",'pagination.test'], function(QUnit, Test){
    Test.run();
    QUnit.load();
    QUnit.start();
});
