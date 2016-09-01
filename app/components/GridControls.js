var React = require('react');
var PropTypes = React.PropTypes;

function GridControls (props) {
	return (
		<div>
			<div>Generations: {props.gridIterations}</div>
			<button type="button" className="btn btn-success" onClick={props.onToggleRunning}>
				{props.isGridRunning ? 'Pause' : 'Start'}
			</button>
			<button type="button" className="btn btn-warning" onClick={props.onClearGrid}>Clear Grid</button>
			<button type="button" className="btn btn-info" onClick={props.onRandomiseGrid}>Randomise</button>
			<button type="button" className="btn btn-info" onClick={props.nextGrid} disabled={props.isGridRunning}>Step Forward</button>
		</div>			
	)
}

GridControls.propTypes = {
	gridIterations: PropTypes.number.isRequired,
	onToggleRunning: PropTypes.func.isRequired,
	onRandomiseGrid: PropTypes.func.isRequired,
	nextGrid: PropTypes.func.isRequired,
	onClearGrid: PropTypes.func.isRequired,
	isGridRunning: PropTypes.bool.isRequired	
};

module.exports = GridControls;