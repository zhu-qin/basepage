const ProjectMembershipUtil = require('../util/project_membership_util');
const ProjectMembershipConstants = require('../constants/project_membership_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

const ProjectMembershipActions = {
  getAllProjectMemberships: function (projectId) {
    ProjectMembershipUtil.getAllProjectMemberships(projectId, ProjectMembershipActions.receiveAllProjectMemberships);
  },

  createProjectMembership: function (membership) {
    ProjectMembershipUtil.createProjectMembership(membership, ProjectMembershipActions.receiveOneProjectMembership);
  },

  updateProjectMembership: function (membership) {
    ProjectMembershipUtil.updateProjectMembership(membership, ProjectMembershipActions.receiveOneProjectMembership);
  },

  deleteProjectMembership: function (membership) {
    ProjectMembershipUtil.deleteProjectMembership(membership, ProjectMembershipActions.removeProjectMembership);
  },

  removeProjectMembership: function (membership) {
    AppDispatcher.dispatch({
      actionType: ProjectMembershipConstants.REMOVE_ONE_MEMBERSHIP,
      membership: membership
    });
  },

  receiveAllProjectMemberships: function (memberships) {
    AppDispatcher.dispatch({
      actionType: ProjectMembershipConstants.RECEIVE_ALL_MEMBERSHIPS,
      memberships: memberships
    });
  },

  receiveOneProjectMembership: function(membership){
    AppDispatcher.dispatch({
      actionType: ProjectMembershipConstants.RECEIVE_ONE_MEMBERSHIP,
      membership: membership
    });
  },

  setOnline: function(emailHash){
    AppDispatcher.dispatch({
      actionType: ProjectMembershipConstants.SYNC_ONLINE,
      emailHash: emailHash
    });
  }

};


module.exports = ProjectMembershipActions;
