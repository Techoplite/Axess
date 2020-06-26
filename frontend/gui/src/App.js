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
      userRole: "Student"
    }
    this.handleMessage = this.handleMessage.bind(this)
    this.getUserRole = this.getUserRole.bind(this)
  }

  async getUserRole() {
    await fetch("http://127.0.0.1:8000/rest-auth/user/",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Token e68edf2d326bef3b12b3008c851261b0c7c3dced',
        }
      }
    )
      .then(response => response.json())
      .then(data => this.setState({ userRole: data.role }))
  }

  handleMessage(message) {
    this.setState({ message: message })
  }

  componentDidMount() {
    this.getUserRole()
  }



  render() {
    return (
      <div className="App bg-light">
        <Navabar role={this.state.userRole} />
        {this.state.message && <Message text={this.state.message} />}
        <Body handleMessage={this.handleMessage} role={this.state.userRole} />
        <Footer />
      </div>
    );
  }
}

export default App;
