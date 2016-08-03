const SessionConstants = require("../constants/session_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionUtil = require('../util/session_util');

const SessionActions = {
  signIn: function(signInInfo){
    SessionUtil.signIn(signInInfo, SessionActions.receive(SessionConstants.SIGN_IN), SessionActions.receive(SessionConstants.FAIL_SIGN_IN));
  },

  signOut: function(){
    SessionUtil.signOut(SessionActions.receive(SessionConstants.SIGN_OUT));
  },

  signUp: function(userInfo){
    SessionUtil.signUp(userInfo, SessionActions.receive(SessionConstants.SIGN_IN), SessionActions.receive(SessionConstants.FAIL_SIGN_IN));
  },

  receive: function(path, res){
    let dispatched = {
      actionType: SessionConstants[path],
      response: res
    };
    let send = function(response){
      dispatched.response = dispatched.response || response;
      AppDispatcher.dispatch(dispatched);
    };
    return send;
  },

};

module.exports = SessionActions;
