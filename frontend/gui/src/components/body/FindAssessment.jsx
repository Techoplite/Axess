import React, { Component, Fragment } from "react";

class FindAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessment: null,
      assessmentfound: false,
      assessmentTitle: "",
      currentQuestionNumber: 1,
    };
    this.fetchAssessment = this.fetchAssessment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async fetchAssessment() {
    document.getElementById("assessmentId").value = "";
    this.props.handleMessage("");
    const id = parseInt(this.state.assessmentId);
    if (isNaN(id)) {
      this.props.handleMessage("Assessment Id must be a number.");
    } else {
      await fetch(`http://127.0.0.1:8000/api/assessments/${id}/`)
        .then(response => {
          if (response.ok) {
            this.setState({ assessmentfound: true });
            return response.json();
          } else {
            this.props.handleMessage(
              `There is no assessment with Id ${id}. Please insert a valid Id.`
            );
          }
        })
        .then(data => {
          if (data !== undefined) {
            this.setState({
              assessment: data,
              assessmentTitle: data["title"],
            });
          }
        });
      await fetch("http://127.0.0.1:8000/api/questions/")
        .then(response => response.json())
        .then(data => {
          if (this.state.assessment) {
            this.setState({
              assessmentQuestions: data.filter(
                question => question.assessment === this.state.assessment.id
              ),
            });
          }
        });
      await fetch("http://127.0.0.1:8000/api/answers/")
        .then(response => response.json())
        .then(data => {
          if (this.state.assessmentQuestions) {
            this.setState({
              questionAnswers: [
                this.state.assessmentQuestions.map(question =>
                  data.filter(answer => answer.question === question.id)
                ),
              ],
            });
          }
        });
    }
  }

  render() {
    return !this.state.assessmentfound ? (
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
    ) : (
      <Fragment>
        <h1 className="mb-5">{this.state.assessmentTitle}</h1>
        <h5>
          {this.state.assessmentQuestions &&
            this.state.assessmentQuestions.map(question => (
              <p className="d-inline mr-3" key={question.id}>
                {question.number}
              </p>
            ))}
        </h5>
        <h5 className="mb-5">
          Question number {this.state.currentQuestionNumber}
        </h5>
      </Fragment>
    );
  }
}

export default FindAssessment;
