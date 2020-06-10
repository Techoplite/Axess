import React, { Component, Fragment } from "react";

class FindAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessment: null,
    };
    this.fetchAssessment = this.fetchAssessment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async fetchAssessment() {
    const id = parseInt(this.state.assessmentId);
    try {
      await fetch(`http://127.0.0.1:8000/api/assessments/${id}/`)
        .then(response => response.json())
        .then(data => this.setState({ assessment: data }));
    } catch (err) {
      document.getElementById("assessmentId").innerHTML = err.message;
    }
  }

  render() {
    return (
      <Fragment>
        <h1 className="mb-5">Find Assessment</h1>
        <form>
          <div className="form-group">
            <label htmlFor="assessmentId" className=" float-left">
              Assessment Id
            </label>
            <input
              value={this.state.value}
              onChange={this.handleChange}
              type="search"
              className="form-control"
              id="assessmentId"
              placeholder="Enter an assessment Id."
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary float-right"
            onClick={this.fetchAssessment}>
            Search
          </button>
        </form>
      </Fragment>
    );
  }
}

export default FindAssessment;
