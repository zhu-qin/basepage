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

  createProjectMembership: function (member, successCallback) {
    $.ajax({
      type: "POST",
      url: `api/${projectId}/project_memberships`,
      data: { member: member },
      success: function (response) {
        successCallback(response);
      }
    });
  },

  updateProjectMembership: function (membership, successCallback) {
    $.ajax({
      type: "PATCH",
      url: `api/project_membership/${membership.id}`,
      data: {member: member},
      success:  function (response){
        successCallback(response);
      }
    });
  },

  deleteProjectMembership: function (membership, successCallback) {
    $.ajax({
      type: "DELETE",
      url: `api/project_membership/${membership.id}`,
      success: function (response){
        successCallback(response);
      }
    });
  }

};

module.exports = ProjectMembershipUtil;
