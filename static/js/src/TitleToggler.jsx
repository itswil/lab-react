var React = require('react');

var selectStyle = {
  display: 'none',
}

var TitleInput = React.createClass({
  render: function() {
    return (
      <input type="text" placeholder="Enter your title"/>
    )
  }
});

var TitleToggler = React.createClass({
  getInitialState: function() {
    return {
      showInput: false,
      selectedValue: null
    };
  },

  handleChange: function(event) {
    if (event.target.value == 'Other') {
      this.setState({
        showInput: true,
        selectedValue: event.target.value
      });
    } else {
      this.setState({
        showInput: false,
        selectedValue: event.target.value
      });
    }
    debugger;
  },

  render: function() {
    return (
      <div className="title-toggler">
        <h1>Title Toggler</h1>
        <p>On selecting Other, a textbox will appear for you to type in</p>
        <p>The current selected value is: {this.state.selectedValue}</p>

        <select defaultValue={""} required onChange={this.handleChange}>
          <option disabled value="">Select your title</option>
          <option>Ms</option>
          <option>Mr</option>
          <option>Other</option>
        </select>
        { this.state.showInput ? <TitleInput /> : null }
      </div>
    );
  }
});

module.exports = TitleToggler;
