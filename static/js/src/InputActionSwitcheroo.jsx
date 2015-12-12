var $ = require('../lib/jquery-2.1.4');
var React = require('react');

var InputActionSwitcheroo = React.createClass({
  getInitialState: function() {
    return {
      isInputEmpty: true,
      isInputCompleted: false,
      isInputModified: false,
      inputValue: null,
    };
  },

  handleGetPostcode: function(event) {
    this.setState({
      isLoading: true,
    })

    var that = this;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(userLocation) {
        var position = {
          lat: userLocation.coords.latitude,
          lon: userLocation.coords.longitude
        };

        var postcodeUrl = '//api.postcodes.io/postcodes?lon=' + position.lon + '&lat=' + position.lat;
        $.get(postcodeUrl, function(data) {
          that.setState({
            isInputEmpty: false,
            isInputCompleted: true,
            isInputModified: false,
            isLoading: false,
            inputValue: data.result[0].postcode,
          })
        });
      });
    } else {
      console.log('Error:' + postcodeUrl);
    }
  },

  handleClearPostcode: function() {
    this.setState({
      isInputEmpty: true,
      isInputCompleted: false,
      isInputModified: false,
      inputValue: null,
    });
  },

  handleInput: function(event) {
    if (event.target.value) {
      this.setState({
        isInputEmpty: false,
        isInputCompleted: false,
        isInputModified: true,
        inputValue: event.target.value,
      });
    } else {
      this.setState({
        isInputEmpty: true,
        isInputCompleted: false,
        isInputModified: false,
        inputValue: event.target.value,
      });
    }
  },

  render: function() {
    return (
      <div className="input-action-switcheroo">
        <h2>Input Action Switcheroo</h2>
        <p>Get my postcode shows on empty field, Search appears on modified field, Clear appears on populated field</p>
        <p>Clicking Search does not trigger any function</p>

        <input type="text" placeholder="Enter your postcode" onChange={this.handleInput} value={this.state.inputValue}/>
        { this.state.isInputEmpty ? <button onClick={this.handleGetPostcode}>{ this.state.isLoading ? 'Fetching postcode...' : 'Get my postcode' }</button> : null }
        { this.state.isInputCompleted ? <button onClick={this.handleClearPostcode}>Clear postcode</button> : null }
        { this.state.isInputModified ? <button onClick={this.handleGetPostcode}>Search</button> : null }
      </div>
    );
  }
});

module.exports = InputActionSwitcheroo;
