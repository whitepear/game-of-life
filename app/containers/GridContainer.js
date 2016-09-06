var React = require('react');
var Cell = require('../components/Cell.js');
var GridControls = require('../components/GridControls.js');

var GridContainer = React.createClass({	
	getInitialState: function () {		
		return {			
			populatedGrid: this.randomGridPopulator(this.createGridArray(50), 50, 50),
			gridRows: 50,
			gridColumns: 50,
			gridIterations: 0,
			isGridRunning: true
		};
	},
	createGridArray: function (rows) {
		// this function creates a two-dimensional array.
		// grid height is dependent on the value of parameter 'rows'.
		var grid = [];
		for (var i = 0; i < rows; i++) {
			grid[i] = [];
		}
		return grid;
	},
	randomGridPopulator: function (grid, rows, columns) {
		// this function randomly populates the grid array with ones and zeroes. 	
		// grid width is dependent on the value of parameter 'columns'.	
		for (var j = 0; j < rows; j++) {			
			for (var k = 0; k < columns; k++) {
				grid[j][k] = Math.round(Math.random());
			}
		}		
		return grid;
	},		
	createGridJSX: function (populatedGridArray) {
		// this function returns a one-dimensional array of Cell JSX components,
		// based on populatedGrid.
		var keyGen = 0;
		var cellArray = [];
		populatedGridArray.forEach(function (row, rowIndex) {
			row.forEach(function (column, columnIndex) {
				cellArray.push(<Cell key={keyGen++}
										 				 isAlive={column}
														 cellRowOrigin={rowIndex}
														 cellColumnOrigin={columnIndex} 
														 onChangeCell={this.handleChangeCell}
													   gridRows={this.state.gridRows} 
													   gridColumns={this.state.gridColumns} />);
			}.bind(this));
		}.bind(this));		

		return cellArray;
	},
	nextGrid: function () {
		// this function generates the next grid iteration,
		// produced by the application of game rules to the current grid.

		var currentGrid = this.state.populatedGrid;
		
		function checkNeighbours (currentRow, currentColumn) {
			// this function returns the total no. of live cells neighbouring the current cell.
			
			// ternary operator is used to check for cells on grid's edge.
			// this ternary check is used to implement a toroidal game-board.			
			var rowAbove = (currentRow - 1 < 0) ? (this.state.gridRows - 1) : currentRow - 1;
	    var rowBelow = (currentRow + 1 === this.state.gridRows) ? 0 : currentRow + 1;
	    var columnLeft = (currentColumn - 1 < 0) ? (this.state.gridColumns - 1) : currentColumn - 1;
	    var columnRight = (currentColumn + 1 === this.state.gridColumns) ? 0 : currentColumn + 1;

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

		// create an array to temporarily hold the next iteration of game state. 
		// its value will be used to update game state later.
		var updatedGrid = this.createGridArray(this.state.gridRows); 
		
		// loop through rows and columns.
		for (var j = 0; j < this.state.gridRows; j++) {
			for (var k = 0; k < this.state.gridColumns; k++) {
				// get total no. of live cells surrounding current cell.
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
		});
	},	
	handleChangeCell: function (e) {
		// this function handles user-placement/removal of cells on game-grid via clicking.
		// user clicks on a game-grid cell. the corresponding cell within populatedGrid array
		// has its value inverted.
		
		// .map with .slice(0) to generate a deep value copy of the 2D array referenced
		// by this.state.populatedGrid.
		var currentGridCopy = this.state.populatedGrid.map(function (row) {
			return row.slice(0);
		});

		var cellRow = parseInt(e.target.dataset.rowOrigin);
		var cellColumn = parseInt(e.target.dataset.columnOrigin);
		currentGridCopy[cellRow][cellColumn] = currentGridCopy[cellRow][cellColumn] === 1 ? 0 : 1;
		
		this.setState({
			populatedGrid: currentGridCopy 
		});
	},
	handleToggleRunning: function (e) {
		this.setState({
			isGridRunning: !(this.state.isGridRunning)
		});
	},
	handleClearGrid: function (e) {
		// this function clears the grid and resets state.

		function createClearedArray (rows, columns) {
			// this function creates a two-dimensional array.
			// the nested arrays contain only zeroes.
			var clearedArray = [];
			for (var j = 0; j < rows; j++) {
				clearedArray[j] = [];
				for (var k = 0; k < columns; k++) {
					clearedArray[j][k] = 0;
				}
			}			
			return clearedArray;
		} // end createClearedArray

		this.setState({
			populatedGrid: createClearedArray(this.state.gridRows, this.state.gridColumns),
			gridRows: this.state.gridRows,
			gridColumns: this.state.gridColumns,
			gridIterations: 0,
			isGridRunning: false			
		});
	},
	handleRandomiseGrid: function () {
		// this function randomises the grid array.
		this.setState({
			populatedGrid: this.randomGridPopulator(this.createGridArray(this.state.gridRows), this.state.gridRows, this.state.gridColumns),
			gridIterations: 0
		});
	},
	componentDidMount: function () {
		// start the interval function that regularly updates the grid.
		var gridInterval = setInterval(function () {
			if (this.state.isGridRunning) {				
				this.nextGrid();
			}
		}.bind(this), 100);
	},	
	render: function () {			
		return (	
			<div className="container">	
				<div className="game-title">
					<p>Conway's</p>
					<p>Game</p>
					<p>of</p>
					<p>Life.</p>
					<div className="generation-counter">Generations: {this.state.gridIterations}</div>
				</div>	
				<div className="grid">				
					{this.createGridJSX(this.state.populatedGrid)}
				</div>
				<GridControls 
					gridIterations={this.state.gridIterations}
					onToggleRunning={this.handleToggleRunning}
					onClearGrid={this.handleClearGrid} 
					onRandomiseGrid={this.handleRandomiseGrid}
					nextGrid={this.nextGrid}
					isGridRunning={this.state.isGridRunning} />			
			</div>			
		)
	}
});

module.exports = GridContainer;