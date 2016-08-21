const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const ProjectConstants = require('../constants/project_constants');
const SessionStore = require('./session_store');
const hashHistory = require('react-router').hashHistory;

let _projects = {};
let _currentProject = {};

const ProjectStore = new Store(AppDispatcher);

ProjectStore.all = function () {
  return Object.assign({}, _projects);
};

ProjectStore.resetProjects = function (projects) {
  _projects = projects;
};

ProjectStore.setCurrentProject = function (projectId){
  _currentProject = _projects[projectId];
};

ProjectStore.getCurrentProject = function () {
  return Object.assign({}, _currentProject);
};

ProjectStore.addOneProject = function (project) {
  _projects[project.id] = project;
};

ProjectStore.find = function(id) {
  return Object.assign({}, _projects[id]);
};


ProjectStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ProjectConstants.RECEIVE_ONE_PROJECT:
      ProjectStore.addOneProject(payload.project);
      ProjectStore.__emitChange();
      break;
    case ProjectConstants.RECEIVE_ALL_PROJECTS:
      ProjectStore.resetProjects(payload.projects);
      ProjectStore.__emitChange();
      break;
    case ProjectConstants.SET_CURRENT_PROJECT:
      ProjectStore.setCurrentProject(payload.projectId);
      ProjectStore.__emitChange();
  }
};



module.exports = ProjectStore;
