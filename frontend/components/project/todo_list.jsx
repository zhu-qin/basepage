const React = require('react');
const TodoConstants = require('../../constants/todo_constants');
const TodoActions = require('../../actions/todo_actions');
const TodoStore = require('../../stores/todo_store');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;

const TodoList = React.createClass({

  handleCheck: function(event){
    let completion;
    if (event.target.checked) {
      completion = true;
    } else {
      completion = false;
    }
    let todoUpdate = {id: event.target.attributes.data.value, completion: completion };
    TodoActions.updateOneTodo(todoUpdate);
  },

  handleDelete: function (id, event) {
    event.preventDefault();
    TodoActions.deleteTodo(id);
  },

  _redirectToCreateTodo: function () {
    hashHistory.push(`todo_lists/${this.props.todoList.id}/todos`);
  },

  // work on this later to update single todos
  // _redirectToUpdateTodo: function (id, event) {
  //   event.preventDefault();
  //   hashHistory.push(`todos/${id}/edit`);
  // },
  //
  // onClick={this._redirectToUpdateTodo.bind(null, todo.id)}

  render: function () {
    let todos = this.props.todoList.todos;

    let checkedTodos = [];
    let uncheckedTodos = [];
    let todoList = todos.forEach((todo, index) => {
      let checkBox;
      let deleteButton;
      if (todo.completion) {
        checkBox = "checked";
        deleteButton = <button className="button-delete" onClick={this.handleDelete.bind(null, todo.id)}>Delete</button>;
      }
      let todoToShow = (
        <li className="todo-list-item clear-fix" key={todo.id}>
          <input  type="checkbox" data={todo.id} defaultChecked={checkBox} onClick={this.handleCheck}/>
          {deleteButton}
          <p className="todo-list-link" >{todo.title}</p>
        </li>
      );

      if (todo.completion) {
        checkedTodos.push(todoToShow);
      } else {
        uncheckedTodos.push(todoToShow);
      }
    });
    return (
      <li>
        <Link to={`/todo_lists/${this.props.todoList.id}/edit`} className="todo-link">
          {this.props.todoList.title}
        </Link>
        <ul>
          {uncheckedTodos}
          <button onClick={this._redirectToCreateTodo} className="button-add-todo button-main">Add a to-do</button>
          {checkedTodos}
        </ul>
      </li>
    );
  }
});

module.exports = TodoList;
