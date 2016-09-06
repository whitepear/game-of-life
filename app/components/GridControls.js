var React = require('react');
var PropTypes = React.PropTypes;

function GridControls (props) {
	return (
		<div className="text-center">			
			<button type="button" className="button button-play" onClick={props.onToggleRunning}>
				{props.isGridRunning ? <i className="fa fa-pause" aria-hidden="true"></i> : <i className="fa fa-play" aria-hidden="true"></i>}
			</button>
			<button type="button" className="button button-clear" onClick={props.onClearGrid}>Clear Grid</button>
			<button type="button" className="button button-random" onClick={props.onRandomiseGrid}><i className="fa fa-random" aria-hidden="true"></i></button>
			<button type="button" className="button button-step" onClick={props.nextGrid} disabled={props.isGridRunning}><i className="fa fa-step-forward" aria-hidden="true"></i></button>			
		</div>			
	)
}

GridControls.propTypes = {
	onToggleRunning: PropTypes.func.isRequired,
	onRandomiseGrid: PropTypes.func.isRequired,
	nextGrid: PropTypes.func.isRequired,
	onClearGrid: PropTypes.func.isRequired,
	isGridRunning: PropTypes.bool.isRequired	
};

module.exports = GridControls;