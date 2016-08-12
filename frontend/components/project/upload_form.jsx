const React = require('react');
const UploadActions = require('../../actions/upload_actions');
const UploadStore = require('../../stores/upload_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;

const UploadForm = React.createClass({
  getInitialState: function () {
    return {  documents: null,
              title: "",
              file: null,
              fileUrl: ""  };
  },

  componentDidMount: function () {
    this.storeListener = UploadStore.addListener(this._uploadStoreListener);
    UploadActions.getAllFiles(SessionStore.userMainProject());
  },

  _uploadStoreListener: function () {
    this.setState( {documents: UploadStore.all()} );
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
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
    let project_id = SessionStore.userMainProject();
    let formData = new FormData();
    formData.append("project_documents[title]", this.state.title);
    formData.append("project_documents[project_doc]", this.state.file);
    formData.append("project_documents[project_id]", project_id);
    UploadActions.uploadFile(formData);
    hashHistory.push(`/projects/${SessionStore.userMainProject()}/uploads_index`);
  },

  render: function () {
    let button = <input className="button-form" type="submit" value="Upload"/>;
    let callback = this._handleSubmit;

    return(
      <div className="post-wrapper">
          <h2>Upload File</h2>
          <form className="upload-form clear-fix" onSubmit={callback}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:</label>
            <div className="upload-preview"><img src={this.state.fileUrl} /></div>
            <div className="button-wrapper clear-fix">
              <label>File:
                <input type="file" className="button-form" onChange={this._previewFile}/>
              </label>

              {button}
              <Link className="button-form" to={`/projects/${SessionStore.userMainProject()}/uploads_index`}>Cancel</Link>
            </div>
          </form>
      </div>
    );
  }

});

module.exports = UploadForm;
