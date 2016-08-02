const SessionConstants = require("../constants/session_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionUtil = require('../util/session_util');

const SessionActions = {
  signIn: function(signInInfo){
    SessionUtil.signIn(signInInfo, SessionActions.receiveSignIn, SessionActions.receivefailedSignIn);
  },

  signOut: function(){
    SessionUtil.signOut(SessionActions.receiveSignOut);
  },

  signUp: function(userInfo){
    SessionUtil.signUp(userInfo, SessionActions.receiveNewUser, SessionActions.receivefailedSignUp);
  },

  receiveSignIn: function(user){
    AppDispatcher.dispatch({
      actionType: SessionConstants.SIGN_IN,
      user: user
    });
  },

  receiveSignOut: function(user){
    AppDispatcher.dispatch({
      actionType: SessionConstants.SIGN_OUT,
      user: user
    });
  },

  receiveNewUser: function(user){
    AppDispatcher.dispatch({
      actionType: SessionConstants.SIGN_UP,
      user: user
    });
  },

  receivefailedSignIn: function(errors){
    AppDispatcher.dispatch({
      actionType: SessionConstants.FAIL_SIGN_IN,
      errors: errors
    });
  },

  receivefailedSignUp: function(errors){
    AppDispatcher.dispatch({
      actionType: SessionConstants.FAIL_SIGN_UP,
      errors: errors
    });
  }

};

module.exports = SessionActions;
