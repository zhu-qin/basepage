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

  uploadFile: function(project_doc, successCallback){
    $.ajax({
      type: "POST",
      url: `api/projects/${project_doc.get('project_doc[project_id]')}/project_documents`,
      dataType: "json",
      contentType: false,
      processData: false,
      data: project_doc,
      success: function (response) {
        successCallback(response);
      }
    });
  }
};

module.exports = UploadUtil;
