# Phase 2: Flux Architecture and Note CRUD (2 days, W1 F 6pm)

## Rails
### Models
* BasePage

### Controllers
* Api::BasePagesController (create, destroy, index, show, update)

### Views
* basepages/index.json.jbuilder
* basepages/show.json.jbuilder

## Flux
### Views (React Components)
BasePage

### Stores
* BasePage

### Actions
* `ApiActions.receiveAllBasePages`
* `ApiActions.receiveSingleBasePage`
* `ApiActions.deleteBasePage`
* `BasePageActions.fetchAllBasePages`
* `BasePageActions.fetchSingleBasePage`
* `BasePageActions.createBasePage`
* `BasePageActions.editBasePage`
* `BasePageActions.destroyBasePage`

### ApiUtil
* `ApiUtil.fetchAllBasePages`
* `ApiUtil.fetchSingleBasePage`
* `ApiUtil.createBasePage`
* `ApiUtil.editBasePage`
* `ApiUtil.destroyBasePage`

## Gems/Libraries
