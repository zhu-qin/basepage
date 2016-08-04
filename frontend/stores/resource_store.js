const AppDispatcher = require('../dispatcher/dispatcher');
const ResourceConstants = require('../constants/resource_constants');
const Store = require('flux/utils').Store;

const ResourceStore = new Store(AppDispatcher);

let _resources = {};

ResourceStore.all = function(resource){
  if (_resources[resource]){
    return _resources[resource].slice();
  }
};

ResourceStore.resetResources = function(resources){
  _resources = resources;
};

ResourceStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case ResourceConstants.RECEIVE_ALL_RESOURCES:
      ResourceStore.resetResources(payload.response);
      ResourceStore.__emitChange();
      break;
  }
};


module.exports = ResourceStore;
