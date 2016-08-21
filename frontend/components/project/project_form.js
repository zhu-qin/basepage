const React = require('react');
const ProjectActions = require('../../actions/project_actions');
const ProjectStore = require('../../stores/project_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;


const ProjectForm = React.createClass({
  getInitialState: function () {
    return {
      project: ProjectStore.find(this.props.params.projectId),
      title: "",
      description: "",
    };
  },

  _handleChange: function(field, event){
    return (event) =>{
      event.preventDefault();
      this.setState({[field]: event.target.value});
    };
  },

  componentWillReceiveProps: function (newProps){
    this.setState ({project: ProjectStore.find(newProps.params.projectId)});
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

  render: function () {
    let project = this.state.project;
    let submit = this._handleSubmit;
    let buttonValue = "Create";
    if (this.props.params.projectId) {
      submit = this.handleUpdate;
      buttonValue = "Update";
    }



    return(
      <div className="post-wrapper">
          <div className="project-text-form">
          {project.title}
          {project.body}
        </div>
          <form className="project-form" onSubmit={submit}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:</label>
            <textarea onChange={this._handleChange("description")} value={this.state.description}/>
            <div className="button-wrapper clear-fix">
              <input className="button-form" type="submit" value={buttonValue}/>
              <Link className="button-form" to={`/projects/index`}>Cancel</Link>
            </div>
          </form>
      </div>
    );
  }

});

module.exports = ProjectForm;
