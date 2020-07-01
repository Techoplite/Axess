import React, { Component, Fragment } from "react";
import { HashRouter as Router, Link } from "react-router-dom";

class AssessmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: [],
    };
    this.getAssessment = this.getAssessment.bind(this);
    this.handleDeleteAssessment = this.handleDeleteAssessment.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  handleDeleteAssessment(event) {
    event.preventDefault();
    const assessmentName = event.target.name;
    fetch("http://localhost:8000/api/assessments/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    })
      .then(response => response.json())
      .then(data =>
        this.setState(
          {
            assessmentObject: data.find(
              assessment => assessment.title === assessmentName
            ),
          },
          () => {
            const id = this.state.assessmentObject.id;
            fetch(`http://localhost:8000/api/assessments/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`,
              },
            })
              .then(response => response.text())
              .then(data => {
                fetch("http://127.0.0.1:8000/api/assessments/", {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${this.props.token}`,
                  },
                })
                  .then(response => response.json())
                  .then(data => {
                    this.setState({
                      assessments: data.filter(
                        assessment => assessment.creator === this.props.userID
                      ),
                    });
                  });
              });
          }
        )
      );
  }

  loadData() {
    fetch("http://127.0.0.1:8000/api/assessments/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          assessments: data.filter(
            assessment => assessment.creator === this.props.userID
          ),
        });
      });
  }

  componentDidMount() {
    this.props.handleMessage("", "success");
    this.loadData();
  }

  getAssessment() {
    return (
      <Fragment>
        <h3 className="py-2">Your Assessments</h3>
        {this.state.assessments !== [] &&
          this.state.assessments.map(assessment => (
            <div key={assessment.id}>
              <Link
                className="nav-link active"
                key={assessment.id}
                to={`assessment-detail/${assessment.id}`}>
                <li key={assessment.id} className="list-group-item">
                  {assessment.title} - ID: {assessment.id}
                  <button
                    onClick={this.handleDeleteAssessment}
                    type="submit"
                    name={assessment.title}
                    id="deleteAssessment"
                    className="btn btn-sm btn-danger float-right align-middle mt-n1 mr-2">
                    Delete
                  </button>
                </li>
              </Link>
            </div>
          ))}
      </Fragment>
    );
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
