var ConsoleLogger = require('./src/console-logger');

ConsoleLogger.init();

var React = require('react');
var ReactDOM = require('react-dom');

var TitleToggler = require('./src/TitleToggler.jsx');
ReactDOM.render(<TitleToggler/>, document.getElementById('react-title-toggler'));

var InputActionSwitcheroo = require('./src/InputActionSwitcheroo.jsx')
ReactDOM.render(<InputActionSwitcheroo/>, document.getElementById('react-input-action-switcheroo'));
