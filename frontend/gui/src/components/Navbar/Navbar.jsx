import React, { Component } from "react";
import Navs from "./Navs";
import Authentication from "./Authentication";
import { HashRouter as Router, Link } from "react-router-dom";

class Navabar extends Component {
  state = {};
  render() {
    return (
      <Router>
        <nav
          className="navbar navbar-light bg-secondary py-3"
          style={{ zIndex: 0 }}>
          <Link className="navbar-brand text-white" to="/#">
            Axess
          </Link>
          <Navs role={this.props.role} />
          <Authentication />
        </nav>
      </Router>
    );
  }
}

export default Navabar;
