# Phase 3: TodoLists (2 day, W2 Tu 6pm)

## Rails
### Models
* TodoLists
* Todos

### Controllers
* Api::TodoListsController (create, destroy, index, show, update)
* Api::TodosController (create, destroy, index, show, update)

### Views
* todolists/index.json.jbuilder
* todolists/show.json.jbuilder

## Flux
### Views (React Components)
* TodoListsIndex
  - TodoListIndexItem
* TodoListForm

### Stores
* TodoList
* Todo

### Actions
* `ApiActions.receiveAllTodoLists`
* `ApiActions.receiveSingleTodoList`
* `ApiActions.deleteTodoList`
* `TodoListActions.fetchAllTodoLists`
* `TodoListActions.fetchSingleTodoList`
* `TodoListActions.createTodoList`
* `TodoListActions.editTodoList`
* `TodoListActions.destroyTodoList`

### ApiUtil
* `ApiUtil.fetchAllTodoLists`
* `ApiUtil.fetchSingleTodoList`
* `ApiUtil.createTodoList`
* `ApiUtil.editTodoList`
* `ApiUtil.destroyTodoList`

## Gems/Libraries
