const React = require('react');
const NavigationContainer = require('./navigation_container');

const ProjectIndex = React.createClass({
  getInitialState: function (){
    return { messages: [],
             todos: [],
             schedule: []
            };
  },

  componentDidMount: function(){
    ResourceStore.addListener(this._resourceStoreListener);
    ResourceActions.getResources();
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
