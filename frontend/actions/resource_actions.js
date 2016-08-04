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
  }

};



module.exports = ResourceActions;
