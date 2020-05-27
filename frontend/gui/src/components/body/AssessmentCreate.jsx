import React, { Component, Fragment } from "react";
import Message from "../MessageBar.jsx/Message";

class AssessmentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentTitleTyped: null,
      assessmentTitle: null,
      questionDescriptionTyped: null,
      questionDescription: null,
      questionTextTyped: null,
      questionText: null,
      questionNumber: 0,
      questions: [],
      answerTextTyped: null,
      answerText: null,
      answersToCurrentQuestion: [],
      isCorrectAnswer: false,
      isValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAssessmentTitleTypedForm = this.getAssessmentTitleTypedForm.bind(
      this
    );
    this.getQuestionForm = this.getQuestionTypedForm.bind(this);
    this.getAnswerTypedForm = this.getAnswerTypedForm.bind(this);
    this.setQuestionNumber = this.setQuestionNumber.bind(this);
    this.refreshAnswerTypedForm = this.refreshAnswerTypedForm.bind(this);
    this.refreshQuestionTypedForm = this.refreshQuestionTypedForm.bind(this);
    this.handleDeleteAnswer = this.handleDeleteAnswer.bind(this);
    this.handleIsCorrectAnswer = this.handleIsCorrectAnswer.bind(this);
  }

  handleIsCorrectAnswer(event) {
    let newState = !this.state.isCorrectAnswer;
    this.setState({ isCorrectAnswer: newState });
  }

  handleDeleteAnswer(event) {
    event.preventDefault();
    const answerToDelete = event.target.name;
    this.setState({
      answersToCurrentQuestion: [
        ...this.state.answersToCurrentQuestion.filter(answer => {
          return answer.text !== answerToDelete;
        }),
      ],
    });
  }

  getAnswerTypedForm() {
    if (
      this.state.questionText !== null &&
      this.state.assessmentTitle !== null
    ) {
      return (
        <Fragment>
          <h3 className="mb-3">Available Answers</h3>
          {this.state.answersToCurrentQuestion.map(answer => (
            <li key={answer.text} className="list-group-item text-left pl-5">
              {answer.text}{" "}
              <button
                onClick={this.handleDeleteAnswer}
                type="submit"
                name={answer.text}
                id="deleteAnswer"
                className="btn btn-sm btn-danger float-right align-middle mt-n1 mr-2">
                Delete
              </button>
              {answer.isCorrect && (
                <span className="badge badge-pill badge-success float-right mr-4">
                  Correct Answer
                </span>
              )}
            </li>
          ))}
          <h5 className="py-2 mt-5 mb-3">
            Create an Available Answer to Question {this.state.questionNumber} "
            {this.state.questionTextTyped}"
          </h5>
          <form id="answerTypedForm">
            <div className="form-group">
              <label className="float-left" htmlFor="answerTextTyped">
                Answer
              </label>
              <input
                type="text"
                className="form-control"
                id="answerTextTyped"
                value={this.state.value}
                onChange={this.handleChange}
              />
              {this.state.isValid === false && (
                <small
                  id="questionDescriptionTyped"
                  className="form-text text-muted text-left">
                  The answer cannot be an empty value.
                </small>
              )}
              <div className="custom-control custom-checkbox">
                <input
                  checked={this.state.isCorrectAnswer}
                  onChange={this.handleIsCorrectAnswer}
                  type="checkbox"
                  className="custom-control-input"
                  id="isCorrectAnswer"
                />
                <label
                  className="custom-control-label float-left mt-2"
                  htmlFor="isCorrectAnswer">
                  This is the correct answer
                </label>
              </div>
            </div>
            {this.state.answersToCurrentQuestion.length !== 0 && (
              <button
                onClick={this.handleSubmit}
                type="submit"
                id="finishQuestion"
                className="btn btn-danger float-right  ml-3">
                Create a New Question
              </button>
            )}

            <button
              onClick={this.handleSubmit}
              type="submit"
              id="submitAnswer"
              className="btn btn-primary float-right">
              Add Another Answer
            </button>
          </form>
        </Fragment>
      );
    }
  }

  refreshAnswerTypedForm = () => {
    document.getElementById("answerTypedForm").reset();
  };

  getQuestionTypedForm() {
    if (
      this.state.questionDescription === null &&
      this.state.questionText === null &&
      this.state.assessmentTitle !== null
    ) {
      return (
        <Fragment>
          <h3 className="mb-3">Assessment Questions</h3>
          {this.state.questions.map(question => (
            <li key={question.questionText} className="list-group-item mb-5">
              <p className="text-left">"{question.questionDescription}"</p>
              <p className="text-left">"{question.questionText}"</p>
              <p className="text-left">Available answers:</p>
              {question.availableAnswers.map(answer => (
                <ul key={answer.text}>
                  <li key={answer.text} className="list-group-item">
                    {answer.text}
                    {answer.isCorrect && (
                      <span className="badge badge-pill badge-success float-right mr-4">
                        Correct Answer
                      </span>
                    )}
                  </li>
                </ul>
              ))}
            </li>
          ))}
          <h5 className="py-2 mb-5">
            Create a Question in Assessment "{this.state.assessmentTitleTyped}"
          </h5>
          <form>
            <div className="form-group">
              <label className="float-left" htmlFor="questionDescriptionTyped">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="questionDescriptionTyped"
                value={this.state.value}
                onChange={this.handleChange}
                aria-describedby="questionDescriptionTyped"
              />
              <small
                id="questionDescriptionTyped"
                className="form-text text-muted text-left">
                This field is optional.
              </small>
            </div>
            <div className="form-group">
              <label className="float-left" htmlFor="questionTextTyped">
                Question
              </label>
              <input
                type="text"
                className="form-control"
                id="questionTextTyped"
                value={this.state.value}
                onChange={this.handleChange}
              />
              {this.state.isValid === false && (
                <small
                  id="questionDescriptionTyped"
                  className="form-text text-muted text-left">
                  The question cannot be an empty value.
                </small>
              )}
            </div>
            {this.state.questions.length !== 0 && (
              <button
                onClick={this.handleSubmit}
                type="submit"
                id="finishAssessment"
                className="btn btn-danger float-right ml-3">
                Finish Assessment
              </button>
            )}
            <button
              onClick={this.handleSubmit}
              type="submit"
              id="submitQuestion"
              className="btn btn-primary float-right">
              Submit
            </button>
          </form>
        </Fragment>
      );
    }
  }

  refreshQuestionTypedForm = () => {
    document.getElementById("questionTypedForm").reset();
  };

  getAssessmentTitleTypedForm() {
    return (
      this.state.assessmentTitle === null && (
        <Fragment>
          <h3 className="py-2 mb-5">Create Assessment</h3>
          <form id="assessmentTitleForm" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="float-left" htmlFor="assessmentTitleTyped">
                Assessment Title
              </label>
              <input
                type="text"
                className="form-control"
                id="assessmentTitleTyped"
                value={this.state.value}
                onChange={this.handleChange}
              />
              {this.state.isValid === false && (
                <small
                  id="questionDescriptionTyped"
                  className="form-text text-muted text-left">
                  The assessment title cannot be empty.
                </small>
              )}
            </div>
            <button
              type="submit"
              id="assessmentTitleTyped"
              className="btn btn-primary float-right">
              Submit
            </button>
          </form>
        </Fragment>
      )
    );
  }

  setQuestionNumber() {
    this.setState({ questionNumber: this.state.questionNumber + 1 });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      event.target.id === "assessmentTitleForm" &&
      this.state.assessmentTitleTyped !== null
    ) {
      this.setState(
        {
          assessmentTitle: this.state.assessmentTitleTyped,
        },
        () => {
          this.setState({
            isValid: true,
          });
        }
      );
    }
    if (
      event.target.id === "submitQuestion" &&
      this.state.questionTextTyped !== null
    ) {
      this.setState(
        {
          questionNumber: ++this.state.questionNumber,
          questionDescription: this.state.questionDescriptionTyped,
          questionText: this.state.questionTextTyped,
        },
        () => {
          this.setState({
            isValid: true,
          });
        }
      );
    }
    if (event.target.id === "finishAssessment") {
      this.setState({ isValid: true });
      console.log(this.state.isValid);
      this.getAssessmentTitleTypedForm();
    }
    if (
      event.target.id === "submitAnswer" &&
      this.state.answerTextTyped !== null
    ) {
      this.setState({ answerText: this.state.answerTextTyped }, () => {
        (() => {
          let answersToCurrentQuestion = [
            ...this.state.answersToCurrentQuestion,
          ];
          answersToCurrentQuestion.push({
            text: this.state.answerText,
            isCorrect: this.state.isCorrectAnswer,
          });
          this.setState({ answersToCurrentQuestion });
        })();
        (() => {
          this.setState({
            isValid: true,
            isCorrectAnswer: false,
            answerTextTyped: null,
          });
          this.refreshAnswerTypedForm();
          this.getAnswerTypedForm();
        })();
      });
    }
    if (event.target.id === "finishQuestion") {
      this.setState(
        {
          questions: [
            ...this.state.questions,
            {
              questionText: this.state.questionText,
              questionDescription: this.state.questionDescription,
              availableAnswers: this.state.answersToCurrentQuestion,
            },
          ],
        },
        () => {
          this.setState({
            questionDescription: null,
            questionText: null,
            questionTextTyped: null,
            answersToCurrentQuestion: [],
            isValid: true,
          });
          this.getQuestionTypedForm();
        }
      );
    }
    this.setState({ isValid: false });
  }

  render() {
    return (
      <Fragment>
        {this.getAssessmentTitleTypedForm()}
        {this.getQuestionTypedForm()}
        {this.getAnswerTypedForm()}
      </Fragment>
    );
  }
}

export default AssessmentCreate;
