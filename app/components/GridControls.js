var React = require('react');
var PropTypes = React.PropTypes;

function GridControls (props) {
	return (
		<div>
			<div>Generations: {props.gridIterations}</div>
			<button type="button" className="btn btn-success" onClick={props.onToggleRunning}>
				{props.isGridRunning ? 'Pause' : 'Start'}
			</button>
		</div>			
	)
}

GridControls.propTypes = {
	gridIterations: PropTypes.number.isRequired,
	onToggleRunning: PropTypes.func.isRequired,
	isGridRunning: PropTypes.bool.isRequired	
};

module.exports = GridControls;