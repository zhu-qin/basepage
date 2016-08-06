const React = require('react');

const HomeBasePage = React.createClass({
  getInitialState: function (){
    return { basepages: [] };
  },

  render: function(){
    return (
    <div>
      hello
      {this.props.children}
    </div>
    );
  }


});

module.exports = HomeBasePage;
