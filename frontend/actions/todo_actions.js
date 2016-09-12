const TodoConstants = require("../constants/todo_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const TodoUtil = require('../util/todo_util');

const TodoActions = {
  getTodos: function (projectId) {
    TodoUtil.getTodos(projectId, TodoActions.receiveTodos);
  },

  updateOneTodo: function (todo) {
    TodoUtil.updateOneTodo(todo, TodoActions.receiveOneTodo);
  },

  createOneTodo: function (todo) {
    TodoUtil.createOneTodo(todo, TodoActions.addOneTodo);
  },

  deleteTodo: function(id) {
    TodoUtil.deleteTodo(id, TodoActions.receiveDeleteTodo);
  },

  receiveTodos: function (response) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.RECEIVE_TODOS,
      response: response
    });
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
  },

  // Pusher Actions

  getPusherTodoStatus: function (pusherResponse){
    switch (pusherResponse.action) {
      case TodoConstants.CREATE_TODO_LIST:
        TodoUtil.getTodoListStatus(pusherResponse.todo_list_id, TodoActions.receiveOneTodoList);
        break;
      case TodoConstants.UPDATE_TODO_LIST:
        TodoUtil.getTodoListStatus(pusherResponse.todo_list_id, TodoActions.receiveOneTodoList);
        break;
      case TodoConstants.DESTROY_TODO_LIST:
        TodoActions.removeList({id: pusherResponse.todo_list_id});
        break;
      case TodoConstants.CREATE_TODO:
        TodoUtil.getTodoStatus(pusherResponse.todo_id, TodoActions.addOneTodo);
        break;
      case TodoConstants.UPDATE_TODO:
        TodoUtil.getTodoStatus(pusherResponse.todo_id, TodoActions.receiveOneTodo);
        break;
      case TodoConstants.DESTROY_TODO:
        TodoActions.receiveDeleteTodo({
          id: pusherResponse.todo_id,
          todo_list_id: pusherResponse.todo_list_id
        });
        break;
    }
  }



};






module.exports = TodoActions;
