import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.handleMessage("");
  }

  render() {
    return <h1 className="display-1">Welcome to Axess</h1>;
  }
}

export default Home;
