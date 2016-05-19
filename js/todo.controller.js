
var TODO = (function(){
	"use strict";
	var $todoListContainer = $(".main");
	var $todoList = $('.todo-list');
	var BASE_URL = "http://128.199.76.9:8002/fairesy";

	function init(){
		loadAllTodo();
		$todoList.on("click", ".toggle", completeTodo);
	}

	function loadAllTodo(){
		AJAX.get(BASE_URL+"/page?start=0&limit=3")//문자열 합치는 함수 뭐 없던가...?
		.done(function(allTodo){
				$todoList.append(allTodo.map(function(todo){
					return compileTodoFromTemplate(todo.id, todo.todo, todo.completed);
				}).join(""));
		});
	}

	function completeTodo(event){
		var $target = $(event.target).closest('li');
		var targetId = $target.data("id");

		$target.toggleClass("completed");
		var completed = $target.hasClass("completed") ? 1 : 0;

		AJAX.put(BASE_URL, targetId, {"completed" : completed})
		.done(function(){
		});
	}

	function compileTodoFromTemplate(todoId, todoName, completed){
		var todoTemplate = Handlebars.compile(Template.todo);
		var compiledTodo = todoTemplate({
			"completed" : completed === 1 ? "completed" : "",
			"checked" : completed === 1 ? "checked" : "",
			"todo-id" : todoId,
			"todo-name" : todoName });
		return compiledTodo;
	}

	return {
		init : init
	}
})();