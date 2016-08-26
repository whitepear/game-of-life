var React = require('react');
var PropTypes = React.PropTypes;

function Cell (props) {
	var cellDimensions = {
		height: (100/props.gridRows) + '%',
		width: (100/props.gridColumns) + '%'
	};
	return (
		<div className={props.alive ? 'alive' : 'dead'} style={cellDimensions}></div>
	)
}

Cell.propTypes = {	
	alive: PropTypes.number.isRequired,
	gridRows: PropTypes.number.isRequired,
	gridColumns: PropTypes.number.isRequired
};

module.exports = Cell;