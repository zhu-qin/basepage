const ProjectConstants = require('../constants/project_constants');

const ProjectUtil = {

  getAllProjects: function (successCallback) {
    $.ajax({
      type: "GET",
      url: `api/projects`,
      success: function (response) {
        successCallback(response);
      }
    });
  }

};

module.exports = ProjectUtil;
