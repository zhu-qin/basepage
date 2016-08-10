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

CalenderEventStore.addOneCalenderEvent = function (calender_event) {
  _calender_events[calender_event.id] = calender_event;
  _saved = true;
  hashHistory.push(`projects/${SessionStore.userMainProject()}/calender_events_index`);
};

CalenderEventStore.find = function(id) {
  return Object.assign({}, _calender_events[id]);
};

CalenderEventStore.findChildren = function (id) {
  let childCalenderEvents = [];
  Object.keys(_calender_events).forEach( (calender_eventId, index) => {
    if (parseInt(_calender_events[calender_eventId].reply_to_id) === id) {
      childCalenderEvents.push(_calender_events[calender_eventId]);
    }
  });

  return childCalenderEvents;
};

CalenderEventStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case CalenderEventConstants.RECEIVE_ONE_CALENDER_EVENT:
      CalenderEventStore.addOneCalenderEvent(payload.calender_event);
      CalenderEventStore.__emitChange();
      break;
    case CalenderEventConstants.RECEIVE_ALL_CALENDER_EVENTS:
      CalenderEventStore.resetCalenderEvents(payload.calender_events);
      CalenderEventStore.__emitChange();
      break;
  }
};



module.exports = CalenderEventStore;
