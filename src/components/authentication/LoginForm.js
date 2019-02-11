import React, { Component } from 'react'
import "./LogInForm.css"
import '../../index.css'



export default class LoginForm extends Component{
  // setting state of the register form firelds
  state = {
    username:"",
    password:"",
  }

  handleFieldChange = evt => {
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  onLogin = (evt) => {
    evt.preventDefault()
    this.props.verifyUsers(this.state.username, this.state.password)
      if(this.props.users.length < 1){
        alert("Can't seem to that account. Register Below!")
      }else{
        this.props.users.forEach(user => {
          let isLoggedIn = false
          if(this.state.username === user.username && this.state.password === user.password){
            isLoggedIn = true
          }
          if(isLoggedIn === true){
            sessionStorage.setItem("username", user.id)
            let userId = sessionStorage.getItem("username")
            console.log(userId)
            this.props.history.push("/home")
          }
        })
      }
  }
  render(){
    return(
      <>
      <div className="login">
      <h1 className="h3 mb-3 font-weight-normal title main-header">Polyglot Pal</h1>
      </div>
      <form className="logInForm" onSubmit={this.onLogin}>
      <h3 className="h3 mb-3 font-weight-normal title sign-in">Sign In</h3>
      <label id="usernameLabel" htmlFor="inputUsername">
          Username:
      </label>
      <input 
          className="Username"
          name="inputUsername"
          onChange={this.handleFieldChange} type="text"
          id="username"
          placeholder="Username"
          required="" autoFocus="" />
      <label id="passwordLabel" htmlFor="inputPassword">
          Password:
      </label>
      <input
          className="Password"
          name="inputPassword" 
          onChange={this.handleFieldChange} type="password"
          id="password"
          placeholder="Password"
          required="" />
      <div className="form-row">
          <div className="form-group col-md-6">
            <button className="signInButton" type="submit">
                Sign In
            </button>
          </div>
          <div className="form-group col-md-6">
            <button className="registerButton" type="button"
              onClick={()=> this.props.history.push("/login/new")}
              >
              Register
            </button>
          </div>
        </div>
    </form>
    
    
    </>
    )
  }
}