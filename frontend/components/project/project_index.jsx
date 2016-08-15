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

  _redirectToUpLoad: function (){
    hashHistory.push('/projects/new');
  },

  _goToProject: function (id, event) {
    hashHistory.push(`/projects/${id}`);
  },

  render: function() {

    let view = function () {
      let projectList = Object.keys(this.state.projects).map((id, index) => {
        return (
          <li key={id} className="project-list-item" onClick={this._goToProject.bind(null, id)}>
              <div>{this.state.projects[id].name}</div>
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
            <button className="feature-add-button" onClick={this._redirectToUpLoad}>Add Projects</button>
            <div className="form-place-holder">
              {this.props.children}
            </div>
            <div className="project-wrapper">
              {fullView}
            </div>
        </div>
      </div>
    );
  }

});

module.exports = ProjectIndex;
