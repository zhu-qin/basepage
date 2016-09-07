const React = require('react');
const SessionActions = require('../../actions/session_actions');
const SessionStore = require('../../stores/session_store');
const ProjectStore = require('../../stores/project_store');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;
const ProjectActions = require('../../actions/project_actions');
const PusherStore = require('../../pusher/pusher_store');
const ProjectMembershipActions= require('../../actions/project_membership_actions');

const AllProjectsIndex = React.createClass({
  getInitialState: function (){
    return { projects: ProjectStore.all() };
  },

  componentDidMount: function(){
    this.projectListener = ProjectStore.addListener(this._projectStoreListener);
    this.sessionListener = SessionStore.addListener(this._sessionStoreListener);
    if (ProjectStore.length() === 0) {
      ProjectActions.getAllProjects();
    }
  },

  _projectStoreListener: function () {
    this.setState( {projects: ProjectStore.all()} );

    PusherStore.addChannels();
  },

  _sessionStoreListener: function () {
    if (!SessionStore.isSignedIn()) {
      hashHistory.push('/');
    }
  },

  componentWillUnmount: function () {
    this.projectListener.remove();
    this.sessionListener.remove();
  },

  _handleLogOut: function () {
    SessionActions.signOut();
  },

  _goToProjects: function (){
    hashHistory.push('/projects/index');
  },

  _redirectToAddProject: function (){
    hashHistory.push('/projects/new');
  },

  _redirectToEditProject: function (projectId, event) {
    hashHistory.push(`/projects/${projectId}/edit`);
  },

  _goToProject: function (id, event) {
    let pushToProject = function () {
      hashHistory.push(`/projects/${id}`);
    };
    ProjectActions.setCurrentProject(id, pushToProject);
    ProjectMembershipActions.getAllProjectMemberships(ProjectStore.getCurrentProject().id);
  },

  render: function () {
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

    let projectsList = (
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

    return (
      <div className="full-wrapper">
        <div className="nav-list-wrapper">
          <ul className="nav-list clear-fix">
          </ul>
        </div>
        <div className="project-container">
          <nav className="project-nav-top clear-fix">
            <Link to={`projects/index`} className="project-title">All Projects</Link>
            <button className="sign-out-button button-main" onClick={this._handleLogOut}>Sign Out</button>
            <button className="projects-button button-main" onClick={this._goToProjects}>Projects</button>
          </nav>
          {projectsList}
        </div>
      </div>
    );
  }
});

module.exports = AllProjectsIndex;
