const MessageConstants = require('../constants/message_constants');

const MessageUtil = {

  getAllMessages: function (projectId, successCallback) {
    $.ajax({
      type: "GET",
      url: `api/projects/${projectId}/messages`,
      success: function (response) {
        successCallback(response);
      }
    });
  },

  createOneMessage: function (message, successCallback) {
    $.ajax({
      type: "POST",
      url: `api/projects/${message.project_id}/messages`,
      data: {message: message},
      success: function (response) {
        successCallback(response);
      }
    });
  }

};

module.exports = MessageUtil;
