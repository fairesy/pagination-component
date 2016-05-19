var TodoTemplate = (function(){
  var todo = '<li data-id="{{id}}" class="{{#if completed}}completed{{/if}}">' +
              '<input class="toggle" type="checkbox" {{#if completed}}checked{{/if}}>' +
              '<label>{{todo}}</label>' +
              '</li>';
})();
