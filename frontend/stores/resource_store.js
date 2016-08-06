const AppDispatcher = require('../dispatcher/dispatcher');
const ResourceConstants = require('../constants/resource_constants');
const Store = require('flux/utils').Store;

const ResourceStore = new Store(AppDispatcher);

let _resources = {
  completionCount: 0,
  TODOS: {},
  TODOLISTS: {},
  MESSAGES: {},
  EVENTS: {},
  PROJECTS: {}
};

ResourceStore.all = function (resource) {
  if (_resources[resource]) {
    return Object.assign({}, _resources[resource]);
  }
};


ResourceStore.first = function (resource){
  let returnElement;
  if (_resources[resource]) {
    Object.keys(_resources[resource]).forEach((element , index) => {
      returnElement = _resources[resource][element];
    });
    return returnElement;
  }
};

ResourceStore.resetOneResource = function (resourceType, payload) {
  let data = {};
  payload.forEach( (element, index) => {
    data[element.id] = element;
  });
  _resources[resourceType] = data;
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

ResourceStore.getTodos = function (listId) {
  let todos = {};
  Object.keys(_resources[ResourceConstants.TODOS]).forEach( (id) => {
    if (parseInt(id) === listId){
      todos[id] = (_resources[ResourceConstants.TODOS][id]);
    }
  });
  debugger
  return todos;
};

ResourceStore.resetOneResourceItem = function (resourceType, payload) {
};

ResourceStore.navBarResource = function (payload) {
  _resources.completionCount = payload.completionCount;
  _resources[ResourceConstants.MESSAGES][payload.messages.id] = payload.messages;
  _resources[ResourceConstants.EVENTS][payload.events.id] = payload.events;
  let project = {};
  project.id = payload.id;
  project.name = payload.name;
  project.manager_id = payload.manager_id;
  _resources[ResourceConstants.PROJECTS] = project;
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
    case ResourceConstants.RECEIVE_ONE_RESOURCE_ITEM:
      ResourceStore.resetOneResourceItem(payload.resourceType, payload.response);
      ResourceStore.__emitChange();
  }
};

// For testing
ResourceStore.everything = function (){
  return Object.assign({}, _resources);
};

module.exports = ResourceStore;
