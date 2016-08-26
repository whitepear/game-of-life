var React = require('react');
var GridContainer = require('./GridContainer.js');

var MainContainer = React.createClass({
	getInitialState: function () {
		return {
			gridRows: 10,
			gridColumns: 10
		};
	},
	render: function () {
		return (
			<div className="container">
				<GridContainer gridRows={this.state.gridRows} gridColumns={this.state.gridColumns} />
			</div>			
		)		
	}
});

module.exports = MainContainer;