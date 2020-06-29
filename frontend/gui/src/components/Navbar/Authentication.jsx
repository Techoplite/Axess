import React, { Component, Fragment } from "react";
import { HashRouter as Router, Link } from "react-router-dom";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        {this.props.isAuthenticated ? (
          <Fragment>
            <button type="button" className="btn btn-primary">
              {this.props.username}
            </button>
            <a className="nav-link active text-white" href="#">
              Log Out
            </a>
          </Fragment>
        ) : (
          <Fragment>
            <Router>
              <Link className="nav-link active text-white" to="/login">
                Log In
              </Link>
              <a className="nav-link active text-white" href="#">
                Register
              </a>
            </Router>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Authentication;
