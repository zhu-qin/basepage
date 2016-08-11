const React = require('react');
const CalenderEventActions = require('../../actions/calender_event_actions');
const CalenderEventStore = require('../../stores/calender_event_store');
const SessionStore = require('../../stores/session_store');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;

const CalenderEventForm = React.createClass({
  getInitialState: function () {
    return { calEvent: {title: "",body: "",start: "",finish: ""},
              redirect: false,
              errors: ""
                                  };
  },

  componentDidMount: function () {
    let id = this.props.params.calenderEventId;
    if (id) {
      let calEvent = CalenderEventStore.findCalenderEvent(id);
      this.setState({calEvent: calEvent});
    }
  },

  componentWillReceiveProps: function (newProps) {
    let id = newProps.params.calenderEventId;
    if (id) {
      let calEvent = CalenderEventStore.findCalenderEvent(id);
      this.setState({calEvent: calEvent});
    } else {
      this.setState({calEvent: {title: "", body: "", start:"", finish:""} });
    }
  },

  componentWillUnmount: function () {
    if (this.state.redirect){
      this.storeListener.remove();
    }
  },


  _handleChange: function(field, event){
    return (event) =>{
      event.preventDefault();
      this.setState( {calEvent: Object.assign(this.state.calEvent, {[field]: event.target.value})} );
    };
  },

  _handleSubmit: function(event){
    event.preventDefault();
    let calEvent = this.state.calEvent;
    calEvent.project_id = SessionStore.userMainProject();
    calEvent.author_id = SessionStore.getCurrentUser().id;
    this.getDates();
    CalenderEventActions.createCalenderEvent(this.state.calEvent);
    this.setState({ calEvent: {title: "", body: "", start:"", finish:""} });
  },

  getDates: function (){
    let start = new Date();
    let finish = new Date();
    let userStart = $(".start-time").datepicker().val();
    let userFinish = $(".finish-time").datepicker().val();
    if (userStart.length > 0){
      start = userStart;
    }

    if (userFinish.length > 0) {
      finish = userFinish;
    }

    if( new Date(start) > new Date(finish) ) {
      this.setState( {errors: "Start date needs to be earlier than end date"} );
    } else {
      this.state.calEvent.start = start;
      this.state.calEvent.finish = finish;
    }
  },

  _handleUpdate: function (event) {
    event.preventDefault();
    this.getDates();
    CalenderEventActions.updateCalenderEvent(this.state.calEvent);
  },

  _handleDelete: function (id, event) {
    event.preventDefault();
    this.storeListener = CalenderEventStore.addListener(this._calenderEventStoreListener.bind(null, id));
    this.setState({redirect: true});
    CalenderEventActions.deleteCalenderEvent(id);
  },

  _calenderEventStoreListener: function (id) {
    let calEvent = CalenderEventStore.findCalenderEvent(id);

    if (Object.keys(calEvent).length < 1) {
      hashHistory.push(`projects/${SessionStore.userMainProject()}/calender_events_index`);
    }
  },

  _handleDateSelect: function (event){
    $(".start-time").datepicker( {dateFormat: "yy-mm-dd" } );
    $(".finish-time").datepicker( {dateFormat: "yy-mm-dd" } );
  },


  render: function () {

    let buttonValue = "Add an Event";
    let callback = this._handleSubmit;
    let deleteCalenderEvent = "";

    if (this.props.params.calenderEventId) {
      buttonValue = "Update Event";
      callback = this._handleUpdate;
      deleteCalenderEvent = (<button className="button-form" onClick={this._handleDelete.bind(null, this.props.params.calenderEventId)}>Delete Event</button>);
    }

    let errors = this.state.errors;

    return(
      <div className="post-wrapper" onMouseEnter={this._handleDateSelect}>
        <div>
          <h2>{buttonValue}</h2>
          <form className="calEvent-form clear-fix" onSubmit={callback} >
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.calEvent.title}/>
            </label>
            <label>Body:
              <input type="textarea" onChange={this._handleChange("body")} value={this.state.calEvent.body}/>
            </label>
            <label>Start:
              <input type="datetime" className="start-time" value={this.state.calEvent.start}/>
            </label>
            <label>Finish:
              <input type="datetime" className="finish-time" value={this.state.calEvent.finish}/>
            </label>
            <input className="button-form" type="submit" value={buttonValue}/>
            <Link className="button-form" to={`projects/${SessionStore.userMainProject()}/calender_events_index`} >Cancel</Link>
            {deleteCalenderEvent}
          </form>
        </div>
        {errors}
      </div>
    );
  }

});


module.exports = CalenderEventForm;
