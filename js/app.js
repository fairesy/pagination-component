require.config({
  baseUrl : "js/",
  paths : {
    "jquery" : "../node_modules/jquery/dist/jquery.min",
    "handlebars" : "../node_modules/handlebars/dist/handlebars.min",
    "eventEmitter" : "../bower_components/eventEmitter/EventEmitter.min"
  }
});

require([
  "jquery",
  "ajax",
  "todo.controller",
  "pagination.component"
], function($, AJAX, TODO, Pagination){
  $(document).ready(function(){
    TODO.init();
    var pagination = new Pagination(".pagination");

    pagination.on("change", function(e){
      var selectedIndex = e.index;
      var max = e.max;
      var start = max * (selectedIndex - 1);//(한 페이지당 불러오는 개수=limit)x(index-1)
      var URLforEachIndex = "http://128.199.76.9:8002/fairesy/page?start="+ start +"&limit="+ max;
      AJAX.get(URLforEachIndex)
      .done(function(todosForCurrentIndex){
        var $todoList = $('.todo-list');
        $todoList.empty();
        $todoList.append(todosForCurrentIndex.map(function(todo){
          return TODO.compile(todo.id, todo.todo, todo.completed);
        }).join(""));
      });

    });
  });

});

// requireJS 적용하기
// 1 requireJS를 다운받아 스크립트에 추가한다.
//   -bower로 다운받거나, 직접 다운받을 수 있다.
// 2 data-main값으로 진입 지점을 명시해준다.
//   <script type="text/javascript" data-main="js/app" src="bower_components/requirejs/require.js"></script>
// 3 각 스크립트를 모듈화한다.
// 4 프로덕션 스크립트와 라이브러리 등을 require.config 에 명시해준다.
