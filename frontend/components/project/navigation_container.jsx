const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NavButtonConstants = require('../../constants/nav_button_constants');
const ProjectStore = require('../../stores/project_store');

const NavigationContainer = React.createClass({

  showDetail: function(event){
    event.preventDefault();
    hashHistory.push(`/projects/${ProjectStore.getCurrentProject().id}/${this.props.button}_index`);
  },

  render: function(){
    let button = this.props.button;
    return (
      <li onClick={this.showDetail} className="nav-list-button button-main">
        {NavButtonConstants[button]}<br/>
      </li>
    );
  }

});

module.exports = NavigationContainer;
