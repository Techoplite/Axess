import React, { Component } from "react";
import { HashRouter as Router, Link } from "react-router-dom";

class AssessmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: [],
    };
    this.getAssessment = this.getAssessment.bind(this);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/assessments/")
      .then(response => response.json())
      .then(data => this.setState({ assessments: data }));
  }

  getAssessment() {
    return this.state.assessments.map(assessment => (
      <div key={assessment.id}>
        <h3 className="py-2">Your Assessments</h3>
        <Link
          className="nav-link active"
          key={assessment.id}
          to={`assessment-detail/${assessment.id}`}>
          <li key={assessment.id} className="list-group-item">
            {assessment.title}
          </li>
        </Link>
      </div>
    ));
  }

  render() {
    return (
      <Router>
        <ul className="list-group">{this.getAssessment()}</ul>
      </Router>
    );
  }
}

export default AssessmentList;
