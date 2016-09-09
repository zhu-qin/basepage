const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const ProjectActions = require('../actions/project_actions');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;
const PusherStore = require('../pusher/pusher_store');


const Session = React.createClass({
  getInitialState: function(){
    return {
      username: "",
      password: "",
      email: "",
      errors: []
    };
  },

  componentDidMount: function(){
    this.errorListener = ErrorStore.addListener(this._errorStoreListener);
    this.sessionListener = SessionStore.addListener(this._sessionListener);
  },

  componentWillUnmount: function(){
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  _sessionListener: function(){
    if (SessionStore.isSignedIn()){
      hashHistory.push('/projects/index');
    }
  },

  _errorStoreListener: function(){
    this.setState( {errors: ErrorStore.all()} );
    setTimeout(function () {this.setState({errors: []});}.bind(this), 3000);

  },

  _updateField: function(field, event){
    return (event) => {
      this.setState({[field]: event.target.value });
    };
  },

  _handleSignIn: function(event){
    event.preventDefault();
    SessionActions.signIn(this.state);
  },

  _handleNewUser: function (event) {
    event.preventDefault();
    SessionActions.signUp(this.state);
  },

  _handleGuestJoeSignIn: function(event){
    event.preventDefault();
    SessionActions.signIn({email: "joe@joe.com", password: "password"});
  },

  _handleGuestLarrySignIn: function(event){
    event.preventDefault();
    SessionActions.signIn({email: "larry@larry.com", password: "password"});
  },

  render: function(){
    let errors = this.state.errors.map((error, index) =>{
      return (
        <li key={index}>{error}</li>
        );
    });

    let userName;

    let signIn = (
      <div className="session-buttons-wrapper clear-fix">
        <input type="submit" value="Sign In" />
        <input onClick={this._handleGuestLarrySignIn} type="button" value="Guest Larry" />
        <input onClick={this._handleGuestJoeSignIn} type="button" value="Guest Joe" />
        <Link to="/sign_up" className="session-link">Sign Up To Start</Link>
      </div>
              );
    if (this.props.route.path === "/sign_up") {
      signIn = (
        <div className="session-buttons-wrapper clear-fix">
          <input onClick={this._handleNewUser} type="submit" value="Sign Up" />
          <Link to="/" className="session-link">Back to Sign In</Link>
        </div>
      );

      userName = (
        <div className="session-input-box">
          <label>Name:</label>
          <input type="text" value={this.state.username} placeholder="Name" autoComplete="off" onChange={this._updateField("username")}/>
        </div>
      );
    }

    return(
      <div className="session-wrapper">
        <div className="session-color-block"><h1>BASE PAGE</h1></div>
          <div className="session-form clear-fix">
              <form onSubmit={this._handleSignIn}>

                <div className="session-input-wrapper">
                  <div className="session-input-box">
                    <label>Email:</label>
                    <input type="text" value={this.state.email} placeholder="Email" autoComplete="off" onChange={this._updateField("email")}/>
                  </div>
                  {userName}
                  <div className="session-input-box">
                    <label>Password:</label>
                    <input type="password" value={this.state.password} placeholder="Password" autoComplete="off" onChange={this._updateField("password")}/>
                  </div>
                </div>

                <div className="session-buttons-box">
                  {signIn}
                </div>
            </form>
            <ul className="session-errors-box">
              {errors}
            </ul>
          </div>
        </div>
    );
  }
});

module.exports = Session;
