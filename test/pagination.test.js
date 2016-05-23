"use strict";
define([
  "jquery",
  "QUnit",
  "pagination.component"
], function($, QUnit, Pagination){
  var run = function(){
    var pagination;
    var $selectedLi;

    QUnit.module( "pagination initialization", {
      beforeEach: function() {
        pagination = new Pagination(".pagination");
        $selectedLi = pagination.selectedLi;
      }
    });
    QUnit.test("_addSelectedToCurrentIndex() : 선택한 페이지 인덱스에 selected 클래스 추가", function(assert) {
      //Given : 현재 1페이지
      var $targetLi = pagination.pagination.children("li").eq(2);
      //When
      pagination._addSelectedToCurrentIndex({
        target : $targetLi.children("a").eq(0)
      });
      //Then
      assert.ok($targetLi.hasClass("selected"));
    });
    QUnit.test("_checkIfArrowShouldBeDisabled() : 1페이지에서 < disable", function(assert) {
      //Given
      var selectedIndex = 1;
      var $prevArrow = pagination.prevArrow;
      //When
      pagination._checkIfArrowShouldBeDisabled(selectedIndex);
      //Then
      assert.ok($prevArrow.hasClass("disabled"));
    });
    QUnit.test("_checkIfArrowShouldBeDisabled() : 5페이지에서 > disable", function(assert) {
      //Given
      var selectedIndex = 5;
      var $nextArrow = pagination.nextArrow;
      //When
      pagination._checkIfArrowShouldBeDisabled(selectedIndex);
      //Then
      assert.ok($nextArrow.hasClass("disabled"));
    });
  };

  return {
    run : run
  }
});
