const React = require('react');
const CalenderEventActions = require('../../actions/calender_event_actions');
const CalenderEventStore = require('../../stores/calender_event_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;

const CalenderEventForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      body: "",
    };
  },

  componentDidMount: function () {
    let id = this.props.params.calender_eventId;
    if (id) {
      let calender_event = CalenderEventStore.findCalenderEvent(id);
      this.setState(calender_event);
    }
  },

  componentWillReceiveProps: function (newProps) {
    let id = newProps.params.calender_eventId;
    if (id) {
      let calender_event = CalenderEventStore.findCalenderEvent(id);
      this.setState(calender_event);
    } else {
      this.setState( {title: "", body: ""} );
    }
  },

  _handleChange: function(field, calender_event){
    return (calender_event) =>{
      calender_event.prcalender_eventDefault();
      this.setState({[field]: calender_event.target.value});
    };
  },

  _handleSubmit: function(calender_event){
    calender_event.prcalender_eventDefault();
    this.state.project_id = SessionStore.userMainProject();
    this.state.author_id = SessionStore.getCurrentUser().id;
    CalenderEventActions.createOneCalenderEvent(this.state);
  },

  _handleUpdate: function (calender_event) {
    calender_event.prcalender_eventDefault();
    CalenderEventActions.updateCalenderEvent(this.state);
  },

  _handleDelete: function (id, calender_event) {
    calender_event.prcalender_eventDefault();
    CalenderEventActions.destroyCalenderEvent(id);
  },

  render: function () {

    let buttonValue = "Create CalenderEvent";
    let callback = this._handleSubmit;
    let destroyCalenderEvent = "";

    if (this.props.params.calender_eventId) {
      buttonValue = "Update CalenderEvent";
      callback = this._handleUpdate;
      destroyCalenderEvent = (<button className="button-form" onClick={this._handleDelete.bind(null, this.props.params.calender_eventId)}>Delete CalenderEvent</button>);
    }

    return(
      <div className="post-wrapper">
        <div>
          <h2>{buttonValue}</h2>
          <form className="calender_event-form" onSubmit={callback}>
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:
              <input type="textarea" onChange={this._handleChange("body")} value={this.state.body}/>
            </label>
            <input className="button-form" type="submit" value={buttonValue}/>
            <Link className="button-form" to={`projects/${SessionStore.userMainProject()}/calender_events_index`} >Cancel</Link>
            {destroyCalenderEvent}
          </form>
        </div>
      </div>
    );
  }

});

module.exports = CalenderEventForm;
