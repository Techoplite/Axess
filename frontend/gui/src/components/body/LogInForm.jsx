import React, { Component } from "react";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

 

  render() {
    return (
      !this.props.isAuthenticated && (
        <form>
          <div className="form-group">
            <label htmlFor="username" className="float-left">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={this.props.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="float-left">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={this.props.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary float-right"
            onClick={this.props.handleLogIn}>
            Submit
          </button>
        </form>
      )
    );
  }
}

export default LogInForm;
