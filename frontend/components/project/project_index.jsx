const React = require('react');
const NavigationContainer = require('./navigation_container');
const SessionActions = require('../../actions/session_actions');
const SessionStore = require('../../stores/session_store');
const ProjectStore = require('../../stores/project_store');
const hashHistory = require('react-router').hashHistory;

const ProjectIndex = React.createClass({
  getInitialState: function (){
    this.navConstants = ["messages", "todos", "events", "uploads"];
    return { currentProject: {} };
  },

  componentDidMount: function(){
    this.projectListener = ProjectStore.addListener(this._projectStoreListener);
    this.sessionListener = SessionStore.addListener(this._sessionStoreListener);
    ProjectActions.getAllProjects();
  },

  _projectStoreListener: function () {
    this.setState({currentProject: ProjectStore.getCurrentProject()});
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

  render: function () {
    let navigation = this.navConstants.map((tab, index) => {
      return (
        <NavigationContainer
          key={tab}
          className="nav-small-container"
          button={tab} />
      );
    });


    return (
      <div className="project-container">
        <button className="nav-logout-button nav-list-item" onClick={this._handleLogOut}>Sign Out</button>
        <div className="nav-container">
          <h1 className="clear-fix">
            {this.state.currentProject.name}
          </h1>
          <ul className="nav-list clear-fix">
            {navigation}
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ProjectIndex;
