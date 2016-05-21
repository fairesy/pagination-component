/*
컴포넌트화 하기 이전 코드
*/
var Pagination = (function(){
  "use strict";
  var $selectedLi = $(".pagination .selected");
  var $toPrev = $(".pagination .prev");
  var $toNext = $(".pagination .next");
  var $todoList = $('.todo-list');
  /*
  move :
  ul.pagination 하위에 있는 인덱스를 클릭하면,
  클릭한 인덱스에 selected클래스를 추가하고(기존의 selected클래스 삭제)
  클릭된 인덱스에 해당하는 아이템을 불러와서 리스트에 추가한다.
  왼쪽 끝이거나 오른쪽 끝일 경우, 각각 왼쪽 화살표, 오른쪽 화살표에 disabled클래스를 추가한다.
  .disabled a{
    color: #d9d9d9;
    pointer-events: none;
    cursor: default;
  }
  //TODO IE8에서는 pointer-events CSS가 작동하지 않는다.
  */
  function move(e){
    //클래스 삭제
    $selectedLi.removeClass("selected");
    var $targetLi = $(e.target).closest("li");

    //완쪽 오른쪽 화살표로 인덱스 하나씩 이동 가능
    if($targetLi.hasClass("prev")){
      var $prev = $selectedLi.prev();
      $selectedLi = $prev;
    }else if($targetLi.hasClass("next")){
      var $next = $selectedLi.next();
      $selectedLi = $next;
    }else{
      $selectedLi = $targetLi;
    }
    //클래스 추가
    $selectedLi.addClass("selected");
    //선택된 인덱스 가지고 오기
    var $selectedIndex = $selectedLi.find("a").text();
    console.log("selected index is "+$selectedIndex);
    /*
    선택된 인덱스가 왼쪽 끝이면 왼쪽 화살표 disabled, 오른쪽 끝이면 오른쪽 화살표 disabled
    $toNext.find("a").bind('click', false);
      - 왼쪽 끝 : 1, 6, 11 ... = (페이지네이션단위 5)*(n-1) + 1
      - 오른쪽 끝 : 왼쪽끝 + (페이지네이션단위-1)
    */
    if(parseInt($selectedIndex) === 1){
      $toPrev.addClass("disabled");
      $toNext.removeClass("disabled");
    }else if(parseInt($selectedIndex) === 5){
      $toNext.addClass("disabled");
      $toPrev.removeClass("disabled");
    }else{
      if($toPrev.hasClass("disabled")){
        $toPrev.removeClass("disabled");
      }
      if($toNext.hasClass("disabled")){
        $toNext.removeClass("disabled");
      }
    }

    //각 인덱스에 맞는 데이터를 불러온다.
    var max = 3;//옵션으로 들어오는 값
    var start = max * (parseInt($selectedIndex) - 1);//(한 페이지당 불러오는 개수=limit)x(index-1)
    var URLforEachIndex = "http://128.199.76.9:8002/fairesy/page?start="+ start +"&limit=3";
    AJAX.get(URLforEachIndex)
    .done(function(todosForCurrentIndex){
      //기존 todo지우기
      $todoList.empty();
      //새로 받아온 데이터 렌더
      $todoList.append(todosForCurrentIndex.map(function(todo){
        return TODO.compile(todo.id, todo.todo, todo.completed);
      }).join(""));
    });
  }

  function init(){
    $(".pagination").on("click", "a", move);
  }

  return{
    "init" : init
  }
})();
