const React = require('react');
const CalenderEventStore = require('../../stores/calender_event_store');
const CalenderEventActions = require('../../actions/calender_event_actions');
const CalenderEventForm = require('./calender_event_index');
const SessionStore = require('../../stores/session_store');
const hashHistory = require('react-router').hashHistory;


const CalenderEventIndex = React.createClass({
  getInitialState: function(){
    return { calenderEvents: {} };
  },

  componentDidMount: function () {
    this.calenderEventListener = CalenderEventStore.addListener(this._calenderEventStoreListener);
    CalenderEventActions.getAllCalenderEvents(SessionStore.userMainProject());
  },

  _calenderEventStoreListener: function () {
    this.setState({ calenderEvents: CalenderEventStore.all() });
  },

  componentWillUnmount: function () {
    this.calenderEventListener.remove();
  },

  _handleClickToCalenderEvent: function (id, event) {
    event.preventDefault();
    hashHistory.push(`/calender_event_index/${id}/reply`);
  },

  render: function(){
    let calenderEvents = this.state.calenderEvents;
    let calenderEventList = Object.keys(calenderEvents).map((id, index) => {
        return (
          <span key={id}>
            <button className="parent-button reply-button" onClick={this._handleClickToCalenderEvent.bind(null, id)}>CalenderEvent to: {calenderEvents[id].author_name}</button>
            {calenderEvents[id].author_name} SAYS: {calenderEvents[id].title}
          </span>
        );
      }
    );

    return(
      <div className="feature-wrapper clear-fix">
        <div className="calenderEvent-wrapper">
          <h2>Schedule</h2>
          <button className="feature-add-button" onClick={this._handleClickToCalenderEvent.bind(null, 0)}>Post a Calender Event</button>
          <div className="calenderEvent-reply-place-holder">{this.props.children}</div>
          <ul className="calenderEvent-list group">
            {calenderEventList}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = CalenderEventIndex;
