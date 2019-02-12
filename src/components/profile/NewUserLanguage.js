import React, { Component } from 'react'

export default class NewUserLanguage extends Component{
  state={
    languageId:"",
    notes:"",
    flagPhotoURL:"",
    userId:Number(sessionStorage.getItem("username"))
  }
  handleFieldChange= evt =>{
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.taget.id] = evt.target.value
    this.setState({stateToChange})
  }
  createNewUserLanguageObject = evt => {
    evt.preventDefault()
    const newUserLangObj = {
      languageId: this.state.languageId,
      notes:this.state.notes,
      flagPhotoURL:this.state.flagPhotoURL,
      userId:this.state.userId
    }
    this.props.postNewUserLanguageCardToProfile(newUserLangObj)
    .then(() => this.props.history.push('/profile'))
  }

  render(){
    return(
      <form className="RegisterForm">
        <div className="form-row">
          <div className="form-group col-md-6">
          <label htmlFor="username">Language: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="username"
                  placeholder="username" />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="password">Notes: </label>
          <input type="password" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="password"
                  placeholder="password" />
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Flag Photo: </label>
          <input type="email" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="email"
                  placeholder="Email" />
        </div>
      <button type="button" onClick={this.createNewUserLanguageObject}>Click</button>
      </form>
    )
  }
}