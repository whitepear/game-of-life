var React = require('react');
var Cell = require('../components/Cell.js');

var GridContainer = React.createClass({
	createGridArray: function () {
		// this function creates a two-dimensional array
		// array height is dependent on the value of this.props.gridRows
		var grid = [];
		for (var i = 0; i < this.props.gridRows; i++) {
			grid[i] = [];
		}
		return grid;
	},
	randomGridPopulator: function (grid) {
		// this function randomly populates the grid array with 1's and 0's 	
		// array width becomes realised via the value of this.props.gridColumns	
		for (var j = 0; j < this.props.gridRows; j++) {			
			for (var k = 0; k < this.props.gridColumns; k++) {
				grid[j][k] = Math.round(Math.random());
			}
		}		
		return grid;
	},
	getInitialState: function () {		
		return {			
			populatedGrid: this.randomGridPopulator(this.createGridArray())
		};
	},
	render: function () {	
		var flattenedGridArray = [].concat.apply([], this.state.populatedGrid);
		var keyGen = 0;
		return (			
			<div className="grid">				
				{flattenedGridArray.map(function (binaryElement) {
					return <Cell key={keyGen++} alive={binaryElement} />
				})}
			</div>			
		)
	}
});

module.exports = GridContainer;