const React = require('react');
const NavigationContainer = require('./navigation_container');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;

const ProjectIndex = React.createClass({
  getInitialState: function (){
    return { messages: "hello",
             todos: "hello",
             events: "world",
             uploads: "yay"
            };
  },

  componentDidMount: function(){
    this.resourceListener = ResourceStore.addListener(this._resourceStoreListener);
    ResourceActions.getNavBarResources(SessionStore.userMainProject());
  },

  componentWillUnmount: function(){
    this.resourceListener.remove();
  },

  _resourceStoreListener: function(){
    let messageButton = ResourceStore.first("messages").title;
    let todoCount = ResourceStore.todoCompletionCount();
    let todoButton = `${todoCount[0]}/${todoCount[1]}`;
    let eventButton = ResourceStore.first("events").title;
    this.setState({  messages: messageButton,
                     todos: todoButton,
                     events: eventButton,
                     uploads: "not ready"
                                                    });
  },

  render: function(){
    let navigation = Object.keys(this.state).map((stateContents, index) => {
      return (
        <NavigationContainer
         projectId={this.props.params.projectId}
         key={stateContents}
         className="nav-small-container"
         field={stateContents}
         contents={this.state[stateContents]}/>
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
