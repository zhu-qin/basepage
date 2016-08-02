# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`
- `GET /api/session`

### BasePage

- `GET /api/base_page`
- `POST /api/base_page`
- `DELETE /api/base_page`

### MessageBoard

- `GET /api/message_board`

###Messages

- `GET /api/message_board/messages`
- `POST /api/message_board/messages`
- `EDIT /api/message_board/:messageId`
- `DELETE /api/message_board/:messageId`


### TodoLists
- `GET /api/todo_lists`
- `GET /api/todo_lists/:listId`
- `POST /api/todo_lists`
- `DELETE /api/todo_lists`
- `EDIT /api/todo_lists`

### Todos
- `GET /api/todo_lists/:listId/todos`
- `POST /api/todo_lists/:listId/todos`
- `DELETE /api/todo_lists/:listId/:todoId`
- `EDIT /api/todo_lists/:listId/:todoId`

### Schedule
- `GET /api/schedule`

### Events
- `GET /api/schedule/events`
- `POST /api/schedule/events`
- `DELETE /api/schedule/:eventId`
- `EDIT /api/schedule/:eventId`
