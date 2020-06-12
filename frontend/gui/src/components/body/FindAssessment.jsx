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
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
    this.handleCurrentQuestionNumber = this.handleCurrentQuestionNumber.bind(
      this
    );
  }

  setCurrentQuestion() {
    console.log(this.state.currentQuestionNumber);
    if (this.state.assessmentQuestions) {
      const currentQuestion = this.state.assessmentQuestions.find(
        question => question.number === this.state.currentQuestionNumber
      );
      console.log(currentQuestion);
      this.setState({ currentQuestion: currentQuestion });
    }
  }

  handleCurrentQuestionNumber(event) {
    this.setState(
      {
        currentQuestionNumber: parseInt(event.target.id),
      },
      () => this.setCurrentQuestion()
    );
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
            this.setState(
              {
                questionAnswers: [
                  this.state.assessmentQuestions.map(question =>
                    data.filter(answer => answer.question === question.id)
                  ),
                ],
              },
              () => this.setCurrentQuestion()
            );
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
        <h5 className="text-left">
          <p className="d-inline">Questions:</p>
          {this.state.assessmentQuestions &&
            this.state.assessmentQuestions.map(question => (
              <button
                onClick={this.handleCurrentQuestionNumber}
                className="d-inline mr-1 mb-1 btn"
                key={question.id}
                id={question.number}>
                {question.number}
              </button>
            ))}
        </h5>
        <form className="border p-2 py-4 rounded">
          <h5 className="mb-5">
            Question number {this.state.currentQuestionNumber}
          </h5>
          {this.state.currentQuestion && (
            <Fragment>
              <h6 className="mb-3">{this.state.currentQuestion.description}</h6>
              <h6>{this.state.currentQuestion.question}</h6>
              <select className="select-answer mt-5 p-1">
                <option selected>Please select an answer</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Fragment>
          )}
        </form>
      </Fragment>
    );
  }
}

export default FindAssessment;
