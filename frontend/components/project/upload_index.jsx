const React = require('react');
const SessionStore = require('../../stores/session_store');
const UploadStore = require('../../stores/upload_store');
const UploadActions = require('../../actions/upload_actions');

const UploadIndex = React.createClass({
  getInitialState: function () {
    return {  documents: {},
              title: "",
              file: null,
              fileUrl: ""  };
  },

  componentDidMount: function () {
    UploadStore.addListener(this._storeListener);
    UploadActions.getAllFiles(SessionStore.userMainProject());
  },

  _storeListener: function () {
    this.setState( {documents: UploadStore.all()} );
  },


  _handleChange: function (field, event) {
    return (event) => {
      this.setState({[field]: event.target.value});
    };
  },

  _updateFile: function (event) {
    let file = event.currentTarget.files[0];
    let fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ file: file, fileUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  _handleSubmit: function (event) {
    event.preventDefault();
    let project_id = SessionStore.userMainProject();
    let formData = new FormData();
    formData.append("project_documents[title]", this.state.title);
    formData.append("project_documents[file]", this.state.file);
    formData.append("project_documents[project_id]", project_id);
    UploadActions.uploadFile(formData);
  },


  render: function() {

    let docList = Object.keys(this.state.documents).map((id, index) => {
      return (
        <li key={id}>
          {this.state.documents[id].title}
        </li>
      );
    });
    
    return(
      <div className="feature-wrapper">
        <div className="upload-wrapper">
          <h2>Docs & Files</h2>
          <ul>
            {docList}
          </ul>
          <form onSubmit={this._handleSubmit}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title} />
            </label>
            <img src={this.state.fileUrl} />
            <label>File:
              <input type="file" onChange={this._updateFile} value={this.state.title} />
            </label>
            <input type="submit" value="Upload File" />
          </form>
        </div>
      </div>
    );
  }

});

module.exports = UploadIndex;
