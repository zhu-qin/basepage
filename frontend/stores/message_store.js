const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const MessageConstants = require('../constants/message_constants');

let _messages = {};

const MessageStore = new Store(AppDispatcher);

MessageStore.all = function () {
  return Object.assign({}, _messages);
};

MessageStore.resetMessages = function (messages) {
  _messages = messages;
};

MessageStore.addOneMessage = function (message) {
  _messages[message.id] = message;
};

MessageStore.find = function(id) {
  return Object.assign({}, _messages[id]);
};

MessageStore.findChildren = function (id) {
  let childMessages = [];
  Object.keys(_messages).forEach( (messageId, index) => {
    if (_messages[messageId].reply_to_id === id) {
      childMessages.push(_messages[messageId]);
    }
  });
  return childMessages;
};

MessageStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case MessageConstants.RECEIVE_ONE_MESSAGE:
      MessageStore.addOneMessage(payload.message);
      MessageStore.__emitChange();
      break;
    case MessageConstants.RECEIVE_ALL_MESSAGES:
      MessageStore.resetMessages(payload.messages);
      MessageStore.__emitChange();
      break;
  }
};



module.exports = MessageStore;
