var React = require('react');

// var TitleInput = React.createClass({
//   render: function() {
//     return (
//       <input type="text" placeholder="Enter your title"/>
//     )
//   }
// });

var TitleToggler = React.createClass({
  getInitialState: function() {
    return {
      showInput: false,
      selectedValue: null,
      inputValue: null,
    };
  },

  handleChange: function(event) {
    if (event.target.value == 'Other') {
      this.setState({
        showInput: true,
        selectedValue: null,
      });
    } else {
      this.setState({
        showInput: false,
        selectedValue: event.target.value,
      });
    }
  },

  handleInput: function(event) {
    this.setState({
      inputValue: event.target.value,
      selectedValue: event.target.value,
    })
  },

  render: function() {
    return (
      <div className="title-toggler">
        <h2>Title Toggler</h2>
        <p>On selecting Other, a textbox will appear for you to type in</p>
        <p>The current selected value is: {this.state.selectedValue}</p>

        <select defaultValue={""} required onChange={this.handleChange}>
          <option disabled value="">Select your title</option>
          <option>Ms</option>
          <option>Mr</option>
          <option>Other</option>
        </select>
        { this.state.showInput ? <input type="text" placeholder="Enter your title" onChange={this.handleInput} inputValue={this.state.inputValue} /> : null }
      </div>
    );
  }
});

module.exports = TitleToggler;
