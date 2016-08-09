const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const ProjectActions = require('../actions/project_actions');
const hashHistory = require('react-router').hashHistory;


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
      ProjectActions.getAllProjects();
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

  _handleGuestSignIn: function(event){
    event.preventDefault();
    SessionActions.signIn({username: "Qin", password: "password"});
  },

  _handleSignUp: function(event){
    event.preventDefault();
    hashHistory.push('/sign_up');
  },

  render: function(){
    let errors = this.state.errors.map((error, index) =>{
      return (<li key={index}>{error}</li>);
    });

    let signUpButton = <input className="button-main" onClick={this._handleSignUp} type="button" value="Sign Up" />;
    let submitButton = <input className="button-main" type="submit" value="Sign In" />;
    if (this.props.route.path === "/sign_up") {
      submitButton = <input className="button-main" type="submit" value="Sign Up" />;
      signUpButton = "";
    }

    return(
      <div className="session-form">
        <h1> Sign In</h1>
          <form onSubmit={this._handleSignIn}>
            <label>
              Username:
              <input type="text" value={this.state.username} onChange={this._updateField("username")}/>
            </label>
            <label>
              Email:
              <input type="password" value={this.state.email} onChange={this._updateField("email")}/>
            </label>
            <label>
              Password:
              <input type="password" value={this.state.password} onChange={this._updateField("password")}/>
            </label>
            <div className="session-buttons-wrapper clear-fix">
              {submitButton}
              {signUpButton}
              <input className="button-main" onClick={this._handleGuestSignIn} type="button" value="Guest Sign In" />
            </div>
        </form>
        <ul>
          {errors}
        </ul>
      </div>
    );
  }



});

module.exports = Session;