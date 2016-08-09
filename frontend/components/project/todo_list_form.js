const React = require('react');
const TodoListActions = require('../../actions/todo_actions');
const SessionStore = require('../../stores/session_store');

const TodoListForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      body: "",
    };
  },

  _handleChange: function(field, event){
    return (event) =>{
      event.preventDefault();
      this.setState({[field]: event.target.value});
    };
  },

  _handleSubmit: function(event){
    event.preventDefault();
    this.state.project_id = SessionStore.userMainProject();
    this.state.author_id = SessionStore.getCurrentUser().id;
    TodoActions.createOneTodoList(this.state);
  },


  render: function () {
    return(
      <div className="todo-create-form">
        <div>
          <h2>Create a To-do List</h2>
          <form className="todo-form" onSubmit={this._handleSubmit}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:
              <input type="text" onChange={this._handleChange("body")} value={this.state.body}/>
            </label>
            <input className="todo-create-link" type="submit" value="Create To-do List"/>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = TodoListForm;
