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
    let view = function () {
      let projectList = Object.keys(this.state.projects).map((id, index) => {
        return (
          <li key={id} className="project-list-item clear-fix" >
              <div className="project-list-item-text" onClick={this._goToProject.bind(null, id)}>
                <h2>{this.state.projects[id].title}</h2>
                <p>{this.state.projects[id].description}</p>
              </div>

              <div className="project-list-item-edit" onClick={this._redirectToEditProject.bind(null, id)}>
                Edit
              </div>
          </li>
        );
      });
      return projectList;
    }.bind( this );

    let fullView = "";

    if (this.state.projects) {
      fullView = view();
    }


    return(
      <div className="feature-wrapper clear-fix">
        <div className="project-wrapper">
          <h2>Projects</h2>
            <button className="feature-add-button" onClick={this._redirectToAddProject}>Add Project</button>
            <div className="form-place-holder">
              {this.props.children}
            </div>
            <ul className="project-wrapper">
              {fullView}
            </ul>
        </div>
      </div>
    );
  }

});

module.exports = ProjectIndex;
