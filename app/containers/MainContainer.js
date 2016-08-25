var React = require('react');
var GridContainer = require('./GridContainer.js');

var MainContainer = React.createClass({
	getInitialState: function () {
		return {
			gridRows: 8
		};
	},
	render: function () {
		return (
			<GridContainer gridRows={this.state.gridRows} />
		)		
	}
});

module.exports = MainContainer;