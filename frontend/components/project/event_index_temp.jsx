const React = require('react');
// const EventStore = require('../stores/event_store');
// const EventActions = require('..actions/event_actions');
const SessionStore = require('../../stores/session_store');


const EventIndex = React.createClass({
  // getInitialState: function(){
  //   return { events: [] };
  // },
  //
  // componentDidMount: function () {
  //   this.eventListener = EventStore.add(this._eventStoreListener);
  //   EventActions.getAllEvents(SessionStore.userMainProject());
  // },
  //
  // _eventStoreListener: function () {
  //   this.setState({ events: EventStore.all() });
  // },
  //
  // componentWillUnmount: function () {
  //   this.eventListener.remove();
  // },

  render: function(){
    return(
      <div className="feature-wrapper clear-fix">
        <div className="event-wrapper">
          <h2>Schedule</h2>
          <ul>

          </ul>
        </div>
      </div>
    );
  }

});

module.exports = EventIndex;
