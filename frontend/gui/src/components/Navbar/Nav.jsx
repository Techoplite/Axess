import React, { Component } from "react";
import { HashRouter as Router, Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getLink = this.getLink.bind(this);
  }

  getLink() {
    if (this.props.label === "Your Assessments") {
      return "/assessment-list";
    }
    if (this.props.label === "Create Assessment") {
      return "/assessment-create";
    }
  }

  render() {
    return (
      <Router>
        <li key={this.props.label} className="nav-item">
          {this.props.role === "Teacher" && (
            <Link
              to={this.getLink()}
              key={this.props.label}
              className="nav-link active">
              {this.props.label}
            </Link>
          )}
        </li>
      </Router>
    );
  }
}

export default Nav;
