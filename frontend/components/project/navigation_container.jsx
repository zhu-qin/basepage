const React = require('react');
const hashHistory = require('react-router').hashHistory;
const NavButtonConstants = require('../../constants/nav_button_constants');

const NavigationContainer = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showDetail: function(event){
    event.preventDefault();
    this.context.router.push(`/projects/${this.props.projectId}/${this.props.field}_index`);
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
