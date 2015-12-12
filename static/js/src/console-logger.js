var $ = require('../lib/jquery-2.1.4');

var ConsoleLogger = function() {
  var init = function() {
    console.log('jQuery version: ' + $.fn.jquery);
    console.log('This comes from console-logger.js called from main.js');
  };

  return {
    init: init,
  };
}();

module.exports = ConsoleLogger;
