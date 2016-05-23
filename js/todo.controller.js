define(['jquery', 'ajax', 'handlebars', 'todo.template'], function ($, AJAX, Handlebars, Template) {
  'use strict';
  var $todoListContainer = $('.main');
  var $todoList = $('.todo-list');
  var BASE_URL = 'http://128.199.76.9:8002/fairesy';

  var cache = {};

  function init() {
    loadTodosOnFirstPage();
    $todoList.on('click', '.toggle', completeTodo);
  }

  function loadTodosOnFirstPage() {
    AJAX.get(BASE_URL + '/page?start=0&limit=3')
		.done(function (allTodo) {
  $todoList.append(allTodo.map(function (todo) {
    return compileTodoFromTemplate(todo.id, todo.todo, todo.completed);
  }).join(''));
		});
  }

  function completeTodo(event) {
    var $target = $(event.target).closest('li');
    var targetId = $target.data('id');

    $target.toggleClass('completed');
    var completed = $target.hasClass('completed') ? 1 : 0;

    AJAX.put(BASE_URL, targetId, { completed: completed })
		.done(function () {
		});
  }

  function compileTodoFromTemplate(todoId, todoName, completed) {
    var todoTemplate = Handlebars.compile(Template.todo);
    var compiledTodo = todoTemplate({
    completed: completed === 1 ? 'completed' : '',
    checked: completed === 1 ? 'checked' : '',
    'todo-id': todoId,
    'todo-name': todoName, });
    return compiledTodo;
  }

  function renderEachPage(selectedIndex, max) {
    var start = max * (selectedIndex - 1);//(한 페이지당 불러오는 개수=limit)x(index-1)
    var URLforEachIndex = 'http://128.199.76.9:8002/fairesy/page?start=' + start + '&limit=' + max;

    if (!cache[selectedIndex]) {
      cache[selectedIndex] = AJAX.get(URLforEachIndex).promise();
    }

    cache[selectedIndex].done(function (todosForCurrentIndex) {
      $todoList.empty();
      $todoList.append(todosForCurrentIndex.map(function (todo) {
        return compileTodoFromTemplate(todo.id, todo.todo, todo.completed);
      }).join(''));
    });
  }

  return {
    init: init,
    renderEachPage: renderEachPage,
  };

});
