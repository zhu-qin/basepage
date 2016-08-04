const ResourceConstants = require("../constants/resource_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const ResourceUtil = require('../util/resource_util');

const ResourceActions = {
  getNavBarResources: function(project_id){
    ResourceUtil.getNavBarResources(project_id, ResourceActions.receiveNavBarResources);
  },

  receiveNavBarResources: function(response){
    AppDispatcher.dispatch({
      actionType: ResourceConstants.RECEIVE_NAV_RESOURCES,
      response: response
    });
  },

  getOneResource: function(projectId, resource){
    ResourceUtil.getOneResource( projectId, resource, ResourceActions.receiveOneResource);
  },

  receiveOneResource: function (response, resourceType){
    AppDispatcher.dispatch({
      actionType: ResourceConstants.RECEIVE_ONE_RESOURCE,
      response: response,
      resourceType: resourceType
    });
  }

};



module.exports = ResourceActions;
