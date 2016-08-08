const ProjectUtil = require('../util/project_util');
const ProjectConstants = require('../constants/project_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

const ProjectActions = {

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
  }


};


module.exports = ProjectActions;
