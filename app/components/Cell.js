var React = require('react');
var PropTypes = React.PropTypes;

var Cell = React.createClass({
	propTypes: {
		isAlive: PropTypes.number.isRequired,
		cellRowOrigin: PropTypes.number.isRequired,
		cellColumnOrigin: PropTypes.number.isRequired,
		onChangeCell: PropTypes.func.isRequired,
		gridRows: PropTypes.number.isRequired,
		gridColumns: PropTypes.number.isRequired
	},
	shouldComponentUpdate: function (nextProps, nextState) {
		return !(nextProps.isAlive === this.props.isAlive);
	},
	render: function () {
		var cellDimensions = {
			height: (100/this.props.gridRows) + '%',
			width: (100/this.props.gridColumns) + '%'
		};
		return (
			<div className={this.props.isAlive ? 'alive' : 'dead'} style={cellDimensions} data-row-origin={this.props.cellRowOrigin} data-column-origin={this.props.cellColumnOrigin} onClick={this.props.onChangeCell}></div>
		)
	}
});

module.exports = Cell;