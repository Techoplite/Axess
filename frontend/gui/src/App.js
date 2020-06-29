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
      isAuthenticated: false,
      message: '',
      userRole: undefined,
      username: null,
      password: null,
    }
    this.handleMessage = this.handleMessage.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }

  async handleLogIn(event, username, password) {
    event.preventDefault();
    await fetch("http://127.0.0.1:8000/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        email: "",
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(data =>
        this.setState({ token: data.key }, () =>
          fetch("http://127.0.0.1:8000/rest-auth/user/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${this.state.token}`,
            },
          }).then(response =>
            response.json().then(data => this.setState({ isAuthenticated: true, userRole: data.role }))
          )
        )
      );
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleMessage(message) {
    this.setState({ message: message })
  }

  componentDidMount() {
    this.state.isAuthenticated && this.getUserRole()
  }



  render() {
    return (
      <div className="App bg-light">
        <Navabar role={this.state.userRole} />
        {this.state.message && <Message text={this.state.message} />}
        <Body handleMessage={this.handleMessage} handleLogIn={this.handleLogIn} handleChange={this.handleChange} />
        <Footer />
      </div>
    );
  }
}

export default App;
