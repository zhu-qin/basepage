const ResourceConstants = require('../constants/resource_constants.js');
const ServerRequestConstants = require('../constants/server_request_constants');

const ResourceUtil = {

  getNavBarResources: function (projectId, successCallback, failureCallback) {
    $.ajax({
      type: "GET",
      url: "api/projects/" + projectId,
      dataType: "JSON",
      success: function (response) {
        successCallback(response);
      }
    });
  },

  getOneResource: function (projectId, resourceType, successCallback, failureCallback) {
    $.ajax({
      type: "GET",
      url: `api/projects/${projectId}/${ServerRequestConstants[resourceType]}`,
      success: function (response){
        successCallback(response, resourceType);
      }
    });
  },

  updateResourceItem: function (resource, resourceType, successCallback, failureCallback){
    let id = resource[ServerRequestConstants[resourceType]].id
    let path = `api/${ServerRequestConstants[resourceType]}/${id}`
    console.log(path);
    $.ajax ({
      type: "PATCH",
      url: path,
      data: resource,
      success: function (response) {
        successCallback(response, resourceType);
      }
    });
  }

};

module.exports = ResourceUtil;
