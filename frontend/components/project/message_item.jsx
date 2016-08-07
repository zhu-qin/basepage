const React = require('react');
const MessageStore = require('../../stores/message_store');

const MessageItem = React.createClass({

  render: function () {
    let childMessages = MessageStore.findChildren(this.props.message.id);

    let messageList = childMessages.map( (message, index) => {
      return (<MessageItem className="message-item" key={index} message={message}/>);
    });
    return(
      <ul className="message-list">
        {this.props.message.reply_to_id}
        <button className="message-reply-button">Reply to: {this.props.message.id}</button>
        {messageList}
    </ul>
    );


  }
});

module.exports = MessageItem;
