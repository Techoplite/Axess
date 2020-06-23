import React, { Component, Fragment } from "react";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      username: "Mirko",
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.isLoggedIn ? (
          <Fragment>
            <button type="button" className="btn btn-primary">
              {this.state.username}
            </button>
            <a className="nav-link active text-white" href="#">
              Log Out
            </a>
          </Fragment>
        ) : (
          <Fragment>
            <a className="nav-link active text-white" href="#">
              Sign In
            </a>
            <a className="nav-link active text-white" href="#">
              Register
            </a>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Authentication;
