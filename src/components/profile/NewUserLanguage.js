import React, { Component } from 'react'
import SearchManager from '../../modules/SearchManager'

export default class NewUserLanguage extends Component{
  state={
    languageId:"",
    notes:"",
    flagPhotoURL:"",
    userId:Number(sessionStorage.getItem("username")),
    languages:[]
  }
  handleFieldChange= evt =>{
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState({stateToChange})
  }
  buildLanguageOptions(){
    let languages = []
    SearchManager.getAllLanguages()
    .then(allLanguages => {
      allLanguages.forEach(language => {
        if(!languages.includes({id: language.id, language: language.language})){
          languages.push({id: language.id, language: language.language})
        }
      })
      this.setState({languages:languages})
    })
  }
  componentDidMount(){
    this.buildLanguageOptions()
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
      <form className="editProfile">
        <div className="form-row">
          <div className="form-group col-md-6">
          <label htmlFor="lng">Select a language: </label>
          <select 
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="language"
                  placeholder="Select a language">
                  <option key={0} defaultValue="">English</option>
                  {
                    this.state.languages.map(language => (
                      <option key={language.id} value={language.id}>{language.language}</option>
                    ))
                    
                  }
                  
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="password">Notes: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="password"
                  placeholder="password" />
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Flag Photo: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="email"
                  placeholder="Email" />
        </div>
      <button type="button" onClick={this.createNewUserLanguageObject}>Post</button>
      </form>
    )
  }
}