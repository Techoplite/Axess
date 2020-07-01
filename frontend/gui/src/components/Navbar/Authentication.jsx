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
            <p className="nav-link active text-white my-auto rounded bg-primary">
              {this.props.username}
            </p>
            <button
              onClick={this.props.handleOnClick}
              className="nav-link active text-white"
              style={{ border: "none", background: "none" }}>
              Log Out
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <Router>
              <Link className="nav-link active text-white" to="/login">
                Log In
              </Link>
              <Link className="nav-link active text-white" to="/register">
                Register
              </Link>
            </Router>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Authentication;
