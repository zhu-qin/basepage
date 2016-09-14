const AppDispatcher = require('../dispatcher/dispatcher');
const TodoConstants = require('../constants/todo_constants');
const Store = require('flux/utils').Store;
const TodoStore = new Store(AppDispatcher);

// todos and todolists have key value pairs with the keys being their ids
// todos are nested in todo lists as expected
let _todos = {};


TodoStore.all = function () {
  return Object.assign({}, _todos);
};

TodoStore.findList = function (id) {
  return Object.assign({}, _todos[id]);
};

TodoStore.resetTodos = function (todos) {
  _todos = todos;
};

TodoStore.updateOneTodo = function(todo) {
  _todos[todo.todo_list_id].todos[todo.id] = todo;
};

TodoStore.addOneTodo = function(todo) {
  _todos[todo.todo_list_id].todos[todo.id] = todo;
};

TodoStore.deleteTodo = function(todo) {
  delete _todos[todo.todo_list_id].todos[todo.id];
};

TodoStore.addOneTodoList = function(todoList) {
  let currentTodoList = _todos[todoList.id];
  if (currentTodoList) {
    currentTodoList.title = todoList.title;
    currentTodoList.body = todoList.body;
  } else {
    _todos[todoList.id] = todoList;
  }

};

TodoStore.removeList = function (todoList) {
  delete _todos[todoList.id];
};

TodoStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case TodoConstants.RECEIVE_TODOS:
      TodoStore.resetTodos(payload.response);
      TodoStore.__emitChange();
      break;
    case TodoConstants.RECEIVE_ONE_TODO:
      TodoStore.updateOneTodo(payload.response);
      TodoStore.__emitChange();
      break;
    case TodoConstants.ADD_ONE_TODO:
      TodoStore.addOneTodo(payload.response);
      TodoStore.__emitChange();
      break;
    case TodoConstants.DELETE_ONE_TODO:
      TodoStore.deleteTodo(payload.response);
      TodoStore.__emitChange();
      break;
    case TodoConstants.RECEIVE_ONE_TODO_LIST:
      TodoStore.addOneTodoList(payload.todoList);
      TodoStore.__emitChange();
      break;
    case TodoConstants.REMOVE_TODO_LIST:
      TodoStore.removeList(payload.todoList);
      TodoStore.__emitChange();
      break;
  }
};


module.exports = TodoStore;
