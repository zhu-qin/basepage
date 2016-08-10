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

  render: function () {

    let todos = this.props.todoList.todos;
    let completedTodos = 0;

    let checkedTodos = [];
    let uncheckedTodos = [];


    let todoList = todos.forEach((todo, index) => {
      let checkBox;
      let deleteButton;
      if (todo.completion) {
        completedTodos += 1;
        checkBox = "checked";
        deleteButton = <button className="button-delete" onClick={this.handleDelete.bind(null, todo.id)}>Delete</button>;
      }
      let todoToShow = (
        <li className="todo-list-item" key={todo.id}>
          <input className="checkbox" type="checkbox" data={todo.id} defaultChecked={checkBox} onClick={this.handleCheck}/>
          {deleteButton}
          {todo.title}
        </li>
      );

      if (todo.completion) {
        checkedTodos.push(todoToShow);
      } else {
        uncheckedTodos.push(todoToShow);
      }

    });

      // let todoCompleteCount = <div className="todo-completed-count">{`${completedTodos}/${todos.length}`}</div>;

    return (
      <li>
        <Link to={`/todo_lists/${this.props.todoList.id}/edit`} className="todo-link">
          {this.props.todoList.title}
        </Link>
        <ul>
          {uncheckedTodos}
          <button onClick={this._redirectToCreateTodo} className="todo-create-link">Add a to-do</button>
          {checkedTodos}
        </ul>
      </li>
    );
  }
});

module.exports = TodoList;
