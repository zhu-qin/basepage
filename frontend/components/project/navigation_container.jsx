const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NavButtonConstants = require('../../constants/nav_button_constants');
const SessionStore = require('../../stores/session_store');

const NavigationContainer = React.createClass({

  showDetail: function(event){
    event.preventDefault();
    hashHistory.push(`/projects/${SessionStore.userMainProject()}/${this.props.button}_index`);
  },

  render: function(){
    let button = this.props.button;
    return (
      <li onClick={this.showDetail} className="nav-list-item">
        {NavButtonConstants[button]}<br/>
      </li>
    );
  }

});

module.exports = NavigationContainer;
