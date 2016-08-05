const React = require('react');
const ResourceStore = require('../../stores/resource_store');
const ResourceActions = require('../../actions/resource_actions');
const ResourceConstants = require('../../constants/resource_constants');
const Link = require('react-router').Link;
const TodoList = require('./todo_list');

const TodoIndex = React.createClass({
  getInitialState: function () {
    return { [ResourceConstants.TODOLISTS]: [] }
  },

  componentDidMount: function () {
    this.resourceListener = ResourceStore.addListener(this._resourceStoreListener);
    ResourceActions.getOneResource(this.props.params.projectId, ResourceConstants.TODOLISTS );
  },

  componentWillUnmount: function (){
    this.resourceListener.remove();
  },

  _resourceStoreListener: function () {
    this.setState({ [ResourceConstants.TODOLISTS]: ResourceStore.all(ResourceConstants.TODOLISTS),                                                                                              })
  },

  render: function () {
    let todoLists = this.state[ResourceConstants.TODOLISTS].map( (todoList, index) => {
      return (
        <TodoList key={index} todoList={todoList} />
      )
    });


    return (
      <div className="feature-wrapper">
        <div className="todo-wrapper">
          <h2>TodoIndex</h2>
          <ul className="todo-lists">
            {todoLists}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = TodoIndex;
