const React = require('react');
const TodoStore = require('../../stores/todo_store');
const SessionStore = require('../../stores/session_store');
const TodoActions = require('../../actions/todo_actions');
const TodoConstants = require('../../constants/todo_constants');
const TodoList = require('./todo_list');
const ProjectStore = require('../../stores/project_store');
const hashHistory = require('react-router').hashHistory;

const TodoIndex = React.createClass({
  getInitialState: function () {
    return { todoLists: {}, todoCount: "0/0" };
  },

  componentDidMount: function () {
    this.todoListener = TodoStore.addListener(this._todoStoreListener);
    this.countListener = TodoStore.addListener(this._countListener);
    TodoActions.getTodos(ProjectStore.getCurrentProject().id);

    this.pusher = new Pusher('4b389f8a160265cfaaa3', {
      encrypted: true
    });

    var channel = this.pusher.subscribe(`project_${ProjectStore.getCurrentProject().id}`);
    channel.bind('update_todos', function(data) {
      TodoActions.getTodos(ProjectStore.getCurrentProject().id);
    });
  },

  componentWillUnmount: function (){
    this.todoListener.remove();
    this.countListener.remove();
    this.pusher.unsubscribe(`project_${ProjectStore.getCurrentProject().id}`);
  },

  _countListener: function(array) {
    this.setState({todoCount: TodoStore.todoCount()});
  },

  _todoStoreListener: function () {
    this.setState( {todoLists: TodoStore.all() });
  },

  _redirectToCreateTodoList: function (event){
    event.preventDefault();
    hashHistory.push(`projects/${ProjectStore.getCurrentProject().id}/todo_list_new`);
  },

  render: function () {
    let todoLists = this.state.todoLists;
    let allLists = Object.keys(todoLists).map((listId, index) => {
      return (
        <TodoList key={listId} todoList={todoLists[parseInt(listId)]} />
      );
    });

    return (
      <div className="feature-wrapper clear-fix">
        <div className="todo-wrapper">
          <h2>To-dos {this.state.todoCount}</h2>
          <button className="feature-add-button" onClick={this._redirectToCreateTodoList}>Add a To-do List</button>
          <div className="form-place-holder">
            {this.props.children}
          </div>
          <ul className="todo-lists">
            {allLists}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = TodoIndex;
