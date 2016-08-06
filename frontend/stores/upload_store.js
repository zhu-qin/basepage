const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const UploadConstants = require('../constants/upload_constants');

let _files = {};

const UploadStore = new Store(AppDispatcher);

UploadStore.all = function () {
  return Object.assign({}, _files);
};

UploadStore.resetFiles = function (files) {
  _files = files;
};

UploadStore.addOneFile = function (file) {
  _files[file.id] = file;
};

UploadStore.find = function(id) {
  return Object.assign({}, _files[id]);
};

UploadStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case UploadConstants.RECEIVE_ONE_FILE:
      UploadStore.addOneFile(payload.file);
      UploadStore.__emitChange();
      break;
    case UploadConstants.RECEIVE_ALL_FILES:
      UploadStore.resetFiles(payload.files);
      UploadStore.__emitChange();
      break;
  }
};



module.exports = UploadStore;
