import React, { Component, Fragment } from "react";

class YourAssessments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: [],
    };
    this.getAssessment = this.getAssessment.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentWillMount() {
    this.props.handleMessage("");
  }

  loadData() {
    fetch("http://127.0.0.1:8000/api/results/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token bd7c6fdc5041f92eb29c942ada9ae9ebe5889b9d",
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          assessments: data,
        });
      });
  }

  componentDidMount() {
    this.props.handleMessage("");
    this.loadData();
  }

  getAssessment() {
    return (
      <Fragment>
        <h3 className="py-2">Your Assessments Results</h3>
        {!this.state.assessments === [] &&
          this.state.assessments.map(assessment => (
            <div key={assessment.id}>
              <li key={assessment.id} className="list-group-item">
                ID: {assessment.assessment}
                <br /> Result: {assessment.score}%
                <br /> Submitted on {assessment.date.slice(0, 10)} at{" "}
                {assessment.date.slice(11, 19)}
              </li>
            </div>
          ))}
      </Fragment>
    );
  }

  render() {
    return <ul className="list-group">{this.getAssessment()}</ul>;
  }
}

export default YourAssessments;
