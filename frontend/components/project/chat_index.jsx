const React = require('react');
const ReactDOM = require('react-dom');
const ProjectStore = require('../../stores/project_store');
const ProjectMembershipStore = require('../../stores/project_membership_store');
const SessionStore = require('../../stores/session_store');
const ChatStore = require('../../stores/chat_store');
const ChatActions = require('../../actions/chat_actions');
const PusherStore = require('../../pusher/pusher_store');

const ChatIndex = React.createClass({
  getInitialState: function () {
    return {  messages: [],
              chatMessage: ""
            };
  },

  componentDidMount: function () {
    let projectId = ProjectStore.getCurrentProject().id;
    this.chatListener = ChatStore.addListener(this.chatStoreListener);
    ChatActions.getAllChats(projectId);
    this.pusherChannel = PusherStore.getChannel(`project_${projectId}`);
    this.pusherChannel.bind('update_chats', function (data) {
      ChatActions.getAllChats(projectId);
    });
  },

  componentWillUnmount: function () {
    this.chatListener.remove();
    this.pusherChannel.unbind('update_chats');
  },

  componentDidUpdate: function () {
    let lastChat = this.refs[`chatMessage_${this.state.messages.length - 1}`];
    lastChat.scrollIntoView({block: "end", behavior: "smooth"});
  },

  chatStoreListener: function () {
    this.setState({ messages: ChatStore.all() });
  },

  _handleChange: function (event) {
    this.setState({chatMessage: event.target.value });
  },

  _handleSubmit: function (event) {
    event.preventDefault();
    let chatMessage = {
      message: this.state.chatMessage,
      project_id: ProjectStore.getCurrentProject().id,
      author_id: SessionStore.getCurrentUser().id
    };
    ChatActions.addOneChatMessage(chatMessage);
    this.setState( {chatMessage: ""} );
  },

  render: function () {
    let messages = this.state.messages.map((message, index) => {
      let date = new Date(message.create_at).toString();
      return (
        <li key={message.id} ref={`chatMessage_${index}`}>
          <p>{message.author_name} @ {date}:{message.message}</p>
        </li>
      );
    });

    return (
      <div className="feature-wrapper clear-fix">
        <div className="chat-wrapper">
            <h2>Chat</h2>
            <div className="chat-members-and-messages clear-fix">
              <ul className="chat-members">

              </ul>
              <ul className="chat-messages" ref={"chatMessages"}>
                {messages}
              </ul>
            </div>
            <div className="chat-input">
              <form onSubmit={this._handleSubmit}>
                <input className="chat-send-button" type="submit" value="Send"/>
                <input className="chat-text-body" type="text" onChange={this._handleChange} value={this.state.chatMessage}/>
              </form>
            </div>
          </div>

      </div>
    );
  }
});

module.exports = ChatIndex;
