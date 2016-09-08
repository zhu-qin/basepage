const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const ProjectActions = require('../actions/project_actions');
const hashHistory = require('react-router').hashHistory;
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
  },

  _updateField: function(field, event){
    return (event) => {
      this.setState({[field]: event.target.value });
    };
  },

  _handleSignIn: function(event){
      event.preventDefault();
    if (this.props.route.path === "/") {
      SessionActions.signIn(this.state);
    } else if (this.props.route.path === "/sign_up"){
      SessionActions.signUp(this.state);
    }
  },

  _handleGuestJoeSignIn: function(event){
    event.preventDefault();
    SessionActions.signIn({username: "Joe", password: "password"});
  },

  _handleGuestLarrySignIn: function(event){
    event.preventDefault();
    SessionActions.signIn({username: "Larry", password: "password"});
  },

  _handleSignUp: function(event){
    event.preventDefault();
    hashHistory.push('/sign_up');
  },

  render: function(){
    let errors = this.state.errors.map((error, index) =>{
      return (<li key={index}>{error}</li>);
    });

    let signIn = (
      <div className="session-buttons-wrapper clear-fix">
        <input className="button-main session-button" onClick={this._handleSignUp} type="button" value="Sign Up" />
        <input className="button-main session-button" type="submit" value="Sign In" />
        <input className="button-main session-button" onClick={this._handleGuestLarrySignIn} type="button" value="Guest Larry" />
        <input className="button-main session-button" onClick={this._handleGuestJoeSignIn} type="button" value="Guest Joe" />
      </div>
              );
    if (this.props.route.path === "/sign_up") {
      signIn = (
      <div className="session-buttons-wrapper clear-fix">
        <input className="button-main session-button" onClick={this._handleSignIn} type="button" value="Sign Up" />
        <input className="button-main session-button" onClick={this._handleGuestLarrySignIn} type="button" value="Guest Larry Sign In" />
        <input className="button-main session-button" onClick={this._handleGuestJoeSignIn} type="button" value="Guest Joe Sign In" />
      </div>
    );
    }

    return(
      <div className="session-wrapper">
        <div className="session-color-block"><h1>BASE PAGE</h1></div>
          <div className="session-form">
            <h2>Sign In</h2>
              <form onSubmit={this._handleSignIn}>
                <label>
                  Username:
                  <input type="text" className="session-text" value={this.state.username} onChange={this._updateField("username")}/>
                </label>
                <label>
                  Email:
                  <input type="text" className="session-text" value={this.state.email} onChange={this._updateField("email")}/>
                </label>
                <label>
                  Password:
                  <input type="password" className="session-text" value={this.state.password} onChange={this._updateField("password")}/>
                </label>
                {signIn}
            </form>
            <ul>
              {errors}
            </ul>
          </div>
        </div>

    );
  }

});

module.exports = Session;
