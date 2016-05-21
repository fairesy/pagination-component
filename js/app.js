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
