import React, { Component, Fragment } from "react";
import Message from "../MessageBar.jsx/Message";

class AssessmentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessmentTitle: null,
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
      isEditingAssessmentTitle: true,
      isAddingAnswer: false,
      isAssessmentFinished: false,
      numberOfCorrectAnswers: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAssessmentTitleForm = this.getAssessmentTitleForm.bind(this);
    this.getQuestionForm = this.getQuestionForm.bind(this);
    this.getAnswerForm = this.getAnswerForm.bind(this);
    this.setQuestionNumber = this.setQuestionNumber.bind(this);
    this.refreshAnswerForm = this.refreshAnswerForm.bind(this);
    this.refreshQuestionForm = this.refreshQuestionForm.bind(this);
    this.handleDeleteAnswer = this.handleDeleteAnswer.bind(this);
    this.handleIsCorrectAnswer = this.handleIsCorrectAnswer.bind(this);
    this.getAssessmentReview = this.getAssessmentReview.bind(this);
    this.incrementCorrectAnswers = this.incrementCorrectAnswers.bind(this);
    this.decrementCorrectAnswers = this.decrementCorrectAnswers.bind(this);
    this.isDuplicateAnswer = this.isDuplicateAnswer.bind(this);
  }

  isDuplicateAnswer() {
    return this.state.answersToCurrentQuestion.some(
      answer => this.state.answerTextTyped === answer.text
    );
  }

  incrementCorrectAnswers() {
    this.setState({
      numberOfCorrectAnswers: ++this.state.numberOfCorrectAnswers,
    });
  }
  decrementCorrectAnswers() {
    this.setState({
      numberOfCorrectAnswers: --this.state.numberOfCorrectAnswers,
    });
  }

  getAssessmentReview() {
    if (this.state.isAssessmentFinished === true) {
      return (
        <Fragment>
          <h1 className="mb-5">Assessment review</h1>
          <ul className="list-group">
            <h4 className="display-4 mb-4">{this.state.assessmentTitle}</h4>
            {this.state.questions.map(question => (
              <li className="list-group-item" key={question.questionText}>
                <h3 className="text-left">Question {question.number}</h3>
                <br />
                {question.questionDescription !== null && (
                  <p>"{question.questionDescription}"</p>
                )}
                <br />"{question.questionText}"
                <ul className="list-group">
                  <br />
                  {question.availableAnswers.map(answer => (
                    <li className="list-group-item" key={answer.text}>
                      {answer.text}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    }
  }

  handleIsCorrectAnswer(event) {
    let newState = !this.state.isCorrectAnswer;
    this.setState({ isCorrectAnswer: newState });
  }

  handleDeleteAnswer(event) {
    event.preventDefault();
    const answerName = event.target.name;
    console.log("answerName", answerName);
    const answerObject = this.state.answersToCurrentQuestion.find(answer => {
      return answer.text === answerName;
    });
    console.log("answerObject", answerObject);
    if (answerObject.isCorrect === true) {
      this.decrementCorrectAnswers();
    }
    this.props.handleMessage("");
    this.setState({
      answersToCurrentQuestion: [
        ...this.state.answersToCurrentQuestion.filter(answer => {
          return answer.text !== answerName;
        }),
      ],
    });
  }

  getAnswerForm() {
    if (
      this.state.questionText !== null &&
      this.state.assessmentTitle !== null
    ) {
      return (
        <Fragment>
          <h3 className="mb-3">Available Answers</h3>
          <ul className="list-group">
            {this.state.answersToCurrentQuestion.map(answer => (
              <li key={answer.text} className="list-group-item text-left  ">
                {answer.text}
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
          </ul>
          <h5 className="py-2 mt-5 mb-3">
            Create an Available Answer to Question {this.state.questionNumber} "
            {this.state.questionTextTyped}"
          </h5>
          <form id="answerForm">
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
              Add Answer
            </button>
          </form>
        </Fragment>
      );
    }
  }

  refreshAnswerForm = () => {
    document.getElementById("answerForm").reset();
  };

  getQuestionForm() {
    if (
      this.state.questionDescription === null &&
      this.state.questionText === null &&
      this.state.assessmentTitle !== null &&
      this.state.isEditingAssessmentTitle === false
    ) {
      return (
        <Fragment>
          <h3 className="mb-4">Assessment Questions</h3>
          {this.state.questions.map(question => (
            <li key={question.questionText} className="list-group-item mb-5">
              <h4>Question {question.number}</h4>
              {question.questionDescription && (
                <p className="text-left">"{question.questionDescription}"</p>
              )}
              <p className="text-left">"{question.questionText}"</p>
              <p className="text-left">Available answers</p>
              {question.availableAnswers.map(answer => (
                <ul className="list-group" key={answer.text}>
                  <li
                    key={answer.text}
                    className="list-group-item text-left pl-5">
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
            Create a Question in Assessment "{this.state.assessmentTitle}"
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
              {this.state.isValid === false &&
                !this.state.isEditingAssessmentTitle && (
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

  refreshQuestionForm = () => {
    document.getElementById("questionForm").reset();
  };

  getAssessmentTitleForm() {
    if (
      this.state.isAddingAnswer === false &&
      this.state.isEditingAssessmentTitle === true &&
      this.state.isAssessmentFinished === false
    ) {
      return (
        <Fragment>
          <h3 className="py-2 mb-5">Create Assessment</h3>
          <form id="assessmentTitleForm" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="float-left" htmlFor="assessmentTitle">
                Assessment Title
              </label>
              <input
                type="text"
                className="form-control"
                id="assessmentTitle"
                value={this.state.value}
                onChange={this.handleChange}
              />
              {this.state.isValid === false &&
                !this.state.isEditingAssessmentTitle &&
                this.assessmentTitle === null && (
                  <small
                    id="questionDescriptionTyped"
                    className="form-text text-muted text-left">
                    The assessment title cannot be empty.
                  </small>
                )}
            </div>
            {this.state.assessmentTitle !== null}
            <button
              type="submit"
              id="assessmentTitle"
              className="btn btn-primary float-right">
              Submit
            </button>
          </form>
        </Fragment>
      );
    }
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
      this.state.assessmentTitle !== null
    ) {
      this.setState(
        {
          assessmentTitle: this.state.assessmentTitle,
        },
        () => {
          this.setState({
            isValid: true,
            isEditingAssessmentTitle: false,
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
          isAddingAnswer: true,
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
      this.setState(
        {
          isValid: true,
          answerText: null,
          isEditingAssessmentTitle: true,
          isAssessmentFinished: true,
        },
        () => {
          console.log(this.state.isValid);
          this.getAssessmentTitleForm();
        }
      );
    }
    if (
      event.target.id === "submitAnswer" &&
      this.state.answerTextTyped !== null
    ) {
      if (this.isDuplicateAnswer()) {
        console.log("Something is wrong");
        return this.props.handleMessage(
          "There is already another answer with this text. Please add a different one."
        );
      } else {
        console.log("Everything OK");
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
            if (this.state.isCorrectAnswer === true) {
              this.incrementCorrectAnswers();
            }
          })();
          (() => {
            this.props.handleMessage("");
            this.setState({
              isValid: true,
              isCorrectAnswer: false,
              answerTextTyped: null,
            });
            this.refreshAnswerForm();
            this.getAnswerForm();
          })();
        });
      }
    }

    if (
      event.target.id === "finishQuestion" &&
      this.state.answersToCurrentQuestion.length > 1 &&
      this.state.numberOfCorrectAnswers === 1
    ) {
      this.setState(
        {
          questions: [
            ...this.state.questions,
            {
              number: this.state.questionNumber,
              questionText: this.state.questionText,
              questionDescription: this.state.questionDescription,
              availableAnswers: this.state.answersToCurrentQuestion,
            },
          ],
        },
        () => {
          this.props.handleMessage(
            `Question number ${this.state.questionNumber} "${this.state.questionText}" successfully added to "${this.state.assessmentTitle}"`
          );
          this.setState({
            numberOfCorrectAnswers: 0,
            questionDescription: null,
            questionText: null,
            questionTextTyped: null,
            answersToCurrentQuestion: [],
            isValid: true,
            isAddingAnswer: false,
          });
          this.getQuestionForm();
        }
      );
    } else if (
      event.target.id === "finishQuestion" &&
      this.state.answersToCurrentQuestion.length < 2
    ) {
      this.props.handleMessage(
        "You only have one answer to your question. Please create at least another one."
      );
    } else if (
      event.target.id === "finishQuestion" &&
      this.state.numberOfCorrectAnswers < 1
    ) {
      this.props.handleMessage(
        "You have no correct answer to your question. Please create one."
      );
    } else if (
      event.target.id === "finishQuestion" &&
      this.state.numberOfCorrectAnswers > 1
    ) {
      this.props.handleMessage(
        `You have created ${
          this.state.numberOfCorrectAnswers
        } correct answers to this question, but there only has to be 1. Please delete ${
          this.state.numberOfCorrectAnswers - 1
        }.`
      );
    }
    this.setState({ isValid: false });
  }

  render() {
    return (
      <Fragment>
        {this.getAssessmentTitleForm()}
        {this.getQuestionForm()}
        {this.getAnswerForm()}
        {this.getAssessmentReview()}
      </Fragment>
    );
  }
}

export default AssessmentCreate;
