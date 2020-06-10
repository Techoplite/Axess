import React, { Component } from "react";
import Nav from "./Nav";

class Navs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherLabels: ["Create Assessment", "Your Assessments"],
      studentLabels: ["Find Assessment", "Assessments Results"],
    };
  }

  render() {
    return (
      <ul className="text-responsive nav mx-auto">
        {this.props.role == "Teacher" &&
          this.state.teacherLabels.map(label => (
            <Nav key={label} label={label} role={this.props.role} />
          ))}
        {this.props.role == "Student" &&
          this.state.studentLabels.map(label => (
            <Nav key={label} label={label} role={this.props.role} />
          ))}
      </ul>
    );
  }
}

export default Navs;
