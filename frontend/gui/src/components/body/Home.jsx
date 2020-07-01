import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.handleMessage("", "success");
  }

  render() {
    return <h1 className="display-3 my-5 pt-5">Welcome to Axess</h1>;
  }
}

export default Home;
