//React
const React = require('react');
const ReactDOM = require('react-dom');
//Router
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

// Components
const Session = require('./components/session_comp');
const ProjectIndex = require('./components/project/project_index');
const TodoIndex = require('./components/project/todo_index');
const EventIndex = require('./components/project/event_index');
const MessageIndex = require('./components/project/message_index');
const UploadIndex = require('./components/project/upload_index');

// Components Forms
const TodoForm = require('./components/project/todo_form');
const TodoListForm = require('./components/project/todo_list_form');
const MessageForm = require('./components/project/message_form');

// Stores
const SessionStore = require('./stores/session_store');
const ProjectStore = require('./stores/project_store');

// Actions
const SessionActions = require('./actions/session_actions');


const AppRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={Session}/>
    <Route path="/sign_up" component={Session}/>
    <Route path="projects/:projectId" component={ProjectIndex} >
      <IndexRoute component={MessageIndex} />

      <Route path="todos_index" component={TodoIndex} >
        <Route path="/todo_lists/:todoListId/todos" component={TodoForm} />
        <Route path="/projects/:projectId/todo_list_new" component={TodoListForm}/>
      </Route>

      <Route path="messages_index" component={MessageIndex}>
        <Route path="/message_board/:messageId/reply" component={MessageForm} />
      </Route>

      <Route path="events_index" component={EventIndex} />
      <Route path="uploads_index" component={UploadIndex} />

    </Route>

  </Router>
);


document.addEventListener("DOMContentLoaded", function(){
  SessionActions.receive("SIGN_IN", window.currentUser)();
  let root = document.getElementById('root');
  ReactDOM.render(AppRouter, root);
});


// testing
const TodoActions = require('./actions/todo_actions');
const TodoStore = require('./stores/todo_store');
const MessageActions = require('./actions/message_actions');
const MessageStore = require('./stores/message_store');
const UploadStore = require('./stores/upload_store');

const ProjectActions = require('./actions/project_actions');

window.ProjectStore = ProjectStore;
window.ProjectActions = ProjectActions;
window.UploadStore = UploadStore;
window.TodoStore = TodoStore;
window.TodoActions = TodoActions;
window.MessageStore = MessageStore;
window.MessageActions = MessageActions;
window.SessionStore = SessionStore;
