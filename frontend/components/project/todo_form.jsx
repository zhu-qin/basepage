const React = require('react');
const TodoActions = require('../../actions/todo_actions');
const TodoStore = require('../../stores/todo_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;

const TodoForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      body: "",
      assign_to_id: ""
    };
  },

  _handleChange: function (field, event) {
    return (event) =>{
      event.preventDefault();
      this.setState({[field]: event.target.value});
    };
  },

  // work on this later make sure to change the way the store works
  // componentWillReceiveProps: function (newProps){
  //   let todo = newProps.params.todoId;
  // },

  _handleSubmit: function (event) {
    event.preventDefault();
    this.state.todo_list_id = this.props.params.todoListId;
    this.state.author_id = SessionStore.getCurrentUser().id;
    TodoActions.createOneTodo(this.state);
    this.setState({title:"", body:""});
  },

  render: function () {
    let button = <input className="button-form" type="submit" value="Add to-do"/>;
    let callback = this._handleSubmit;

    return(
      <div className="post-wrapper">
          <h2>Create a to-do</h2>
          <form className="todo-form clear-fix" onSubmit={callback}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:</label>
            <textarea onChange={this._handleChange("body")} value={this.state.body}/>
            <label>Assign To:
              <input type="text" onChange={this._handleChange("assign_to_id")} value={this.state.assign_to_id}/>
            </label>
            <div className="button-wrapper clear-fix">
              {button}
              <Link className="button-form" to={`/projects/${SessionStore.userMainProject()}/todos_index`}>Cancel</Link>
            </div>
          </form>
      </div>
    );
  }

});

module.exports = TodoForm;
