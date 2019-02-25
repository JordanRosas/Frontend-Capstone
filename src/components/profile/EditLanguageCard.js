import React, { Component } from 'react'
import SearchManager from '../../modules/SearchManager'
import ProfileManager from '../../modules/ProfileManager';
import Rating from 'react-rating'
import './EditLanguage.css'
export default class EditLanguageCard extends Component{
  state={
    languageId:"",
    notes:"",
    flagPhotoURL:"",
    rate:0,
    userId:Number(sessionStorage.getItem("username")),
    languages:[]
  }
  componentDidMount(){
    this.buildLanguageOptions()

    // let userId = sessionStorage.getItem("username")
    // let currentUser = Number(userId)
    ProfileManager.getUserLangsById(this.props.match.params.id)
    // .then(userLangs => console.log(userLangs))
    .then(userLangs => {
      this.setState({
        languageId:userLangs.languageId,
        notes:userLangs.notes,
        flagPhotoURL:userLangs.flagPhotoURL,
        rate:userLangs.rate,
      })
    })

    
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

  updateExistingCard = evt => {
    evt.preventDefault()

    const existingCard = {
      languageId: parseInt(this.state.languageId),
      notes:this.state.notes,
      flagPhotoURL:this.state.flagPhotoURL,
      rate:this.state.rate,
      userId:this.state.userId
    }
    this.props.editCard(Number(this.props.match.params.id), existingCard)
    .then(() => this.props.history.push("/profile"))
  }


  render(){
    return(
      <>
      <div className="banner">
      <h1>Edit Your Profile</h1>
      </div>
      <div className="editLanguageContainer">
      <form className="editTheProfile">
        <div className="form-row">
          <div className="form-group col-md-6">
          <label htmlFor="lng">Your language: </label>
          <select
                  value={this.state.languageId} 
                  className="form-control"
                  type="select-multiple"
                  onChange={this.handleFieldChange}
                  id="languageId"
                  placeholder="Select a language">
                  <option key={0} defaultValue="">Select a Language</option>
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
                  value={this.state.flagPhotoURL}
                  // placeholder="Email" 
                  />
        </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Notes: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="notes"
                  value={this.state.notes}
                  // placeholder="Notes..."
                  />
        </div>
        <label htmlFor="rate">Skill Level:</label>
        <div className="form-group">
          
          <Rating 
            placeholderRating={this.state.rate}
            id="rating"
            onChange={this.handleRatingChange}
            />
          </div>
      <button type="button" onClick={this.updateExistingCard}>Update</button>
      </form>
      </div>
      </>
    )
  }
}