import React, { Component } from "react";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.handleMessage("");
  }

  render() {
    return (
      !this.props.isAuthenticated && (
        <form className="col-8 mx-auto" autoComplete="off">
          <h1 className="mb-4">Register</h1>
          <div className="form-group">
            <label htmlFor="username" className="float-left">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={this.props.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="float-left">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={this.props.handleChange}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password1" className="float-left">
              Password 1
            </label>
            <input
              type="password"
              className="form-control"
              id="password1"
              onChange={this.props.handleChange}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password2" className="float-left">
              Password 2
            </label>
            <input
              type="password"
              className="form-control"
              id="password2"
              onChange={this.props.handleChange}
              required
            />
            {this.props.passwordsDiffer && (
              <small
                id="questionDescriptionTyped"
                className="form-text text-muted text-left">
                The two passwords provided don't match.
              </small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="roleRadio" className="col-12 text-left p-0 mb-3">
              Role
            </label>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                checked={this.props.radioChecked === "Teacher"}
                onChange={this.props.handleRadioOnChange}
                type="radio"
                id="radioTeacher"
                name="Teacher"
                className="custom-control-input"
                required={!this.props.radioChecked && true}
              />
              <label className="custom-control-label" htmlFor="radioTeacher">
                Teacher
              </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                checked={this.props.radioChecked === "Student"}
                onChange={this.props.handleRadioOnChange}
                type="radio"
                id="radioStudent"
                name="Student"
                className="custom-control-input"
                required={!this.props.radioChecked && true}
              />
              <label className="custom-control-label" htmlFor="radioStudent">
                Student
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary float-right  mt-3"
            onClick={event => this.props.handleRegister(event)}>
            Submit
          </button>
        </form>
      )
    );
  }
}

export default RegisterForm;
