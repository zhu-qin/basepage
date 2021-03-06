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
const ProjectView = require('./components/project/project_view');
const TodoIndex = require('./components/project/todo_index');
const CalenderEventIndex = require('./components/project/calender_event_index');
const ChatIndex = require('./components/project/chat_index');
const MessageIndex = require('./components/project/message_index');
const UploadIndex = require('./components/project/upload_index');

const ProjectMembershipIndex = require('./components/project/project_membership_index');
const AllProjectsIndex = require('./components/project/all_projects_index');

// Components Forms
const TodoForm = require('./components/project/todo_form');
const TodoListForm = require('./components/project/todo_list_form');
const MessageForm = require('./components/project/message_form');
const CalenderEventForm = require('./components/project/calender_event_form');
const UploadForm = require('./components/project/upload_form');
const ProjectForm = require('./components/project/project_form');
const ProjectMembershipForm = require('./components/project/project_membership_form');

// Stores
const SessionStore = require('./stores/session_store');
const ProjectStore = require('./stores/project_store');

// Actions
const SessionActions = require('./actions/session_actions');

let redirectConditions = function (nextState, replace) {
  if (!ProjectStore.getCurrentProject().id && SessionStore.isSignedIn()) {
    replace(`/projects/index`);
  }
  if(!SessionStore.isSignedIn()) {
    replace("/");
  }
};

const AppRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={Session} />
    <Route path="/sign_up" component={Session}/>

    <Route path="/projects/index" component={AllProjectsIndex} >
      <Route path="/projects/new" component={ProjectForm}/>
      <Route path="/projects/:projectId/edit" component={ProjectForm}/>
    </Route>

    <Route path="/projects/:projectId" component={ProjectView} onEnter={redirectConditions}>
      <IndexRoute component={MessageIndex} onEnter={redirectConditions}/>

      <Route path="todos_index" component={TodoIndex} onEnter={redirectConditions}>
        <Route path="/todo_lists/:todoListId/todos" component={TodoForm} />
        <Route path="/todos/:todoId/edit" component={TodoForm} />
        <Route path="/projects/:projectId/todo_list_new" component={TodoListForm}/>
        <Route path="/todo_lists/:todoListId/edit" component={TodoListForm}/>
      </Route>

      <Route path="chats_index" component={ChatIndex} onEnter={redirectConditions} />

      <Route path="messages_index" component={MessageIndex} onEnter={redirectConditions}>
        <Route path="/message_board/:messageId/reply" component={MessageForm} />
      </Route>

      <Route path="calender_events_index" component={CalenderEventIndex} onEnter={redirectConditions}>
        <Route path="/schedule/new_calender_event" component={CalenderEventForm}/>
        <Route path="/schedule/:calenderEventId/edit" component={CalenderEventForm}/>
      </Route>

      <Route path="uploads_index" component={UploadIndex} onEnter={redirectConditions}>
        <Route path="/uploads/new_file" component={UploadForm} />
      </Route>

      <Route path="project_memberships_index" component={ProjectMembershipIndex} onEnter={redirectConditions}>
        <Route path="/project_memberships/new" component={ProjectMembershipForm} />
        <Route path="/project_memberships/:projectMembershipId/edit" component={ProjectMembershipForm} />
      </Route>

    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function(){
  SessionActions.receiveUser(window.currentUser);
  let root = document.getElementById('root');
  ReactDOM.render(AppRouter, root);
});
