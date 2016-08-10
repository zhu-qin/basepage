const React = require('react');
const TodoListActions = require('../../actions/todo_actions');
const TodoStore = require('../../stores/todo_store');
const SessionStore = require('../../stores/session_store');
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

  _todoStoreListener: function (id) {
    let todoList = TodoStore.findList(id);
    if (Object.keys(todoList).length === 0) {
      hashHistory.push(`projects/${SessionStore.userMainProject()}/todos_index`);
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
    this.state.todoList.project_id = SessionStore.userMainProject();
    this.state.todoList.author_id = SessionStore.getCurrentUser().id;
    TodoActions.createOneTodoList(this.state.todoList);
    this.setState( {todoList: {title: "", body: ""}} );
  },

  _handleUpdate: function (event) {
    event.preventDefault();
    TodoActions.updateTodoList(this.state.todoList);
  },

  _handleDelete: function (id, event) {
    event.preventDefault();
    this.storeListener = TodoStore.addListener(this._todoStoreListener);
    this.setState({ redirect: true });
    TodoActions.destroyList(id);
  },

  render: function () {

    let buttonValue = "Create To-do List";
    let callback = this._handleSubmit;
    let destroyList = "";


    if (this.state.todoList.id) {
      buttonValue = "Update To-do List";
      callback = this._handleUpdate;
      destroyList = (<button className="button-form" onClick={this._handleDelete.bind(null, this.state.todoList.id)}>Delete List</button>);
    }

    return(
      <div className="post-wrapper">
        <div>
          <h2>{buttonValue}</h2>
          <form className="todo-form" onSubmit={callback}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.todoList.title}/>
            </label>
            <label>Body:
              <input type="textarea" onChange={this._handleChange("body")} value={this.state.todoList.body}/>
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
