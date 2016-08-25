var React = require('react');
var Cell = require('../components/Cell.js');

var GridContainer = React.createClass({
	createGridArray: function (rows) {
		// this function creates a two-dimensional array
		// array height is dependent on the value of rows
		var grid = [];
		for (var i = 0; i < rows; i++) {
			grid[i] = [];
		}
		return grid;
	},
	render: function () {
		return (
			<Cell />
		)
	}
});

module.exports = GridContainer;