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
          <li className="text-center list-group-item" key={answer.id}>
            {answer.answer} {answer.is_correct_answer}
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
          "{question.description}"
          <br /> "{question.question}"
        </li>
        <br />
        <h5 className="pb-2">Available Answers:</h5>
        {this.getAnswersToCurrentQuestion(question.id)}
      </div>
    ));
  }

  componentDidMount() {
    // Fetch assessment from id value passed by AssessmentList
    const { id } = this.props.match.params;
    fetch(`http://127.0.0.1:8000/api/assessments/${id}/`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          assessment: data,
        });
      });
    // Fetch questions only related to this assessment
    fetch("http://127.0.0.1:8000/api/questions/")
      .then(response => response.json())
      .then(data =>
        data.map(question => {
          return (
            question.assessment === this.state.assessment.id &&
            this.setState({
              questions: [...this.state.questions, question],
            })
          );
        })
      );
    // Fetch answers only related to this assessment questions
    fetch("http://127.0.0.1:8000/api/answers/")
      .then(response => response.json())
      .then(data =>
        data.map(answer => {
          return this.state.questions.map(
            question =>
              answer.question === question.id &&
              this.setState({ answers: [...this.state.answers, answer] })
          );
        })
      );
  }

  render() {
    return (
      <div>
        <h3 className="py-2">{this.state.assessment.title}</h3>
        <ul className="list-group">{this.getAssessmentQuestions()}</ul>
      </div>
    );
  }
}

export default AssessmentDetail;
