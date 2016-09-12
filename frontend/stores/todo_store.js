const AppDispatcher = require('../dispatcher/dispatcher');
const TodoConstants = require('../constants/todo_constants');
const Store = require('flux/utils').Store;
const TodoStore = new Store(AppDispatcher);

// todos and todolists have key value pairs with the keys being their ids
// todos are nested in todo lists as expected
let _todos = {};
let _completed = 0;
let _all_todos = 0;

TodoStore.all = function () {
  return Object.assign({}, _todos);
};

TodoStore.todoCount = function(){
  return `${_completed}/${_all_todos}`;
};

TodoStore.findList = function (id) {
  return Object.assign({}, _todos[id]);
};

TodoStore.resetTodos = function (todos) {
  _completed = todos.completed_todos;
  _all_todos = todos.all_todos;
  _todos = todos;
};

TodoStore.updateOneTodo = function(todo) {
  let prevTodo = _todos[todo.todo_list_id].todos[todo.id];
  _todos[todo.todo_list_id].todos[todo.id] = todo;

  if (!prevTodo.completion && todo.completion) {
    _completed += 1;
  } else if (prevTodo.completion && !todo.completion) {
    _completed -= 1;
  }
};

TodoStore.addOneTodo = function(todo) {
  _todos[todo.todo_list_id].todos[todo.id] = todo;
  _all_todos += 1;
};

TodoStore.deleteTodo = function(todo) {
  delete _todos[todo.todo_list_id].todos[todo.id];
  if (_todos[todo.todo_list_id].todos[todo.id].completion) {
    _completed -= 1;
  }
  _all_todos -= 1;
};

TodoStore.addOneTodoList = function(todoList) {
  _todos[todoList.id] = todoList;

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
