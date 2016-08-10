const TodoConstants = require("../constants/todo_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const TodoUtil = require('../util/todo_util');

const TodoActions = {
  getTodos: function (projectId) {
    TodoUtil.getTodos(projectId, TodoActions.receiveTodos);
  },

  receiveTodos: function (response) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.RECEIVE_TODOS,
      response: response
    });
  },

  updateOneTodo: function (todo) {
    TodoUtil.updateOneTodo(todo, TodoActions.receiveOneTodo);
  },

  createOneTodo: function (todo) {
    TodoUtil.createOneTodo(todo, TodoActions.addOneTodo);
  },

  receiveOneTodo: function (response) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.RECEIVE_ONE_TODO,
      response: response
    });
  },

  addOneTodo: function(response){
    AppDispatcher.dispatch({
      actionType: TodoConstants.ADD_ONE_TODO,
      response: response
    });
  },

  deleteTodo: function(id) {
    TodoUtil.deleteTodo(id, TodoActions.receiveDeleteTodo);

  },

  receiveDeleteTodo: function (response) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.DELETE_ONE_TODO,
      response: response
    });
  },

// Todo List Actions

  createOneTodoList: function (todoListData) {
    TodoUtil.createOneTodoList(todoListData, TodoActions.receiveOneTodoList);
  },

  receiveOneTodoList: function (todoList) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.RECEIVE_ONE_TODO_LIST,
      todoList: todoList
    });
  },

  updateTodoList: function (todoList) {
    TodoUtil.updateTodoList(todoList, TodoActions.receiveOneTodoList);
  },

  destroyList: function (todoListId) {
    TodoUtil.destroyList(todoListId, TodoActions.removeList);
  },

  removeList: function (todoList) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.REMOVE_TODO_LIST,
      todoList: todoList
    });
  }

};



module.exports = TodoActions;
