define(['jquery', 'eventEmitter'], function ($, EventEmitter) {
  function pagination(element, option) {
    this.ee = new EventEmitter();
    this.pagination = $(element);
    this.option = option || { totalNumberOfPages: 5, unitSize: 5 };
    this.unitStart = 1;
    this.selectedLi; this.selectedIndex;
    this.prevArrow; this.nextArrow;
    this.beforePrevArrow; this.afterNextArrow;
    this.init();
  }

  pagination.prototype.init = function () {
    this._setPaginationNumbers(this.unitStart);
    this._setPrevNextArrow();
    this._setBeforeAfterArrowIfNeeded();
    this.pagination.on('click', 'a', $.proxy(this, '_move'));
    console.log('pagination component initialization end');
  };

  pagination.prototype._setPaginationNumbers = function (start) {
    var $paginationIndexes = this.pagination.find('li');
    var index = start;
    $paginationIndexes.map(function (id, pageLi) {
      if (id !== 0 && id !== ($paginationIndexes.size() - 1)) {
        $(pageLi).find('a').text(index);
        index += 1;
      }
    });

    $paginationIndexes.eq(1).addClass('selected');
    this.selectedLi = $('.pagination .selected');
  };

  pagination.prototype._setPrevNextArrow = function () {
    this.pagination.find('li').first().addClass('prev');
    this.pagination.find('li').last().addClass('next');
    this.prevArrow = $('.pagination .prev');
    this.prevArrow.find('a').html('&#60;');
    this.nextArrow = $('.pagination .next');
    this.nextArrow.find('a').html('&#62;');

    this.prevArrow.addClass('disabled');//selected가 1이라는 가정 하에.
  };
  /* _move
   * 선택된 인덱스에 selected 클래스 추가
   * 선택된 인덱스의 값 가지고 오기
   * 선택된 인덱스가 양 끝인 경우 화살표에 disabled 클래스 추가
   * change 이벤트를 발생시키고 컴포넌트 사용자에게 인자 전달
   */
  pagination.prototype._move = function (e) {
    this._addSelectedToCurrentIndex(e);
    this.selectedIndex = parseInt(this.selectedLi.find('a').text());
    this._checkIfArrowShouldBeDisabled(this.selectedIndex);

    this.ee.emit('change', {
      index: this.selectedIndex,
      max: 3,
    });

    console.log('selected index is ' + this.selectedIndex);
  };

  pagination.prototype.on = function (eventName, fp) {
    this.ee.addListener(eventName, fp);
  };

  pagination.prototype.off = function (eventName, fp) {
    this.ee.removeListener(eventName, fp);
  };

  /* _addSelectedToCurrentIndex
   * 기존의 selected 클래스 삭제
   * 각 페이지 인덱스 클릭 OR < > 화살표 클릭하여 인덱스 이동 가능
   * 이동한 인덱스에 selected 클래스 추가
   */
  pagination.prototype._addSelectedToCurrentIndex = function (e) {
    this.selectedLi.removeClass('selected');
    var $targetLi = $(e.target).closest('li');

    if ($targetLi.hasClass('prev')) {
      var $prev = this.selectedLi.prev();
      this.selectedLi = $prev;
    }else if ($targetLi.hasClass('next')) {
      var $next = this.selectedLi.next();
      this.selectedLi = $next;
    }else {
      this.selectedLi = $targetLi;
    }

    this.selectedLi.addClass('selected');
  };

  /* _checkIfArrowShouldBeDisabled
   * 양 끝 인덱스인 경우 각각 < 혹은 >에 disabled 클래스를 추가한다.
   * 양 끝 인덱스가 아닌 경우 disabled 클래스를 제거한다.
   */
  pagination.prototype._checkIfArrowShouldBeDisabled = function (selectedIndex) {
    if (selectedIndex === this.unitStart) {
      this.prevArrow.addClass('disabled');
      this.nextArrow.removeClass('disabled');
    }else if (selectedIndex === (this.unitStart + (this.option.unitSize - 1))) { //this.option.totalNumberOfPages
      this.nextArrow.addClass('disabled');
      this.prevArrow.removeClass('disabled');
    }else {
      if (this.prevArrow.hasClass('disabled')) {
        this.prevArrow.removeClass('disabled');
      }

      if (this.nextArrow.hasClass('disabled')) {
        this.nextArrow.removeClass('disabled');
      }
    }
  };

  /*추가구현 : 5페이지 이상인 경우 <<, >> 구현*/
  pagination.prototype._setBeforeAfterArrowIfNeeded = function () {
    if (this.option.totalNumberOfPages > this.option.unitSize) {
      this.pagination.prepend($("<li><a href='#'></a></li>"));
      this.pagination.append($("<li><a href='#'></a></li>"));
      this.pagination.css('width', '310px');
      this.pagination.find('li').first().addClass('beforePrev disabled');
      this.pagination.find('li').last().addClass('afterNext');
      this.beforePrevArrow = $('.pagination .beforePrev');
      this.beforePrevArrow.find('a').html('&#60;&#60;');
      this.afterNextArrow = $('.pagination .afterNext');
      this.afterNextArrow.find('a').html('&#62;&#62;');
    }
  };

  return pagination;
});
