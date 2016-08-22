const React = require('react');
const ProjectActions = require('../../actions/project_actions');
const ProjectStore = require('../../stores/project_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;


const ProjectForm = React.createClass({
  getInitialState: function () {
    return { title: "", description: "" };
  },

  componentDidMount: function (){
    if (this.props.params.projectId) {
      this.setState(ProjectStore.find(this.props.params.projectId));
    }
  },

  componentWillReceiveProps: function (newProps){
    this.setState (ProjectStore.find(newProps.params.projectId));
  },

  _handleChange: function(field, event){
    return (event) =>{
      event.preventDefault();
      this.setState({[field]: event.target.value});
    };
  },

  _handleSubmit: function(event){
    event.preventDefault();
    let project = {
      title: this.state.title,
      description: this.state.description,
      manager_id: SessionStore.getCurrentUser().id,
    };
    ProjectActions.createProject(project);
  },

  _handleUpdate: function (event) {
    event.preventDefault();
    ProjectActions.updateProject(this.state);
  },

  _handleDelete: function (event) {
    event.preventDefault();
    ProjectActions.deleteProject(this.state);
  },

  render: function () {
    let submit = this._handleSubmit;
    let buttonValue = "Create";
    let deleteButton = "";

    if (this.props.params.projectId) {
      submit = this._handleUpdate;
      buttonValue = "Update";
      deleteButton = <button className="button-form" onClick={this._handleDelete}>Delete</button>;
    }



    return(
      <div className="post-wrapper">
          <div className="project-text-form">
          {this.state.title}
          {this.state.description}
        </div>
          <form className="project-form" onSubmit={submit}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Description:</label>
            <textarea onChange={this._handleChange("description")} value={this.state.description}/>
            <div className="button-wrapper clear-fix">
              <input className="button-form" type="submit" value={buttonValue}/>
              <Link className="button-form" to={`/projects/index`}>Cancel</Link>
              {deleteButton}
            </div>
          </form>
      </div>
    );
  }

});

module.exports = ProjectForm;
