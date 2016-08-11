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
      start: "",
      finish: ""
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
      this.setState( {title: "", body: "", start:"", finish:""} );
    }
  },

  _handleChange: function(field, event){
    return (event) =>{
      event.preventDefault();
      this.setState({[field]: event.target.value});
    };
  },

  _handleSubmit: function(event){
    event.preventDefault();

    this.state.project_id = SessionStore.userMainProject();
    this.state.author_id = SessionStore.getCurrentUser().id;

    this.state.start = $(".start-time").datepicker().val();
    this.state.finish = $(".finish-time").datepicker().val();

    ["start", "finish"].forEach((date, index, array)=>{
      if (this.state[date].length < 1 && this.state[array[index+1]].length < 1 || undefined){
        this.state[date] = new Date();
      }
    });

    CalenderEventActions.createCalenderEvent(this.state);
  },

  _handleUpdate: function (event) {
    event.preventDefault();
    CalenderEventActions.updateCalenderEvent(this.state);
  },

  _handleDelete: function (id, event) {
    event.preventDefault();
    CalenderEventActions.destroyCalenderEvent(id);
  },

  _handleDateSelect: function (event){
    $(".start-time").datepicker( {dateFormat: "yy-mm-dd" } );
    $(".finish-time").datepicker( {dateFormat: "yy-mm-dd" } );
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
      <div className="post-wrapper" onMouseEnter={this._handleDateSelect}>
        <div>
          <h2>{buttonValue}</h2>
          <form className="calender_event-form clear-fix" onSubmit={callback} >
            <label>Title:
              <input type="text" onChange={this._handleChange("title")} value={this.state.title}/>
            </label>
            <label>Body:
              <input type="textarea" onChange={this._handleChange("body")} value={this.state.body}/>
            </label>
            <label>Start:
              <input type="datetime" className="start-time" />
            </label>
            <label>Finish:
              <input type="datetime" className="finish-time" />
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
