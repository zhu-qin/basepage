const CalenderEventConstants = require('../constants/calender_event_constants.js');

const CalenderEventUtil = {
  getAllCalenderEvents: function (projectId, successCallback, failureCallback) {
    $.ajax({
      type: "GET",
      url: `api/projects/${projectId}/calender_events`,
      success: function (response){
        successCallback(response);
      }
    });
  },

  updateCalenderEvent: function (calender_event, successCallback, failureCallback){
    $.ajax ({
      type: "PATCH",
      url: `api/calender_events/${calender_event.id}`,
      data: {calender_events: calender_event},
      success: function (response) {
        successCallback(response);
      }
    });
  },

  createCalenderEvent: function (calender_event, successCallback, failureCallback){
    $.ajax ({
      type: "POST",
      url: `api/calender_events/${calender_event.calender_event_id}/calender_events`,
      data: {calender_events: calender_event},
      success: function (response) {
        successCallback(response);
      }
    });
  },

  deleteCalenderEvent: function (id, successCallback) {
    $.ajax({
      type: "DELETE",
      url: `api/calender_events/${id}`,
      success: function (response) {
        successCallback(response);
      }
    });
  }
};

module.exports = CalenderEventUtil;
