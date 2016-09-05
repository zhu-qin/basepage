const ProjectStore = require('../stores/project_store');
const AppDispatcher = require('../dispatcher/dispatcher');
const ChatUtil = require('../util/chat_util');
const ChatConstants = require('../constants/chat_constants');

const ChatActions = {
  getAllChats: function (projectId) {
    ChatUtil.getAllChats(projectId, ChatActions.receiveAllChats);
  },

  receiveAllChats: function (response) {
    AppDispatcher.dispatch({
      actionType: ChatConstants.RECEIVE_ALL_CHATS,
      chatMessages: response
    });
  }
};

module.exports = ChatActions;
