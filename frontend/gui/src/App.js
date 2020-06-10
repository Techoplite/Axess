import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navabar from './components/Navbar/Navbar';
import Message from './components/MessageBar.jsx/Message';
import Body from './components/body/Body'
import Footer from './components/footer/Footer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      userRole: "Teacher"
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
        <Navabar role={this.state.userRole}/>
        {this.state.message && <Message text={this.state.message} />}
        <Body handleMessage={this.handleMessage} role={this.state.userRole}/>
        <Footer />
      </div>
    );
  }
}

export default App;
