define(["jquery", "eventEmitter"], function($, EventEmitter){
  function pagination(element, option){
    this.ee = new EventEmitter();
    this.pagination = $(element);
    this.option = option || {"unitSize" : 5};
    this.selectedLi; this.selectedIndex;
    this.prevArrow; this.nextArrow;
    this.init();
  }
  pagination.prototype.init = function(){
    this._setPaginationNumbers(1);
    this._setPrevNextArrow();
    this.pagination.on("click", "a", $.proxy(this, "_move"));
    console.log("pagination component initialization end");
  }

  pagination.prototype._setPrevNextArrow = function(){
    this.pagination.find("li").first().addClass("prev");
    this.pagination.find("li").last().addClass("next");
    this.prevArrow = $(".pagination .prev");
    this.prevArrow.find("a").html("&#60;");
    this.nextArrow = $(".pagination .next");
    this.nextArrow.find("a").html("&#62;");

    this.prevArrow.addClass("disabled");//selected가 1이라는 가정 하에.
  }
  pagination.prototype._setPaginationNumbers = function(start){
    var $paginationIndexes = this.pagination.find("li");
    $paginationIndexes.map(function(id, pageLi){
      if(id !== 0 && id !== ($paginationIndexes.size()-1)){
          return $(pageLi).find("a").text(id);
      }
    });
    $paginationIndexes.eq(1).addClass("selected");
    this.selectedLi = $(".pagination .selected");
  }
  /* _move
   * 선택된 인덱스에 selected 클래스 추가
   * 선택된 인덱스의 값 가지고 오기
   * 선택된 인덱스가 양 끝인 경우 화살표에 disabled 클래스 추가
   * change 이벤트를 발생시키고 컴포넌트 사용자에게 인자 전달
   */
  pagination.prototype._move = function(e){
    this._addSelectedToCurrentIndex(e);
    this.selectedIndex = parseInt(this.selectedLi.find("a").text());
    this._checkIfArrowShouldBeDisabled(this.selectedIndex);

    this.ee.emit("change", {
      "index" : this.selectedIndex,
      "max" : 3
    });

    console.log("selected index is " + this.selectedIndex);
  }
  pagination.prototype.on = function(eventName, fp){
    this.ee.addListener(eventName, fp);
  }
  pagination.prototype.off = function(eventName, fp){
    this.ee.removeListener(eventName, fp);
  }

  /* _addSelectedToCurrentIndex
   * 기존의 selected 클래스 삭제
   * 각 페이지 인덱스 클릭 OR < > 화살표 클릭하여 인덱스 이동 가능
   * 이동한 인덱스에 selected 클래스 추가
   */
  pagination.prototype._addSelectedToCurrentIndex = function(e){
    this.selectedLi.removeClass("selected");
    var $targetLi = $(e.target).closest("li");

    if($targetLi.hasClass("prev")){
      var $prev = this.selectedLi.prev();
      this.selectedLi = $prev;
    }else if($targetLi.hasClass("next")){
      var $next = this.selectedLi.next();
      this.selectedLi = $next;
    }else{
      this.selectedLi = $targetLi;
    }

    this.selectedLi.addClass("selected");
  }

  /* _checkIfArrowShouldBeDisabled
   * 양 끝 인덱스인 경우 각각 < 혹은 >에 disabled 클래스를 추가한다.
   * 양 끝 인덱스가 아닌 경우 disabled 클래스를 제거한다.
   * TODO 현재 1, 5와 같이 매직넘버가 들어가 있는 부분을 수정하여 재사용성을 높인다.
   */
  pagination.prototype._checkIfArrowShouldBeDisabled = function(selectedIndex){
    if(selectedIndex === 1){
      this.prevArrow.addClass("disabled");
      this.nextArrow.removeClass("disabled");
    }else if(selectedIndex === this.option.unitSize){
      this.nextArrow.addClass("disabled");
      this.prevArrow.removeClass("disabled");
    }else{
      if(this.prevArrow.hasClass("disabled")){
        this.prevArrow.removeClass("disabled");
      }
      if(this.nextArrow.hasClass("disabled")){
        this.nextArrow.removeClass("disabled");
      }
    }
  }

  return pagination;
});


/*
### 리스트 아이템 불러오기
    전체 아이템의 수는
    [GET]http://128.199.76.9:8002/아이디/count
    에서 가지고 올 수 있다. 필요한 전체 페이지 인덱스 수는 GET의 결과로 가지고 온 count를 각 페이지당 불러올 개수(limit)으로 나눈 몫이다.
    각 페이지당 불러올 개수는 _move에 넘어오는 인자중 max 값.
      - 기본값은 5
      - 5보다 작은 경우와 5를 넘어가는 경우를 대응할 필요가 있다.

    각 페이지에 필요한 아이템을 불러올 수 있는 요청 URL은 다음과 같다.
    [GET]http://128.199.76.9:8002/아이디/page?start=0&limit=3

    start에 불러올 아이템의 인덱스 시작접을 넣고, 시작점에서부터 몇 개를 불러올 것인지 limit로 지정해준다.
    따라서 start에 들어가는 값을 "(한 페이지당 불러오는 개수=limit)x(index-1)"로 하면 각 페이지에 해당하는 아이템을 불러올 수 있다.
      -옵셔널하게 limit수를 조정할 수 있도록 하는 것도 좋을 듯 하다.
*/
