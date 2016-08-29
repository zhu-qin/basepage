const ProjectMembershipConstants = require('../constants/project_membership_constants');

const ProjectMembershipUtil = {

  getAllProjectMemberships: function (projectId, successCallback) {
    $.ajax({
      type: "GET",
      url: `api/projects/${projectId}/project_memberships`,
      success: function (response) {
        successCallback(response);
      }
    });
  },

  createProjectMembership: function (membership, successCallback) {
    $.ajax({
      type: "POST",
      url: `api/project_memberships`,
      data: { project_membership: membership },
      success: function (response) {
        successCallback(response);
      }
    });
  },

  updateProjectMembership: function (membership, successCallback) {
    $.ajax({
      type: "PATCH",
      url: `api/project_memberships/${membership.id}`,
      data: { project_membership: membership },
      success:  function (response){
        successCallback(response);
      }
    });
  },

  deleteProjectMembership: function (membership, successCallback) {
    $.ajax({
      type: "DELETE",
      url: `api/project_memberships/${membership.id}`,
      success: function (response){
        successCallback(response);
      }
    });
  }

};

module.exports = ProjectMembershipUtil;
