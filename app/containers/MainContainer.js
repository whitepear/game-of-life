var React = require('react');
var GridContainer = require('./GridContainer.js');

var MainContainer = React.createClass({
	getInitialState: function () {
		return {
			gridRows: 50,
			gridColumns: 50,
			isGridRunning: true
		};
	},
	toggleGridRunning: function (e) {
		this.setState({
			isGridRunning: !(this.state.isGridRunning)
		});
	},
	render: function () {
		return (
			<div className="container">
				<GridContainer gridRows={this.state.gridRows} gridColumns={this.state.gridColumns} isGridRunning={this.state.isGridRunning} />
				<button type="button" className="btn btn-success" onClick={this.toggleGridRunning}>{this.state.isGridRunning ? 'Pause' : 'Start'}</button>
			</div>			
		)		
	}
});

module.exports = MainContainer;