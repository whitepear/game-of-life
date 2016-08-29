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
			gridIterations: 0
		};
	},
	createGridArray: function () {
		// this function creates a two-dimensional array
		// grid height is dependent on the value of this.props.gridRows
		var grid = [];
		for (var i = 0; i < this.props.gridRows; i++) {
			grid[i] = [];
		}
		return grid;
	},
	randomGridPopulator: function (grid) {
		// this function randomly populates the grid array with 1's and 0's 	
		// grid width is dependent on the value of this.props.gridColumns	
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

		// create an array to temporarily hold the next iteration of game state 
		// its value will be used to update game state later
		var updatedGrid = this.createGridArray(); 
		
		// loop through rows and columns
		for (var j = 0; j < this.props.gridRows; j++) {
			for (var k = 0; k < this.props.gridColumns; k++) {
				// get total no. of live cells surrounding current cell
				var liveNeighbours = checkNeighbours.call(this, j, k);
				if (currentGrid[j][k]) {
					// ^ if the current cell is alive (i.e. === 1), then...
					if (liveNeighbours < 2) {
						updatedGrid[j][k] = 0;
					} else if (liveNeighbours === 2 || liveNeighbours === 3) {
						updatedGrid[j][k] = 1;
					} else if (liveNeighbours > 3) {
						updatedGrid[j][k] = 0;
					}
				} else {
					// if the current cell is dead (i.e. === 0), then...
					if (liveNeighbours === 3) {
						updatedGrid[j][k] = 1;
					} else {
						updatedGrid[j][k] = 0;
					}
				}// end first if/else
			} // end inner loop
		} // end outer loop		
		
		this.setState({
			populatedGrid: updatedGrid,
			gridIterations: this.state.gridIterations + 1
		}, function () {
			console.log(this.state);
		});
	},	
	componentDidMount: function () {
		var gridInterval = setInterval(function () {
			this.nextGrid(this.state.populatedGrid);
		}.bind(this), 1000);
	},
	render: function () {	
		var flattenedGridArray = [].concat.apply([], this.state.populatedGrid);
		var keyGen = 0;
		return (	
			<div>		
				<div className="grid">				
					{flattenedGridArray.map(function (binaryElement) {
						return <Cell key={keyGen++} isAlive={binaryElement} gridRows={this.props.gridRows} gridColumns={this.props.gridColumns} />
					}.bind(this))}
				</div>
				<div>{this.state.gridIterations}</div>
			</div>			
		)
	}
});

module.exports = GridContainer;