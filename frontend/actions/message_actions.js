const MessageUtil = require('../util/message_util');
const MessageConstants = require('../constants/message_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

const MessageActions = {

  getAllMessages: function (projectId) {
    MessageUtil.getAllMessages(projectId, MessageActions.receiveAllMessages);
  },

  receiveAllMessages: function (messages) {
    AppDispatcher.dispatch({
      actionType: MessageConstants.RECEIVE_ALL_MESSAGES,
      messages: messages
    });
  },

  createOneMessage: function(message){
    MessageUtil.createOneMessage(message, MessageActions.receiveOneMessage);
  },

  receiveOneMessage: function(message){
    AppDispatcher.dispatch({
      actionType: MessageConstants.RECEIVE_ONE_MESSAGE,
      message: message
    });
  }


};


module.exports = MessageActions;
