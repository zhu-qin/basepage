const React = require('react');
const ProjectMembershipActions = require('../../actions/project_membership_actions');
const ProjectMembershipStore = require('../../stores/project_membership_store');
const ProjectStore = require('../../stores/project_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;


const ProjectMembershipForm = React.createClass({
  getInitialState: function () {
    return { username: "", email: "", project_id: ""};
  },

  componentDidMount: function (){
    if (this.props.params.projectMembershipId) {
      this.setState(ProjectMembershipStore.find(this.props.params.projectMembershipId));
    }
  },

  componentWillReceiveProps: function (newProps){
    this.setState (ProjectMembershipStore.find(newProps.params.projectMembershipId));
  },

  _handleChange: function(field, event){
    return (event) =>{
      event.preventDefault();
      this.setState({[field]: event.target.value});
    };
  },

  _handleSubmit: function(event){
    event.preventDefault();
    let membership = {
      alias: this.state.alias,
      email: this.state.email,
      project_id: ProjectStore.getCurrentProject().id,
    };
    ProjectMembershipActions.createProjectMembership(membership);
  },

  _handleUpdate: function (event) {
    event.preventDefault();
    ProjectMembershipActions.updateProjectMembership(this.state);
  },

  _handleDelete: function (event) {
    event.preventDefault();
    ProjectMembershipActions.deleteProjectMembership(this.state);
  },

  render: function () {
    let submit = this._handleSubmit;
    let buttonValue = "Add";
    let deleteButton;

    if (this.props.params.projectMembershipId) {
      submit = this._handleUpdate;
      buttonValue = "Update";
      deleteButton = <button className="button-form" onClick={this._handleDelete}>Delete</button>;
    }



    return(
      <div className="post-wrapper">
        <div className="project-text-form">
          {buttonValue} Member
        </div>
          <form className="project-form" onSubmit={submit}>
            <label>Name:
              <input type="text" onChange={this._handleChange("alias")} value={this.state.alias}/>
            </label>
            <label>Email:</label>
            <textarea onChange={this._handleChange("email")} value={this.state.email}/>
            <div className="button-wrapper clear-fix">
              <input className="button-form" type="submit" value={buttonValue}/>
              <Link className="button-form" to={`/projects/${ProjectStore.getCurrentProject().id}/project_memberships_index`}>Cancel</Link>
              {deleteButton}
            </div>
          </form>
      </div>
    );
  }

});

module.exports = ProjectMembershipForm;
