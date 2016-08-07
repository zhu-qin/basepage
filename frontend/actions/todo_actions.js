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
  }

};



module.exports = TodoActions;
