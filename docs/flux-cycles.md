# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. sets `form` and `_errors` in the `ErrorStore`
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. removes `_errors` for a given `form` in the `ErrorStore`

## BasePage Cycles

### BasePage API Request Actions

* `fetchAllBasePages`
  0. invoked from `BasePagesIndex` `didMount`/`willReceiveProps`
  0. `GET /api/base_pages` is called.
  0. `receiveAllBasePages` is set as the success callback.

* `createBasePage`
  0. invoked from new page button `onClick`
  0. `POST /api/base_page` is called.
  0. `receiveSingleBasePage` is set as the success callback.

* `fetchSingleBasePage`
  0. invoked from `BasePageDetail` `didMount`/`willReceiveProps`
  0. `GET /api/base_page/:id` is called.
  0. `receiveSingleBasePage` is set as the success callback.

* `updateBasePage`
  0. invoked from `BasePageForm` `onSubmit`
  0. `POST /api/base_page` is called.
  0. `receiveSingleBasePage` is set as the success callback.

* `destroyBasePage`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/base_page/:id` is called.
  0. `removeBasePage` is set as the success callback.

### BasePage API Response Actions

* `receiveAllBasePages`
  0. invoked from an API callback.
  0. `BasePage` store updates `_notes` and emits change.

* `receiveSingleBasePage`
  0. invoked from an API callback.
  0. `BasePage` store updates `_notes[id]` and emits change.

* `removeBasePage`
  0. invoked from an API callback.
  0. `BasePage` store removes `_notes[id]` and emits change.

### Store Listeners

* `BasePagesIndex` component listens to `BasePage` store.
* `BasePageDetail` component listens to `BasePage` store.


## Event Cycles

### Events API Request Actions

* `fetchAllEvents`
  0. invoked from `EventsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/base_page/todo_lists` is called.
  0. `receiveAllEvents` is set as the success callback.

* `createEvent`
  0. invoked from new notebook button `onClick`
  0. `POST /api/base_page/todo_lists` is called.
  0. `receiveSingleEvent` is set as the callback.

* `fetchSingleEvent`
  0. invoked from `EventDetail` `didMount`/`willReceiveProps`
  0. `GET /api/base_page/todo_lists/:id` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `updateEvent`
  0. invoked from `EventForm` `onSubmit`
  0. `POST /api/base_page/todo_lists` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `destroyEvent`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/base_page/todo_lists/:id` is called.
  0. `removeEvent` is set as the success callback.

### Store Listeners

* `EventsIndex` component listens to `Events` store.
* `EventsDetail` component listens to `Events` store.

### TodoLists Cycles

* `fetchAllTodoLists`
  0. invoked from `TodoListsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/base_page/todolists` is called.
  0. `receiveAllTodoLists` is set as the success callback.

* `createTodoList`
  0. invoked from new notebook button `onClick`
  0. `POST /api/base_page/todolists` is called.
  0. `receiveSingleTodoList` is set as the callback.

* `fetchSingleTodoList`
  0. invoked from `TodoListDetail` `didMount`/`willReceiveProps`
  0. `GET /api/base_page/todolists/:id` is called.
  0. `receiveSingleTodoList` is set as the success callback.

* `updateTodoList`
  0. invoked from `TodoListForm` `onSubmit`
  0. `POST /api/base_page/todolists` is called.
  0. `receiveSingleTodoList` is set as the success callback.

* `destroyTodoList`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/base_page/todolists/:id` is called.
  0. `removeTodoList` is set as the success callback.

### Store Listeners
* `TodoListsIndex` component listens to `TodoList` store.
* `TodoListDetail` component listens to `Todo` store.

### Todo Cycles

* `fetchAllTodos`
  0. invoked from `TodosIndex` `didMount`/`willReceiveProps`
  0. `GET /api/base_page/:todo_listId/todos` is called.
  0. `receiveAllTodos` is set as the success callback.

* `createTodo`
  0. invoked from new notebook button `onClick`
  0. `POST /api/base_page/:todo_listId/todos` is called.
  0. `receiveSingleTodo` is set as the callback.

* `fetchSingleTodo`
  0. invoked from `TodoDetail` `didMount`/`willReceiveProps`
  0. `GET /api/base_page/:todo_listId/todos/:id` is called.
  0. `receiveSingleTodo` is set as the success callback.

* `updateTodo`
  0. invoked from `TodoForm` `onSubmit`
  0. `POST /api/base_page/:todo_listId/todos` is called.
  0. `receiveSingleTodo` is set as the success callback.

* `destroyTodo`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/base_page/:todo_listId/todos/:id` is called.
  0. `removeTodo` is set as the success callback.

### Messages Cycles

* `fetchAllMessages`
  0. invoked from `MessagesIndex` `didMount`/`willReceiveProps`
  0. `GET /api/base_page/message_board/messages` is called.
  0. `receiveAllMessages` is set as the success callback.

* `createMessage`
  0. invoked from new notebook button `onClick`
  0. `POST /api/base_page/message_board/messages` is called.
  0. `receiveSingleMessage` is set as the callback.

* `fetchSingleMessage`
  0. invoked from `MessageDetail` `didMount`/`willReceiveProps`
  0. `GET /api/base_page/message_board/messages/:id` is called.
  0. `receiveSingleMessage` is set as the success callback.

* `updateMessage`
  0. invoked from `MessageForm` `onSubmit`
  0. `POST /api/base_page/message_board/messages` is called.
  0. `receiveSingleMessage` is set as the success callback.

* `destroyMessage`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/base_page/message_board/messages/:id` is called.
  0. `removeMessage` is set as the success callback.

### Store Listeners
* `MessageBoard` component listens to `Message` store.
* `MessageDetail` component listens to `Message` store.
