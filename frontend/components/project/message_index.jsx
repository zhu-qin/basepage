const React = require('react');
const MessageStore = require('../../stores/message_store');
const MessageActions = require('../../actions/message_actions');
const MessageItem = require('./message_item');
const SessionStore = require('../../stores/session_store');

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

  render: function(){
    let messages = this.state.messages;
    let messageList = Object.keys(messages).map((id, index) => {
      if (!messages[id].reply_to_id) {
        return (
          <span >
            <MessageItem className="message-item" key={index} message={messages[id]}/>
            <button className="message-reply-button">Reply to: {messages[id].author_name}</button>
          </span>
        );
      }
    });


    return(
      <div className="feature-wrapper">
        <div className="message-wrapper">
          <h2>Message Board</h2>
          <ul className="message-list">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = MessageIndex;
