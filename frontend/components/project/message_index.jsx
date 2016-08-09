const React = require('react');
const MessageStore = require('../../stores/message_store');
const MessageActions = require('../../actions/message_actions');
const MessageItem = require('./message_item');
const MessageForm = require('./message_index');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;


const MessageIndex = React.createClass({
  getInitialState: function(){
    return { messages: {} };
  },

  componentDidMount: function () {
    this.messageListener = MessageStore.addListener(this._messageStoreListener);
    MessageActions.getAllMessages(SessionStore.userMainProject());
  },

  _messageStoreListener: function () {
    this.setState({ messages: MessageStore.all() });
  },

  componentWillUnmount: function () {
    this.messageListener.remove();
  },

  _handleClickToReply: function (id, event) {
    event.preventDefault();
    hashHistory.push(`/message_board/${id}/reply`);
  },

  render: function(){
    let messages = this.state.messages;
    let messageList = Object.keys(messages).map((id, index) => {
      if (!messages[id].reply_to_id) {
        return (
          <span key={id}>
            <button className="message-parent-button" onClick={this._handleClickToReply.bind(null, id)}>Reply to: {messages[id].author_name}</button>
            {messages[id].author_name} SAYS: {messages[id].title}
            <MessageItem className="message-item" key={index} message={messages[id]}/>
          </span>
        );
      }
    });

    return(
      <div className="feature-wrapper">
        <div className="message-wrapper">
          <h2>Message Board</h2>
          <button className="feature-add-button" onClick={this._handleClickToReply.bind(null, 0)}>Post a Message</button>
          <div className="message-reply-place-holder">{this.props.children}</div>
          <ul className="message-list group">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = MessageIndex;
