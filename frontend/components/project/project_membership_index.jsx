const React = require('react');
const SessionStore = require('../../stores/session_store');
const ProjectStore = require('../../stores/project_store');
const ProjectMembershipStore = require('../../stores/project_membership_store');
const ProjectMembershipActions = require('../../actions/project_membership_actions');
const hashHistory = require('react-router').hashHistory;
const PusherStore = require('../../pusher/pusher_store');

const ProjectMembershipIndex = React.createClass({
  getInitialState: function () {
    return { projectMemberships: null};
  },

  componentDidMount: function () {
    this.storeListener = ProjectMembershipStore.addListener(this.projectMembershipStoreListener);
    ProjectMembershipActions.getAllProjectMemberships(ProjectStore.getCurrentProject().id);
  },

  projectMembershipStoreListener: function () {
    this.setState( {projectMemberships: ProjectMembershipStore.all()} );

  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  _redirectToAddProjectMembership: function (){
    hashHistory.push('/project_memberships/new');
  },

  _redirectToEditProjectMembership: function (membershipId, event) {
    hashHistory.push(`/project_memberships/${membershipId}/edit`);
  },

  _goToProjectMembership: function (membershipId, event) {
    ProjectMembershipActions.setCurrentProjectMembership(membershipId);
    hashHistory.push(`/project_memberships/${membershipId}`);
  },

  render: function() {
    let pending = [];
    let members = [];
    let manager = [];

    if (this.state.projectMemberships) {
      Object.keys(this.state.projectMemberships).forEach((membershipId, index) => {
        let projectMembership = this.state.projectMemberships[membershipId];

        let edit;
        if(ProjectStore.getCurrentProject().manager_id === SessionStore.getCurrentUser().id && membershipId !== "manager"){
          edit = (<div className="projectMembership-list-item-edit" onClick={this._redirectToEditProjectMembership.bind(null, membershipId)}>Edit</div>);
        }
        let name = projectMembership.alias;
        if (projectMembership.username) {
          name = projectMembership.username;
        }
        let listItem = (
          <li key={membershipId} className="projectMembership-list-item clear-fix" >
              <div className="projectMembership-list-item-text" onClick={this._goToProjectMembership.bind(null, membershipId)}>
                <h2>Name: {name}</h2>
                <h2>Email: {projectMembership.email}</h2>
              </div>
              {edit}
          </li>
        );

        if (membershipId === "manager") {
          manager.push(listItem);
        } else if (projectMembership.username) {
          members.push(listItem);
        } else {
          pending.push(listItem);
        }

      });
    }

    let projectManager = (
      <div className="projectMembership-list-wrapper">
        <h2>Manager</h2 >
        <ul className="projectMembership-wrapper">
          {manager}
        </ul>
      </div>
    );

    let signedUpMembers = (
      <div className="projectMembership-list-wrapper">
        <h2>Members</h2 >
        <ul className="projectMembership-wrapper">
          {members}
        </ul>
      </div>
    );

    let pendingSignUp = (
      <div className="projectMembership-list-wrapper">
        <h2>Pending</h2 >
        <ul className="projectMembership-wrapper">
          {pending}
        </ul>
      </div>
    );

    if (members.length === 0) {
      signedUpMembers = undefined;
    }

    if (pending.length === 0) {
      pendingSignUp = undefined;
    }

    return(
      <div className="feature-wrapper clear-fix">
        <div>
          <h2>Team</h2>
          <button className="feature-add-button" onClick={this._redirectToAddProjectMembership}>Add Member</button>
          <div className="form-place-holder">
            {this.props.children}
          </div>
            {projectManager}
            {signedUpMembers}
            {pendingSignUp}
        </div>
      </div>
    );
  }

});

module.exports = ProjectMembershipIndex;
