const React = require('react');
const TodoStore = require('../../stores/todo_store');
const SessionStore = require('../../stores/session_store');
const TodoActions = require('../../actions/todo_actions');
const TodoConstants = require('../../constants/todo_constants');
const ProjectStore = require('../../stores/project_store');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;
const PusherStore = require('../../pusher/pusher_store');

const TodoIndex = React.createClass({
  getInitialState: function () {
    return { todoLists: {}};
  },

  componentDidMount: function () {
    let projectId = ProjectStore.getCurrentProject().id;
    this.todoListener = TodoStore.addListener(this._todoStoreListener);
    TodoActions.getTodos(projectId);

    this.pusherChannel = PusherStore.getChannelForCurrentProject();
    this.pusherChannel.bind('update_todos', function(data) {
      TodoActions.getPusherTodoStatus(data);
    });
  },

  componentWillUnmount: function (){
    this.todoListener.remove();
    this.pusherChannel.unbind('update_todos');
  },

  _todoStoreListener: function () {
    this.setState( {todoLists: TodoStore.all() });
  },

  _redirectToCreateTodoList: function (event){
    event.preventDefault();
    hashHistory.push(`projects/${ProjectStore.getCurrentProject().id}/todo_list_new`);
  },

  // todo methods
  handleCheck: function(todoId, event){
    let completion;
    if (event.target.className === "todo-list-item-box todo-unchecked") {
      completion = true;
    } else {
      completion = false;
    }
    let todoUpdate = {id: todoId, completion: completion };
    TodoActions.updateOneTodo(todoUpdate);
  },

  handleDelete: function (id, event) {
    event.preventDefault();
    TodoActions.deleteTodo(id);
  },

  _redirectToCreateTodo: function (listId) {
    hashHistory.push(`todo_lists/${listId}/todos`);
  },

  render: function () {
    let todoLists = this.state.todoLists;
    let todoCountAll = 0;
    let todoCountCompleted = 0;

    let allLists = Object.keys(todoLists).map((listId, index) => {
        let checkedTodos = [];
        let uncheckedTodos = [];
        let todos = todoLists[listId].todos;
        if (Object.keys(todos).length > 0) {
            Object.keys(todos).forEach((todoId, index) => {
              let deleteButton;
              let checked = "todo-unchecked";
              if (todos[todoId].completion) {
                checked = "todo-checked";
                deleteButton = <button className="todo-list-item-delete" onClick={this.handleDelete.bind(null, todoId)}>Delete</button>;
              }
              let todoToShow = (
                <li className="todo-list-item clear-fix" key={todoId}>
                  <div className={`todo-list-item-box ${checked}`} onClick={this.handleCheck.bind(null, todoId)} ></div>
                  {deleteButton}
                  <p className="todo-list-link" >{todos[todoId].title}</p>
                </li>
              );

              if (todos[todoId].completion) {
                checkedTodos.push(todoToShow);
              } else {
                uncheckedTodos.push(todoToShow);
              }
            });
        }

        todoCountAll += checkedTodos.length + uncheckedTodos.length;
        todoCountCompleted += checkedTodos.length;

        return (
          <li key={listId}>
            <Link to={`/todo_lists/${listId}/edit`} className="todo-link">
              {todoLists[listId].title}
            </Link>
            <ul>
              {uncheckedTodos}
              <div className="clear-fix">
                <button onClick={this._redirectToCreateTodo.bind(null, listId)} className="button-add-todo button-main">Add a to-do</button>
              </div>
              {checkedTodos}
            </ul>
          </li>
        );
    });



    return (
      <div className="feature-wrapper clear-fix">
        <div className="todo-wrapper">
          <h2>To-dos {`${todoCountCompleted}/${todoCountAll}`}</h2>
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
