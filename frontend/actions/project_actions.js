const ProjectUtil = require('../util/project_util');
const ProjectConstants = require('../constants/project_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

const ProjectActions = {
  setCurrentProject: function (projectId){
    AppDispatcher.dispatch({
      actionType: ProjectConstants.SET_CURRENT_PROJECT,
      projectId: projectId
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

  getOneProject: function(project){
    ProjectUtil.getOneProject(project, ProjectActions.receiveOneProject);
  },

  receiveOneProject: function(project){
    AppDispatcher.dispatch({
      actionType: ProjectConstants.RECEIVE_ONE_PROJECT,
      project: project
    });
  },

  createProject: function (project) {
    ProjectUtil.createProject(project, ProjectActions.receiveOneProject);
  }


};


module.exports = ProjectActions;
