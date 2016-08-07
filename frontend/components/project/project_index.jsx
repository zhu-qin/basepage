const React = require('react');
const NavigationContainer = require('./navigation_container');
const SessionStore = require('../../stores/session_store');
const ResourceConstants = require('../../constants/resource_constants');

const ProjectIndex = React.createClass({
  getInitialState: function (){
    return {
              messages: "",
              todos: "",
              events: "",
              uploads: ""
                                      };
  },

  componentDidMount: function(){
    this.resourceListener = ResourceStore.addListener(this._resourceStoreListener);
    ResourceActions.getNavBarResources(SessionStore.userMainProject());
  },

  componentWillUnmount: function () {
    this.resourceListener.remove();
  },

  // _resourceStoreListener: function () {
  //   let messageButton = ResourceStore.first(ResourceConstants.MESSAGES).title;
  //   let todoCount = ResourceStore.todoCompletionCount();
  //   let todoButton = `${todoCount[0]}/${todoCount[1]}`;
  //   let eventButton = ResourceStore.first(ResourceConstants.EVENTS).title;
  //   this.setState({
  //                     messages: messageButton,
  //                     todos: todoButton,
  //                     events: eventButton,
  //                     uploads: "not ready"
  //                                                               });
  // },

  render: function () {
    let navigation = Object.keys(this.state).map((tab, index) => {
      return (
        <NavigationContainer
          key={tab}
          className="nav-small-container"
          button={tab} />
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
