require.config({
  baseUrl: 'js/',
  paths: {
    jquery: '../node_modules/jquery/dist/jquery.min',
    handlebars: '../node_modules/handlebars/dist/handlebars.min',
    eventEmitter: '../bower_components/eventEmitter/EventEmitter.min',
  },
});

require([
  'jquery',
  'ajax',
  'todo.controller',
  'pagination.component',
], function ($, AJAX, TODO, Pagination) {
  $(document).ready(function () {
    TODO.init();
    var totalPromise = getTotalNumberOfPages(3);
    totalPromise.then(function (total) {
      var pagination = new Pagination('.pagination');

      // var pagination = new Pagination(".pagination", {"totalNumberOfPages": total, "unitSize" : 5});
      pagination.on('change', function (e) {
        TODO.renderEachPage(e.index, e.max);
      });
    });
  });

  function getTotalNumberOfPages(max) {
    return AJAX.get('http://128.199.76.9:8002/fairesy/count')
    .then(function (count) {
      var total = parseInt(count.cnt / max);
      return total;
    });
  }
});
