import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="navbar navbar-light bg-success sticky-top">
        <div className="py-1 mx-auto text-white">{this.props.text}</div>
      </nav>
    );
  }
}

export default Message;
