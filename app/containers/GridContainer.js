var React = require('react');
var PropTypes = React.PropTypes;
var Cell = require('../components/Cell.js');

var GridContainer = React.createClass({
	propTypes: {
		gridRows: PropTypes.number.isRequired,
		gridColumns: PropTypes.number.isRequired
	},
	getInitialState: function () {		
		return {			
			populatedGrid: this.randomGridPopulator(this.createGridArray()),
			updatedGrid: []
		};
	},
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
	nextGrid: function (currentGrid) {
		// this function generates the next grid iteration
		// produced by the application of game rules to the current grid

		function checkNeighbours (currentRow, currentColumn) {
			// this function returns the total no. of live cells neighbouring the current cell
			
			// ternary operator is used to check for cells on grid's edge
			// this ternary check is used to implement a toroidal game-board			
			var rowAbove = (currentRow - 1 < 0) ? (this.props.gridRows - 1) : currentRow - 1;
	    var rowBelow = (currentRow + 1 === this.props.gridRows) ? 0 : currentRow + 1;
	    var columnLeft = (currentColumn - 1 < 0) ? (this.props.gridColumns - 1) : currentColumn - 1;
	    var columnRight = (currentColumn + 1 === this.props.gridColumns) ? 0 : currentColumn + 1;

	    var liveNeighbours = 0;
	    liveNeighbours += currentGrid[rowAbove][columnLeft];
	    liveNeighbours += currentGrid[rowAbove][currentColumn];
	    liveNeighbours += currentGrid[rowAbove][columnRight];
	    liveNeighbours += currentGrid[currentRow][columnLeft];
	    liveNeighbours += currentGrid[currentRow][columnRight];
	    liveNeighbours += currentGrid[rowBelow][columnLeft];
	    liveNeighbours += currentGrid[rowBelow][currentColumn];
	    liveNeighbours += currentGrid[rowBelow][columnRight];

	    return liveNeighbours;
		} // end checkNeighbours

		for (var j = 0; j < this.props.gridRows; j++) {
			for (var k = 0; k < this.props.gridColumns; k++) {
				
			}
		} 
	},	
	render: function () {	
		console.log(this.state);
		var flattenedGridArray = [].concat.apply([], this.state.populatedGrid);
		var keyGen = 0;
		return (			
			<div className="grid">				
				{flattenedGridArray.map(function (binaryElement) {
					return <Cell key={keyGen++} isAlive={binaryElement} gridRows={this.props.gridRows} gridColumns={this.props.gridColumns} />
				}.bind(this))}
			</div>			
		)
	}
});

module.exports = GridContainer;