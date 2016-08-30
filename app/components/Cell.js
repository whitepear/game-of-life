var React = require('react');
var PropTypes = React.PropTypes;

function Cell (props) {
	var cellDimensions = {
		height: (100/props.gridRows) + '%',
		width: (100/props.gridColumns) + '%'
	};
	return (
		<div className={props.isAlive ? 'alive' : 'dead'} style={cellDimensions} data-row-origin={props.cellRowOrigin} data-column-origin={props.cellColumnOrigin} onClick={props.onChangeCell}></div>
	)
}

Cell.propTypes = {	
	isAlive: PropTypes.number.isRequired,
	cellRowOrigin: PropTypes.number.isRequired,
	cellColumnOrigin: PropTypes.number.isRequired,
	onChangeCell: PropTypes.func.isRequired,
	gridRows: PropTypes.number.isRequired,
	gridColumns: PropTypes.number.isRequired
};

module.exports = Cell;