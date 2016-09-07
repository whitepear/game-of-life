var React = require('react');
var PropTypes = React.PropTypes;

function GridControls (props) {
	return (
		<div className="text-center controls-container">			
			<button type="button" className="btn button button-play" onClick={props.onToggleRunning}>
				{props.isGridRunning ? <i className="fa fa-pause" aria-hidden="true"></i> : <i className="fa fa-play" aria-hidden="true"></i>}
			</button>
			<button type="button" className="btn button button-clear" onClick={props.onClearGrid}><i className="fa fa-stop" aria-hidden="true"></i></button>
			<button type="button" className="btn button button-random" onClick={props.onRandomiseGrid}><i className="fa fa-random" aria-hidden="true"></i></button>
			<button type="button" className="btn button button-step" onClick={props.nextGrid} disabled={props.isGridRunning}><i className="fa fa-step-forward" aria-hidden="true"></i></button>			
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