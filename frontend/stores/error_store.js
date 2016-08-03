const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const Store = require('flux/utils').Store;

const ErrorStore = new Store(AppDispatcher);

let _errors = [];

ErrorStore.all = function(){
  return _errors.slice();
};

ErrorStore.resetErrors = function(errors){
  _errors = errors.responseJSON;
};

ErrorStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case SessionConstants.FAIL_SIGN_IN:
      ErrorStore.resetErrors(payload.response);
      ErrorStore.__emitChange();
      break;
  }

};




module.exports = ErrorStore;
