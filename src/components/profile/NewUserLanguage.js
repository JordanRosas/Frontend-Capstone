import React, { Component } from 'react'
import SearchManager from '../../modules/SearchManager'
import Rating from 'react-rating'

import './NewUserLang.css'
export default class NewUserLanguage extends Component{
  state={
    languageId:"",
    notes:"",
    flagPhotoURL:"",
    rate:"",
    userId:Number(sessionStorage.getItem("username")),
    languages:[]
  }
  handleFieldChange= evt =>{
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  handleRatingChange = (rating) => {
    this.setState({rate:rating})
    
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
      languageId: parseInt(this.state.languageId),
      notes:this.state.notes,
      flagPhotoURL:this.state.flagPhotoURL,
      rate:this.state.rate,
      userId:this.state.userId
    }
    this.props.postNewUserLanguageCardToProfile(newUserLangObj)
    .then(() => this.props.history.push('/profile'))
  }

  render(){
    return(
      <>
      <div className="banner">
        <h1>New Language</h1>
      </div>
      <div className="newLangBackground">
      <form className="newLanguage">
        <div className="form-row">
          <div className="form-group col-md-6">
          <label htmlFor="lng">Select a language: </label>
          <select 
                  className="form-control"
                  type="select-multiple"
                  onChange={this.handleFieldChange}
                  id="languageId"
                  placeholder="Select a language">
                  <option key={0} defaultValue="">Select a language</option>
                  {
                    this.state.languages.map(language => (
                      <option key={language.id} value={language.id}>{language.language}</option>
                    ))
                    
                  }
                  
          </select>
        </div>
        <div className="form-group col-md-6">
        <label htmlFor="email">Flag Photo: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="flagPhotoURL"
                  value={this.flagPhotoURL}
                  placeholder="Flag Photo URL" />
        </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Notes: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="notes"
                  value={this.state.notes}
                  placeholder="Notes..." />
        </div>
          <label htmlFor="rate">Proficiency:</label>
        <div className="form-group">
          <Rating 
            placeholderRating={this.state.rate}
            id="rating"
            onChange={this.handleRatingChange}
            />
          </div>
      <button type="button" onClick={this.createNewUserLanguageObject}>Post</button>
      </form>
      </div>
      </>
    )
  }
}