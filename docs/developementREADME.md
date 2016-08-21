# BasePage

[Heroku link][heroku] **Note:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

BasePage is a web application based on basecamp.com by that will be built using Ruby on Rails and React.js. After two weeks the application should be completed with the following features.

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](docs/production_readme.md) -- you'll write this later)
- [ ] BasePages
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Lists of TodoLists and Todos
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Schedule and Events
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Message Board and Messages
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Docs and Files upload and download

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days, W1 W 6pm)

**Objective:** Functioning rails project with front-end Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication backend setup
- [ ] create `StaticPages` controller and root view
- [ ] set up webpack & flux scaffold with skeleton files
- [ ] setup `APIUtil` to interact with the API
- [ ] set up flux cycle for frontend auth
- [ ] user signup/signin components
- [ ] blank landing component after signin
- [ ] style signin/signup components
- [ ] seed users

### Phase 2: BasePages Model, API, and components (2 days, W1 F 6pm)

**Objective:** BasePages can be created, read, edited and destroyed through
the API.

- [ ] create `BasePage` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`BasePagesController`)
- [ ] jBuilder views for notes
- [ ] test out API interaction in the console.
- implement each note component, building out the flux loop as needed.
  - [ ] `BasePagesIndex`
  - [ ] `BasePageIndexItem`
  - [ ] `BasePageForm`



### Phase 3: Lists of To-do lists and Todos (2 day, W2 Tu 6pm)

**Objective:** Todos belong to Todolists, and can be viewed by TodoListDetailView.

- [ ] create `Todolist` and `Todo` model
- build out API, Flux loop, and components for:
  - [ ] Todolist, and Todo CRUD
  - [ ] viewing and editing Todos in detailview
- [ ] Use CSS to style new components
- [ ] Seed Todolists and Todos

Phase 3 adds organization to the Todos. Todos belong to a Todolist,
which has its own `Index` view.

### Phase 4: Schedule and Events (1 days, W2 W 6pm)

**Objective:** Events belong to Schedule, and can be viewed by EventsDetailView.

- [ ] create `Schedule` and `Events` model
- build out API, Flux loop, and components for:
  - [ ] Schedule, and Events CRUD
  - [ ] viewing and editing Events in detailview
- [ ] Use CSS to style new components
- [ ] Seed Schedule and Events

Phase 3 adds organization to the Events. Events belong to a Schedule,
which has its own `Index` view.

### Phase 5: Message Board and Messages (1 days, W2 Th 6pm)

**Objective:** Events belong to Schedule, and can be viewed by EventsDetailView.

- [ ] create `Schedule` and `Events` model
- build out API, Flux loop, and components for:
  - [ ] Schedule, and Events CRUD
  - [ ] viewing and editing Events in detailview
- [ ] Use CSS to style new components
- [ ] Seed Schedule and Events

Phase 3 adds organization to the Events. Events belong to a Schedule,
which has its own `Index` view.

### Phase 6: - File and Docs upload and download (1 day, W2 F 6pm)

**objective:** Add Feature for uploading and downloading docs

- [ ] Users associated with basepage can upload and download docs

### Bonus Features (TBD)
- [ ] Live Chat
- [ ] Calender Reminders
- [ ] Email Reminders
- [ ] Multiple sessions

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
