const React = require('react');
const TodoListActions = require('../../actions/todo_actions');
const TodoStore = require('../../stores/todo_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;

const TodoListForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      body: "",
    };
  },

  componentDidMount: function () {
    let id = this.props.params.todoListId;
    if (id) {
      let todoList = TodoStore.findList(id);
      this.setState(todoList);
    }
  },

  componentWillReceiveProps: function (newProps) {
    let id = newProps.params.todoListId;
    if (id) {
      let todoList = TodoStore.findList(id);
      this.setState(todoList);
    } else {
      this.setState( {title: "", body: ""} );
    }
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

  _handleUpdate: function (event) {
    event.preventDefault();
    TodoActions.updateTodoList(this.state);
  },

  _handleDelete: function (id, event) {
    event.preventDefault();
    TodoActions.destroyList(id);
  },

  render: function () {

    let buttonValue = "Create To-do List";
    let callback = this._handleSubmit;
    let destroyList = "";

    if (this.props.params.todoListId) {
      buttonValue = "Update To-do List";
      callback = this._handleUpdate;
      destroyList = (<button className="button-form" onClick={this._handleDelete.bind(null, this.props.params.todoListId)}>Delete List</button>);
    }

    return(
      <div className="post-wrapper">
        <div>
          <h2>{buttonValue}</h2>
          <form className="todo-form" onSubmit={callback}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:
              <input type="textarea" onChange={this._handleChange("body")} value={this.state.body}/>
            </label>
            <input className="button-form" type="submit" value={buttonValue}/>
            <Link className="button-form" to={`projects/${SessionStore.userMainProject()}/todos_index`} >Cancel</Link>
            {destroyList}
          </form>
        </div>
      </div>
    );
  }

});

module.exports = TodoListForm;
