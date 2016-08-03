//React
const React = require('react');
const ReactDOM = require('react-dom');
//Router
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

// Components
const Session = require('./components/session_comp');
const HomeBasePage = require('./components/basepage_components/home_base_page');
const ProjectIndex = require('./components/project/project_index');
const MessageBoard = require('./components/basepage_components/message_board');
// Stores
const SessionStore = require('./stores/session_store');

// Actions
const SessionActions = require('./actions/session_actions.js');

const App = React.createClass({
  getInitialState: function(){
    return {signedIn: SessionStore.isSignedIn()};
  },

  componentDidMount: function(){
    this.sessionListener = SessionStore.addListener(this._sessionListener);
  },

  componentWillUnmount: function(){
    this.sessionListener.remove();
  },

  _sessionListener: function(){
    this.setState({signedIn: SessionStore.isSignedIn()});
  },

  handleSignOut: function(event){
    event.preventDefault();
    SessionActions.signOut();
  },

  render: function(){
    let sessionView;
    if (this.state.signedIn){
      sessionView = (
        <div>
          Welcome {SessionStore.getCurrentUser().username}
          <button onClick={this.handleSignOut}>SignOut</button>
        </div>
      );
    } else {
      sessionView = (
        <div>
          Sign In or Sign Up
          <Link to={"/new_user"}>Sign Up</Link>
          <Link to={"/session"}>Sign In</Link>
        </div>
      );
    }

    return (
      <div>
        {sessionView}
        {this.props.children}
      </div>
    );
  }
});

// function redirectIfNotLoggedIn(prevState, replace) {
//   if (!SessionStore.userIsLoggedIn()) {
//     replace("/signin");
//   }
// }

const AppRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/new_user" component={Session} />
    <Route path="/session" component={Session} />
    <Route path="/base_pages" component={HomeBasePage} />
    <Route path="/project" component={ProjectIndex}>
      <Route path="message_board" component={MessageBoard} />
    </Route>
  </Router>
);


document.addEventListener("DOMContentLoaded", function(){
  SessionActions.receive("SIGN_IN", window.currentUser)();
  let root = document.getElementById('root');
  ReactDOM.render(AppRouter, root);
});


// testing

window.SessionStore = SessionStore;
