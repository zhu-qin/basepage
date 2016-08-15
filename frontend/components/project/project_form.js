const React = require('react');
const ProjectActions = require('../../actions/project_actions');
const ProjectStore = require('../../stores/project_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;


const ProjectForm = React.createClass({
  getInitialState: function () {
    return {
      parentProject: ProjectStore.find(this.props.params.projectId),
      title: "",
      body: "",
    };
  },

  _handleChange: function(field, event){
    return (event) =>{
      event.preventDefault();
      this.setState({[field]: event.target.value});
    };
  },

  componentWillReceiveProps: function (newProps){
    this.setState ({parentProject: ProjectStore.find(newProps.params.projectId)});
  },

  _handleSubmit: function(event){
    event.preventDefault();
    let reply = {
      title: this.state.title,
      body: this.state.body,
      manager_id: SessionStore.getCurrentUser().id,
    };
    ProjectActions.createOneProject(reply);
  },

  render: function () {
    let project = this.state.parentProject;

    return(
      <div className="post-wrapper">
          <div className="project-text-form">
          {project.title}
          {project.body}
        </div>
          <form className="project-form" onSubmit={this._handleSubmit}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:</label>
            <textarea onChange={this._handleChange("body")} value={this.state.body}/>
            <div className="button-wrapper clear-fix">
              <input className="button-form" type="submit" value="Post"/>
              <Link className="button-form" to={`/projects/index`}>Cancel</Link>
            </div>
          </form>
      </div>
    );
  }

});

module.exports = ProjectForm;
