const React = require('react');
const UploadActions = require('../../actions/upload_actions');
const UploadStore = require('../../stores/upload_store');
const SessionStore = require('../../stores/session_store');
const ProjectStore = require('../../stores/project_store');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;

const UploadForm = React.createClass({
  getInitialState: function () {
    return {  documents: null,
              title: "",
              file: null,
              fileUrl: ""  };
  },

  _handleChange: function (field, event) {
    return (event) => {
      this.setState({[field]: event.target.value});
    };
  },

  _previewFile: function (event) {
    let file = event.currentTarget.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ file: file, fileUrl: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ fileUrl: "", file: null });
    }
  },

  _handleSubmit: function (event) {
    event.preventDefault();
    let project_id = ProjectStore.getCurrentProject().id ;
    let formData = new FormData();
    formData.append("project_documents[title]", this.state.title);
    formData.append("project_documents[project_doc]", this.state.file);
    formData.append("project_documents[project_id]", project_id);
    UploadActions.uploadFile(formData);
    hashHistory.push(`/projects/${project_id}/uploads_index`);
  },

  render: function () {
    let button = <input className="button-form" type="submit" value="Upload"/>;
    let callback = this._handleSubmit;

    let embedded;
    if(this.state.file) {
      embedded = <embed src={this.state.fileUrl} type={this.state.file.type} className="upload-preview-embed"/>;
    }

    return(
      <div className="post-wrapper">
          <h2>Upload File</h2>
          <form className="upload-form clear-fix" onSubmit={callback}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:</label>
            <div className="upload-preview">{embedded}</div>
            <div className="button-wrapper clear-fix">
              <label>File:
                <input type="file" className="upload-preview-button-form" onChange={this._previewFile}/>
              </label>
              {button}
              <Link className="button-form" to={`/projects/${ProjectStore.getCurrentProject().id}/uploads_index`}>Cancel</Link>
            </div>
          </form>
      </div>
    );
  }

});

module.exports = UploadForm;
