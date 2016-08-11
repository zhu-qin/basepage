const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const CalenderEventConstants = require('../constants/calender_event_constants');
const hashHistory = require('react-router').hashHistory;
const SessionStore = require('./session_store');

let _calender_events = {};

const CalenderEventStore = new Store(AppDispatcher);

CalenderEventStore.all = function () {
  return Object.assign({}, _calender_events);
};

CalenderEventStore.resetCalenderEvents = function (calender_events) {
  _calender_events = calender_events;
};

CalenderEventStore.findCalenderEvent = function(id) {
  return Object.assign({}, _calender_events[id]);
};

CalenderEventStore.addCalenderEvent = function (calender_event) {
  _calender_events[calender_event.id] = calender_event;
};

CalenderEventStore.removeCalenderEvent = function (calEvent) {
  delete _calender_events[calEvent.id];
};

CalenderEventStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case CalenderEventConstants.RECEIVE_ONE_CALENDER_EVENT:
      CalenderEventStore.addCalenderEvent(payload.calender_event);
      CalenderEventStore.__emitChange();
      break;
    case CalenderEventConstants.RECEIVE_ALL_CALENDER_EVENTS:
      CalenderEventStore.resetCalenderEvents(payload.calender_events);
      CalenderEventStore.__emitChange();
      break;
    case CalenderEventConstants.REMOVE_ONE_CALENDER_EVENT:
      CalenderEventStore.removeCalenderEvent(payload.calender_event);
      CalenderEventStore.__emitChange();
      break;
  }
};



module.exports = CalenderEventStore;
