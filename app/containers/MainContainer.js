var React = require('react');
var GridContainer = require('./GridContainer.js');

var MainContainer = React.createClass({
	getInitialState: function () {
		return {
			gridRows: 8,
			gridColumns: 5
		};
	},
	render: function () {
		return (
			<GridContainer gridRows={this.state.gridRows} gridColumns={this.state.gridColumns} />
		)		
	}
});

module.exports = MainContainer;