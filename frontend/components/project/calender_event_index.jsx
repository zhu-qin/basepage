const React = require('react');
const CalenderEventStore = require('../../stores/calender_event_store');
const CalenderEventActions = require('../../actions/calender_event_actions');
const CalenderEventForm = require('./calender_event_index');
const CalenderEventConstants = require('../../constants/calender_event_constants');
const SessionStore = require('../../stores/session_store');
const ProjectStore = require('../../stores/project_store');
const hashHistory = require('react-router').hashHistory;


const CalenderEventIndex = React.createClass({
  getInitialState: function(){
    return { calenderEvents: {} };
  },

  componentDidMount: function () {
    this.calenderEventListener = CalenderEventStore.addListener(this._calenderEventStoreListener);
    CalenderEventActions.getAllCalenderEvents( ProjectStore.getCurrentProject().id);
  },

  _calenderEventStoreListener: function () {
    this.setState({ calenderEvents: CalenderEventStore.all() });
  },

  componentWillUnmount: function () {
    this.calenderEventListener.remove();
  },

  _handleClickToAddCalenderEvent: function (id, event) {
    hashHistory.push(`/schedule/new_calender_event`);
  },

  _handleCalenderEventForm: function (id, event) {
    hashHistory.push(`/schedule/${id}/edit`);
  },



  organizeEventsByMonth: function () {
    let allEvents = this.state.calenderEvents;
    let eventObj = {};

      Object.keys(allEvents).map((calEventId, index)=>{

        let startDate = new Date(allEvents[calEventId].start);
        let finishDate = new Date(allEvents[calEventId].finish);

        let start = { month: startDate.getMonth(), year: startDate.getFullYear() };
        let finishMonth = (finishDate.getMonth() + 1) % 12;
        let finishYear = finishDate.getFullYear();
        if (finishMonth === 0) {
          finishYear += 1;

        }


        let finish = { month: finishMonth, year: finishYear };


        while ( (start.month !== finish.month) || (start.year !== finish.year) ) {

          if (eventObj[`${start.month}/${start.year}`]){
            eventObj[`${start.month}/${start.year}`].push(allEvents[calEventId]);
          } else {
            eventObj[`${start.month}/${start.year}`] = [allEvents[calEventId]];
          }

          start.month = (start.month + 1) % 12;
          if (start.month === 0) {
            start.year += 1;
          }
        }
      });

      return eventObj;
    },

  render: function() {
    let numberOfCalEvents = Object.keys(this.state.calenderEvents).length;
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let months = [0,1,2,3,4,5,6,7,8,9,10,11];
    let monthsArray = months.slice(currentMonth).concat(months.slice(0, currentMonth)) ;
    monthsArray = monthsArray.concat(monthsArray);

    let allEvents = {};
    if (numberOfCalEvents > 0) {
      allEvents = this.organizeEventsByMonth();
    }
    if (monthsArray[0] === 0) {
      currentYear -= 1;
    }

    let calenderEventList = monthsArray.map((month, index) => {
        let eventsInMonth = "";
        if (month === 0) {
          currentYear += 1;
        }

        if (numberOfCalEvents > 0 && allEvents[`${month}/${currentYear}`]) {
          eventsInMonth = allEvents[`${month}/${currentYear}`].map((calEvent, index) => {
          return(
            <div key={calEvent.id} className="schedule-event clear-fix">
              <div className="schedule-event-start">{new Date(calEvent.start).toDateString()}</div>
              <div className="schedule-event-finish">{new Date(calEvent.finish).toDateString()}</div>
              <p className="schedule-event-title" onClick={this._handleCalenderEventForm.bind(null, calEvent.id)}>{calEvent.title}</p>
            </div>
          );
          });
        }

        let monthBlock = (
          <li key={index}>
            <div className={`schedule-month-${month} schedule-block`}>
              {CalenderEventConstants.MONTHS[month]} {currentYear}
            </div>
            <div>
              {eventsInMonth}
            </div>
          </li>
        );


        return monthBlock;
      }
    );

    return(
      <div className="feature-wrapper clear-fix">
        <div className="calender-event-wrapper">
          <h2>Schedule</h2>
          <button className="feature-add-button" onClick={this._handleClickToAddCalenderEvent.bind(null, 0)}>Add an Event</button>
          <div className="form-place-holder">
            {this.props.children}
          </div>
          <ul className="calender-event-list group">
            {calenderEventList}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = CalenderEventIndex;
