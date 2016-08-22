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
  },

  createProject: function (project, successCallback) {
    $.ajax({
      type: "POST",
      url: "api/projects",
      data: { project: project },
      success: function (response) {
        successCallback(response);
      }
    });
  },

  updateProject: function (project, successCallback) {
    $.ajax({
      type: "PATCH",
      url: `api/projects/${project.id}`,
      data: {project: project},
      success:  function (response){
        successCallback(response);
      }
    });
  },

  deleteProject: function (project, successCallback) {
    $.ajax({
      type: "DELETE",
      url: `api/projects/${project.id}`,
      success: function (response){
        successCallback(response);
      }
    });
  }

};

module.exports = ProjectUtil;
