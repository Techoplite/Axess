import React, { Component } from "react";
import Nav from "./Nav";

class Navs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["Create Assessment", "Your Assessments"],
    };
  }

  render() {
    return (
      <ul className="text-responsive nav mx-auto">
        {this.state.labels.map(label => (
          <Nav key={label} label={label} role={this.props.role} />
        ))}
      </ul>
    );
  }
}

export default Navs;
