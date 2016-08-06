const TodoConstants = require('../constants/todo_constants.js');

const TodoUtil = {
  getTodos: function (projectId, successCallback, failureCallback) {
    $.ajax({
      type: "GET",
      url: `api/projects/${projectId}/todo_lists`,
      success: function (response){
        successCallback(response);
      }
    });
  },

  updateOneTodo: function (todo, successCallback, failureCallback){
    $.ajax ({
      type: "PATCH",
      url: `api/todos/${todo.id}`,
      data: {todos: todo},
      success: function (response) {
        successCallback(response);
      }
    });
  },

  createOneTodo: function (todo, successCallback, failureCallback){
    $.ajax ({
      type: "POST",
      url: `api/todo_lists/${todo.todo_list_id}/todos`,
      data: {todos: todo},
      success: function (response) {
        successCallback(response);
      }
    });
  }

};

module.exports = TodoUtil;
