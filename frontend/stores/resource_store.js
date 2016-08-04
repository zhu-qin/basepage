const AppDispatcher = require('../dispatcher/dispatcher');
const ResourceConstants = require('../constants/resource_constants');
const Store = require('flux/utils').Store;

const ResourceStore = new Store(AppDispatcher);

let _resources = {
  completionCount: 0,
  TODOS: [],
  TODOLISTS: [],
  MESSAGES: [],
  EVENTS: [],
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

ResourceStore.resetOneResource = function (resourceType, payload) {
  _resources[resourceType] = payload;
};

ResourceStore.todoCompletionCount = function () {
  if (_resources[ResourceConstants.TODOS].length > 0) {
    let todos = _resources[ResourceConstants.TODOS];
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
  _resources.MESSAGES.push(payload.messages);
  _resources.EVENTS.push(payload.events);
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
