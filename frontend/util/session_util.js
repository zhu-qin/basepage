const SessionConstants = require('../constants/session_constants');

const SessionUtil = {
  signIn: function(signIn, successCallback, errorCallback){
    $.ajax({
      type: "POST",
      url: "api/session",
      dataType: "JSON",
      data: {user: signIn},
      success: function(response){
        successCallback(response);
      },
      error: function(response){
        errorCallback(response);
      }
    });
  },

  signOut: function(successCallback, errorCallback){
    $.ajax({
      type: "DELETE",
      url: "api/session",
      dataType: "JSON",
      success: function(response){
        successCallback(response);
      },
      error: function(response){
        errorCallback(response);
      }
    });
  },

  signUp: function(signUp, successCallback, errorCallback){
    $.ajax({
      type: "POST",
      url: "api/users",
      dataType: "JSON",
      data: {user: signUp},
      success: function(response){
        successCallback(response);
      },
      error: function(response){
        errorCallback(response);
      }
    });
  }

};

module.exports = SessionUtil;
