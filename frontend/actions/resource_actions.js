const ResourceConstants = require("../constants/resource_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const ResourceUtil = require('../util/resource_util');

const ResourceActions = {
  getResources: function(project_id){
    ResourceUtil.getResources(project_id, ResourceActions.receiveResources);
  },

  receiveResources: function(response){
    AppDispatcher.dispatch({
      actionType: ResourceConstants.RECEIVE_ALL_RESOURCES,
      response: response
    });
  }

};



module.exports = ResourceActions;
