const ResourceConstants = require('../constants/resource_constants.js');

const ResourceUtil = {

  getResources: function(projectId, successCallback, failureCallback){
    $.ajax({
      type: "GET",
      url: "api/projects/" + projectId,
      dataType: "JSON",
      success: function(response){
        successCallback(response);
      }
    });
  }

};

module.exports = ResourceUtil;
