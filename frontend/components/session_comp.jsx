const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;


const Session = React.createClass({
  getInitialState: function(){
    return {
      username: "",
      password: "",
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
      this.redirectTo();
    }
  },

  redirectTo: function(){
    // come back to this later
    hashHistory.push('/projects/' + SessionStore.userMainProject());
  },

  _errorStoreListener: function(){
    this.setState( {errors: ErrorStore.all()} );
  },

  _updateField: function(field, event){
    return (event) => {
      this.setState({[field]: event.target.value });
    };
  },

  _handleSubmit: function(event){
    event.preventDefault();
    if (this.props.location.pathname === "/new_user"){
      SessionActions.signUp(this.state);
    } else if (this.props.location.pathname === "/session"){
      SessionActions.signIn(this.state);
    } else {
      SessionActions.signIn({username: "qin", password: "password"});
    }
  },

  render: function(){
    let errors = this.state.errors.map((error, index) =>{
      return (<li key={index}>{error}</li>);
    });

    let submitButton;
    if (this.props.location.pathname === "/new_user") {
      submitButton = <input type="submit" value="Sign Up" />;
    } else if (this.props.location.pathname === "/session"){
      submitButton = <input type="submit" value="Sign In" />;
    } else {
      submitButton = <input type="submit" value="Guest Sign In" />;
    }


    return(
      <div className="session-form">
        <form onSubmit={this._handleSubmit}>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={this._updateField("username")}/>
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this._updateField("password")}/>
          </label>
          {submitButton}
        </form>
        <ul>
          {errors}
        </ul>
      </div>
    );
  }


});

module.exports = Session;
