const CalenderEventUtil = require('../util/calender_event_util');
const CalenderEventConstants = require('../constants/calender_event_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

const CalenderEventActions = {

  getAllCalenderEvents: function (projectId) {
    CalenderEventUtil.getAllCalenderEvents(projectId, CalenderEventActions.receiveAllCalenderEvents);
  },

  receiveAllCalenderEvents: function (calender_events) {
    AppDispatcher.dispatch({
      actionType: CalenderEventConstants.RECEIVE_ALL_MESSAGES,
      calender_events: calender_events
    });
  },

  createOneCalenderEvent: function(calender_event){
    CalenderEventUtil.createOneCalenderEvent(calender_event, CalenderEventActions.receiveOneCalenderEvent);
  },

  receiveOneCalenderEvent: function(calender_event){
    AppDispatcher.dispatch({
      actionType: CalenderEventConstants.RECEIVE_ONE_MESSAGE,
      calender_event: calender_event
    });
  }
};


module.exports = CalenderEventActions;
