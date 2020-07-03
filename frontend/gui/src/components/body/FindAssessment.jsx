import React, { Component, Fragment } from "react";

class FindAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessment: null,
      assessmentfound: false,
      assessmentTitle: "",
      currentQuestionNumber: 1,
      userAnswers: [],
      isFinished: false,
    };
    this.fetchAssessment = this.fetchAssessment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setCorrectAnswers = this.setCorrectAnswers.bind(this);
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.handleRadioOnChange = this.handleRadioOnChange.bind(this);
    this.initializeUserAnswers = this.initializeUserAnswers.bind(this);
    this.handleFinishAssessment = this.handleFinishAssessment.bind(this);
    this.setAllQuestionAnswered = this.setAllQuestionAnswered.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.setCurrentUserAnswer = this.setCurrentUserAnswer.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleCurrentQuestionNumber = this.handleCurrentQuestionNumber.bind(
      this
    );
  }

  handlePrevious(event) {
    event.preventDefault();
    this.setState(
      {
        currentQuestionNumber: this.state.currentQuestionNumber - 1,
      },
      () => this.setCurrentQuestion()
    );
  }

  handleNext(event) {
    event.preventDefault();
    this.setState(
      {
        currentQuestionNumber: this.state.currentQuestionNumber + 1,
      },
      () => this.setCurrentQuestion()
    );
  }

  componentDidMount() {
    this.props.handleMessage("", "success");
  }

  calculateResult() {
    const result = Math.floor(
      (this.state.correctAnswersNumber * 100) /
        this.state.assessmentQuestions.length
    );

    this.setState({ result: result }, () => {
      fetch(`http://127.0.0.1:8000/api/results/`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student: this.props.userID,
          assessment: this.state.assessmentId,
          score: this.state.result,
        }),
      });
    });
  }

  setCurrentUserAnswer() {
    const index = this.state.currentQuestionNumber - 1;
    const currentUserAnswer = this.state.userAnswers[index];
    this.setState({
      currentUserAnswer: currentUserAnswer,
      radioChecked: currentUserAnswer,
    });
  }

  setAllQuestionAnswered() {
    this.setCurrentUserAnswer();
    !this.state.userAnswers.some(answer => answer === null) &&
      this.setState({ allQuestionsAnswered: true });
  }

  handleFinishAssessment(event) {
    event.preventDefault();
    let correctAnswers = 0;
    for (let i = 0; i < this.state.correctAnswers.length; i++) {
      if (this.state.userAnswers[i] === this.state.correctAnswers[i]) {
        correctAnswers++;
      }
    }
    this.setState(
      {
        isFinished: true,
        correctAnswersNumber: correctAnswers,
      },
      () => this.calculateResult()
    );
  }

  initializeUserAnswers() {
    let answers = [];
    this.state.assessmentQuestions.map(
      question => (answers = [...answers, null])
    );
    this.setState({ userAnswers: answers });
  }

  handleSubmitAnswer(event) {
    event.preventDefault();
    if (this.state.radioChecked === null) {
      this.props.handleMessage(
        "You have not selected an answer. Please select one befor sumbit.",
        "danger"
      );
    }
    const answersCopy = this.state.userAnswers.slice();
    const index = this.state.currentQuestionNumber - 1;
    answersCopy[index] = this.state.radioChecked;

    if (
      this.state.currentQuestionNumber ===
        this.state.assessmentQuestions.length &&
      this.state.radioChecked !== null
    ) {
      this.props.handleMessage("", "danger");
      this.setState(
        {
          userAnswers: answersCopy,
        },
        () => this.setCurrentQuestion()
      );
    } else if (this.state.radioChecked !== null) {
      this.props.handleMessage("", "success");
      this.setState(
        {
          userAnswers: answersCopy,
        },
        () => this.setCurrentQuestion()
      );
    }
  }

  setCurrentAvailableAnswers() {
    let currentAvailableAnswers = [];
    this.state.assessmentAnswers.map(assessmentAnswersArrays =>
      assessmentAnswersArrays.map(questionAnswers =>
        questionAnswers.map(
          answer =>
            answer.question === this.state.currentQuestion.id &&
            (currentAvailableAnswers = [
              ...currentAvailableAnswers,
              answer.answer,
            ])
        )
      )
    );
    this.setState({ currentAvailableAnswers: currentAvailableAnswers }, () =>
      this.setCorrectAnswers()
    );
  }

  setCorrectAnswers() {
    let correctAnswers = [];
    this.state.assessmentAnswers.map(answersArrays =>
      answersArrays.map(answersArray =>
        answersArray.map(
          answer =>
            answer.is_correct_answer &&
            (correctAnswers = [...correctAnswers, answer.answer])
        )
      )
    );
    this.setState({ correctAnswers: correctAnswers }, () =>
      this.setAllQuestionAnswered()
    );
  }

  handleRadioOnChange(event) {
    this.setState({ radioChecked: event.target.name });
  }

  setCurrentQuestion() {
    if (this.state.assessmentQuestions) {
      const currentQuestion = this.state.assessmentQuestions.find(
        question => question.number === this.state.currentQuestionNumber
      );
      this.setState({ currentQuestion: currentQuestion }, () =>
        this.setCurrentAvailableAnswers()
      );
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

  async fetchAssessment(event) {
    event.preventDefault();
    document.getElementById("assessmentId").value = "";
    this.props.handleMessage("", "success");
    const id = parseInt(this.state.assessmentId);
    if (isNaN(id)) {
      this.props.handleMessage("Assessment Id must be a number.", "danger");
    } else {
      await fetch("http://127.0.0.1:8000/api/results/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`,
        },
      })
        .then(response => response.json())
        .then(async data => {
          if (
            await data.some(
              result =>
                result.student === this.props.userID && result.assessment === id
            )
          ) {
            this.props.handleMessage(
              "Your have already carried out this assessment.",
              "danger"
            );
          } else {
            await fetch(`http://127.0.0.1:8000/api/assessments/${id}/`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`,
              },
            })
              .then(response => {
                if (response.ok) {
                  this.setState({ assessmentfound: true });
                  return response.json();
                } else {
                  this.props.handleMessage(
                    `There is no assessment with Id ${id}. Please insert a valid Id.`,
                    "danger"
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
            await fetch("http://127.0.0.1:8000/api/questions/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`,
              },
            })
              .then(response => response.json())
              .then(data => {
                if (this.state.assessment) {
                  this.setState(
                    {
                      assessmentQuestions: data.filter(
                        question =>
                          question.assessment === this.state.assessment.id
                      ),
                    },
                    () => this.initializeUserAnswers()
                  );
                }
              });
            await fetch("http://127.0.0.1:8000/api/answers/", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`,
              },
            })
              .then(response => response.json())
              .then(data => {
                if (this.state.assessmentQuestions) {
                  this.setState(
                    {
                      assessmentAnswers: [
                        this.state.assessmentQuestions.map(question =>
                          data.filter(answer => answer.question === question.id)
                        ),
                      ],
                    },
                    () => this.setCurrentQuestion()
                  );
                }
              })
              .then(this.setState({ allQuestionsAnswered: false }));
          }
        });
    }
  }

  render() {
    if (!this.state.assessmentfound) {
      return (
        <Fragment>
          <h1 className="mb-5">Find Assessment</h1>
          <form autoComplete="off">
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
    } else if (!this.state.isFinished) {
      return (
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
          <form className="border p-2 py-4 rounded overflow-hidden">
            <h5 className="mb-5 text-left col-12">
              Question {this.state.currentQuestionNumber}
            </h5>
            {this.state.currentQuestion && (
              <Fragment>
                <h6 className="mb-3">
                  {this.state.currentQuestion.description}
                </h6>
                <h6>{this.state.currentQuestion.question}</h6>
                <h5 className="mt-5 mb-4 text-left col-12">Answers</h5>
                <div className="text-left ml-5 col-12">
                  {this.state.currentAvailableAnswers &&
                    this.state.currentAvailableAnswers.map(answer => (
                      <div
                        className="custom-control custom-radio mt-3"
                        key={answer}>
                        <input
                          checked={this.state.radioChecked === answer}
                          onChange={this.handleRadioOnChange}
                          type="radio"
                          id={`radio${answer}`}
                          name={answer}
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`radio${answer}`}>
                          {answer}
                        </label>
                      </div>
                    ))}
                </div>
              </Fragment>
            )}
            <div className="row mt-5 mx-3">
              <input
                type="submit"
                value="Submit"
                onClick={this.handleSubmitAnswer}
                className="btn btn-success ml-auto"
              />
              {this.state.allQuestionsAnswered === true && (
                <input
                  type="submit"
                  value="Finish Assessment"
                  onClick={this.handleFinishAssessment}
                  className="d-block btn btn-danger ml-2"
                />
              )}
            </div>
            <div className="row mt-5 mx-3">
              {this.state.currentQuestionNumber > 1 && (
                <input
                  type="button"
                  value="Previous"
                  onClick={this.handlePrevious}
                  className="btn btn-warning"
                />
              )}
              {this.state.assessmentQuestions &&
                this.state.currentQuestionNumber <
                  this.state.assessmentQuestions.length && (
                  <input
                    type="button"
                    value="Next"
                    onClick={this.handleNext}
                    className="btn btn-warning ml-auto"
                  />
                )}
            </div>
          </form>
        </Fragment>
      );
    } else if (this.state.isFinished) {
      return (
        <Fragment>
          <h1 className="mb-5">Assessment Result</h1>
          <h5 className="mb-5 mt-2">
            With {this.state.correctAnswersNumber} correct answer/s out of{" "}
            {this.state.assessmentQuestions.length} questions your result is:
          </h5>
          <h3 className="display-3">{this.state.result} %</h3>
        </Fragment>
      );
    }
  }
}

export default FindAssessment;
