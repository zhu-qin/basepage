const React = require('react');
const TodoActions = require('../../actions/todo_actions');
const TodoStore = require('../../stores/todo_store');
const SessionStore = require('../../stores/session_store');
const ProjectStore = require('../../stores/project_store');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;

const TodoListForm = React.createClass({
  getInitialState: function () {
    return { todoList: {title: "", body: ""},
             redirect: false
                                              };
  },

  componentDidMount: function () {
    let id = this.props.params.todoListId;
    let list = TodoStore.findList(id);
    if (Object.keys(list).length > 0) {
      this.setState( {todoList: list} );
    }
  },

  componentWillUnmount: function (){
    if (this.state.redirect) {
      this.storeListener.remove();
    }
  },

  componentWillReceiveProps: function (newProps) {
    let id = newProps.params.todoListId;
    if (id) {
      this.setState( {todoList: TodoStore.findList(id)} );
    } else {
      this.setState( {todoList: {title: "", body: ""} } );
    }
  },

  _handleChange: function(field, event){
    return (event) =>{
      event.preventDefault();
      this.setState( {todoList: Object.assign(this.state.todoList, {[field]: event.target.value})} );
    };
  },

  _handleSubmit: function(event){
    event.preventDefault();
    this.state.todoList.project_id = ProjectStore.getCurrentProject().id;
    this.state.todoList.author_id = SessionStore.getCurrentUser().id;
    TodoActions.createOneTodoList(this.state.todoList);
    this.setState( {todoList: {title: "", body: ""}} );
  },

  _todoStoreListener: function () {
    hashHistory.push(`projects/${ProjectStore.getCurrentProject().id}/todos_index`);
  },

  _handleUpdate: function (id, event) {
    event.preventDefault();
    this.storeListener = TodoStore.addListener(this._todoStoreListener);
    this.setState({ redirect: true });
    TodoActions.updateTodoList(this.state.todoList);
  },

  _handleDelete: function (id, event) {
    event.preventDefault();
    this.storeListener = TodoStore.addListener(this._todoStoreListener);
    this.setState({ redirect: true });
    TodoActions.destroyList(id);
  },

  render: function () {

    let buttonValue = "Create";
    let callback = this._handleSubmit;
    let destroyList = "";


    if (this.state.todoList.id) {
      buttonValue = "Update";
      callback = this._handleUpdate.bind(null, this.state.todoList.id);
      destroyList = (<button className="button-form" onClick={this._handleDelete.bind(null, this.state.todoList.id)}>Delete</button>);
    }

    return(
      <div className="post-wrapper">
        <div>
          <h2>{buttonValue} To-do List</h2>
          <form className="todo-form clear-fix" onSubmit={callback}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.todoList.title}/>
            </label>
            <label>Body:</label>
            <textarea onChange={this._handleChange("body")} value={this.state.todoList.body}/>
            <div className="button-wrapper clear-fix">
              <input className="button-form" type="submit" value={buttonValue}/>
              {destroyList}
            </div>
          </form>
          <Link className="form-x-box" to={`projects/${ProjectStore.getCurrentProject().id}/todos_index`}></Link>
        </div>
      </div>
    );
  }

});

module.exports = TodoListForm;
