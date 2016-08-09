const React = require('react');
const MessageActions = require('../../actions/message_actions');
const MessageStore = require('../../stores/message_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;


const MessageForm = React.createClass({
  getInitialState: function () {
    return {
      parentMessage: MessageStore.find(this.props.params.messageId),
      title: "",
      body: "",
    };
  },

  _handleChange: function(field, event){
    return (event) =>{
      event.preventDefault();
      this.setState({[field]: event.target.value});
    };
  },

  componentWillReceiveProps: function (newProps){
    this.setState ({parentMessage: MessageStore.find(newProps.params.messageId)});
  },

  _handleSubmit: function(event){
    event.preventDefault();
    let reply = {
      title: this.state.title,
      body: this.state.body,
      author_id: SessionStore.getCurrentUser().id,
      reply_to_id: this.state.parentMessage.id || null,
      project_id: SessionStore.userMainProject()
    };
    MessageActions.createOneMessage(reply);
  },

  render: function () {
    let message = this.state.parentMessage;

    return(
      <div className="post-wrapper">
          <h2>{message.author_name} Said:
          {message.title}
          {message.body}
          </h2>
          <form className="message-form" onSubmit={this._handleSubmit}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:
              <input type="textarea" onChange={this._handleChange("body")} value={this.state.body}/>
            </label>
            <input className="button-form" type="submit" value="Post Message"/>
            <Link className="button-form" to={`/projects/${SessionStore.userMainProject()}/messages_index`}>Cancel</Link>
          </form>
      </div>
    );
  }

});

module.exports = MessageForm;
