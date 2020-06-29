import React, { Component, Fragment } from "react";
import AssessmentList from "./AssessmentList";
import AssessmentCreate from "./AssessmentCreate";
import AssessmentDetail from "./AssessmentDetail";
import FindAssessment from "./FindAssessment";
import YourAssessments from "./YourAssessments";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import LogInForm from "./LogInForm";

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
          <LogInForm handleLogIn={this.props.handleLogIn} handleChange={this.props.handleChange} isAuthenticated={this.props.isAuthenticated}/>
          {this.props.isAuthenticated && (
            <Switch>
              <Route path="/assessment-list">
                <AssessmentList handleMessage={this.props.handleMessage} />
              </Route>
              <Route path="/assessment-create">
                <AssessmentCreate handleMessage={this.props.handleMessage} />
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
                <YourAssessments handleMessage={this.props.handleMessage} />
              </Route>
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

export default Body;
