const React = require('react');
const TodoActions = require('../../actions/todo_actions');
const SessionStore = require('../../stores/session_store');
// const hashHistory = require('react-router').hashHistory;
// hashHistory.push(`/projects/${SessionStore.userMainProject()}/TODOS_index`);

const TodoForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      body: "",
      assign_to_id: ""
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
    this.state.todo_list_id = this.props.params.todoListId;
    this.state.author_id = SessionStore.getCurrentUser().id;
    TodoActions.createOneTodo(this.state);
  },


  render: function () {
    return(
      <div className="todo-create-form">
        <div className="message-wrapper">
          <h2>Create a to-do</h2>
          <form className="todo-form" onSubmit={this._handleSubmit}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:
              <input type="text" onChange={this._handleChange("body")} value={this.state.body}/>
            </label>
            <label>Assign To:
              <input type="text" onChange={this._handleChange("assign_to_id")} value={this.state.assign_to_id}/>
            </label>
            <input className="todo-create-link" type="submit" value="Add a to-do"/>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = TodoForm;
