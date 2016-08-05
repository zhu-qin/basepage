const React = require('react');
const ResourceConstants = require('../../constants/resource_constants');
const ResourceActions = require('../../actions/resource_actions');
const ResourceStore = require('../../stores/resource_store');
const Link = require('react-router').Link;

const TodoList = React.createClass({
  getInitialState: function (){
    return { [ResourceConstants.TODOS]: this.props.todoList[1] };
  },

  componentDidMount: function () {
    this.storeListener = ResourceStore.addListener(this._resourceStoreListener);
  },

  _resourceStoreListener: function () {
    this.setState( {[ResourceConstants.TODOS]: ResourceStore.all } )
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  handleCheck: function(event){
    let completion;
    if (event.target.checked) {
      completion = true
    } else {
      completion = false
    }
    let  todoToUpdate = { todos: {id: event.target.attributes.data.value, completion: completion } }
    ResourceActions.updateResourceItem(todoToUpdate, ResourceConstants.TODOS)
  },

  render: function () {
    let allTodos = this.props.todoList[1];
    let completedTodos = 0;
    let todoLists = allTodos.map( (todo, index) => {
      let checkBox;
      if (todo.completion) {
        completedTodos += 1;
        checkBox = "checked";
      };
        return (
          <li key={todo.id}>
            <input type="checkbox" data={todo.id} defaultChecked={checkBox} onClick={this.handleCheck}/>
            {todo.title}
          </li>
        )
      });
    return (
      <li>
        <Link to={`/todo_lists/${this.props.todoList[0].id}/edit`} className="todo-link">
          {this.props.todoList[0].title}
          <div className="todo-completed-count">{`${completedTodos}/${allTodos.length}`}</div>
        </Link>

        <ul>
          {todoLists}
        </ul>
      </li>
    );
  }
});

module.exports = TodoList;
