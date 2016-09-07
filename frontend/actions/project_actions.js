const ProjectUtil = require('../util/project_util');
const ProjectConstants = require('../constants/project_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

const ProjectActions = {
  setCurrentProject: function (projectId, pushToProject){
    AppDispatcher.dispatch({
      actionType: ProjectConstants.SET_CURRENT_PROJECT,
      projectId: projectId,
      pushToProject: pushToProject
    });
  },

  getAllProjects: function () {
    ProjectUtil.getAllProjects(ProjectActions.receiveAllProjects);
  },

  receiveAllProjects: function (projects) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.RECEIVE_ALL_PROJECTS,
      projects: projects
    });
  },

  receiveOneProject: function(project){
    AppDispatcher.dispatch({
      actionType: ProjectConstants.RECEIVE_ONE_PROJECT,
      project: project
    });
  },

  createProject: function (project) {
    ProjectUtil.createProject(project, ProjectActions.receiveOneProject);
  },

  updateProject: function (project) {
    ProjectUtil.updateProject(project, ProjectActions.receiveOneProject);
  },

  deleteProject: function (project) {
    ProjectUtil.deleteProject(project, ProjectActions.removeProject);
  },

  removeProject: function (project) {
    AppDispatcher.dispatch({
      actionType: ProjectConstants.REMOVE_ONE_PROJECT,
      project: project
    });
  }


};


module.exports = ProjectActions;
