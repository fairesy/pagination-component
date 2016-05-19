function Pagination(element){
  this.ee = new EventEmitter();
  this.ul = $(element);
  this.init();
}
Pagination.prototype.init = function(){

  this.ul.on("click", "a", $.proxy(this, "._move");
}
Pagination.prototype._move = function(){
  //logic
}
Pagination.prototype.on = function(eventName, fp){
  this.ee.addListener(eventName, fp);
}
Pagination.prototype.off = function(eventName, fp){
  this.ee.removeListener(eventName, fp);
}

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

### 페이지네이션
    현재 선택된 인덱스에 selected 클래스를 추가한다.
    현재 인덱스가 왼쪽 끝이거나 오른쪽 끝이면 각 끝 화살표에 disabled 클래스를 추가한다. 동작도 불가능하다.
    <를 누르면 이전페이지로, >를 누르면 다음페이지로 이동한다. 

*/
