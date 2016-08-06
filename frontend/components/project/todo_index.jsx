const React = require('react');
const TodoStore = require('../../stores/todo_store');
const TodoActions = require('../../actions/todo_actions');
const TodoConstants = require('../../constants/todo_constants');
const Link = require('react-router').Link;
const TodoList = require('./todo_list');

const TodoIndex = React.createClass({
  getInitialState: function () {
    return { todoLists: {} };
  },

  componentDidMount: function () {
    this.todoListener = TodoStore.addListener(this._todoStoreListener);
    TodoActions.getTodos(this.props.params.projectId);
  },

  componentWillUnmount: function (){
    this.todoListener.remove();
  },

  _todoStoreListener: function () {
    this.setState( {todoLists: TodoStore.all() });
  },

  render: function () {
    let todoLists = this.state.todoLists;
    let allLists = Object.keys(todoLists).map((listId, index) => {
      return (
        <TodoList key={listId} todoList={todoLists[parseInt(listId)]} />
      );
    });
    return (
      <div className="feature-wrapper">
        <div className="todo-wrapper">
          <h2>To-dos</h2>
          <ul className="todo-lists">
            {allLists}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = TodoIndex;
