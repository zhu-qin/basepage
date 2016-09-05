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
  }
};

module.exports = ChatUtil;
