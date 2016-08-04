const React = require('react');
const ResourceStore = require('../../stores/resource_store');
const ResourceActions = require('../../actions/resource_actions');
const ResourceConstants = require('../../constants/resource_constants');

const TodoIndex = React.createClass({
  getInitialState: function () {
    return { todoLists: [],
             todos: []
                           }
  },

  componentDidMount: function () {
    this.resourceListener = ResourceStore.addListener(this._resourceStoreListener);
    ResourceActions.getOneResource(this.props.params.projectId, ResourceConstants.TODOLISTS );
    // ResourceActions.getOneResource(this.props.params.projectId, ResourceConstants.TODOS );
  },

  componentWillUnmount: function (){
    this.resourceListener.remove();
  },

  _resourceStoreListener: function () {
    this.setState({ todoLists: ResourceStore.all(ResourceConstants.TODOLISTS),
                    todos: ResourceStore.all(ResourceConstants.TODOS)
                                                            })
  },

  render: function () {
    let todos = this.state.todoLists.map( (todoList, index) => {
      return (
        <li key={todoList.id}>
          {todoList.title}
        </li>
      )
    });


    return (
      <div className="feature-wrapper">
        TodoIndex
        <ul>
          {todos}
        </ul>
      </div>
    );
  }

});

module.exports = TodoIndex;
