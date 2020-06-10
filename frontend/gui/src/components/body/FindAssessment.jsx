import React, { Component, Fragment } from "react";

class FindAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = { assessmentId: null };
  }
  render() {
    return (
      <Fragment>
        <h1 className="mb-5">Find Assessment</h1>
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput" className=" float-left">
              Assessment Id
            </label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter an assessment Id."
            />
          </div>
          <button type="submit" className="btn btn-primary float-right">
            Search
          </button>
        </form>
      </Fragment>
    );
  }
}

export default FindAssessment;
