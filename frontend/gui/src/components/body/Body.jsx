import React, { Component } from "react";
import AssessmentList from "./AssessmentList";
import AssessmentCreate from "./AssessmentCreate";
import AssessmentDetail from "./AssessmentDetail";
import FindAssessment from "./FindAssessment";
import YourAssessments from "./YourAssessments";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import LogInForm from "./LogInForm";
import RegisterForm from "./RegisterForm";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div className="col-7 mx-auto mt-4 text-center pb-5">
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Axess</h1>
            </div>
          </div>
          <Switch>
            <Route path="/home">
              <Home handleMessage={this.props.handleMessage} />
            </Route>
            <Route path="/login">
              <LogInForm
                handleMessage={this.props.handleMessage}
                handleLogIn={this.props.handleLogIn}
                handleChange={this.props.handleChange}
                isAuthenticated={this.props.isAuthenticated}
                onClick={this.props.handleOnClick}
              />
            </Route>
            <Route path="/register">
              <RegisterForm
                passwordsDiffer={this.props.passwordsDiffer}
                handleRegister={this.props.handleRegister}
                radioChecked={this.props.radioChecked}
                handleRadioOnChange={this.props.handleRadioOnChange}
                handleMessage={this.props.handleMessage}
                handleLogIn={this.props.handleLogIn}
                handleChange={this.props.handleChange}
                isAuthenticated={this.props.isAuthenticated}
              />
            </Route>
          </Switch>
          {this.props.isAuthenticated && (
            <Switch>
              <Route path="/assessment-list">
                <AssessmentList
                  userID={this.props.userID}
                  handleMessage={this.props.handleMessage}
                  token={this.props.token}
                />
              </Route>
              <Route path="/assessment-create">
                <AssessmentCreate
                  handleMessage={this.props.handleMessage}
                  userID={this.props.userID}
                />
              </Route>
              <Route
                path="/assessment-detail/:id"
                exact
                component={AssessmentDetail}
              />
              <Route path="/carry-out-assessment">
                <FindAssessment handleMessage={this.props.handleMessage} />
              </Route>
              <Route path="/assessments-results">
                <YourAssessments
                  handleMessage={this.props.handleMessage}
                  token={this.props.token}
                />
              </Route>
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

export default Body;
