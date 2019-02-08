import React, { Component } from 'react'
import SearchManager from '../../modules/SearchManager'
import ResetRating from '../Rating/RatingSystem'
// import { longStackSupport } from 'q';
// import LoginManager from '../../modules/LoginManager';
export default class RegisterForm extends Component{
  //setting state of the username and password fields
  state={
    username:"",
    password:"",
    email:"",
    lat:"",
    lng:"",
    photoURL:"",
    rate:"",
    languages:[],
    userId:"",
    
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
    this.buildLanguageOptions();
  }

  handleFieldChange = evt => {
    evt.preventDefault()
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRatingChange = (rating) => {
    this.setState({rate:rating})
    
  }

  createNewUser = evt => {
    evt.preventDefault()
    const newUser = {
      username: this.state.username,
      password:this.state.password,
      email:this.state.email,
      lat:this.state.lat,
      lng:this.state.lng,
      photoURL:this.state.photoURL

    }
    const userLanguage = {
      rate:this.state.rate,
      languageId:parseInt(this.state.language)
    }
    this.props.postNewUser(newUser)
    .then(response => {
      userLanguage.userId = response.id
      this.props.postNewUserLanguage(userLanguage)})
    .then(() => this.props.history.push("/login"))
  }

  render(){
    return(
      <>
      <form className="RegisterForm">
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="username"
                  placeholder="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="password"
                  placeholder="password" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type="email" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="email"
                  placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="lat">Lat: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="lat"
                  placeholder="Lat" />
        </div>
        <div className="form-group">
          <label htmlFor="lng">Lng: </label>
          <input type="text" required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="lng"
                  placeholder="Lng" />
        </div>
        <div className="form-group">
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
          <div className="form-group">
          
          <label htmlFor="rate">Proficiency:</label>
          <ResetRating 
            id="rating"
            onChange={this.handleRatingChange}
            // onChange={this.handleRatingChange}
            />
          </div>
        </div>
        <button 
          type="submit" 
          onClick={this.createNewUser}>Sign Up</button>
      </form>
      </>
    )
  }
}