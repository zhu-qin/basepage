const SessionConstants = require("../constants/session_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionUtil = require('../util/session_util');


const SessionActions = {
  signIn: function(signInInfo){
    SessionUtil.signIn(signInInfo, SessionActions.receiveUser, SessionActions.receiveErrors);
  },

  signOut: function(){
    SessionUtil.signOut(SessionActions.receiveSignOutUser, SessionActions.receiveErrors);
  },

  signUp: function(userInfo){
    SessionUtil.signUp(userInfo, SessionActions.receiveUser, SessionActions.receiveErrors);
  },

  receiveUser: function(user){
    AppDispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_USER,
      user: user
    });
  },

  receiveSignOutUser: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SIGN_OUT
    });
  },

  receiveErrors: function(errors) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_ERRORS,
      errors: errors
    });
  }

};

module.exports = SessionActions;
