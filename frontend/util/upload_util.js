const UploadConstants = require('../constants/upload_constants');

const UploadUtil = {

  getAllFiles: function (projectId, successCallback) {
    $.ajax({
      type: "GET",
      url: `api/projects/${projectId}/project_documents`,
      success: function (response) {
        successCallback(response);
      }
    });
  },

  uploadFile: function(file, successCallback){
    let projectId = file.get('project_documents[project_id]');
    $.ajax({
      type: "POST",
      url: `api/projects/${projectId}/project_documents`,
      dataType: "json",
      contentType: false,
      processData: false,
      data: file,
      success: function (response) {
        successCallback(response);
      }
    });
  }
};

module.exports = UploadUtil;
