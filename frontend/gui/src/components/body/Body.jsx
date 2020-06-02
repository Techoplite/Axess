import React, { Component } from "react";
import AssessmentList from "./AssessmentList";
import AssessmentCreate from "./AssessmentCreate";
import AssessmentDetail from "./AssessmentDetail";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div className="col-7 mx-auto mt-4 text-center pb-5">
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Body;
