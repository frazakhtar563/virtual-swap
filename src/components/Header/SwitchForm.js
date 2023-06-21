import React, { Component } from "react";
import Switch from "react-switch";
class SwitchForm extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(checked) {
    this.setState({ checked });
  }
  render() {
    return (
      <label className="mt-2">
        <Switch onChange={this.handleChange}

          onColor="#86d3ff"
          offColor="#372f47"
          onHandleColor="#27262c"
          offHandleColor='#27262c' checked={this.state.checked} />
      </label>
    );
  }
}
export default SwitchForm;