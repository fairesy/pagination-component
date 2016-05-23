define([], function () {
  return {
    todo: '<li data-id="{{todo-id}}" class="{{#if completed}}completed{{/if}}">' +
                '<input class="toggle" type="checkbox" {{#if completed}}checked{{/if}}>' +
                '<label>{{todo-name}}</label>' +
                '</li>',
  };
});
