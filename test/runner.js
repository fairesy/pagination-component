require.config({
  paths : {
    "jquery" : "../node_modules/jquery/dist/jquery.min",
    "handlebars" : "../node_modules/handlebars/dist/handlebars.min",
    "eventEmitter" : "../bower_components/eventEmitter/EventEmitter.min",
    "mocha" : "../node_modules/mocha/mocha",
    "chai" : "../node_modules/chai/chai"
  }
});

// require([
//   "mocha",
//   "chai",
//   "../js/pagination.component",
//   "./pagination.test"
// ], function(mocha, chai, Pagination){
//   mocha.setup('bdd');
//   mocha.run();
// });


define(function(require) {
  var chai = require('chai');
  var expect = chai.expect;
  var mocha = require('mocha');

  mocha.setup('bdd');

  require([
    './pagination.test',
  ], function(require) {
    mocha.run();
  });

});
