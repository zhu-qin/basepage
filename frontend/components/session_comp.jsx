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
    hashHistory.push('/');
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
    SessionActions.signIn(this.state);
  },

  render: function(){

    let errors = this.state.errors.map((error, index) =>{
      return (<li key={index}>{error}</li>);
    });

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
          <input type="submit" value="Sign In" />
        </form>
        <ul>
          {errors}
        </ul>
      </div>
    );
  }


});

module.exports = Session;
