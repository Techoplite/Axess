import React, { Component } from "react";

class AssessmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assessment: {},
      questions: [],
      answers: [],
    };
    this.getAssessmentQuestions = this.getAssessmentQuestions.bind(this);
    this.getAnswersToCurrentQuestion = this.getAnswersToCurrentQuestion.bind(
      this
    );
  }

  getAnswersToCurrentQuestion(id) {
    return this.state.answers.map(
      answer =>
        id === answer.question && (
          <li className="list-group-item text-left pl-5" key={answer.id}>
            {answer.answer}
            {answer.is_correct_answer && (
              <span className="badge badge-pill badge-success float-right mr-4">
                Correct Answer
              </span>
            )}
          </li>
        )
    );
  }

  getAssessmentQuestions() {
    return this.state.questions.map(question => (
      <div
        key={question.id}
        className="text-left list-group-item py-3 mb-5 border">
        <h5 className="pb-2">Question {question.number}:</h5>
        <li className="text-center list-group-item">
          {question.description !== null && <p>"{question.description}"</p>}
          <br /> "{question.question} "
        </li>
        <br />
        <h5 className="pb-2">Available Answers:</h5>
        {this.getAnswersToCurrentQuestion(question.id)}
      </div>
    ));
  }
  componentWillMount() {
    this.props.handleMessage("");
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    Promise.all([
      await fetch(`http://127.0.0.1:8000/api/assessments/${id}/`),
      await fetch("http://127.0.0.1:8000/api/questions/"),
      await fetch("http://127.0.0.1:8000/api/answers/"),
    ]).then(([res1, res2, res3]) => {
      res1.json().then(data => this.setState({ assessment: data }));
      res2.json().then(data =>
        data.map(question => {
          return (
            question.assessment === this.state.assessment.id &&
            this.setState({
              questions: [...this.state.questions, question],
            })
          );
        })
      );
      res3.json().then(data =>
        data.map(answer => {
          return this.state.questions.map(
            question =>
              answer.question === question.id &&
              this.setState({ answers: [...this.state.answers, answer] })
          );
        })
      );
    });
  }

  render() {
    return (
      <div>
        <h3 className="py-2 display-4">
          {this.state.assessment.title} - ID: {this.state.assessment.id}
        </h3>
        <ul className="list-group">{this.getAssessmentQuestions()}</ul>
      </div>
    );
  }
}

export default AssessmentDetail;
