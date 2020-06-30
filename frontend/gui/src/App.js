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
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRadioOnChange = this.handleRadioOnChange.bind(this);


  }

  handleRadioOnChange(event) {
    this.setState({ radioChecked: event.target.name });
  }

  async handleOnClick(event) {
    event.preventDefault();
    await fetch("http://127.0.0.1:8000/rest-auth/logout/", { method: "POST" }).then(this.setState({ isAuthenticated: false, userRole: undefined, username: null, password: null }, () => this.handleMessage("Log Out successful.")))
  }

  async handleLogIn(event) {
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
            response.json().then(data => this.setState({ isAuthenticated: true, userRole: data.role }, this.handleMessage("Login successful.")))
          )
        )
      );
  }

  async handleRegister(event) {
    event.persist()
    this.state.password1 !== this.state.password2 ? this.setState({ passwordsDiffer: true }) :
      await fetch("http://127.0.0.1:8000/rest-auth/registration/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            username: this.state.username,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2,
            role: this.state.radioChecked
          }
        ),
      })
        .then(response => response.json())
        .then(data => this.setState(
          { token: data.key, password: this.state.password1 }
          , () => this.handleLogIn(event)))
  }


  handleChange(event) {
    this.handleMessage("")
    this.setState({ [event.target.id]: event.target.value });
  }

  handleMessage(message) {
    this.setState({ message: message })
  }

  componentDidMount() {
    this.handleMessage("")
    this.state.isAuthenticated && this.getUserRole()
  }



  render() {
    return (
      <div className="App bg-light">
        <Navabar role={this.state.userRole} username={this.state.username} isAuthenticated={this.state.isAuthenticated} handleOnClick={this.handleOnClick} />
        {this.state.message && <Message text={this.state.message} />}
        <Body
          passwordsDiffer={this.state.passwordsDiffer}
          handleMessage={this.handleMessage}
          handleLogIn={this.handleLogIn}
          handleChange={this.handleChange}
          isAuthenticated={this.state.isAuthenticated}
          handleRegister={this.handleRegister}
          handleRadioOnChange={this.handleRadioOnChange}
          radioChecked={this.state.radioChecked}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
