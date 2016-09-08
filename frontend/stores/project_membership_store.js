const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const ProjectMembershipConstants = require('../constants/project_membership_constants');
const SessionStore = require('./session_store');
const ProjectStore = require('./project_store');
const hashHistory = require('react-router').hashHistory;

let _memberships = {};

const ProjectMembershipStore = new Store(AppDispatcher);

ProjectMembershipStore.all = function () {
  return Object.assign({}, _memberships);
};

ProjectMembershipStore.resetProjectMemberships = function (memberships) {
  _memberships = memberships;
};

ProjectMembershipStore.addOneProjectMembership = function (membership) {
  _memberships[membership.id] = membership;
  hashHistory.push(`projects/${ProjectStore.getCurrentProject().id}/project_memberships_index`);
};

ProjectMembershipStore.removeProjectMembership = function (membership) {
  delete _memberships[membership.id];
  hashHistory.push(`projects/${ProjectStore.getCurrentProject().id}/project_memberships_index`);
};

ProjectMembershipStore.find = function(id) {
  return Object.assign({}, _memberships[id]);
};

ProjectMembershipStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ProjectMembershipConstants.RECEIVE_ONE_MEMBERSHIP:
      ProjectMembershipStore.addOneProjectMembership(payload.membership);
      ProjectMembershipStore.__emitChange();
      break;
    case ProjectMembershipConstants.RECEIVE_ALL_MEMBERSHIPS:
      ProjectMembershipStore.resetProjectMemberships(payload.memberships);
      ProjectMembershipStore.__emitChange();
      break;
    case ProjectMembershipConstants.REMOVE_ONE_MEMBERSHIP:
      ProjectMembershipStore.removeProjectMembership(payload.membership);
      ProjectMembershipStore.__emitChange();
      break;

  }

};



module.exports = ProjectMembershipStore;
