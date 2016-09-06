const ChatConstants = require('../constants/chat_constants');
const ChatUtil = {
  getAllChats: function (projectId, successCallback) {
    $.ajax({
      type: "GET",
      url: `api/projects/${projectId}/chats`,
      success: function (response) {
        successCallback(response);
      }
    });
  },

  addOneChatMessage: function(chatMessage, successCallback){
    $.ajax({
      type: "POST",
      url: `api/projects/${chatMessage.project_id}/chats`,
      data: {chat: chatMessage},
      success: function (response) {
        successCallback(response);
      }
    });
  }
};

module.exports = ChatUtil;
