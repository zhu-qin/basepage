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
  },

  addOneChatMessage: function(chatMessage) {
    ChatUtil.addOneChatMessage(chatMessage, ChatActions.receiveOneChatMessage);
  },

  receiveOneChatMessage: function(response) {
    AppDispatcher.dispatch({
      actionType:ChatConstants.RECEIVE_ONE_CHAT,
      chatMessage: response
    });
  },

  getPusherChats: function (data) {
    ChatUtil.getPusherChats(data, ChatActions.receiveOneChatMessage);
  }
};

module.exports = ChatActions;
