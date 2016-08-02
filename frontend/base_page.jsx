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
const NewUser = require('./components/new_user_comp');
// Stores
const SessionStore = require('./stores/session_store');

// Actions
const SessionActions = require('./actions/session_actions.js');


const BasePage = React.createClass({
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

const AppRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={BasePage} />
    <Route path="/new_user" component={NewUser} />
    <Route path="/session" component={Session} />
  </Router>
);


document.addEventListener("DOMContentLoaded", function(){
  let root = document.getElementById('root');
  ReactDOM.render(AppRouter, root);
});


// testing

window.SessionStore = SessionStore;
