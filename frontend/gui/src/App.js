import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navabar from './components/Navbar/Navbar';
import Message from './components/MessageBar.jsx/Message';
import Body from './components/body/Body'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleMessage = this.handleMessage.bind(this)
  }

  handleMessage(message) {
    this.setState({ message: message })
  }

  componentDidMount() {

  }



  render() {
    return (
      <div className="App">
        <Navabar />
        {this.state.message && <Message text={this.state.message} />}
        <Body handleMessage={this.handleMessage} />
      </div>
    );
  }
}

export default App;
