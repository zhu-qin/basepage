const React = require('react');
const CalenderEventActions = require('../../actions/calender_event_actions');
const CalenderEventStore = require('../../stores/calender_event_store');
const ProjectStore = require('../../stores/project_store');
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
    calEvent.project_id = ProjectStore.getCurrentProject().id;
    calEvent.author_id = SessionStore.getCurrentUser().id;
    this.getDates();
    CalenderEventActions.createCalenderEvent(this.state.calEvent);
    this.setState({ calEvent: {title: "", body: "", start:"", finish:""} });
  },

  getDates: function (){
    let start;
    let finish;
    let userStart = this.state.calEvent.start;
    let userFinish = this.state.calEvent.finish;
    if (userStart.length > 0){
      start = userStart;
    }

    if (userFinish.length > 0){
      finish = userFinish;
    }

    if (!start) {
      start = new Date();
    }

    if (!finish){
      finish = new Date();
    }

    if ( start && (new Date(start) > new Date(finish)) ) {
      finish = start;
    }

    this.state.calEvent.start = start;
    this.state.calEvent.finish = finish;
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
      hashHistory.push(`projects/${ProjectStore.getCurrentProject().id}/calender_events_index`);
    }
  },



  render: function () {

    let buttonValue = "Add event";
    let callback = this._handleSubmit;
    let deleteCalenderEvent = "";

    if (this.props.params.calenderEventId) {
      buttonValue = "Update";
      callback = this._handleUpdate;
      deleteCalenderEvent = (<button className="button-form" onClick={this._handleDelete.bind(null, this.props.params.calenderEventId)}>Delete</button>);
    }

    let errors = this.state.errors;

    return(
      <div className="post-wrapper" onMouseEnter={this._handleDateSelect}>
        <div>
          <h2>{buttonValue}</h2>
          <form className="calender-event-form clear-fix" onSubmit={callback} >
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.calEvent.title}/>
            </label>
            <label>Body:</label>
            <textarea onChange={this._handleChange("body")} value={this.state.body}/>
            <label>Start:
              <input type="date" className="start-time" value={this.state.calEvent.start} onChange={this._handleChange("start")}/>
            </label>
            <label>Finish:
              <input type="date" className="finish-time" value={this.state.calEvent.finish} onChange={this._handleChange("finish")}/>
            </label>
            <div className="button-wrapper clear-fix">
              <input className="button-form" type="submit" value={buttonValue}/>
              <Link className="button-form" to={`projects/${ProjectStore.getCurrentProject().id}/calender_events_index`}>Cancel</Link>
              {deleteCalenderEvent}
            </div>
          </form>
        </div>
        {errors}
      </div>
    );
  }

});


module.exports = CalenderEventForm;
