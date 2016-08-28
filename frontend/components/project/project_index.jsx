const React = require('react');
const SessionStore = require('../../stores/session_store');
const ProjectStore = require('../../stores/project_store');
const ProjectActions = require('../../actions/project_actions');
const hashHistory = require('react-router').hashHistory;

const ProjectIndex = React.createClass({
  getInitialState: function () {
    return { projects: null };
  },

  componentDidMount: function () {
    this.storeListener = ProjectStore.addListener(this._projectStoreListener);
    ProjectActions.getAllProjects();
  },

  _projectStoreListener: function () {
    this.setState( {projects: ProjectStore.all()} );
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  _redirectToAddProject: function (){
    hashHistory.push('/projects/new');
  },

  _redirectToEditProject: function (projectId, event) {
    hashHistory.push(`/projects/${projectId}/edit`);
  },

  _goToProject: function (id, event) {
    ProjectActions.setCurrentProject(id);
    hashHistory.push(`/projects/${id}`);
  },

  render: function() {

    let managedProjects = [];
    let memberProjects = [];
    if (this.state.projects) {
      Object.keys(this.state.projects).forEach((id, index) => {
        let project = this.state.projects[id];

        let edit;
        if(project.manager_id === SessionStore.getCurrentUser().id){
          edit = (<div className="project-list-item-edit" onClick={this._redirectToEditProject.bind(null, id)}>Edit</div>);
        }

        let listItem = (
          <li key={id} className="project-list-item clear-fix" >
              <div className="project-list-item-text" onClick={this._goToProject.bind(null, id)}>
                <h2>{project.title}</h2>
              </div>
              {edit}
          </li>
        );

        if(project.manager_id === SessionStore.getCurrentUser().id){
          managedProjects.push(listItem);
        } else {
          memberProjects.push(listItem);
        }


      });
    }


    let managed = (
      <div className="project-list-wrapper">
        <h2>Managed Projects</h2 >
        <ul className="project-wrapper">
          {managedProjects}
        </ul>
      </div>
    );

    let memberships = (
      <div className="project-list-wrapper">
        <h2>Team Projects</h2 >
        <ul className="project-wrapper">
          {memberProjects}
        </ul>
      </div>
    );

    if (managedProjects.length === 0) {
      managed = undefined;
    }

    if (memberProjects.length === 0) {
      memberships = undefined;
    }

    return(
      <div className="feature-wrapper clear-fix">
        <div>
          <h2>Projects</h2>
          <button className="feature-add-button" onClick={this._redirectToAddProject}>Add Project</button>
          <div className="form-place-holder">
            {this.props.children}
          </div>
            {managed}
            {memberships}
        </div>
      </div>
    );
  }

});

module.exports = ProjectIndex;
