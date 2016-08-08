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
    console.log(messages);
    let messageList = Object.keys(messages).map((id, index) => {
      if (!messages[id].reply_to_id) {
        return (
          <span key={messages[id].id}>
            <button className="message-parent-button">Reply to: {messages[id].author_name}</button>
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
          <button className="feature-add-button">Add a Message</button>
          <ul className="message-list group">
            {messageList}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = MessageIndex;
