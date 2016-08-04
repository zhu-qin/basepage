const React = require('react');
const NavigationContainer = require('./navigation_container');
const SessionStore = require('../../stores/session_store');

const ProjectIndex = React.createClass({
  getInitialState: function (){
    return { messages: [],
             todos: [],
             events: []
            };
  },

  componentDidMount: function(){
    this.resourceListener = ResourceStore.addListener(this._resourceStoreListener);
    ResourceActions.getResources(SessionStore.getCurrentUser().id);
  },

  componentWillUnmount: function(){
    this.resourceListener.remove();
  },

  _resourceStoreListener: function(){
    this.setState({  messages: ResourceStore.all("messages"),
                     todos: ResourceStore.all("todos"),
                     events: ResourceStore.all("events")
                                                              });
  },


  render: function(){
    let navigation = Object.keys(this.state).map((stateContents, index) => {
      return (<NavigationContainer key={stateContents} className="nav-small-container" field={stateContents} contents={this.state[stateContents] }/>);
    });

    return (
      <div>
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
