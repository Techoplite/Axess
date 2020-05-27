import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navabar from './components/Navbar/Navbar';
import Message from './components/MessageBar.jsx/Message';
import Body from './components/body/Body'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'A message should display accordigly with the event occurred.'
    }
  }


  componentDidMount() {
  }



  render() {
    return (
      <div className="App">
        <Navabar />
        {this.state.message && <Message text={this.state.message} />}
        <Body message={this.state.message} />
      </div>
    );
  }
}

export default App;
