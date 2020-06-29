import React, { Component, Fragment } from "react";

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
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
