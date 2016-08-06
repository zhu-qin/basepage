const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NavButtonConstants = require('../../constants/nav_button_constants');
const SessionStore = require('../../stores/session_store');

const NavigationContainer = React.createClass({
  
  showDetail: function(event){
    event.preventDefault();
    hashHistory.push(`/projects/${SessionStore.userMainProject()}/${this.props.field}_index`);
  },

  render: function(){
    let field = this.props.field;
    return (
      <li onClick={this.showDetail} className="nav-list-item">
        {NavButtonConstants[field]}<br/>
      {this.props.contents}
      </li>
    );
  }

});

module.exports = NavigationContainer;
