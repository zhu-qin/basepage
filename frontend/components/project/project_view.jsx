const React = require('react');
const NavigationContainer = require('./navigation_container');
const SessionActions = require('../../actions/session_actions');
const SessionStore = require('../../stores/session_store');
const ProjectStore = require('../../stores/project_store');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;
const ProjectActions = require('../../actions/project_actions');
const PusherStore = require('../../pusher/pusher_store');


const ProjectView = React.createClass({
  getInitialState: function (){
    this.navConstants = ["chats", "messages", "todos", "calender_events", "uploads", "project_memberships"];
    return { currentProject: ProjectStore.getCurrentProject() };
  },

  componentDidMount: function(){
    this.projectListener = ProjectStore.addListener(this._projectStoreListener);
    this.sessionListener = SessionStore.addListener(this._sessionStoreListener);

    // bind client update online status for this particular project so users who subscribe to this channel and
    // project get notified when other users sign on to base-page
    // this channel binds only if this component mounts from a route containing a specific project

  },

  componentWillReceiveProps: function (newProps) {
    if (newProps.route.path === "/projects/:projectId") {
      this.pusherChannel = PusherStore.getChannel(`project_${ProjectStore.getCurrentProject().id}`);
      this.pusherChannel.bind('client-update_online_status', function (data) {
        console.log(data);
      });
    } else {
      // this.pusherChannel.unbind('client-update_online_status');
    }
  },

  _projectStoreListener: function () {
    this.setState({
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
      <div className="full-wrapper">
        <div className="nav-list-wrapper">
          <ul className="nav-list clear-fix">
            {navigation}
          </ul>
        </div>
        <div className="project-container">
          <nav className="project-nav-top clear-fix">
            <Link to={`projects/index`} className="project-title">{title}</Link>
            <button className="sign-out-button button-main" onClick={this._handleLogOut}>Sign Out</button>
            <button className="projects-button button-main" onClick={this._goToProjects}>Projects</button>
          </nav>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = ProjectView;
