var React = require('react');
var ReactDOM = require('react-dom');
var MainContainer = require('./containers/MainContainer.js');
require('./styles/app.scss');

ReactDOM.render(
	<MainContainer />,
	document.getElementById('app')
);