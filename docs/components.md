## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * **LoginForm**
  * **SignupForm**
  * **BasePageIndex**
    * MessageBoard
      * Messages
    * TodoLists 
      * Todos
    * Schedule
      * Events


## Routes

* **component:** `App` **path:** `/`
  * **component** `LoginForm` **path:** /login
  * **component** `SignupForm` **path:** /signup
  * **component:** `BasePageIndex` **path:** basepage
    * **component:** `MessageBoard` **path:** `basepage/message_board`
      * **component:** `Messages` **path:** `basepage/message_board/messages`

    * **component:** `TodoLists` **path:** `basepage/todolists`
      * **component:** `Todos` **path:** `basepage/todolists/todos`

    * **component:** `Schedule` **path:** `basepage/schedule`
      * **component:** `Events` **path:** `basepage/schedule/events`


Base Page Index includes 3 subcomponents MessageBoard, TodoLists, and Schedule.
