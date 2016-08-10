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
  },

  deleteTodo: function (id, successCallback) {
    $.ajax({
      type: "DELETE",
      url: `api/todos/${id}`,
      success: function (response) {
        successCallback(response);
      }
    });
  },

  // Todo List Util

  createOneTodoList: function (todoListData, successCallback, failureCallback) {
    $.ajax ({
      type: "POST",
      url: `api/projects/${todoListData.project_id}/todo_lists`,
      data: {todo_list: todoListData},
      success: function (response) {
        successCallback(response);
      }
    });
  },

  updateTodoList: function (todoListData, successCallback) {
    $.ajax ({
      type: "PATCH",
      url: `api/todo_lists/${todoListData.id}`,
      data: {todo_list: todoListData},
      success: function (response) {
        successCallback(response);
      }
    });
  },

  destroyList: function (todoListId, successCallback) {
    $.ajax ({
      type: "DELETE",
      url: `api/todo_lists/${todoListId}`,
      success: function (response) {
        successCallback(response);
      }
    });
  }

};

module.exports = TodoUtil;
