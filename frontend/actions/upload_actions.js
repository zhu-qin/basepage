const UploadUtil = require('../util/upload_util');
const UploadConstants = require('../constants/upload_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

const UploadActions = {

  getAllFiles: function (projectId) {
    UploadUtil.getAllFiles(projectId, UploadActions.receiveAllFiles);
  },

  receiveAllFiles: function (files) {
    AppDispatcher.dispatch({
      actionType: UploadConstants.RECEIVE_ALL_FILES,
      files: files
    });
  },

  uploadFile: function(file){
    UploadUtil.uploadFile(file, UploadActions.receiveOneFile);
  },

  receiveOneFile: function(file){
    console.log(file);
    AppDispatcher.dispatch({
      actionType: UploadConstants.RECEIVE_ONE_FILE,
      file: file
    });
  }


};


module.exports = UploadActions;
