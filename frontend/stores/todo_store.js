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

TodoStore.resetTodos = function (todos) {
  _todos = todos;
};

TodoStore.updateOneTodo = function(todoToUpdate) {
  let todos = _todos[todoToUpdate.todo_list_id].todos;
  let ind;
  todos.forEach((todo, index) => {
    if (todoToUpdate.id === todo.id){
      ind = index;
    }
  });
  todos[ind] = todoToUpdate;
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
  }
};


module.exports = TodoStore;
