const React = require('react');
const NavigationContainer = require('./navigation_container');
const SessionStore = require('../../stores/session_store');
const ResourceConstants = require('../../constants/resource_constants');

const ProjectIndex = React.createClass({
  getInitialState: function (){
    return {
              [ResourceConstants.MESSAGES]: "",
              [ResourceConstants.TODOS]: "",
              [ResourceConstants.EVENTS]: "",
              [ResourceConstants.UPLOADS]: ""
                                                      };
  },

  componentDidMount: function(){
    this.resourceListener = ResourceStore.addListener(this._resourceStoreListener);
    ResourceActions.getNavBarResources(SessionStore.userMainProject());
  },

  componentWillUnmount: function () {
    this.resourceListener.remove();
  },

  _resourceStoreListener: function () {
    let messageButton = ResourceStore.first(ResourceConstants.MESSAGES).title;
    let todoCount = ResourceStore.todoCompletionCount();
    let todoButton = `${todoCount[0]}/${todoCount[1]}`;
    let eventButton = ResourceStore.first(ResourceConstants.EVENTS).title;
    this.setState({
                      [ResourceConstants.MESSAGES]: messageButton,
                      [ResourceConstants.TODOS]: todoButton,
                      [ResourceConstants.EVENTS]: eventButton,
                      [ResourceConstants.UPLOADS]: "not ready"
                                                                });
  },

  render: function () {
    let navigation = Object.keys(this.state).map((resource, index) => {
      return (
        <NavigationContainer
         projectId={this.props.params.projectId}
         key={resource}
         className="nav-small-container"
         field={resource}
         contents={this.state[resource]}/>
      );
    });

    return (
      <div className="project-container">
        <div className="nav-container">
          <ul>
            {navigation}
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ProjectIndex;
