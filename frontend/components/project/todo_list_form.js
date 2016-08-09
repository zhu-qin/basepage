const React = require('react');
const TodoListActions = require('../../actions/todo_actions');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;

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
      <div className="post-wrapper">
        <div>
          <h2>Create a To-do List</h2>
          <form className="todo-form" onSubmit={this._handleSubmit}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:
              <input type="textarea" onChange={this._handleChange("body")} value={this.state.body}/>
            </label>
            <input className="button-form" type="submit" value="Create To-do List"/>
            <Link to={`projects/${SessionStore.userMainProject()}/todos_index`} className="button-form" >Cancel</Link>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = TodoListForm;
