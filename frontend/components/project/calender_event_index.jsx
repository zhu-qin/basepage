const React = require('react');
const CalenderEventStore = require('../../stores/calender_event_store');
const CalenderEventActions = require('../../actions/calender_event_actions');
const CalenderEventForm = require('./calender_event_index');
const CalenderEventConstants = require('../../constants/calender_event_constants');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;


const CalenderEventIndex = React.createClass({
  getInitialState: function(){
    return { calenderEvents: {} };
  },

  componentDidMount: function () {
    this.calenderEventListener = CalenderEventStore.addListener(this._calenderEventStoreListener);
    CalenderEventActions.getAllCalenderEvents( SessionStore.userMainProject() );
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

  organizeEventsByMonth: function () {
    let allEvents = this.state.calender_events;
    let eventObj = {};

    Object.keys(allEvents).map((calEvent, index)=>{
      
    });


    let currentMonth = new Date().getMonth();
    let months = [0,1,2,3,4,5,6,7,8,9,10,11];
    let monthsArray = months.slice(currentMonth).concat(months.slice(0, currentMonth)) ;
  },

  render: function(){



    let calenderEventList = monthsArray.map((month, index) => {
        return (
          <li key={month}>
            <div className={`schedule-month-${month} schedule-block`}>
              {CalenderEventConstants.MONTHS[month]}
            </div>
            <div>

            </div>
          </li>
        );
      }
    );

    return(
      <div className="feature-wrapper clear-fix">
        <div className="calender-event-wrapper">
          <h2>Schedule</h2>
          <button className="feature-add-button" onClick={this._handleClickToAddCalenderEvent.bind(null, 0)}>Post a Calender Event</button>
          <div className="calender-event-place-holder">{this.props.children}</div>
          <ul className="calender-event-list group">
            {calenderEventList}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = CalenderEventIndex;
