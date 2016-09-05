const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const ChatConstants = require('../constants/chat_constants');
const ChatStore = new Store(AppDispatcher);

let _chats = [];

ChatStore.resetAllChats = function (chats) {
  _chats = chats;
};

ChatStore.addChatMessage = function (chatMessage) {
  _chats.push(chatMessage);
};

ChatStore.all = function (){
  return Object.assign( [], _chats );
};

ChatStore.addChat = function (chatMessage) {
  _chats[chatMessage.id] = chatMessage;
};

ChatStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case (ChatConstants.RECEIVE_ALL_CHATS):
      ChatStore.resetAllChats(payload.chatMessages);
      ChatStore.__emitChange();
      break;
    case (ChatConstants.RECEIVE_ONE_CHAT):
      ChatStore.addChatMessage(payload.chatMessage);
      ChatStore.__emitChange();
      break;
    }
};

module.exports = ChatStore;
