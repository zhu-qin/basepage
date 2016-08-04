const AppDispatcher = require('../dispatcher/dispatcher');
const ResourceConstants = require('../constants/resource_constants');
const Store = require('flux/utils').Store;

const ResourceStore = new Store(AppDispatcher);

let _resources = {
  completionCount: 0,
  todos: [],
  messages: [],
  events: [],
};

ResourceStore.all = function (resource) {
  if (_resources[resource]) {
    return _resources[resource].slice();
  }
};

ResourceStore.first = function (resource){
  if (_resources[resource]) {
    return _resources[resource][0];
  }
};

ResourceStore.resetOneResource = function (resource, payload) {
  _resources[resource] = payload;
};

ResourceStore.todoCompletionCount = function () {
  if (_resources.todos.length > 0) {
    let todos = _resources.todos;
    let completeCount = 0;
    todos.forEach((todo, index) => {
      if (todo.completion){
        completeCount += 1;
      }
    });
    _resources.completionCount = [completeCount, todos.length];
  }
  return _resources.completionCount;
};

ResourceStore.navBarResource = function (payload) {
  _resources.completionCount = payload.completionCount;
  _resources.messages.push(payload.messages);
  _resources.events.push(payload.events);
  _resources.name = payload.name;
};

// dispatcher passes actionType, resourceType, and payload.response
ResourceStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case ResourceConstants.RECEIVE_ONE_RESOURCE:
      ResourceStore.resetOneResource(payload.resourceType, payload.response);
      ResourceStore.__emitChange();
      break;
    case ResourceConstants.RECEIVE_NAV_RESOURCES:
      ResourceStore.navBarResource(payload.response);
      ResourceStore.__emitChange();
      break;
  }
};


module.exports = ResourceStore;
