const React = require('react');
const NavigationContainer = require('./navigation_container');
const SessionActions = require('../../actions/session_actions');
const SessionStore = require('../../stores/session_store');
const ProjectStore = require('../../stores/project_store');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;
const ProjectActions = require('../../actions/project_actions');

const ProjectView = React.createClass({
  getInitialState: function (){
    this.navConstants = ["messages", "todos", "calender_events", "uploads", "team"];
    return { all_projects: {}, currentProject: {} };
  },

  componentDidMount: function(){
    this.projectListener = ProjectStore.addListener(this._projectStoreListener);
    this.sessionListener = SessionStore.addListener(this._sessionStoreListener);
    ProjectActions.getAllProjects();
  },

  _projectStoreListener: function () {
    this.setState({
      allProjects: ProjectStore.all(),
      currentProject: ProjectStore.getCurrentProject()
    });
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

  render: function () {
    let navigation;
    let title = 'All Projects';
    if (this.props.route.path === "/projects/:projectId"){
      navigation = this.navConstants.map((tab, index) => {
        return (
          <NavigationContainer
            key={tab}
            className="nav-small-container"
            button={tab} />
        );
      });

      title = this.state.currentProject.title;
    }


    return (
      <div className="project-container">
        <nav className="project-nav-top clear-fix">
          <Link to={`projects/index`} className="project-title">{title}</Link>
          <button className="sign-out-button button-main" onClick={this._handleLogOut}>Sign Out</button>
          <button className="projects-button button-main" onClick={this._goToProjects}>Projects</button>
        </nav>
        <ul className="nav-list clear-fix">
          {navigation}
        </ul>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ProjectView;
