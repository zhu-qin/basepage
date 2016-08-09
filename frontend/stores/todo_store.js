const AppDispatcher = require('../dispatcher/dispatcher');
const TodoConstants = require('../constants/todo_constants');
const Store = require('flux/utils').Store;

const TodoStore = new Store(AppDispatcher);

// object that has keys to todo list
// todo list object contains individual todos
let _todos = {};

TodoStore.all = function () {
  return Object.assign({}, _todos);
};

TodoStore.todoCount = function(){
  let count = 0;
  let length = 0;

  Object.keys(_todos).forEach((todoListKey) => {
    _todos[todoListKey].todos.forEach((todo) => {
      if (todo.completion){
        count += 1;
      }
      length += 1;
    });
  });
  return `${count}/${length}`;
};

TodoStore.resetTodos = function (todos) {
  _todos = todos;
};

TodoStore.findIndex = function (todoToFind) {
  let todos = _todos[todoToFind.todo_list_id].todos;
  let ind;
  todos.forEach((todo, index) => {
    if (todoToFind.id === todo.id){
      ind = index;
    }
  });
  return ind;
};

TodoStore.updateOneTodo = function(todoToUpdate) {
  let todosList = _todos[todoToUpdate.todo_list_id];
  todosList.todos[TodoStore.findIndex(todoToUpdate)] = todoToUpdate;
};

TodoStore.addOneTodo = function(todo) {
  _todos[todo.todo_list_id].todos.push(todo);
};

TodoStore.deleteTodo = function(todoToDelete) {
  let todosList = _todos[todoToDelete.todo_list_id];
  delete todosList.todos[TodoStore.findIndex(todoToDelete)];
};

TodoStore.addOneTodoList = function(todoList) {
  _todos[todoList.id] = todoList;
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
      TodoStore.addOneTodoList(payload.response);
      TodoStore.__emitChange();
      break;
  }
};


module.exports = TodoStore;
