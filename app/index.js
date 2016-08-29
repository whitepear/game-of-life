var React = require('react');
var ReactDOM = require('react-dom');
var GridContainer = require('./containers/GridContainer.js');
require('./styles/app.scss');

ReactDOM.render(
	<GridContainer />,
	document.getElementById('app')
);