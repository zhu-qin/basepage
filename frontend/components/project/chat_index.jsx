const React = require('react');
const ProjectStore = require('../../stores/project_store');
const ChatStore = require('../../stores/chat_store');
const ChatActions = require('../../actions/chat_actions');

const ChatIndex = React.createClass({

  getInitialState: function () {
    return { messages: [], newMessage: {} };
  },

  componentDidMount: function () {
    ChatStore.addListener(this.chatStoreListener);
    ChatActions.getAllChats(ProjectStore.getCurrentProject().id);
  },

  componenetWillUnmount: function () {
    ChatStore.removeListener();
  },

  chatStoreListener: function () {
    this.setState({ messages: ChatStore.all() });
  },

  render: function () {
    return (
      <div className="feature-wrapper clear-fix">
        <div className="todo-wrapper">
          <h2>Let's Chat</h2>


        </div>
      </div>
    );
  }
});

module.exports = ChatIndex;
