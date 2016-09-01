const React = require('react');
const SessionStore = require('../../stores/session_store');
const UploadStore = require('../../stores/upload_store');
const ProjectStore = require('../../stores/project_store');
const UploadActions = require('../../actions/upload_actions');
const hashHistory = require('react-router').hashHistory;

const UploadIndex = React.createClass({
  getInitialState: function () {
    return { documents: {} };
  },

  componentDidMount: function () {
    this.storeListener = UploadStore.addListener(this._uploadStoreListener);
    UploadActions.getAllFiles(ProjectStore.getCurrentProject().id);
  },

  _uploadStoreListener: function () {
    this.setState( {documents: UploadStore.all()} );
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  _redirectToUpLoad: function (){
    hashHistory.push('/uploads/new_file');
  },

  render: function() {

    let fullView;

    if (Object.keys(this.state.documents).length > 0) {
      fullView = Object.keys(this.state.documents).map((id, index) => {
        let doc = this.state.documents[id];
        return (
          <li key={id} className="upload-list-item">
            <a href={this.state.documents[id].project_doc} target="_blank">
              <div>{this.state.documents[id].title}</div>
              <embed src={doc.project_doc} type={doc.content_type} className="upload-preview-embed"/>
            </a>
          </li>
        );
      });
    }

    return(
      <div className="feature-wrapper clear-fix">
        <div className="upload-wrapper">
          <h2>Docs & Files</h2>
            <button className="feature-add-button" onClick={this._redirectToUpLoad}>Add Files</button>
            <div className="form-place-holder">
              {this.props.children}
            </div>
            <div className="upload-file-wrapper">
              {fullView}
            </div>
        </div>
      </div>
    );
  }

});

module.exports = UploadIndex;
