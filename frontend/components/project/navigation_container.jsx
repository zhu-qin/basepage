const React = require('react');


const NavigationContainer = React.createClass({



  render: function(){

    return (
      <li>{this.props.field}</li>
    );
  }

});

module.exports = NavigationContainer;
