const React = require('react');
const MessageStore = require('../../stores/message_store');

const MessageItem = React.createClass({

  render: function () {
    let childMessages = MessageStore.findChildren(this.props.message.id);
    let messageList = childMessages.map( (message, index) => {

      return (
        <span key={message.id}>
          <button className="message-reply-button">Reply to: {message.author_name}</button>
          {message.author_name} SAYS: {message.title}
          <MessageItem className="message-item" key={index} message={message}/>
        </span>
      );
    });

    return(
      <ul className="message-reply group">
        {messageList}
      </ul>
    );


  }
});

module.exports = MessageItem;
